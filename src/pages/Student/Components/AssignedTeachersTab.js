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



const tablehead  = "py-3 px-6 text-left text-lg text-gray-800 border border-gray-800";

  return (
    <div className=" w-full md:mb-32 mb-44 pl-4 md:pl-16 md:pr-16 pt-6">
       <div className='overflow-auto h-[380px] w-full border border-gray-400'>
          
      <table className="w-full overflow-y-auto border border-collapse
      border-r-2 border-gray-800 bg-white   rounded-lg overflow-x-auto">

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
              <tr key={teacher._id} className="border-b border-gray-200 hover:bg-gray-100">
             
                <td className={tablehead}>{teacher.teacher.name}</td>
                <td className={tablehead}>{teacher.teacher.email}</td>
                  <td className={tablehead}>{teacher.teacher.phone}</td>
                <td className={tablehead}>{teacher.courseTitle}</td>
                
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

