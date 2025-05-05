import Link from "next/link";
import React from "react";
import { FaLink } from "react-icons/fa6";

const Footer = () => {
  const date = new Date();
  return (
    <div className="py-6 border-t bg-green-700 text-white">
      <div className="container mx-auto px-2 flex flex-col md:flex-row gap-y-5 items-center justify-between">
        <div className="md:flex-1">
          <Link href="/about">About Us</Link>
        </div>
        <div className="mr-auto hidden md:block">
          <p>আয়ুর্বেদিক বাই আদিবাসীর পণ‍্য</p>
        </div>
        <div className="flex md:flex-1 justify-end text-sm md:text-base items-center gap-4">
          <div className="flex items-center gap-1">
            <FaLink size={20} />
            <Link className="text-base" href={"/terms-and-condition"}>
              রিটার্ন পলিসি
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <FaLink size={20} />
            <Link href="/privacy-policy">রিফান্ড পলিসি</Link>
          </div>
          <Link href="/contact" className="hidden md:block">
            Contact{" "}
          </Link>
        </div>
        <Link href="/contact" className="lg:hidden block">
          Contact
        </Link>
      </div>
      <div className="mr-auto md:hidden block text-center mt-4 md:text-base text-[13px] mx-auto">
        <p>আয়ুর্বেদিক বাই আদিবাসীর পণ‍্য।</p>
      </div>
      <div className="text-center mt-4 md:text-base text-[13px] mx-auto">
        © আয়ুর্বেদিক বাই আদিবাসী বিডি {date.getFullYear()}।
      </div>
    </div>
  );
};

export default Footer;
