"use client";
import { TFormData, TProduct } from "@/types";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import OrderDetails from "./OrderDetails";
import { purchaseEvent } from "@/services/MetaPixel";

const FormOrder = ({
  setFormErrors,
  setOrderSuccess,
  orderSuccess,
  formData,
  setFormData,
  products,
}: {
  setFormErrors: Dispatch<SetStateAction<string[]>>;
  setOrderSuccess: Dispatch<SetStateAction<boolean>>;
  formData: TFormData;
  setFormData: Dispatch<SetStateAction<TFormData>>;
  orderSuccess: boolean;
  products: TProduct[];
}) => {
  const [shipping, setShipping] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const subtotal = formData.selectedProducts.reduce(
    (acc, product) => acc + product.offerPrice * product.quantity,
    0
  );

  const total = subtotal + parseInt(shipping);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  useEffect(() => {
    const hasFreeDelivery = formData.selectedProducts.some(
      (product) => product.isFreeDelibery === true
    ); // Get the first selected product
    if (hasFreeDelivery) {
      setShipping("0");
    } else {
      setShipping("80");
    }
  }, [formData.selectedProducts]);

  const handleProductSelect = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setFormData((prev) => {
      const isProductSelected = prev.selectedProducts.some(
        (p) => p.id === productId
      );

      if (isProductSelected) {
        // Allow deselecting a product
        return {
          ...prev,
          selectedProducts: prev.selectedProducts.filter(
            (p) => p.id !== productId
          ),
        };
      } else {
        // Limit selection to 2 products
        if (prev.selectedProducts.length >= 2) {
          toast.warning("You can only select up to 2 products.");
          return prev;
        }

        return {
          ...prev,
          selectedProducts: [
            ...prev.selectedProducts,
            { ...product, quantity: 1 },
          ],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors([]);
    if (formData.selectedProducts.length === 0) {
      toast.error("Please select a product!");
      return;
    }

    const errors: string[] = [];

    if (!formData.name.trim()) errors.push("Name");
    if (!formData.mobile.trim()) errors.push("Mobile Number");
    if (!formData.address.trim()) errors.push("Address");

    if (errors.length > 0) {
      setFormErrors(errors);
      document
        .getElementById("order-form")
        ?.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        products: formData.selectedProducts.map((prod) => ({
          name: prod.name,
          quantity: prod.quantity,
          price: prod.offerPrice,
          isFreeDelivery: prod.isFreeDelibery,
        })), // Send selected products
        subtotal,
        shipping,
        total,
        status: "Pending",
      };
      purchaseEvent(orderData); // Corrected function call
      const { data } = await axios.post("/api/orders", orderData);

      if (data.success) {
        setOrderSuccess(true);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="order-form" onSubmit={handleSubmit} className="mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Customer Information */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-green-700 mb-6">
            Billing details
          </h3>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              আপনার নাম লিখুন *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-semibold mb-2"
            >
              মোবাইল নম্বর
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="আপনার মোবাইল নম্বর লিখুন"
            />
          </div>

          <div className="md:mb-6 mb-2">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2"
            >
              আপনার ঠিকানা লিখুন *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="বাসা নং, রোড নং, থানা, জেলা"
            />
          </div>

          {/* Product Selection */}
          <h3 className="text-[18px] md:text-left text-center font-bold text-green-700 mb-2 md:mb-6">
            পছন্দের প্যাকেজটি সিলেক্ট করে নিচে চলুন:
          </h3>
          <div className="grid grid-cols-1 gap-4 -mb-5 md:mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product.id)}
                className={`relative order-card overflow-hidden flex items-center py-1 px-1 md:py-6 md:px-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.selectedProducts.some((p) => p.id === product.id)
                    ? "border-green-700 shadow-green-600 shadow-sm bg-zinc-200"
                    : "border-zinc-400"
                }`}
              >
                {/* Free Delivery Tag */}
                {product.isHotSales && (
                  <span
                    className={`absolute ${
                      product.isHotSales === "SUPER Combo"
                        ? "bottom-6 -right-7"
                        : product.isHotSales === "FAMILY Combo"
                        ? "bottom-6 -right-7"
                        : "bottom-5 -right-6"
                    } rotate-[-43deg] bg-orange-500 text-white text-xs md:font-bold font-medium px-6 py-1 rounded`}
                  >
                    {product.isHotSales}
                  </span>
                )}

                <Image
                  width={300}
                  height={300}
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="md:flex-1 z-50">
                  <h4 className="font-bold mb-3">{product.name}</h4>
                  {product.isFreeDelibery && (
                    <span className="bg-green-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full ">
                      ফ্রি ডেলিভারি
                    </span>
                  )}
                  <p className="block md:hidden font-bold text-black">
                    <span className="text-sm font-extrabold mr-1">৳</span>
                    {product.offerPrice}/-
                  </p>
                </div>
                <div className="md:block hidden z-50 text-right md:mr-6">
                  <p className="font-bold text-black">
                    <span className="text-sm font-extrabold mr-1">৳</span>
                    {product.offerPrice}/-
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <OrderDetails
          handleShippingChange={handleShippingChange}
          subtotal={subtotal}
          total={total}
          loading={loading}
          orderSuccess={orderSuccess}
          shipping={shipping}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedProducts={formData.selectedProducts}
          setFormData={setFormData}
          formData={formData}
        />
      </div>
    </form>
  );
};

export default FormOrder;
