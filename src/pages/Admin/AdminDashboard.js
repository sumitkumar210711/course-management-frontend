import React, { useContext, useEffect, useState } from "react";
import { userAccountContext } from "../../contextAPI/userAccountContext";
import SidebarComponent from "./Components/SidebarComponent";
import { Menu } from "lucide-react";
import { SidebarOptions } from "./Components/SidebarOptions";
import { Home } from "./Components/Home";
import { AdminTeacher } from "./Components/AdminTeacher";
import { AdminStudent } from "./Components/AdminStudent";
import { AdminCourses } from "./Components/AdminCourses";
import { AssignStudents } from "./Components/Modals/AssignStudents";
import { ToastContainer } from "react-toastify";

const AdminDashboard = () => {
  const { userAuth } = useContext(userAccountContext);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Home");

  const handleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const [assignModal, setAssignModal] =useState(false);

  const handleModal = ()=>{
    setAssignModal(!assignModal);
    if(assignModal){
      setSelectedOption("Home");
    }

  }

  useEffect(()=>{
    setMobileSidebarOpen(false);
  },[selectedOption]);

  return (
    <>
            <ToastContainer />
      <div className="flex flex-row bg-white">
        
        <SidebarComponent
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleModal={handleModal}
        />



        <div className="ml-0 md:ml-4 p-4 md:mt-11 overflow-y-auto w-full">
          
          <div className="md:hidden mb-4">
            <button
              className="text-gray-500"
              onClick={handleMobileSidebar}
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Welcome Message */}
          <div className="text-[18px] md:text-[30px] text-black mb-6">
            Welcome, <span className="font-bold">{userAuth?.user?.name}</span>
          </div>

          <div className="space-x-10 mt-2">

          {/* Conditional Component Rendering */}
          {selectedOption === "Home" && <Home />}
          {selectedOption === "Teacher" && <AdminTeacher />}
          {selectedOption === "Student" && <AdminStudent />}
          {selectedOption === "Courses" && <AdminCourses />}
          
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Options */}
      {mobileSidebarOpen && (
        <div className="fixed top-24 left-14 z-50 h-auto w-56 pt-2 bg-gray-300 rounded shadow-md text-[14px] font-semibold text-black md:hidden">
          <SidebarOptions
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            handleModal={handleModal}
          />

        </div>


      )}

      {assignModal &&(
        <AssignStudents handleModal={handleModal}/>
      )

      }
    </>
  );
};

export default AdminDashboard;
