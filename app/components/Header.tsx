"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";


const Header = () => {
  const [workshops, setWorkshops] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <header className="bg-white mb-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link href="/workshops">
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
              <nav aria-label="Global" className="block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <Link className="text-black-700 transition" href="/protected/workshops">
                        BACK
                      </Link>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
