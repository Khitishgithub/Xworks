"use client";

import { signOut } from "next-auth/react";

const Signout = () => {
	return (
		<button
			onClick={() => signOut()}
			className="text-gray-400 flex items-center space-x-1"
		>
			
			
		</button>
	);
};
export default Signout;
