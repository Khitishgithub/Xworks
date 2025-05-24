import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import LandingPage from "./LandingPage";

const AuthStatus = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="absolute w-full top-5 flex items-center justify-center">
        <p className="text-black text-xl">Not signed in</p>
      </div>
    );
  }

  return (
    <div className="absolute w-full top-5 flex items-center justify-center">
      <LandingPage user={session.user} />
    </div>
  );
};

export default AuthStatus;
