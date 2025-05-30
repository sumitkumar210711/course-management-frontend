import React, { useState, useEffect, useRef } from "react";

export const EnrollmentForm = ({ handleModal }) => {
  const students = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
  ];

  const courses = [
    { id: "c1", title: "React Fundamentals" },
    { id: "c2", title: "Advanced Node.js" },
    { id: "c3", title: "MongoDB Basics" },
  ];

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (students.length) setSelectedStudent(students[0].id);
  }, [students]);

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

  const handleSave = () => {
    console.log("Enrolling", selectedStudent, "in courses:", selectedCourses);
    handleModal();
  };

  return (
    <div className="flex items-center justify-center fixed bg-black bg-opacity-50 inset-0 z-50">
      <div className="bg-white rounded-xl text-[14px] md:w-[60%] w-[95%] md:h-[30%] relative">
        <header className=" w-full h-16 bg-green-300 rounded-t-xl">
          <p className="pl-6 pt-4 text-[20px] font-bold">
            Enroll Student to Courses
          </p>
        </header>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Select Student Name</label>
            <select
              className="border rounded px-3 py-2"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              {students.map((stu) => (
                <option key={stu.id} value={stu.id}>
                  {stu.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col relative" ref={dropdownRef}>
            <label className="mb-1 font-medium">Select Courses</label>
            <div
              className="border rounded px-3 py-2 cursor-pointer bg-white"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {selectedCourses.length > 0
                ? courses
                    .filter((c) => selectedCourses.includes(c.id))
                    .map((c) => c.title)
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
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleCourseToggle(course.id)}
                    />
                    {course.title}
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
