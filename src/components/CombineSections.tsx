"use client";
import { useState } from "react";
import prod3 from "../assets/iu03.jpg";
import prod4 from "../assets/iu04.jpg";
import prod5 from "../assets/iu05.jpg";
import { TFormData } from "@/types";
import Products from "./Products";
import Review from "./Review";
import OrderForm from "./OrderForm";

const products = [
  {
    id: 4,
    name: "২০০ মিলি আদিবাসী  হেয়ার অয়েল ও ১০০ গ্রাম আদিবাসী  হেয়ার স্পা প‍্যাক।",
    price: 1650,
    image: prod3,
    isFreeDelibery: false,
    offerPrice: 890,
    tag: "হাফ কোর্স ",
  },
  {
    id: 3,
    name: "৪০০ মিলি  আদিবাসী  হেয়ার অয়েল ও ২০০ গ্রাম আদিবাসী  হেয়ার স্পা প‍্যাক।",
    price: 3260,
    image: prod4,
    isFreeDelibery: true,
    isHotSales: "SUPER Combo",
    offerPrice: 1599,
    tag: "ফুল কোর্স",
  },
  {
    id: 6,
    name: "২০০ মিলি আদিবাসী  হেয়ার অয়েল ও ১৫০ মিলি আয়ুর্বেদিক   রিলিফ অয়েলের সাথে ২০০ মিলি গ্রাম আদিবাসী  হেয়ার স্পা প‍্যাক ফ্রি।",
    price: 2875,
    image: prod5,
    isFreeDelibery: true,
    isHotSales: "FAMILY Combo",
    offerPrice: 1649,
    tag: "সুপার কোর্স",
  },
];

const CombineSections = () => {
  const [formData, setFormData] = useState<TFormData>({
    name: "",
    mobile: "",
    address: "",
    selectedProducts: [],
  });
  return (
    <>
      <Products products={products} setFormData={setFormData} />
      <Review />
      <div className="border-2 mx-2 mt-5 md:mt-10 border-green-700 px-3 mb-9 md:px-8 rounded-2xl">
        <OrderForm
          products={products}
          setFormData={setFormData}
          formData={formData}
        />
        <h3 className="text-2xl md:text-3xl text-center font-semibold text-green-700 mb-8">
          সরাসরি অর্ডার করতে অথবা ফ্রি কনসাল্টেশন পেতে কল করুনঃ 01615117126
        </h3>
      </div>
    </>
  );
};

export default CombineSections;
