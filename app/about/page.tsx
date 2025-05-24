"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CircleDashed } from "lucide-react";
import React from "react";
import Footer from "../components/Footer";
import { IoHome } from "react-icons/io5";
import { GrWorkshop } from "react-icons/gr";
import { RiContactsBookFill } from "react-icons/ri";
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
                      href="workshop"
                    >
                      <GrWorkshop className="mr-2" />
                      WORKSHOPS
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                      href="/contact"
                    >
                      <RiContactsBookFill className="mr-2" />
                      CONTACT US
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
                      className={`block w-5 h-0.5 bg-black transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                    />
                    <span
                      className={`block w-5 h-0.5 bg-black transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                      className={`block w-5 h-0.5 bg-black transition-all duration-300 ease-in-out
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
                    href="workshop"
                  >
                    <GrWorkshop className="mr-2" />
                    WORKSHOPS
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
                    href="/contact"
                  >
                    <RiContactsBookFill className="mr-2" />
                    CONTACT US
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

      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-center text-4xl font-bold text-[#FF6347] mb-16">
          ABOUT XWORKS
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Logo and Brand */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-full max-w-md">
              <Image
                src="/XWORKS.png"
                alt="XWORKS Logo"
                width={400}
                height={100}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="space-y-3 text-base">
            {/* Introduction */}
            <p className="text-[#00B8D0]">
              XWORKS is a modern and new-age skilling and training organization,
              with its headquarters in India&apos;s first heritage city,
              Ahmedabad.
            </p>

            {/* Mission Statement */}
            <p className="text-[#00B8D0]">
              We empower individuals with relevant and up-to-date skills for the
              modern-day workforce. We provide quality training in new-age tools
              and knowledge to make people future-ready. We aim to
              skill/re-skill/up-skill people across multiple domains. Our
              custom-built new-age courses are modern and very relevant to the
              industry needs and will help individuals acquire the necessary
              skills to thrive in today&apos;s competitive job market.
            </p>

            {/* Partnership Information */}
            <p className="text-[#00B8D0]">
              XWORKS in partnership with numerous educational institutions and
              Industries plays a vital role in bridging the skills gap by
              providing relevant and up-to-date training programs,
              certifications, and opportunities for continuous learning and
              professional development. By aligning our offerings with industry
              needs and fostering partnerships with businesses, XWORKS will help
              narrow the skill gap and prepare individuals for the demands of
              modern industries
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
