"use client";
import { useRouter } from 'next/navigation'


import { signOut } from "next-auth/react";

const Signout = () => {
	const router = useRouter()

	return (
		<button
			onClick={() => {signOut()
			router.push("/");
			}
			}
			className="text-gray-400 flex items-center space-x-1"
		>
			
			
		</button>
	);
};
export default Signout;
