//protectedadmin/LandingPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import Image from "next/image";
import { MdDashboardCustomize } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { GrWorkshop } from "react-icons/gr";
import { RiMessage2Line, RiLogoutBoxRLine } from "react-icons/ri";
import { CircleDashed } from "lucide-react";
import Footer from "../components/Footer";

interface User {
  username?: string | null;
  name?: string | null;
  email?: string | null;
  id?: string;
  user_type_id?: number;
}

interface LandingPageProps {
  user?: User;
}

const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  const menuItems = [
    {
      name: "Dashboard",
      path: "/protectedadmin/dashboard",
      icon: MdDashboardCustomize,
      onClick: () => {},
    },
    {
      name: "Profile",
      path: "/protectedadmin/profile",
      icon: AiFillProfile,
      onClick: () => {},
    },
    {
      name: "Logout",
      path: "/",
      icon: RiLogoutBoxRLine,
      onClick: handleSignOut,
    },
  ];

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="flex items-center justify-center">
          <CircleDashed className="animate-spin text-[#27448D]" size={64} />
        </div>
      </div>
    );
  }
  return (
    <div>
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
                      href="/protectedadmin"
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
                      href="/protectedadmin"
                    >
                      <GrWorkshop className="mr-2" />
                      WORKSHOPS
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <div className="flex items-center">
                      <CgProfile className="text-gray-500 text-2xl mr-2" />
                      <span className="text-xs lg:text-lg">
                        {user?.name || "John Doe"}
                      </span>
                    </div>
                    <button className="text-gray-500">
                      <svg
                        className={`w-5 h-5 transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="block md:hidden mobile-menu-container">
                  <button
                    onClick={toggleMobileMenu}
                    className="flex flex-col justify-center items-center w-10 h-10 border-2 border-gray-400 rounded-lg p-2 hover:border-[#27448D] transition-colors relative z-50"
                    aria-label="Toggle menu"
                  >
                    <span
                      className={`bg-gray-600 h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
                        isMobileMenuOpen
                          ? "rotate-45 translate-y-1"
                          : "-translate-y-1"
                      }`}
                    />
                    <span
                      className={`bg-gray-600 h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
                        isMobileMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <span
                      className={`bg-gray-600 h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
                        isMobileMenuOpen
                          ? "-rotate-45 -translate-y-1"
                          : "translate-y-1"
                      }`}
                    />
                  </button>

                  {/* Mobile Menu */}
                  <div
                    className={`
                      absolute right-0 top-24 w-48 bg-white shadow-lg rounded-lg
                      transform transition-all duration-300 ease-in-out z-40
                      ${
                        isMobileMenuOpen
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
                      }
                    `}
                  >
                    <nav className="py-2">
                      <Link
                        href="/protectedadmin"
                        className="px-4 py-2 text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                        after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                        after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                        after:transition-transform after:duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IoHome className="mr-2" />
                        HOME
                      </Link>
                      <Link
                        href="/protectedadmin"
                        className="px-4 py-2 text-black-700 transition relative hover:text-[#27448D] pb-1 flex items-center
                        after:absolute after:content-[''] after:w-full after:h-1 after:bg-[#27448D] 
                        after:left-0 after:bottom-[-2px] after:scale-x-0 hover:after:scale-x-100 
                        after:transition-transform after:duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <GrWorkshop className="mr-2" />
                        WORKSHOPS
                      </Link>
                    </nav>
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="right-3 mt-12 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden transition duration-300 transform ease-out origin-top-right scale-95">
                    {menuItems.map((item, index) => (
                      <div key={index} className="flex hover:bg-gray-100">
                        {item.name === "Logout" ? (
                          <button
                            onClick={item.onClick}
                            className="w-full flex items-center px-5 py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
                          >
                            <item.icon className="mr-3 text-gray-500" />
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            href={item.path}
                            className="flex items-center px-5 py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
                          >
                            <item.icon className="mr-3 text-gray-500" />
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className=" mt-20">
        <div className="mx-auto max-w-screen-xl px-4  lg:flex  lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-2xl">
              <strong className="font-extrabold text-[#FF6038] sm:block">
                {" "}
                ITS THE AGE OF SKILLS - NOT DEGREES{" "}
              </strong>
            </h1>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
          <div className="lg:w-1/2">
            {/* Image container */}
            <Image
              src="/XWORKS.png" // Replace with the correct image path
              width={270}
              height={300}
              alt=" Image Description"
              className="w-full h-auto "
            />
          </div>

          {/* Text Container */}
          <div className="lg:w-1/2 lg:pl-10 mt-6 lg:mt-0 text-center lg:text-left">
            <p className="text-xl  text-[#00A8A8] sm:text-xl">
              XWORKS is a new – age Skilling and Training Organization,
              specializing in technology{" "}
              <u className="text-red-600">Workshops</u> and{" "}
              <u className="text-red-600">Programs</u>. XWORKS empowers
              individuals with relevant and up-to-date skills for the modern
              world. We conduct LIVE , HANDS-ON and RELEVANT Workshops and
              Programs Round the year
            </p>
            <p className="mt-4 text-[#00A8A8] text-xl">
              <strong>
                Our in-house scientifically designed, high quality courses
              </strong>
              , cater to various domains, making people future-ready. Through
              partnerships with educational institutions and industries, we
              bridge the skills gap by providing training, certifications, and
              continuous learning opportunities. By aligning with industry
              needs, XWORKS prepares individuals for the demands of modern
              industries.
            </p>
          </div>
        </div>
      </section>

      <section className=" mt-10">
        <div className="mx-auto max-w-screen-xl px-4  lg:flex  lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-2xl">
              <strong className="font-extrabold text-[#FF6038] sm:block">
                {" "}
                OUR BEST SELLERS{" "}
              </strong>
            </h1>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-6 max-w-7xl mx-auto">
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <Image
            src="/genai.png"
            alt="GEN AI"
            width={400}
            height={400}
            className="w-24 h-24 mx-auto mt-6 rounded-full"
          />
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-[#524CFF] mb-3">
              <u>GEN AI - MASTERCLASS</u>
            </h2>
            <p className="text-[#00A8A5]">
              AI is transforming industries and reshaping the future of
              technology. Join our GEN AI Masterclass Workshop, which will take
              you through foundational concepts and advanced topics like
              Generative AI, prompt engineering, and deploying AI solutions.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <Image
            src="/cybersecurity.png"
            alt="Cyber Security"
            width={400}
            height={400}
            className="w-24 h-24 mx-auto mt-6 rounded-full"
          />
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-[#524CFF] mb-3">
              <u>Cyber Security for Everyone</u>
            </h2>
            <p className="text-[#00A8A5]">
              Discover the essentials of Cyber Security in this workshop,
              covering topics such as threat prevention, ethical hacking, data
              protection, and how to secure your online presence in an
              increasingly digital world.
            </p>
          </div>
        </div>

        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <Image
            src="/neuralnetwork.png"
            alt="Neural Networks"
            width={400}
            height={400}
            className="w-24 h-24 mx-auto mt-6 rounded-full"
          />
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-[#524CFF] mb-3">
              <u>Building Neural Networks</u>
            </h2>
            <p className="text-[#00A8A5]">
              Learn how to build and optimize Neural Networks, one of the
              foundational technologies in AI. This workshop will cover network
              architectures, backpropagation, and real-world applications of
              deep learning.
            </p>
          </div>
        </div>
      </div>

      <section className=" mt-10">
        <div className="mx-auto max-w-screen-xl px-4  lg:flex  lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-2xl">
              <strong className="font-extrabold text-[#FF6038] sm:block">
                {" "}
                LEARNING PATHWAYS{" "}
              </strong>
            </h1>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-8 max-w-7xl mx-auto">
        {/* Card 1 */}
        <div className="max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg ">
          <Image
            src="/workshops.png"
            alt="Workshops"
            width={160}
            height={190}
            className="mx-auto mt-6 rounded-full border-2 border-[#524CFF] shadow-md"
          />
          <div className="bg-white p-6 text-center">
            <h2 className="text-xl font-semibold text-[#524CFF] mb-2 underline">
              WORKSHOPS
            </h2>
            <h1 className="text-[#00A8A5] font-extrabold text-lg leading-tight">
              EXTRAORDINARY WORKSHOPS FOR FAST UPSKILLING AND LEARNING NEW-AGE
              SKILLS
            </h1>
            <h1 className="mt-4 text-[#00A8A5] font-bold text-md leading-relaxed">
              Precise, Live, and Scientifically Designed Workshops to teach
              new-age skills and modern subjects rapidly—most within a Single
              Weekend. ELEVATE YOUR CAREER to the next level in just ONE
              WEEKEND!
            </h1>
          </div>
        </div>

        {/* Card 2 */}
        <div className="max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg ">
          <Image
            src="/programs.png"
            alt="Programs"
            width={160}
            height={190}
            className="mx-auto mt-6 rounded-full border-2 border-[#524CFF] shadow-md"
          />
          <div className="bg-white p-6 text-center">
            <h2 className="text-xl font-semibold text-[#524CFF] mb-2 underline">
              PROGRAMS
            </h2>
            <h1 className="text-[#00A8A5] font-extrabold text-lg leading-tight">
              CUTTING-EDGE TECHNOLOGY PROGRAMS TO TRANSFORM YOUR FUTURE
            </h1>
            <h1 className="mt-4 text-[#00A8A5] font-bold text-md leading-relaxed">
              Become a tech industry professional with our meticulously designed
              programs. Start from absolute beginner level and advance to expert
              in just under six months.
            </h1>
          </div>
        </div>
      </div>

      <section className=" mt-10">
        <div className="mx-auto max-w-screen-xl px-4  lg:flex  lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-2xl">
              <strong className="font-extrabold text-[#FF6038] sm:block">
                {" "}
                XWORKS ADVANTAGE{" "}
              </strong>
            </h1>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto mt-2 p-5 bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2] rounded-lg shadow-lg">
        <ul className="list-none ">
          {[
            "All Workshops and Programs are Live Hands-On, Practical Workshop Experiences",
            "Masterfully Curated Content, Designed to Learn Efficiently and Quickly",
            "All Workshops and Programs are conducted by Visionary, Widely Experienced and Forward Thinking Experts",
            "Every Workshop and Program comes with assessment and certification",
            "Industry Relevant and Modern Training Programs, Certifications, and Opportunities for continuous learning and professional development",
          ].map((text, index) => (
            <li
              className="flex items-start transition-transform transform  hover:bg-white hover:shadow-md p-2 rounded-md"
              key={index}
            >
              <svg
                className="w-8 h-8 text-[#00A8A5] font-bold flex-shrink-0 mr-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[#00A8A5] sm:text-lg md:text-xl font-semibold leading-relaxed">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>

     <Footer/>
    </div>
  );
};

export default LandingPage;
