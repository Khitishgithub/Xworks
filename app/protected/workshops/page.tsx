"use client";
import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { CircleDashed } from "lucide-react";
import { motion } from "framer-motion"
import Footer from "@/app/components/Footer";

// Utility function to convert workshop name to URL-friendly format
const convertToUrlSlug = (name: string): string => {
  return name.replace(/\s+/g, "_"); // Replace one or more spaces with single underscore
};

const Page = () => {
  const [workshops, setWorkshops] = useState<any[]>([]); // State to hold workshop data
  const [loading, setLoading] = useState(true); // Loading state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch("/api/auth/workshops");
        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
        // Optionally, you can set an error state to display to the user
      } finally {
        setLoading(false);
      }
    };
  
    fetchWorkshops();
  }, []);
  

  if (loading) {
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
              <NextLink className="block text-teal-600" href="/">
                <Image
                  src="/logoxworks.png"
                  width={150}
                  height={150}
                  alt="logo image"
                  className="mt-10"
                />
              </NextLink>
            </div>

            <div className="md:flex md:items-center mt-10 md:gap-12">
              <nav aria-label="Global" className="block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <NextLink className="text-black-700 transition" href="/protected">
                      BACK
                    </NextLink>
                    </button>
                  </li>
                </ul>
              </nav>
              </div>
              </div>

              
            
        </div>
      </header>

      <div className="mt-20 p-4">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
          OUR EXTRAORDINARY WORKSHOPS
        </h1>
        <TableContainer component={Paper} className="max-w-6xl mx-auto">
          <Table className="w-full">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="font-bold">No</TableCell>
                <TableCell className="font-bold">Workshop</TableCell>
                <TableCell className="font-bold">Topic</TableCell>
                <TableCell className="font-bold">Duration</TableCell>
                <TableCell className="font-bold">
                  Cost(in INR)
                  <br />
                  (excluding 18% GST)
                </TableCell>
                <TableCell className="font-bold">Starting On</TableCell>
                <TableCell className="font-bold">Timing(IST)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workshops.map((workshop, index) => (
                <TableRow key={workshop.id} className="hover:bg-gray-50">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <MuiLink
                      component={NextLink}
                      href={`/protected/workshops/${convertToUrlSlug(
                        workshop.name
                      )}`}
                      color="primary"
                      underline="hover"
                    >
                      {workshop.name}
                    </MuiLink>
                  </TableCell>
                  <TableCell>{workshop.topic}</TableCell>
                  <TableCell>{workshop.duration}</TableCell>
                  <TableCell>{workshop.cost}/-</TableCell>
                  <TableCell>{workshop.startingOn}</TableCell>
                  <TableCell>{workshop.timing}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    <Footer/>
    </>
  );
};

export default Page;
