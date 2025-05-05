import Footer from "@/components/Footer";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
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
      <div className="mt-5 min-h-screen container mx-auto px-2">
        <div>
          <h3 className="font-semibold">Address</h3>
          <p className="mt-3">
            গরীবুল্লাহ শাহ হা/ সো, খুলশী , চট্টগ্রাম, বাংলাদেশ
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Information</h3>
          <p className="mt-3">কল করুন: 01615117126 (২৪ ঘন্টা খোলা)</p>
          <p>
            প্রবাস থেকে পরিবারের কাছে উপহার পাঠাতে যোগাযোগ করুন
            (WhatsApp)+8801615117126
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
