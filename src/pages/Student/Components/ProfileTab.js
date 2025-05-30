import React,{useContext} from "react";
import { userAccountContext } from "../../../contextAPI/userAccountContext";

export const ProfileTab = ()=>{
    const profileDetails = "text-[20px] md:text-[25px]"

    const {userAuth} = useContext(userAccountContext);
    return(

    <div className=" w-full mb-44 pl-4 md:pl-16 md:pr-16 pt-6">      
            <div className="md:pl-16 md:pt-16 pl-12 pt-16 gap-14 flex flex-col rounded-xl shadow-2xl border border-cyan-200 md:w-2/3  h-[300px]">
                <div className={profileDetails}>
                   <div className="font-bold"> Name :  <span className="font-semibold">{userAuth.user.name} </span></div>
                </div>
                <div className={profileDetails}>
                    <div className="font-bold"> Email Id :  <span className="font-semibold">{userAuth.user.email} </span></div>
                </div>
                <div className={profileDetails}>

                    <div className="font-bold"> Phone Number :  <span className="font-semibold">{userAuth.user.phone || "+91-9012453938"} </span></div>

                </div>
            </div>
        </div>
    )
}