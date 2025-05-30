import React from "react";

export const SidebarOptions = ({selectedOption, setSelectedOption, handleModal})=>{
    const sidebarItems = "w-full  py-[4px] text-left pl-6 md:py-2 md:hover:bg-slate-500 hover:text-blue-900 md:hover:text-white";

    return(
                <nav className="space-y-2 md:space-y-3">
                        <button onClick={()=>setSelectedOption("Home")} className={sidebarItems}> Home </button>
                        <hr />   
                        <button onClick={()=>setSelectedOption("Teacher")} className={sidebarItems}> Add/Edit Teachers </button>
                        <hr />
                        <button onClick={()=>setSelectedOption("Student")} className={sidebarItems}> Add/Edit Students </button>
                        <hr />
                        
                        <button onClick={()=>setSelectedOption("Courses")} className={sidebarItems}> View Courses </button>
                        <hr />

                        <button onClick={()=>
                            {
                                handleModal();
                                setSelectedOption("assign");
                        }} className={sidebarItems}> Assign Student - Teacher </button>
                    </nav>
        
    )

}