import React from "react";
import { SidebarOptions } from "./SidebarOptions";

const SidebarComponent = ({ selectedOption, setSelectedOption, handleModal }) => {
  return (
    <div className="min-h-screen w-[300px] shadow-2xl text-[18px] font-medium z-10 
                    bg-gradient-to-b from-slate-800 via-purple-900 to-slate-900 
                    text-white hidden md:block border-r border-purple-700">
      <h2 className="text-[22px] font-bold m-6 text-center text-white">
        Admin Dashboard
      </h2>

      <SidebarOptions
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleModal={handleModal}
      />
    </div>
  );
};

export default SidebarComponent;
