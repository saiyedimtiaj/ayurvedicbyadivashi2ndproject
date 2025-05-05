/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/mongodb";
import Order from "@/model/order";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      recipient_name,
      recipient_phone,
      recipient_address,
      amount_to_collect,
      description,
      orderDetails,
    } = body;

    console.log(body);

    // Get Pathao access token
    let pathaoAccessToken;
    try {
      const response = await axios.post(
        "https://api-hermes.pathao.com/aladdin/api/v1/issue-token",
        {
          client_id: process.env.NEXT_PUBLIC_PATHAO_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_PATHAO_CLIENT_SECRET,
          grant_type: "password",
          username: process.env.NEXT_PUBLIC_PATHAO_USERNAME,
          password: process.env.NEXT_PUBLIC_PATHAO_PASSWORD,
        }
      );

      console.log("Token sdhfghdfsg", response.data?.access_token);
      pathaoAccessToken = response.data?.access_token;
      if (!pathaoAccessToken) {
        throw new Error("Access token not received from Pathao");
      }
    } catch (error: any) {
      console.error(
        "Error fetching Pathao access token:",
        error.response?.data || error.message
      );
      return NextResponse.json(
        { success: false, message: "Failed to authenticate with Pathao API" },
        { status: 500 }
      );
    }

    // Place order with Pathao
    let orderResponse;
    try {
      orderResponse = await axios.post(
        "https://api-hermes.pathao.com/aladdin/api/v1/orders",
        {
          store_id: process.env.NEXT_PUBLIC_PATHAO_STORE_ID,
          recipient_name,
          recipient_phone,
          recipient_address,
          delivery_type: 48,
          item_type: 2,
          special_instruction: "",
          item_quantity: 1,
          item_weight: "0.5",
          item_description: description,
          amount_to_collect,
        },
        {
          headers: {
            Authorization: `Bearer ${pathaoAccessToken}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error);
      console.error(
        "Error placing order with Pathao:",
        error.response?.data || error.message
      );
      return NextResponse.json(
        { success: false, message: "Failed to place order with Pathao" },
        { status: 500 }
      );
    }

    const consignmentId = orderResponse.data?.data?.consignment_id;
    if (!consignmentId) {
      return NextResponse.json(
        { success: false, message: "Invalid response from Pathao" },
        { status: 500 }
      );
    }

    let updatedOrder;
    try {
      updatedOrder = await Order.findByIdAndUpdate(
        orderDetails?._id,
        {
          status: "Delivery",
          consignment_id: consignmentId,
          products: orderDetails.products,
          total: orderDetails.total,
          shipping: orderDetails.shipping,
        },
        { new: true }
      );

      if (!updatedOrder) {
        return NextResponse.json(
          { success: false, message: "Order not found" },
          { status: 404 }
        );
      }
    } catch (error: any) {
      console.error("Error updating order status in database:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update order status" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, order: updatedOrder },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Unexpected error in order processing:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
