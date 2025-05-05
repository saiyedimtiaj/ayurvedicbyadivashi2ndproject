import Footer from "@/components/Footer";
import Link from "next/link";
import ToggleMemu from "@/components/SocialIcons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "রিটার্ন পলিসি - AyurvedicbyAdivashi",
  robots: {
    index: true,
    follow: true,
  },
};
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
      <div className="mt-5 container mx-auto px-2 mb-10">
        <h1 className="text-3xl font-semibold">রিটার্ন পলিসি</h1>
        <ul className="list-disc list-inside pl-5 space-y-2 mt-4">
          <li>
            ডেলিভারির সময় পণ্য যদি ক্ষতিগ্রস্ত, ত্রুটিপূর্ণ, ভুল বা অসম্পূর্ণ
            হয়, তাহলে রিটার্ন বা রিফান্ডের জন্য আমাদের কাস্টমার সার্ভিসের সাথে
            যোগাযোগ করুন।
          </li>
          <li>
            ত্রুটিপূর্ণ পণ‍্য গ্রহনের ৭ দিনের মধ্যেই পণ‍্য রিটার্ন করে ব্যাংক
            পেমেন্ট, বিকাশ অথবা ভাউচার এর মাধ্যমে বুঝে নিন রিফান্ড। রির্টান
            পলিসি সম্পর্কে আরও তথ্যের জন্য, দয়া করে আমাদের পণ‍্য ফেরত নীতিমালা
            দেখুন।
          </li>
          <li>
            নির্বাচিত পণ্যে আপনার সিদ্ধান্ত পরিবর্তন , কে অগ্রাধিকার দেয়া হয়।
            বিস্তারিত তথ্যের জন্য অনুগ্রহ করে রিটার্ন পলিসির নিচের অংশ দেখুন।
          </li>
        </ul>
        <p className="mt-4 font-semibold">পণ্য ফেরত দেওয়ার বৈধ কারণ</p>
        <ul className="list-disc list-inside pl-5 space-y-2 mt-4">
          <li>পণ্য ক্ষতিগ্রস্ত হলে। (ফাটা/ ভাঙা)/ত্রুটিপূর্ণ )</li>
          <li>
            ডেলিভারি করা পণ্য অসম্পূর্ণ থাকলে । (যদি কোন পণ‍্য পরিমানে কম থাকে)
          </li>
          <li>
            ডেলিভারি করা পণ্যটি ভুল হলে। (ভুল পণ্য/আকার/রঙ, অথবা মেয়াদ
            উত্তীর্ণ)
          </li>
          <li>
            ডেলিভারি করা পণ্যটি যদি পণ্যের বিবরণ বা ছবির সাথে না মেলে।
            (বিজ্ঞাপনের সাথে পণ্যের মিল না থাকলে।)
          </li>
        </ul>
      </div>
      <div className="mt-5 container mx-auto px-2 mb-10">
        <h1 className="text-3xl font-semibold">Return Policy</h1>
        <ul className="list-disc list-inside pl-5 space-y-2 mt-4">
          <li>
            If the product is damaged, defective, incorrect, or incomplete at
            the time of delivery, please contact our customer service for a
            return or refund.
          </li>
          <li>
            Return the defective product within 7 days of receiving it and get
            your refund through bank payment, bKash, or voucher. For more
            information about our return policy, please refer to our product
            return policy.
          </li>
          <li>
            Change of mind on selected products is given priority. For more
            details, please refer to the lower section of the return policy.
          </li>
        </ul>

        <p className="mt-4 font-semibold">Valid Reasons for Product Return</p>
        <ul className="list-disc list-inside pl-5 space-y-2 mt-4">
          <li>Product is damaged (torn/broken/defective).</li>
          <li>
            Delivered product is incomplete (if any product quantity is
            missing).
          </li>
          <li>
            Delivered product is incorrect (wrong product/size/color, or
            expired).
          </li>
          <li>
            Delivered product does not match the description or image (if the
            product does not match the advertisement).
          </li>
        </ul>
      </div>

      <ToggleMemu />
      <Footer />
    </div>
  );
};

export default page;
