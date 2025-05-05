"use client";
import { useEffect } from "react";

const useFacebookPixel = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-facebook-pixel")
        .then((ReactPixel) => {
          ReactPixel.default.init(
            process.env.NEXT_PUBLIC_PIXEL_ID as string,
            undefined,
            {
              autoConfig: true,
              debug: false,
            }
          );
          ReactPixel.default.pageView();
        })
        .catch((err) => console.error("Facebook Pixel failed to load", err));
    }
  }, []);
};

export default useFacebookPixel;
