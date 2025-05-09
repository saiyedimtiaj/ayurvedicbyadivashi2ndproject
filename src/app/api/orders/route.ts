/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/mongodb";
import order from "@/model/order";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    await dbConnect();

    const orders = await order.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID!;
const FB_ACCESS_TOKEN =
  "EAASMXFjjtFIBO226tt1bTHptSSpJpOb7vfSr0xteL9DBl4MULtDlP9qb4yI2EZCZCJfcZB53rBMtXAIE0PYsJXzEIOAnNi10RMM0UDfdGl4VuvnFJ4HAONkLZB7lgZCce4C4KJxfZAHsCupxtGXCowOyiNU1USmj5ihN5MFiB01pYLeyV8r8aNrvBZCyT8oydOgEAZDZD";
const FB_API_VERSION = "v17.0";

function hashData(data: string) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

async function sendFacebookEvent(orderData: any) {
  const user_data = {
    ph: hashData(orderData.mobile),
    // যদি email থাকে তাহলে em: hashData(orderData.email),
  };

  const custom_data = {
    currency: "BDT", // পরিবর্তন করো যদি অন্য currency হয়
    value: orderData.total,
    contents: orderData.products.map((p: any) => ({
      id: p._id,
      quantity: p.quantity,
      item_price: p.price,
    })),
    content_type: "product",
  };

  const payload = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    event_id: orderData._id.toString(),
    action_source: "website",
    user_data,
    custom_data,
  };

  const url = `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`;

  try {
    const fbResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [payload] }),
    });
    const data = await fbResponse.json();
    console.log("Facebook Conversion API response:", data);
  } catch (error) {
    console.error("Facebook Conversion API error:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const newOrder = new order(body);
    await newOrder.save();

    // 👉 Facebook Conversion API call
    await sendFacebookEvent(newOrder);

    return NextResponse.json(
      { success: true, order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}
