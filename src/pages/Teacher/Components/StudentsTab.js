import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { userAccountContext } from '../../../contextAPI/userAccountContext';
import { getStudentsByTeacherId } from '../../../services/mappingApi';
export const StudentsTab = () => {
 
 const {userAuth} =useContext(userAccountContext);

 
 const { data: teacherStudents = [], isLoading, isError,refetch } = useQuery({
    queryKey: ['teacherStudents', userAuth.token],
    queryFn: () => getStudentsByTeacherId(userAuth.user.userId,userAuth.token),
  });
  
 const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = teacherStudents.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(teacherStudents.length / studentsPerPage);


const tablehead = "py-3 px-4 text-left text-sm font-semibold text-black border border-gray-700";
const tabledata = "py-3 px-4 text-left text-sm text-gray-200 border borde-white-700";



  return (
    <div className=" w-full md:mb-32 mb-44 pt-4">
    
           <div className="overflow-auto max-h-[350px] w-full rounded-lg border border-gray-700 bg-slate-800">
  <table className="w-full text-sm border-separate border-spacing-y-2">

        <thead className='sticky top-0 z-10 border border-b-1  border-gray-800'>
      
          <tr className="bg-gray-100  uppercase text-sm leading-normal">
            <th className={tablehead}>Student Id</th>
            <th className={tablehead}>Student Name</th>
            <th className={tablehead}>Student Email</th>
            <th className={tablehead}>Student Phone</th>
            <th className={tablehead}>Courses Enrolled</th>
            
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {currentStudents.length > 0 ? (
            currentStudents.map((student, index) => (
              <tr key={student._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className={tabledata}>{index + 1}</td>
                <td className={tabledata}>{student.user.name}</td>
                <td className={tabledata}>{student.user.email}</td>
                <td className={tabledata}>{student.phone}</td>
                <td className={tabledata}>{student.courses_Enrolled}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No students found.
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

