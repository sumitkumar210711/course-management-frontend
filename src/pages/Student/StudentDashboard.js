import React, {useState, useContext} from "react";
import { EnrolledCoursesTab } from "./Components/EnrolledCoursesTab";
import {  AssignedTeachersTab } from "./Components/AssignedTeachersTab";
import { ProfileTab } from "./Components/ProfileTab";

export const StudentDashboard = ()=>{
    const [selectedTab, setSelectedTab] =useState("viewCourses");
    
    const tabscss = (tab)=>
         `py-[2px] text-[16px] font-semibold px-1 md:px-6 bg-slate-100  ${selectedTab === tab ? "border-b-2 border-gray-500" :' hover:bg-gray-300'} `


    return (
        <div className="w-full bg-white h-screen overflow-y-auto fixed ">
            
            <div className="mt-16 ml-6 md:ml-16 text-[30px] font-bold text-gray-800">
                Student Dashboard
            </div>
        <div className="mt-2 ml-6 md:ml-16 mr-4 md:mr-20 md:gap-16 gap-10 flex flex-row">



            <button className={tabscss("viewCourses")}
            onClick={()=>setSelectedTab("viewCourses")}>
                View Enrolled Courses

            </button>
            <button className={tabscss("viewStudents")} onClick={()=>setSelectedTab("viewStudents")}>
                View Assigned Teachers

            </button>

            <button className={tabscss("profile")}  onClick={()=>setSelectedTab("profile")}>
                My Profile
            </button>
        
        </div>

        {selectedTab === 'viewCourses' &&(
            <EnrolledCoursesTab />
        )}

        {selectedTab === 'viewStudents' &&(
            <AssignedTeachersTab />
        )}

        {selectedTab === 'profile' && (
            <ProfileTab />
        )

        }
        </div>
    )
}