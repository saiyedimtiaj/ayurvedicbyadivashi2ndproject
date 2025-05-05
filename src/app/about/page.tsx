import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "About Us | AyurvedicbyAdivashi",
    description:
      "আমাদের সম্পর্কে জানুন - AyurvedicbyAdivashi একটি বিশ্বস্ত আয়ুর্বেদিক ব্র্যান্ড।",
    openGraph: {
      title: "About Us | AyurvedicbyAdivashi",
      description:
        "আমাদের সম্পর্কে জানুন - AyurvedicbyAdivashi একটি বিশ্বস্ত আয়ুর্বেদিক ব্র্যান্ড।",
      url: "https://www.ayurvedicbyadivashi.com", // ✅ হোমপেজ URL ফিক্সড
      images: [
        {
          url: "https://www.ayurvedicbyadivashi.com/opengraph-image.png",
          width: 1200,
          height: 1200,
          alt: "AyurvedicbyAdivashi",
        },
      ],
    },
    alternates: {
      canonical: "https://www.ayurvedicbyadivashi.com",
    },
  };
};

const page = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-113px)]">
        <div className="border-b py-5">
          <div className="container mx-auto px-2 md:px-4 flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/">Home</Link>
              <Link href="/terms-and-condition">রিটার্ন পলিসি</Link>
              <Link href="/privacy-policy">রিফান্ড পলিসি</Link>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-10 container mx-auto px-2">
          <h3 className="font-semibold text-3xl">
            আয়ুর্বেদিক বাই আদিবাসী সম্পর্কে
          </h3>
          <p className="mt-2 text-gray-500 font-semibold">
            প্রকৃতিকে ভালোবাসুন, প্রকৃতির সাথে বাঁচুন ।
          </p>
          <p className="mt-6">
            ‘’ আয়ুর্বেদিক বাই আদিবাসী ’’ দেশের অন্যতম একটি নির্ভরযোগ্য
            প্রতিষ্ঠান, যা প্রাচীন আদিবাসী রীতি অনুসরণ করে সম্পূর্ণ প্রাকৃতিক ও
            বিশুদ্ধ উপাদান দিয়ে তৈরি আয়ুর্বেদিক পণ্য গ্রাহকের হাতে পৌঁছে
            দেওয়া । আমাদের মূল লক্ষ্য হলো শতভাগ প্রাকৃতিক ও নিরাপদ পণ্য সরবরাহ
            করা, যা শরীর ও মনের সুস্থতা নিশ্চিত করবে ।
            <br />
            <br />
            আমরা বিশ্বাস করি প্রকৃতির মাঝে সুস্থতার রহস্য লুকিয়ে আছে। তাই,
            আমাদের প্রতিটি পণ্য নির্ভরযোগ্য উৎস থেকে সংগ্রহ করা হয় এবং কোনও
            ক্ষতিকারক রাসায়নিক উপাদান ছাড়া সম্পূর্ণ প্রাকৃতিক উপায়ে প্রস্তুত
            করা হয়। নিরাপদ ও কার্যকর আয়ুর্বেদিক সমাধান নিশ্চিত করাই আমাদের
            লক্ষ্য।
          </p>
        </div>
        <div className="mt-5 container mb-8 mx-auto px-2">
          <h3 className="font-semibold text-3xl">
            About Ayurvedic by Adivashi
          </h3>
          <p className="mt-2 text-gray-500 font-semibold">
            Love nature, live with nature.
          </p>
          <p className="mt-6">
            &quot;Ayurvedic by Adivashi&quot; is one of the most trusted
            organizations in the country, delivering Ayurvedic products made
            entirely from natural and pure ingredients, following ancient tribal
            traditions. Our main goal is to provide 100% natural and safe
            products that ensure the well-being of both body and mind.
            <br />
            <br />
            We believe the secret to wellness lies within nature. Therefore, all
            of our products are sourced from reliable origins and prepared in
            completely natural ways without any harmful chemicals. Ensuring safe
            and effective Ayurvedic solutions is our mission.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
