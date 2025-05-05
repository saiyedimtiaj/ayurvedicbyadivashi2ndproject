"use client";
import { useRef } from "react";
import { TFormData, TProduct } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import "animate.css";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const Products = ({
  products,
  setFormData,
}: {
  products: TProduct[];
  setFormData: Dispatch<SetStateAction<TFormData>>;
}) => {
  const route = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const handleProductSelect = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setFormData((prev) => ({
        ...prev,
        selectedProducts: [{ ...product, quantity: 1 }],
      }));
    }
    route.push("#order-form");
  };

  return (
    <section id="products" className="pb-5 md:pb-12 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-4 md:mb-16 `}>
          <h2 className="text-2xl md:text-4xl font-bold text-green-700 mb-2">
            আমাদের আদিবাসী পণ্যসমূহ :
          </h2>
        </div>

        <section
          ref={sectionRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3
              `}
        >
          {products.slice(0, 1).map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden prod-card h-full flex flex-col`}
            >
              <div className="h-64 overflow-hidden relative">
                <Image
                  width={300}
                  height={400}
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full transition-transform duration-500 hover:scale-110"
                />
                {product.isFreeDelibery && (
                  <span className="text-base absolute top-2 right-2 text-white font-medium bg-orange-600 px-2.5 py-0.5 rounded-full">
                    ফ্রি ডেলিভারি
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col justify-between md:flex-grow">
                <div>
                  <span className="px-2.5 py-0.5 bg-orange-600 text-white text-base font-medium rounded-full">
                    {product.tag}
                  </span>
                  <h3 className="text-lg mt-2 font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#016531]">
                    <span className="text-xl text-black font-extrabold mr-1">
                      ৳
                    </span>
                    <span className="line-through text-black">
                      {product.price}
                    </span>
                    <br />
                    <span className="text-base">অফার মূল্য 🎁</span>
                    <p>
                      <span className="text-xl text-black font-extrabold">
                        ৳
                      </span>
                      <span className="text-green-700">
                        {product.offerPrice}
                      </span>
                    </p>
                  </span>

                  <motion.button
                    onClick={() => handleProductSelect(product.id)}
                    className="px-4 py-2 bg-[#008037] mr-2 cursor-pointer text-lg text-white rounded-lg relative transition-all font-medium duration-300 flex items-center mt-auto"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/50 to-transparent opacity-0"
                      animate={{
                        opacity: [0, 1, 0],
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                    />
                    <ShoppingCart size={16} className="mr-2" />
                    অর্ডার দিন
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
          {/* 2nd product ৪০০ মিলি আয়ুর্বেদিক হেয়ার অয়েল ও ২০০ গ্রাম আয়ুর্বেদিক হেয়ার স্পা প‍্যাক। */}
          <div
            className={`bg-white block rounded-xl shadow-md overflow-hidden prod-card 
              `}
          >
            <div className="h-64 overflow-hidden relative">
              <Image
                width={300}
                height={300}
                src={products[1].image}
                alt={products[1].name}
                className="w-full h-full transition-transform duration-500 hover:scale-110"
              />
              {products[1].isFreeDelibery && (
                <span className="text-base absolute top-2 right-2 text-white font-medium bg-orange-600 px-2.5 py-0.5 rounded-full">
                  ফ্রি ডেলিভারি
                </span>
              )}
            </div>
            <div className="p-4">
              <span className="px-2.5 py-0.5 bg-orange-600 text-white text-base font-medium rounded-full">
                {products[1].tag}
              </span>
              <h3 className="text-lg mt-2 font-bold text-gray-900 mb-2">
                ৪০০ মিলি আদিবাসী হেয়ার অয়েল ও
                <span className="text-[15px] ml-1">
                  <span className="text-[17px]"> ২০০ গ্রাম </span> আদিবাসী হেয়ার
                  স্পা প‍্যাক।
                </span>
              </h3>
              <div className="flex justify-between items-center mt-9">
                <span className="text-xl font-bold text-[#016531]">
                  <span className="text-xl text-black font-extrabold mr-1">
                    ৳
                  </span>
                  <span className="line-through text-black">
                    {products[1].price}
                  </span>
                  <br />
                  <span className="text-base">অফার মূল্য 🎁</span>
                  <p>
                    <span className="text-xl text-black font-extrabold">৳</span>
                    <span className="text-green-700">
                      {products[1].offerPrice}
                    </span>
                  </p>
                </span>
                <motion.button
                  onClick={() => handleProductSelect(products[1].id)}
                  className="px-4 relative py-2 bg-[#008037] mr-2 cursor-pointer text-lg text-white rounded-lg transition-all font-medium duration-300 flex items-center mt-auto"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/50 to-transparent opacity-0"
                    animate={{
                      opacity: [0, 1, 0],
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                  />
                  <ShoppingCart size={16} className="mr-2" />
                  অর্ডার দিন
                </motion.button>
              </div>
            </div>
          </div>
          {/* 3rd product ২০০ মিলি আদিবাসী  হেয়ার অয়েল ও ১৫০ মিলি আয়ুর্বেদিক রিলিফ অয়েলের সাথে ২০০ গ্রাম আয়ুর্বেদিক হেয়ার স্পা প‍্যাক ফ্রি। */}
          <div
            className={`bg-white block rounded-xl shadow-md overflow-hidden prod-card 
              `}
          >
            <div className="h-64 overflow-hidden relative">
              <Image
                width={300}
                height={300}
                src={products[2].image}
                alt={products[2].name}
                className="w-full h-full transition-transform duration-500 hover:scale-110"
              />
              {products[2].isFreeDelibery && (
                <span className="text-base absolute top-2 right-2 text-white font-medium bg-orange-600 px-2.5 py-0.5 rounded-full">
                  ফ্রি ডেলিভারি
                </span>
              )}
            </div>
            <div className="p-4">
              <span className="px-2.5 py-0.5 bg-orange-600 text-white text-base font-medium rounded-full">
                {products[2].tag}
              </span>
              <h3 className="text-lg mt-2 font-bold text-gray-900 mb-2">
                ২০০ মিলি আদিবাসী হেয়ার অয়েল ও
                <span className="text-[15px] ml-1">
                  <span className="text-[17px]"> ১৫০ মিলি</span> আয়ুর্বেদিক
                  রিলিফ অয়েলের সাথে
                </span>{" "}
                <span className="text-[15px] ml-1">
                  <span className="text-[17px]"> ২০০ গ্রাম </span>
                  আদিবাসী হেয়ার স্পা প‍্যাক ফ্রি।
                </span>
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#016531]">
                  <span className="text-xl text-black font-extrabold mr-1">
                    ৳
                  </span>
                  <span className="line-through text-black">
                    {products[2].price}
                  </span>
                  <br />
                  <span className="text-base">অফার মূল্য 🎁</span>
                  <p>
                    <span className="text-xl text-black font-extrabold">৳</span>
                    <span className="text-green-700">
                      {" "}
                      {products[2].offerPrice}
                    </span>
                  </p>
                </span>
                <motion.button
                  onClick={() => handleProductSelect(products[2].id)}
                  className="px-4 relative py-2 bg-[#008037] mr-2 cursor-pointer text-lg text-white rounded-lg transition-all font-medium duration-300 flex items-center mt-auto"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/50 to-transparent opacity-0"
                    animate={{
                      opacity: [0, 1, 0],
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                  />
                  <ShoppingCart size={16} className="mr-2" />
                  অর্ডার দিন
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Products;
