import React, { useContext, useEffect, useState } from "react";
import { displayToastError, displayToastSuccess } from "../../../../utils/toastHandler";
import { userAccountContext } from "../../../../contextAPI/userAccountContext";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { assignTeacherToStudents, fetchStudent } from "../../../../services/StudentService/StudentApi"; // <-- Create this
import Select from "react-select";
import { fetchTeachers } from "../../../../services/TeacherService/TeacherApi";

export const AssignStudents = ({ handleModal }) => {
  const { userAuth } = useContext(userAccountContext);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const { data: teachers = [] } = useQuery({
    queryKey: ['teachers', userAuth.token],
    queryFn: () => fetchTeachers(userAuth.token),
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudent(userAuth.token),
  });

  const handleSave = async () => {
    try {
      if (!selectedTeacher || selectedStudents.length === 0) {
        return displayToastError("Please select a Teacher and at least one Student.");
      }

      const id = selectedTeacher.value;

      const payload = {
        students: selectedStudents.map(t => t.value),
      };

      const res = await assignTeacherToStudents(id,payload, userAuth.token);
      displayToastSuccess("Student assigned to teachers successfully");
      handleModal();
    } catch (error) {
      console.error("error", error);
      displayToastError(error?.response?.data?.error || error.message);
    }
  };

  const studentOptions = students.map(std => ({
    value: std.id,
    label: std.name,
  }));

  const teacherOptions = teachers.map(teacher => ({
    value: teacher.id,
    label: teacher.name,
  }));

  return ( 
       <div className="flex items-center justify-center fixed bg-black bg-opacity-50 inset-0 z-50">
      
      <div className="bg-white rounded-xl text-[14px] md:w-[50%] md:h-[50%] w-[95%] h-[50%] relative">
        <ToastContainer />
        <header className="w-full h-16 bg-gray-300 rounded-t-xl">
          <p className="pl-6 pt-4 text-[20px] font-bold">Assign Teacher to Students</p>
        </header>

        

        <div className="p-6 mt-4 space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Select Teacher</label>
            <Select
              options={teacherOptions}
              value={selectedTeacher}
              onChange={setSelectedTeacher}
              placeholder="Choose a Teacher"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Select Students</label>
            <Select
              options={studentOptions}
              isMulti
              value={selectedStudents}
              onChange={setSelectedStudents}
              placeholder="Choose one or more Student"
            />
          </div>
        </div>

        <div className="p-6 flex justify-end gap-4">
          <button
            onClick={handleModal}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
