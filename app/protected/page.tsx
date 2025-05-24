import AuthStatus from "../../components/AuthStatus";
import Signout from "../../components/Signout";

const ProtectedPage = () => {
	return (
		<>
		<div className="flex h-screen bg-white ">
			<div className="w-screen h-screen flex text-black items-center justify-center flex-col space-y-5">
				<AuthStatus />
				
			</div>
		</div>
		</>
	);
};
export default ProtectedPage;
