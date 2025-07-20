import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AddStudent } from './Modals/AddStudent';
import { fetchStudent } from '../../../services/StudentService/StudentApi';
import { userAccountContext } from '../../../contextAPI/userAccountContext';

export const AdminStudent = () => {
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  const {userAuth} =useContext(userAccountContext);

  const { data: students = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: () => fetchStudent(userAuth.token), 
 });

  const handleModal = () => {
    setAddStudentModal((v) => {
      // If modal is open and now closing, refetch data
      if (v === true) {
        refetch();
      }
      return !v;
    });
  };

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(students.length / studentsPerPage);

 const tablehead  = "py-3 px-6 text-left text-[15px] text-black border border-r-2 border-gray-800";
const tabledata  = "py-3 px-6 text-left text-[12px] text-black border border-r-2 border-gray-800";

  return (
    <div className="w-full">
      <button
        className="float-right text-md md:text-xl font-semibold border rounded-md border-slate-800 bg-slate-300 px-2 md:px-4 py-2 mb-2"
        onClick={handleModal}
      >
        Add/Register Student
      </button>

      <div className='overflow-auto h-[350px] w-full border border-gray-400'>
        <table className="w-full border border-collapse bg-white rounded-lg">
          <thead className='sticky top-0 z-10 bg-gray-100'>
            <tr className="uppercase text-sm leading-normal">
              <th className={tablehead}>Id</th>
              <th className={tablehead}>Name</th>
              <th className={tablehead}>Email</th>
              <th className={tablehead}>Phone</th>
              <th className={tablehead}>Courses</th>
              <th className={tablehead}>Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {isLoading ? (
              <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
            ) : isError ? (
              <tr><td colSpan="5" className="text-center text-red-500 py-4">Error loading students.</td></tr>
            ) : currentStudents.length > 0 ? (
              currentStudents.map((student, idx) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className={tabledata}>{indexOfFirst + idx + 1}</td>
                  <td className={tabledata}>{student.name}</td>
                  <td className={tabledata}>{student.email}</td>
                  <td className={tabledata}>{student.phone}</td>
                  <td className={tabledata}>{(student.courses_Enrolled || []).length}</td>
                  <td className={`${tabledata} text-center`}>
                    <button className="px-4 py-1 rounded-lg bg-slate-400" onClick={handleModal}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="py-4 px-6 text-center text-gray-500">No students found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center font-semibold">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {addStudentModal && <AddStudent handleModal={handleModal} />}
    </div>
  );
};
