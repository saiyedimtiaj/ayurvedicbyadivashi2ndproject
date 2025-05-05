import mongoose, { Schema } from "mongoose";

export interface IProduct {
  name: string;
  quantity: number;
  price: number;
  isFreeDelivery: boolean;
}

export interface IOrder {
  _id: string;
  name: string;
  mobile: string;
  address: string;
  products: IProduct[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: Date;
  status: string;
  consignment_id?: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  isFreeDelivery: { type: Boolean, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    status: { type: String, default: "Pending" },
    products: { type: [ProductSchema], required: true },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    consignment_id: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
