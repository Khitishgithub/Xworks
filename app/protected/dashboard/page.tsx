"use client";
import React, { useState, useEffect } from 'react';
import SideNav from '../../../components/SideNav';
import { CircleDashed } from "lucide-react";
import { motion } from "framer-motion"

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
      <motion.div
        className="flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircleDashed className="animate-spin text-[#27448D]" size={64} />
      </motion.div>
    </div>
    );
  }
  return (
    <div>
      <SideNav />
      
    </div>
  );
}

export default Page;