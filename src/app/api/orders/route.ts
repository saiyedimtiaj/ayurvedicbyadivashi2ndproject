import dbConnect from "@/lib/mongodb";
import order from "@/model/order";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json(); // Read request body

    const newOrder = new order(body);
    await newOrder.save();

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
