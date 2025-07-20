import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';


import { userAccountContext } from '../../../contextAPI/userAccountContext';
import { fetchCourses } from '../../../services/CourseServices/CourseApi';

export const AdminCourses = () => {
 const { userAuth } = useContext(userAccountContext);
  const [currentPage, setCurrentPage] = useState(1);
 


const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: ['courses', userAuth.token],
    queryFn: () => fetchCourses(userAuth.token),
  });

   const coursesPerPage = 7;

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(courses.length / coursesPerPage);


const tablehead = "py-3 px-4 text-left text-sm font-semibold text-black border border-gray-700";
const tabledata = "py-3 px-4 text-left text-sm text-gray-200 border borde-white-700";
  

  return (
    <div className=" w-full mb-44">
    <div className="overflow-auto max-h-[350px] w-full rounded-lg border border-gray-700 bg-slate-800">
  <table className="w-full text-sm border-separate border-spacing-y-2">


      <thead className="sticky top-0 z-10 bg-slate-900 shadow-md">
               <tr className="bg-gray-100  uppercase text-sm leading-normal">
        
            <th className={tablehead}>Course Title</th>
            <th className={tablehead}>Course Description</th>
            <th className={tablehead}>Course Cost</th>
            <th className={tablehead}>Course Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <tr key={course.courseId} className="border-b border-gray-200 ">
             
                <td className={tabledata}>{course.title}</td>
                <td className={tabledata}>{course.description}</td>
                <td className={tabledata}>{course.cost}</td>
                <td className={tabledata}>{course.status}</td>
                  </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      </div>
            <div className="mt-4 flex justify-end gap-4 text-white">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>


  );
};

