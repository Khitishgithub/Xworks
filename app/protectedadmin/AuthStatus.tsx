import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LandingPage from "./LandingPage";

const AuthStatus = async () => {
  const session = await getServerSession(authOptions);

  // Check if session is null before rendering
  return (
    <div className="absolute w-full top-5 flex items-center justify-center">
      {session ? (
        <LandingPage user={session.user} />
      ) : (
        <p>Please log in to access this page.</p> // Handle the case when session is null
      )}
    </div>
  );
};

export default AuthStatus;
