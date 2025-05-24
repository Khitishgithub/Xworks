//app/register/page.tsx
import { UserPlusIcon } from "lucide-react";
import Link from "next/link";
import Form from "../components/Form";
import Footer from "../components/Footer";
import Image from "next/image";

const RegisterPage = () => {
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
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <Link className="text-black-700 transition" href="/">
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
      <div className=" mt-10 flex  justify-center items-center w-screen  mb-10">
        <div className="z-10 max-w-md w-full overflow-hidden rounded-2xl border-gray-200 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-6 pb-6 pt-8 text-center sm:px-16">
            <Link href={"/"}>
              <UserPlusIcon className="h-10 w-10 text-black" />
            </Link>
            <h3 className="text-xl font-semibold text-black">Register</h3>
          </div>
          <Form type="register" />
        </div>
      </div>
      <div className="mt-15">
        <Footer />
      </div>
    </>
  );
};
export default RegisterPage;
