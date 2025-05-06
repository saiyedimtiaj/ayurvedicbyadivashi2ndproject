"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCaretDown } from "react-icons/fa";
import overlay1 from "../assets/website asset FINAL-02.png";
import overlay2 from "../assets/website asset FINAL-01.png";
import Image from "next/image";
import "aos/dist/aos.css";

interface AccordionContextProps {
  isActive: boolean;
  index: number;
  onChangeIndex: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextProps | null>(null);
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an <Accordion>");
  }
  return context;
};

interface AccordionProps {
  children: React.ReactNode;
  multiple?: boolean;
  defaultIndex?: number;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  multiple = false,
  defaultIndex = -1,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | number[]>(
    multiple ? [defaultIndex] : defaultIndex
  );

  function onChangeIndex(index: number) {
    setActiveIndex((currentActiveIndex) => {
      if (!multiple) {
        return currentActiveIndex === index ? -1 : index;
      }
      if (
        Array.isArray(currentActiveIndex) &&
        currentActiveIndex.includes(index)
      ) {
        return currentActiveIndex.filter((i) => i !== index);
      }
      return Array.isArray(currentActiveIndex)
        ? [...currentActiveIndex, index]
        : [index];
    });
  }

  return (
    <>
      {React.Children.map(children, (child, index) => {
        const isActive = Array.isArray(activeIndex)
          ? activeIndex.includes(index)
          : activeIndex === index;
        return (
          <AccordionContext.Provider value={{ isActive, index, onChangeIndex }}>
            {child}
          </AccordionContext.Provider>
        );
      })}
    </>
  );
};

interface AccordionItemProps {
  children: React.ReactNode;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ children }) => {
  return (
    <div className="overflow-hidden text-white border-b border-white">
      {children}
    </div>
  );
};

interface AccordionHeaderProps {
  children: React.ReactNode;
}
const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children }) => {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className="cursor-pointer gap-1.5 md:gap-2 py-3 flex items-start px-3 font-semibold text-[14px] md:text-xl transition-colors duration-200 text-white"
      onClick={() => onChangeIndex(index)}
    >
      <motion.span
        animate={{ rotate: isActive ? 180 : 270 }}
        transition={{ duration: 0.3 }}
        className="text-lg"
      >
        <FaCaretDown size={23} />
      </motion.span>
      <span className="">{children}</span>
    </motion.div>
  );
};

interface AccordionPanelProps {
  children: React.ReactNode;
}
const AccordionPanel: React.FC<AccordionPanelProps> = ({ children }) => {
  const { isActive } = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        >
          <div className="p-3 md:p-4 text-xs md:text-base">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Faq = () => {
  return (
    <section className="pb-3 md:pb-8 pt-2">
      <div className="mx-auto bg-[#008036] pt-5 pb-5 relative">
        <Image
          src={overlay1}
          alt="banner"
          width={1000}
          height={400}
          className="w-full h-full absolute bottom-0 z-10 left-0"
        />
        <Image
          src={overlay2}
          alt="banner"
          width={1000}
          height={400}
          className="w-full h-full absolute top-0 z-10 left-0"
        />
        <div className="text-center mb-0">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            সাধারন জিজ্ঞাসা
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-20">
          <Accordion>
            <AccordionItem>
              <AccordionHeader>
                অস্বাভাবিক ভাবে মাথার দুপাশ থেকে চুল পরে মাথা খালি হয়ে যাচ্ছে?
                শ্যাম্পু করলে কি অনেক বেশি হেয়ারফল হয়?
              </AccordionHeader>
              <AccordionPanel>
                এটা হরমোনাল সমস্যা, স্ট্রেস আর স্ক্যাল্প দুর্বলতার কারণে হয়ে
                থাকে। এর প্রাকৃতিক সমাধান হল Indian Adivashi Ayurvedic Hair Oil,
                যা চুল পড়া বন্ধ করে নতুন চুল গজাতে সাহায্য করে। অন‍্যদিকে
                কেমিক্যালযুক্ত শ্যাম্পু চুলের গোড়া দুর্বল করে। তবে Indian
                Adivashi Hair Oil with Srilankan-Coconut mix ব্যবহারে চুলের
                গোড়া মজবুত থাকে এবং শ্যাম্পুর ক্ষতি থেকে চুল সুরক্ষিত থাকে।
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader>
                বেবি হেয়ার গ্রো করছে না? অথবা মাথায় কি অনিয়ন্ত্রিত খুশকি সমস্যায়
                ভুগছেন?
              </AccordionHeader>
              <AccordionPanel>
                বেবি হেয়ার না গজানো এবং খুশকি — দুটোই স্ক্যাল্প দুর্বলতা ও রক্ত
                সঞ্চালনের অভাবে হয়। অতিরিক্ত খুশকি মাথার ত্বক শুষ্ক করে চুলের
                গ্রোথ বন্ধ করে দেয়। এই সমস্যার প্রাকৃতিক সমাধান হল Indian
                Adivashi Hair Oil, যা স্ক্যাল্পকে পুষ্টি দিয়ে খুশকি নিয়ন্ত্রণ
                করে এবং নতুন বেবি হেয়ার গজাতে সাহায্য করে। নিয়মিত ব্যবহারে
                মাথার ত্বক হবে স্বাস্থ্যবান এবং চুল পড়া কমে নতুন চুল গজাবে।
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader>
                আদিবাসী হেয়ার অয়েল কি কি উপাদান দিয়ে তৈরি ?
              </AccordionHeader>
              <AccordionPanel>
                খাটি নারিকেল তেলের সাথে তিলের তৈল,জবা ফুলের নির্যাস, আমলকি,
                মেথি, ব্রাহ্মি, কারিপাতা, শিকাকাই, রিঠা সহ প্রায় ৪০টি প্রাকৃতিক
                উপাদান ব্যবহার করা হয়েছে। যার প্রতিটি উপাদান চুলের জন্য অনেক
                অনেক উপকারী।
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
