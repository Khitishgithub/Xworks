"use client";
import React, { useEffect, useState } from "react";
import { Button, Typography, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CircleDashed } from "lucide-react";
import Footer from "../components/Footer";
import { IoHome } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { RiContactsBookFill } from "react-icons/ri";
import { motion } from "framer-motion"

const Page = () => {
  const router = useRouter();
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

  const handleLogin = () => {
    router.push("/login");
  };

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

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Oops! You are not logged in.
        </Typography>

        <Typography variant="body1" gutterBottom>
          Login to see all the available workshops.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={handleLogin}
          sx={{
            marginTop: "20px",
            backgroundColor: "#1976d2",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Login
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default Page;
