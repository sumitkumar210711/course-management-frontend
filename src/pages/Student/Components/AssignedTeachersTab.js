import React, { useEffect, useState } from 'react';
import { getTeacherByStudentId } from '../../../services/mappingApi';
import { useQuery } from '@tanstack/react-query';
import { userAccountContext } from '../../../contextAPI/userAccountContext';
import { useContext } from 'react';

export const AssignedTeachersTab = () => {
  
  const { userAuth } = useContext(userAccountContext);


    const { data: teachers = [], isLoading, isError,refetch } = useQuery({
    queryKey: ['teachers', userAuth.token],
    queryFn: () => getTeacherByStudentId(userAuth.user.userId,userAuth.token),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 4;

  const indexOfLast = currentPage * teachersPerPage;
  const indexOfFirst = indexOfLast - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(teachers.length / teachersPerPage);



const tablehead = "py-3 px-4 text-left text-sm font-semibold text-black border border-gray-700";
const tabledata = "py-3 px-4 text-left text-sm text-gray-200 border borde-white-700";
  

  return (
    <div className=" w-full md:mb-32 mb-44 pl-4 md:pl-16 md:pr-16 pt-6">
       <div className="overflow-auto max-h-[350px] w-full rounded-lg border border-gray-700 bg-slate-800">
  <table className="w-full text-sm border-separate border-spacing-y-2">

        <thead className='sticky top-0 z-10 border border-b-1  border-gray-800'>
         
          <tr className="bg-gray-100  uppercase text-sm leading-normal">
          
            <th className={tablehead}>Teacher Name</th>
            <th className={tablehead}>Teacher Email</th>
             <th className={tablehead}>Teacher Phone</th>
            <th className={tablehead}>Teacher Courses Name</th>
            
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {currentTeachers.length > 0 ? (
            currentTeachers.map((teacher, index) => (
              <tr key={teacher._id} className="border-b border-gray-200">
             
                <td className={tabledata}>{teacher.teacher.name}</td>
                <td className={tabledata}>{teacher.teacher.email}</td>
                  <td className={tabledata}>{teacher.teacher.phone}</td>
                <td className={tabledata}>{teacher.courseTitle}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
            <div className="mt-4 flex justify-end text-white gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 disabled:opacity-50"
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
          className="px-4 py-2 bg-gray-300  text-white rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>


  );
};

