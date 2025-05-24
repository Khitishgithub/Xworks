"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CircleDashed } from "lucide-react";
import React from "react";
import Footer from "../components/Footer";
import { IoHome } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { GrWorkshop } from "react-icons/gr";
import { motion } from "framer-motion";

const Page = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" href="/">
                <Image
                  src="/logoxworks.png"
                  width={150}
                  height={150}
                  alt="logo image"
                  className="mt-10"
                />
              </Link>
            </div>

            <div className="md:flex md:items-center mt-10 md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/"
                    >
                      <IoHome className="mr-2" />
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/about"
                    >
                      <FcAbout className="mr-2 " />
                      ABOUT
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="workshop"
                    >
                      <GrWorkshop className="mr-2" />
                      WORKSHOPS
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link
                    href="/login"
                    className="rounded-md bg-[#27448D] px-5 py-2.5 text-sm font-medium text-white shadow"
                  >
                    Login
                  </Link>
                  <div className="hidden sm:flex">
                    <Link
                      href="/register"
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#27448D]"
                    >
                      Register
                    </Link>
                  </div>
                </div>

                <div className="block md:hidden">
                  <button
                    onClick={toggleMobileMenu}
                    className="flex flex-col justify-center items-center w-6 h-6 space-y-1.5 focus:outline-none"
                    aria-label="Toggle menu"
                  >
                    <span
                      className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                    />
                    <span
                      className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                      className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <nav className="lg:hidden">
              <ul className="flex flex-col items-center gap-4 mt-10 text-sm">
                <li>
                  <Link
                    className="text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/"
                  >
                    <IoHome className="mr-2" />
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/about"
                  >
                    <FcAbout className="mr-2 " />
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="workshop"
                  >
                    <GrWorkshop className="mr-2" />
                    WORKSHOPS
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#27448D]"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-[#FF6347] mb-16">
          CONTACT US
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-16">
          {/* Email Contact */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-[#FFA500] rounded-full p-6 w-32 h-32 flex items-center justify-center">
              <Image
                src="/email.png"
                alt="Email"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
            <Link
              href="mailto:connect@xworks.live"
              className="text-[#4169E1] text-xl font-medium hover:underline"
            >
              connect@xworks.live
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gray-800 rounded-full p-6 w-32 h-32 flex items-center justify-center">
              <Image
                src="/phone.png"
                alt="Phone"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="flex flex-col items-center">
              <Link
                href="tel:+917383808881"
                className="text-[#4169E1] text-xl font-medium hover:underline"
              >
                +91 73838-08881
              </Link>
              <div className="text-[#4169E1] text-lg">
                <span>CALL</span>
                <span className="mx-2">|</span>
                <Link
                  href="https://wa.me/917383808881"
                  className="hover:underline"
                >
                  WHATSAPP
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Workshops Info */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-[#FF6347] text-lg sm:text-xl leading-relaxed">
            We also offer TAILOR MADE and CUSTOMIZED workshops for
            Individuals/Corporates/NGO&apos;s/Govt Organizations, based on your
            requirements. Please call us or email us for more information.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
