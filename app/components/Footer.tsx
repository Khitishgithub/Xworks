import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPhone } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { MdOutgoingMail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className="bg-white py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between flex-wrap">
            <div className="w-full md:w-1/4 text-center md:text-left">
              <Image
                src="/XWORKS.png"
                alt="Logo"
                width={400}
                height={300}
                className="mx-auto md:mx-0 mb-4 "
              />

              <p className="text-gray-600 mb-4 tezt-center">
                XWORKS is a futuristic, modern and new age skilling organization
              </p>
              <p className="text-gray-600 text-center mb-4">
                {" "}
                &lt;&lt; Follow us on &gt;&gt;{" "}
              </p>

              {/* Social Icons */}
              <div className="flex justify-center space-x-4">
                <Link href="https://www.instagram.com/xworks.live/">
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={60}
                    height={60}
                    className=""
                  />
                </Link>
                <Link href="https://www.twitter.com">
                  <Image
                    src="/twitter.png"
                    alt="Twitter"
                    width={60}
                    height={60}
                    className=""
                  />
                </Link>
                <Link href="https://www.youtube.com">
                  <Image
                    src="/youtube.png"
                    alt="Youtube"
                    width={60}
                    height={60}
                    className=""
                  />
                </Link>
              </div>
            </div>

            {/* Learning Pathways */}
            <div className="w-full md:w-1/4 mt-8 md:mt-0">
              <h3 className="text-[#A9AAA9] font-semibold mb-4">
                LEARNING PATHWAYS
              </h3>
              <ul>
                <li className="text-[#CC3366] font-bold mb-2">WORKSHOPS</li>
                <li className="text-gray-600">PROGRAMS</li>
              </ul>
            </div>

            {/* Policies */}
            <div className="w-full md:w-1/4 mt-8 md:mt-0">
              <h3 className="text-[#A9AAA9] font-semibold mb-4">POLICIES</h3>
              <ul>
                <li className="text-[#CC3366] mb-2">Terms and Conditions</li>
                <li className="text-[#CC3366] mb-2">Refund/Cancellation</li>
                <li className="text-[#CC3366]">Privacy</li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="w-full md:w-1/4 mt-8 md:mt-0">
              <h3 className="text-[#A9AAA9] font-semibold mb-4">
                CONTACT DETAILS
              </h3>
              <div className="flex items-center mb-2">
                <FaPhone />

                <span className="text-gray-600">+91 73838-08881</span>
              </div>
              <div className="flex items-center">
                <MdOutgoingMail />

                <span className="text-gray-600">connect@xworks.live</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
