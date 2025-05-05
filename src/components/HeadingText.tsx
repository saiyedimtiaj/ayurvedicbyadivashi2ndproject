import leepImg from "../assets/vecteezy_green-leaf-transparent-background_15100115.png";
import Image from "next/image";
import "aos/dist/aos.css";

const HeadingText = () => {
  return (
    <div className="font-bold relative text-center mx-2 md:mx-auto px-3 md:px-5 border-green-600 border-2 pt-1 md:py-7 max-w-[900px] rounded-2xl mt-5 md:mt-14">
      <h1 className="text-[18px]  md:text-4xl ">
        চুলের যত্নে প্রাচীন আদিবাসী ফর্মুলার বিশ্বস্ত সমাধান, আজও কার্যকর।
      </h1>
      <Image
        width={100}
        height={100}
        src={leepImg}
        alt="hgfnm"
        className="md:w-16 h-7 w-7 opacity-70 md:opacity-100 md:h-16 absolute left-0 -bottom-0 rotate-[12deg] -z-20"
      />
      <Image
        width={100}
        height={100}
        src={leepImg}
        alt="hgfnm"
        className="md:w-16 h-6 w-6 opacity-70 md:opacity-100 md:h-16 absolute right-0 top-0 -rotate-[170deg] -z-20"
      />
    </div>
  );
};

export default HeadingText;
