"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { TOrder } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

type ChangeStatusModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectOrderDetails: TOrder;
};

export default function OrderDetailsModal({
  isOpen,
  setIsOpen,
  selectOrderDetails,
}: ChangeStatusModalProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders_Single", selectOrderDetails.consignment_id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/orders/${selectOrderDetails.consignment_id}`
      );
      return data;
    },
    enabled: !!selectOrderDetails.consignment_id,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[240px] pr-4">
          <div className="space-y-4 p-2">
            {isLoading ? (
              // Loading Skeletons
              <>
                <div>
                  <p className="font-medium">Consignment Id</p>
                  <Skeleton className="h-5 w-40 mt-1" />
                </div>
                <div>
                  <p className="font-medium">Order Status</p>
                  <Skeleton className="h-5 w-40 mt-1" />
                </div>
              </>
            ) : error ? (
              // Error Message
              <div className="text-red-500 text-sm">
                Failed to fetch order details. Please try again.
              </div>
            ) : (
              // Loaded Data
              <>
                <div>
                  <p className="font-medium">Consignment Id</p>
                  <p className="text-gray-500">
                    {data?.data?.data?.consignment_id || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Order Status</p>
                  <p className="text-gray-500">
                    {data?.data?.data?.order_status || "Unknown"}
                  </p>
                </div>
              </>
            )}
            <div>
              <p className="font-medium">Recipient Name</p>
              <p className="text-gray-500">{selectOrderDetails.name}</p>
            </div>
            <div>
              <p className="font-medium">Recipient Phone</p>
              <p className="text-gray-500">{selectOrderDetails.mobile}</p>
            </div>
            <div>
              <p className="font-medium">Recipient Address</p>
              <p className="text-gray-500">{selectOrderDetails.address}</p>
            </div>
            <div>
              <p className="font-medium">Amount to Collect</p>
              <p className="text-gray-500">
                <span className="text-lg font-extrabold">৳</span>
                {selectOrderDetails.total}
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
            variant="destructive"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
