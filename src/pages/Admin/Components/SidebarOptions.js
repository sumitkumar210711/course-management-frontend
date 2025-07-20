import React from "react";

export const SidebarOptions = ({selectedOption, setSelectedOption, handleModal})=>{
    const baseSidebarItems = "w-full h-[35px] md:h-[60px] text-left pl-6 md:hover:bg-blue-400 hover:text-blue-900 md:hover:text-white";

    return(
        <nav className=" md:space-y-2 md:mt-4">
            <button
                onClick={()=>setSelectedOption("Home")}
                className={`${baseSidebarItems} ${selectedOption === "Home" ? "bg-gray-500 text-white md:hover:bg-gray-500 hover:text-blue-900 md:bg-gray-500" : ""}`}
            > Home </button>
            
            <button
                onClick={()=>setSelectedOption("Teacher")}
                className={`${baseSidebarItems} ${selectedOption === "Teacher" ? "bg-gray-500 text-white md:hover:bg-gray-500 hover:text-blue-900 md:bg-gray-500" : ""}`}
            > Add/Edit Teachers </button>
            
            <button
                onClick={()=>setSelectedOption("Student")}
                className={`${baseSidebarItems} ${selectedOption === "Student" ? "bg-gray-500 text-white md:hover:bg-gray-500 hover:text-blue-900 md:bg-gray-500" : ""}`}
            > Add/Edit Students </button>
            
            <button
                onClick={()=>setSelectedOption("Courses")}
                className={`${baseSidebarItems} ${selectedOption === "Courses" ? "bg-gray-500 text-white md:hover:bg-gray-500 hover:text-blue-900 md:bg-gray-500" : ""}`}
            > View Courses </button>
            
            <button
                onClick={()=>{
                    handleModal();
                    setSelectedOption("assign");
                }}
                className={`${baseSidebarItems} ${selectedOption === "assign" ? "bg-gray-500 text-white md:hover:bg-gray-500 hover:text-blue-900 md:bg-gray-500" : ""}`}
            > Assign Student - Teacher </button>
        </nav>
    );
}