import React from "react";
import { SidebarOptions } from "./SidebarOptions";

const SidebarComponent = ({selectedOption, setSelectedOption, handleModal})=>{
    
    return(
        <div className="w-80 text-[18px] font-semibold min-h-screen z-10 bg-gray-300 hidden text-black md:block">

            <h2 className="text-[22px] font-bold m-6 text-center"> Admin Dashboard </h2>
                    <SidebarOptions selectedOption={selectedOption} setSelectedOption={setSelectedOption} handleModal={handleModal}/>
        </div>

    )
}

export default SidebarComponent;