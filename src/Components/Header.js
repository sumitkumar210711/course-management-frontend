import React, {useContext} from "react";
import { userAccountContext } from "../contextAPI/userAccountContext";

const Header = () => {

    const {logout, userAuth} = useContext(userAccountContext);
    return (
        <header className="fixed w-full flex flex-row justify-between top-0 bg-blue-400 text-black shadow-md
         pl-6 pt-4 pb-4 pr-2 md:pl-16 md:pr-10 z-50 ">
            <h1 className="text-[20px] md:text-[26px] font-bold">Course Management System</h1>

            {userAuth?.user && userAuth.user.role && (
            <button className=" px-4 md:px-6 text-[16px] rounded-xl bg-green-400 border border-green-800 text-black"
            onClick={logout}>Logout</button>
            )}

        </header>
    );
}
export default Header;