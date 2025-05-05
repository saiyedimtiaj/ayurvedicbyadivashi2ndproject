"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const ActionButton = () => {
  return (
    <div className="flex mt-3 md:mt-10 mb-2 md:mb-8 flex-col items-center gap-4">
      <Link href="#products">
        <motion.div
          className="p-0.5 border-[1.3px] cursor-pointer border-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.6),0_-4px_8px_rgba(0,0,0,0.2)]"
          animate={{ scale: [1, 1.1, 1] }} // Scale up and down
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} // Smooth loop
        >
          <p className="p-0.5 border-green-700 border-[3px] rounded-full">
            <span className="flex items-center gap-2 px-5 py-2.5 text-white text-base md:text-xl font-bold bg-green-700 rounded-full border-2 border-white shadow-md">
              <ShoppingBag size={22} /> এখনই অর্ডার করুন
            </span>
          </p>
        </motion.div>
      </Link>
    </div>
  );
};

export default ActionButton;
