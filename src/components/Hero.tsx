"use client";
import "animate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import logo from "../assets/ADIVASHI-LOGOiu-01.png";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";
import banner6 from "../assets/banner6.jpg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 150,
    });
  }, []);

  return (
    <>
      <div data-aos="fade-down">
        <div className="bg-green-600 px-4 text-center font-semibold md:font-semibold text-sm md:text-lg text-white md:py-3 py-1">
          ইন্ডিয়ান আদিবাসী ফর্মুলার সাথে শ্রীলঙ্কান নারিকেল তেলের মিশ্রণ।
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-14">
        <Image
          src={logo}
          alt="logo"
          className="md:-mt-8 md:-mb-7 -mt-6 -mb-6 w-24 md:w-36 mx-auto"
          width={300}
          height={300}
        />

        {/* Custom Navigation Buttons */}
        <div className="animate__swing animate__animated">
          <div className="absolute z-10 top-1/2 -left-2 md:left-10 transform -translate-y-1/2">
            <button className="custom-prev cursor-pointer text-gray-500 text-3xl md:text-5xl px-3 py-2 rounded-r">
              ❮
            </button>
          </div>
          <div className="absolute z-10 top-1/2 -right-2 md:right-10 transform -translate-y-1/2">
            <button className="custom-next cursor-pointer text-3xl md:text-5xl  text-gray-500 px-3 py-2 rounded-l">
              ❯
            </button>
          </div>
          <Link href="#order-form">
            <Swiper
              centeredSlides={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {[banner1, banner2, banner3, banner4, banner5, banner6].map(
                (banner, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={banner}
                      alt={`banner-${index + 1}`}
                      className="w-full h-auto object-cover"
                      width={1500}
                      height={800}
                      layout="responsive"
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </Link>
        </div>
      </div>
    </>
  );
}
