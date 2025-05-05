"use client";
import ReactPixel from "react-facebook-pixel";

export const purchaseEvent = (data: unknown) => {
  ReactPixel.track("Purchase", data);
};
