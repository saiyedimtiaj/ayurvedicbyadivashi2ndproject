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
                আদিবাসী হেয়ার অয়েল কম্বোর দাম কত ? কিভাবে অর্ডার করব ?
              </AccordionHeader>
              <AccordionPanel>
                ২০০ ml আদিবাসী হেয়ার অয়েল এর অফার প্রাইজ ৮৯০ টাকা সাথে ৩৮৫ টাকা
                মূল্যের আদিবাসী হেয়ার প‍্যাক ফ্রি । ডেলিভারি চার্জ চট্টগ্রামের
                ভেতর ৮০ টাকা, চট্টগ্রামের বাইরে ১৩০ টাকা। ৪০০ ml আদিবাসী হেয়ার
                অয়েলের এর অফার প্রাইজ ১৫৯৯ টাকা (ডেলিভারি চার্জ ফ্রি) সাথে ৩৮৫
                টাকা মূল্যের ২টি আদিবাসী হেয়ার প‍্যাক ফ্রি । ডেলিভারি প্রোডাক্ট
                হাতে বুঝে পাবার পর টাকা দিয়ে নিতে পারবেন। অর্ডার করতে আপনার
                বিস্তারিত ঠিকানা দিয়ে নিচের ফর্মটি পূরণ করুন। ৩-৫ দিনের মধ্যে
                ডেলিভারি পাবেন।
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader>
                আমার প্রচুর চুল পড়ছে ও খুশকির সমস্যা আছে, আমার কি চুল পড়া বন্ধ
                হবে বা নতুন চুল গজাবে আদিবাসী হেয়ার অয়েল ব‍্যবহার করে ?
              </AccordionHeader>
              <AccordionPanel>
                চুল পড়ার নানা কারণ হতে পারে। বংশগত কারণে কিংবা পুষ্টির অভাবে,
                এছাড়া রয়েছে আরও নানা কারণ । বেশিরভাগ সময় চুলের সঠিক যত্ন নেয়া
                হয়না আমাদের , কিন্তু সঠিক যত্ন নিলে চুল টাক হয়ে যাওয়া থেকে রক্ষা
                পাওয়া যায়। আমাদের তেলটি প্রায় ৪৮টি প্রাকৃতিক উপাদান দিয়ে তৈরি,
                যা চুল পড়া কমাবে, নতুন চুল গজাতে সাহায্য করবে, চুল লম্বা, ঘন,
                সিল্কি, শাইনি ও কালো করবে, এবং খুশকিও কমাবে। কিছুদিনের ব্যবহারে
                আপনি পরির্বতন অনুভব করবেন । চুল সমস্যা সমাধানের কমপ্লিট সল্যুশন
                হচ্ছে আমাদের আদিবাসী হেয়ার অয়েল এবং হেয়ার স্পা প‍্যাক
                Guaranty ইনশাআল্লাহ।
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
