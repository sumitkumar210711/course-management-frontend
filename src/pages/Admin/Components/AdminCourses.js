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


const tablehead  = "py-3 px-6 text-left text-[15px] text-black border border-r-2 border-gray-800";
const tabledata  = "py-3 px-6 text-left text-[12px] text-black border border-r-2 border-gray-800";

  return (
    <div className=" w-full mb-44">
     <div className='overflow-auto h-[350px] w-full border border-gray-400'>
          
      <table className="w-full overflow-y-auto border border-collapse
      border-r-1 border-gray-800 bg-white  rounded-lg overflow-x-auto">

        <thead className='sticky top-0 z-10 border border-b-1  border-gray-800'>
               <tr className="bg-gray-100  uppercase text-sm leading-normal">
            <th className={tablehead}>Course Id</th>
            <th className={tablehead}>Course Title</th>
            <th className={tablehead}>Course Description</th>
            <th className={tablehead}>Course Cost</th>
            <th className={tablehead}>Course Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 text-[10px] font-light">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <tr key={course.courseId} className="border-b border-gray-200 hover:bg-gray-100">
                <td className={tabledata}>{course.courseId}</td>
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
            <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
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
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>


  );
};

