import React from "react";
import banner from "../assets/Animation - 1741448055994.gif";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col gap-y-8 items-center justify-center px-2">
      <Image
        src={banner}
        alt="404"
        width={500}
        height={500}
        className="w-52 md:w-72"
      />
      <h1 className="text-2xl md:text-3xl font-semibold">
        Not found any content!
      </h1>
      <Link href="/">
        <button className="bg-green-700 text-white px-6 py-2.5 font-medium text-lg rounded-full cursor-pointer">
          Back To Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
