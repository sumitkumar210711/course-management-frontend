import React, { useState, useEffect, useRef, use } from "react";
import { useQuery } from "@tanstack/react-query";


import { useContext } from 'react';
import { displayToastSuccess } from "../../../../utils/toastHandler";
import { ToastContainer } from "react-toastify";
import { assignCourseToStudent, getTeacherByStudentId } from "../../../../services/mappingApi";
import { userAccountContext } from "../../../../contextAPI/userAccountContext";
import { assignTeacherToStudents } from "../../../../services/StudentService/StudentApi";

export const EnrollmentForm = ({ handleModal }) => {
 
  const { userAuth } = useContext(userAccountContext);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

 
    const { data: courses = [], isLoading, isError,refetch } = useQuery({
    queryKey: ['courses', userAuth.token],
    queryFn: () => getTeacherByStudentId(userAuth.user.userId,userAuth.token),
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCourseToggle = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSave = async () => {
  try {
    await assignCourseToStudent(userAuth.user.userId, selectedCourses, userAuth.token);
    displayToastSuccess("Courses assigned successfully!");
    handleModal();
  } catch (error) {
    // Optionally show an error toast
    console.error(error);
  }
};

  return (
    <div className="flex items-center justify-center fixed bg-black bg-opacity-50 inset-0 z-50">
      <div className="bg-white rounded-xl text-[14px] md:w-[60%] w-[95%] md:h-[30%] relative">
        <header className=" w-full h-16 bg-green-300 rounded-t-xl">
          <p className="pl-6 pt-4 text-[20px] font-bold">
            Enroll to Courses
          </p>
        </header>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        

          <div className="flex flex-col relative" ref={dropdownRef}>
            <label className="mb-1 font-medium">Select Courses</label>
            <div
              className="border rounded px-3 py-2 cursor-pointer bg-white"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {selectedCourses.length > 0
                ? courses
                    .filter((c) => selectedCourses.includes(c.courseId))
                    .map((c) => c.courseTitle)
                    .join(", ")
                : "Select one or more courses"}
            </div>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-md border rounded mt-1 z-10 max-h-44 overflow-y-auto">
                {courses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCourses.includes(course.courseId)}
                      onChange={() => handleCourseToggle(course.courseId)}
                    />
                    {course.courseTitle}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="float-right mb-6 mr-6 flex gap-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={handleModal}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
