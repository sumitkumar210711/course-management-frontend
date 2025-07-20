import React, { useContext } from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaBook } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { userAccountContext } from "../../../contextAPI/userAccountContext";
import { fetchTeachers } from "../../../services/TeacherService/TeacherApi";
import { fetchStudent } from "../../../services/StudentService/StudentApi";
import { fetchCourses } from "../../../services/CourseServices/CourseApi";

export const Home = () => {
  const { userAuth } = useContext(userAccountContext);

  const { data: teachers = [], isLoading: loadingTeachers } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => fetchTeachers(userAuth.token),
  });

  const { data: students = [], isLoading: loadingStudents } = useQuery({
    queryKey: ['students'],
    queryFn: () => fetchStudent(userAuth.token),
  });


  
  const { data: courses = [], isLoading: loadingCourses } = useQuery({
      queryKey: ['courses', userAuth.token],
      queryFn: () => fetchCourses(userAuth.token),
    });
  
  const cardStyle =
    "h-[250px] w-[300px] rounded-xl shadow-xl bg-white border border-gray-300 flex flex-col justify-center items-center p-6 hover:shadow-2xl transition-shadow duration-300";

  const titleStyle = "text-2xl font-semibold text-gray-700 mt-4";
  const countStyle = "text-5xl font-bold text-blue-600";

  return (
    <div className="md:grid md:grid-cols-3 flex flex-col gap-8 mt-10 mb-28 justify-center items-center">
      {/* Teachers Card */}
      <div className={cardStyle}>
        <FaChalkboardTeacher className="text-6xl text-indigo-600" />
        <div className={titleStyle}>Total Teachers</div>
        <div className={countStyle}>
          {loadingTeachers ? "..." : teachers.length}
        </div>
      </div>

      {/* Students Card */}
      <div className={cardStyle}>
        <FaUserGraduate className="text-6xl text-green-600" />
        <div className={titleStyle}>Total Students</div>
        <div className={countStyle}>
          {loadingStudents ? "..." : students.length}
        </div>
      </div>

      {/* Courses Card (Optional Static for now) */}
      <div className={cardStyle}>
        <FaBook className="text-6xl text-yellow-600" />
        <div className={titleStyle}>Total Courses</div>
        <div className={countStyle}>{loadingCourses ? "..." : courses.length}</div>
      </div>
    </div>
  );
};
