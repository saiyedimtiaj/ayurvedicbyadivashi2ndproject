"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaTimes, FaWhatsapp } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export default function SocialIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "+8801615117126";
  const whatsappNumber = "+8801615117126";

  return (
    <div className="fixed z-[9999999] bottom-8 right-5">
      {/* Social icons container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mt-4 flex flex-col space-y-4"
      >
        {/* WhatsApp Button */}
        <motion.a
          href={`tel:${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 20,
          }}
          transition={{
            duration: 0.5,
            delay: isOpen ? 0.4 : 0,
          }}
          className={`p-3 bg-blue-600 text-white rounded-full shadow-md ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <FaPhoneAlt size={28} />
        </motion.a>

        {/* Phone Call Button */}
        <motion.a
          href={`https://wa.me/${whatsappNumber}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 20,
          }}
          transition={{
            duration: 0.5,
            delay: isOpen ? 0.2 : 0,
          }}
          className={`p-2 bg-green-500 text-white rounded-full shadow-md ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <FaWhatsapp size={35} />
        </motion.a>
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-[#008037] cursor-pointer text-white rounded-full shadow-lg mt-4"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaMessage size={24} />}
      </motion.button>
    </div>
  );
}
