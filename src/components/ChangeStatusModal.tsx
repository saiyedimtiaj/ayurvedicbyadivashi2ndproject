"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { IOrder } from "@/types";

// Order details type
type TOrderDetails = {
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  amount_to_collect: number;
  orderDetails: IOrder;
};

type ChangeStatusModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  orderDetails?: IOrder;
  setOrderDetails: Dispatch<React.SetStateAction<IOrder | undefined>>;
};

export default function ChangeStatusModal({
  isOpen,
  setIsOpen,
  refetch,
  orderDetails,
  setOrderDetails,
}: ChangeStatusModalProps) {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState(
    `This is an Ayurvedic item, price - `
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      payload: TOrderDetails & {
        custom_address: string;
        description: string;
      }
    ) => axios.post(`/api/place-order`, payload),
  });

  useEffect(() => {
    if (isOpen) setAddress("");
  }, [isOpen]);

  const onConfirm = () => {
    if (!address.trim()) {
      toast.error("Address is required");
      return;
    }

    mutate(
      {
        orderDetails: orderDetails as IOrder,
        custom_address: address,
        description,
        recipient_name: orderDetails?.name as string,
        recipient_phone: orderDetails?.mobile as string,
        recipient_address: address,
        amount_to_collect: orderDetails?.total as number,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          refetch();
          toast.success("Order placed successfully!");
          setIsOpen(false);
        },
        onError: (error) => {
          toast.error("Failed to place order. Please try again.");
          console.error("Error placing order:", error);
        },
      }
    );
  };

  const handleQuantityChange = (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    if (!orderDetails) return;

    // Clone the products array to avoid direct state mutation
    const updatedProducts = orderDetails.products
      .map((product) => {
        if (product.name === productId) {
          const updatedQuantity =
            action === "increase" ? product.quantity + 1 : product.quantity - 1;

          // Ensure the quantity stays between 1 and 5
          if (updatedQuantity >= 1 && updatedQuantity <= 5) {
            return { ...product, quantity: updatedQuantity };
          }

          // If quantity is 0 after decrease, remove the product
          if (updatedQuantity === 0) {
            return null;
          }
        }
        return product;
      })
      .filter((product) => product !== null) as typeof orderDetails.products;

    // Check if any product has free delivery
    const isFreeDelivery = updatedProducts.some((prod) => prod.isFreeDelivery);

    // Set shipping to 80 if no product has free delivery
    const newShipping = isFreeDelivery ? 0 : 80;

    // Recalculate subtotal and total
    const newSubtotal = updatedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    const newTotal = newSubtotal + newShipping;

    // Update the state
    setOrderDetails((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        products: updatedProducts,
        shipping: newShipping, // Ensure shipping gets updated
        subtotal: newSubtotal,
        total: newTotal,
      };
    });
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!orderDetails) return;

    const shippingCost = Number(e.target.value);

    const subtotal = orderDetails.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    setOrderDetails((prev) =>
      prev
        ? {
            ...prev,
            shipping: shippingCost,
            total: subtotal + shippingCost,
          }
        : prev
    );
  };

  const isFreeDelibery = orderDetails?.products?.some(
    (prod) => prod.isFreeDelivery
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Place Order with Pathao</DialogTitle>
          <DialogDescription>
            Provide recipient details, address, and payment information to
            initiate the delivery request.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[250px] pr-4">
          <div className="space-y-4 p-2">
            <div>
              <p className="font-medium">Recipient Name</p>
              <p className="text-gray-500">{orderDetails?.name}</p>
            </div>
            <div>
              <p className="font-medium">Recipient Phone</p>
              <p className="text-gray-500">{orderDetails?.mobile}</p>
            </div>
            <div>
              <p className="font-medium">Recipient Address</p>
              <p className="text-gray-500">{orderDetails?.address}</p>
            </div>
            <div>
              <p className="font-medium">Amount to Collect</p>
              <p className="text-gray-500">৳{orderDetails?.total}</p>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-2 gap-2">
              {orderDetails?.products.map((prod) => (
                <div
                  className="border border-gray-300 rounded-md p-2.5"
                  key={prod.name}
                >
                  <h3 className="text-sm font-semibold">{prod.name}</h3>
                  <p>Price: {prod.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      type="button"
                      disabled={
                        orderDetails.products.length === 1 &&
                        prod.quantity === 1
                      }
                      onClick={() =>
                        handleQuantityChange(prod.name, "decrease")
                      }
                      className="px-2 py-1 bg-gray-200 rounded-md cursor-pointer disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="mx-4">{prod.quantity}</span>
                    <button
                      type="button"
                      disabled={prod.quantity === 5}
                      onClick={() =>
                        handleQuantityChange(prod.name, "increase")
                      }
                      className="px-2 py-1 bg-gray-200 rounded-md cursor-pointer disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {!isFreeDelibery && (
                <div>
                  <h1 className="text-lg font-medium">Shipping</h1>
                  <div className="flex flex-col mt-3">
                    <label className="flex gap-1.5 items-center space-x-1">
                      <input
                        type="radio"
                        name="shipping"
                        value="80"
                        onChange={handleShippingChange}
                        checked={orderDetails?.shipping === 80} // Fix: Removed `!isFreeDelibery`
                        className="ml-3 scale-125 cursor-pointer"
                      />
                      <span>চট্টগ্রাম ভিতরে</span>
                    </label>

                    <div className="flex items-center gap-1.5 mt-3 mr-2">
                      <input
                        type="radio"
                        name="shipping"
                        value="130"
                        className="ml-3 scale-125 cursor-pointer"
                        checked={orderDetails?.shipping === 130}
                        onChange={handleShippingChange}
                      />
                      <span>চট্টগ্রাম বাইরে</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <p className="font-medium">Custom Address *</p>
              <Input
                placeholder="Enter delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <p className="font-medium">Description</p>
              <Textarea
                value={`${description} ${orderDetails?.total}`}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end mt-4">
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Placing Order..." : "Confirm Order"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
