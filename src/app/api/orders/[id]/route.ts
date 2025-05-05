/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params; // Get order ID from route parameters
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Order ID is required" },
      { status: 400 }
    );
  }

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

  try {
    const orderResponse = await axios.get(
      `https://api-hermes.pathao.com/aladdin/api/v1/orders/${id}/info`,
      {
        headers: {
          Authorization: `Bearer ${pathaoAccessToken}`,
        },
      }
    );

    return NextResponse.json(
      { success: true, data: orderResponse.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error fetching order from Pathao:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { success: false, message: "Failed to fetch order from Pathao" },
      { status: 500 }
    );
  }
}
