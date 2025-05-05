"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../assets/REVIEW POST iu-04.jpg.png";
import img2 from "../assets/REVIEW POST iu-05.jpg.png";
import img3 from "../assets/REVIEW POST iu-01.jpg.png";
import img4 from "../assets/REVIEW POST iu-06.png";
import img5 from "../assets/REVIEW POST iu-02.jpg.png";
import img6 from "../assets/REVIEW POST iu-03.jpg.png";
import "aos/dist/aos.css";
import leepImg from "../assets/vecteezy_green-leaf-transparent-background_15100115.png";

const Review = () => {
  const images = [img1, img2, img3, img4, img5, img6];
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = useCallback(() => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3500); // Auto-change every 2.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [nextImage, selectedImage]); // Re-run interval on image change to reset timer

  return (
    <div className="container mx-auto px-2 md:px-4 mb-5 md:mb-10 text-center overflow-hidden ">
      <div className="py-0 md:py-3 px-3 max-w-[260px] md:max-w-[400px] text-green-700 mx-auto  border-2 border-green-700 rounded-2xl font-bold mb-5 md:mb-10 relative">
        <h1 className="text-2xl md:text-4xl">Customer Reviews</h1>
        <Image
          width={100}
          height={100}
          src={leepImg}
          alt="decorative leaf"
          className="md:w-12 h-4 w-4 opacity-70 md:h-12 absolute left-0 -bottom-0 rotate-[12deg] -z-20"
        />
        <Image
          width={100}
          height={100}
          src={leepImg}
          alt="decorative leaf"
          className="md:w-12 h-4 w-4 opacity-70 md:h-12 absolute right-0 top-0 -rotate-[170deg] -z-20"
        />
      </div>
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        <button
          className="absolute z-30 cursor-pointer left-2 md:left-5 text-black  p-2 rounded-full "
          onClick={prevImage}
        >
          <ChevronLeft size={24} />
        </button>
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full overflow-hidden"
        >
          <Image
            src={images[selectedImage]}
            alt="review"
            width={800}
            height={800}
            className="w-full h-full px-3 object-cover"
          />
        </motion.div>
        <button
          className="absolute right-2 z-30 cursor-pointer md:right-5 text-black p-2 rounded-full"
          onClick={nextImage}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="flex items-center gap-2 md:gap-3 mt-5 justify-center">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={img}
              alt={`thumbnail-${idx}`}
              width={40}
              height={40}
              onClick={() => setSelectedImage(idx)}
              className={`w-14 h-14 cursor-pointer border-2 rounded-md object-cover transition-all ${
                selectedImage === idx ? "border-black" : "border-gray-300"
              }`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Review;
