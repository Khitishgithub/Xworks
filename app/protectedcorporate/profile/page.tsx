import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-700">Not signed in</p>
      </div>
    );
  }

  const { name, email } = session.user;

  return (
    <>
     
      <header className="bg-white mb-10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link href="/">
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
                      <Link className="text-black-700 transition" href="/protectedcorporate">
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

      {/* Main Profile Section */}
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className=" text-xl lg:text-4xl font-bold mb-6 text-center">Welcome, {name}!</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <p className="text-lg"><strong>Name:</strong> {name}</p>
          <p className="text-lg"><strong>Email:</strong> {email}</p>
        </div>

        {/* Welcome and Thank You Message */}
        <div className="mt-8 p-6 bg-teal-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-teal-800">
            Thank You for Being a Part of Our Learning Community!
          </h3>
          <p className="mt-4 text-teal-700">
            We’re thrilled to have you here, {name}. Our goal is to empower you on your learning journey with high-quality resources and support.
          </p>
          <p className="mt-4 text-teal-700">
            Dive into our vast array of educational materials, connect with fellow learners, and make the most of this experience. Together, we’re building a future of limitless learning opportunities. Thank you for joining us!
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProfilePage;
