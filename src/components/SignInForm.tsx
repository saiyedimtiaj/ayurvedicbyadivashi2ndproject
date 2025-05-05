"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/auth";

const SignInForm = () => {
  const route = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.email) newErrors.push("ইমেইল আবশ্যক");
    if (!formData.password) newErrors.push("পাসওয়ার্ড আবশ্যক");
    if (
      formData.email !== process.env.NEXT_PUBLIC_AUTH_EMAIL ||
      formData.password !== process.env.NEXT_PUBLIC_AUTH_PASSWORD
    )
      newErrors.push("আপনার দেওয়া তথ্য ভুল");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      loginUser({ email: formData.email });
      route.push("/admin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden sticky top-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#008037]"></div>
          <div className="relative p-8">
            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link
                href="/"
                className="text-white hover:text-indigo-200 transition-colors duration-300 flex items-center"
              >
                <ArrowLeft size={16} className="mr-1" />
                <span>হোম পেইজে ফিরে যান</span>
              </Link>
            </motion.div>
            <motion.div
              className="text-center mt-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-white">স্বাগতম</h1>
              <p className="text-gray-200 mt-2">আপনার অ্যাকাউন্টে লগইন করুন</p>
            </motion.div>
          </div>
        </div>

        <div className="p-8">
          {errors.length > 0 && (
            <motion.div
              className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <ul className="list-disc pl-5">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                ইমেইল
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="আপনার ইমেইল"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 mb-2 font-medium">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <motion.input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="*******"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-[#008037] cursor-pointer text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
            >
              লগইন করুন
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInForm;
