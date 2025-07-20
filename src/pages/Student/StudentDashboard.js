import React, { useState } from "react";
import { EnrolledCoursesTab } from "./Components/EnrolledCoursesTab";
import { AssignedTeachersTab } from "./Components/AssignedTeachersTab";
import { ProfileTab } from "./Components/ProfileTab";

export const StudentDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("viewCourses");

  const tabscss = (tab) =>
    `py-2 px-3 md:px-6 rounded-lg border font-semibold text-[16px] transition-all duration-200
     ${
       selectedTab === tab
         ? "bg-green-300 border-green-600 text-black"
         : "bg-gray-300 border-gray-500 hover:bg-gray-400 text-black"
     }`;

  return (
    <div className="w-full h-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white fixed">

      <div className="mt-16 ml-6 md:ml-16 text-[28px] md:text-[32px] font-bold">
        Student Dashboard
      </div>

      <div className="mt-4 ml-6 md:ml-16 mr-4 md:mr-20 flex flex-wrap gap-4 md:gap-6">
        <button
          className={tabscss("viewCourses")}
          onClick={() => setSelectedTab("viewCourses")}
        >
          View Enrolled Courses
        </button>

        <button
          className={tabscss("viewStudents")}
          onClick={() => setSelectedTab("viewStudents")}
        >
          View Assigned Teachers
        </button>

        <button
          className={tabscss("profile")}
          onClick={() => setSelectedTab("profile")}
        >
          My Profile
        </button>
      </div>

      <div className="mt-6 px-4 md:px-16">
        {selectedTab === "viewCourses" && <EnrolledCoursesTab />}
        {selectedTab === "viewStudents" && <AssignedTeachersTab />}
        {selectedTab === "profile" && <ProfileTab />}
      </div>
    </div>
  );
};
