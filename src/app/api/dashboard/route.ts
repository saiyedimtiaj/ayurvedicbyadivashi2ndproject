/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/mongodb";
import Order from "@/model/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const query: any = {};

    if (startDate && endDate) {
      const start = new Date(startDate);

      const end = new Date(endDate);

      query.createdAt = { $gte: start, $lte: end };
    }

    const orders = await Order.find(query).lean();
    const totalValue = orders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );
    const orderCount = orders.length;

    return NextResponse.json({ totalValue, orderCount, orders });
  } catch (error: any) {
    console.error("Dashboard API Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
