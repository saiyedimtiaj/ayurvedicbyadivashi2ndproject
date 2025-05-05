/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TFormData {
  name: string;
  mobile: string;
  address: string;
  selectedProducts: {
    id: number;
    name: string;
    price: number;
    image: string | File | unknown;
    isFreeDelibery: boolean;
    tag?: string;
    offerPrice: number;
    isHotSales?: string;
    quantity: number;
  }[];
}

export interface TProduct {
  id: number;
  name: string;
  price: number;
  image: string | any;
  isFreeDelibery: boolean;
  isHotSales?: string;
  offerPrice: number;
  tag?: string;
  quantity?: number;
}

export interface TOrder {
  _id: string;
  name: string;
  mobile: string;
  address: string;
  products: { name: string; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: Date;
  status: string;
  consignment_id?: string;
}

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
