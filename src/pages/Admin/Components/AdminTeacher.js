import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AddTeacher } from './Modals/AddTeacher';
import { fetchTeachers } from '../../../services/TeacherService/TeacherApi';
import { userAccountContext } from '../../../contextAPI/userAccountContext';

export const AdminTeacher = () => {
  const { userAuth } = useContext(userAccountContext);
  const [addTeacherModal, setAddTeacherModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 4;

  const { data: teachers = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['teachers', userAuth.token],
    queryFn: () => fetchTeachers(userAuth.token),
  });

  const handleModal = () => {
    setAddTeacherModal((v) => {
      // If modal is open and now closing, refetch data
      if (v === true) {
        refetch();
      }
      return !v;
    });
  };

  // pagination logic
  const indexOfLast = currentPage * teachersPerPage;
  const indexOfFirst = indexOfLast - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(teachers.length / teachersPerPage);

const tablehead = "py-3 px-4 text-left text-sm font-semibold text-black border border-gray-700";
const tabledata = "py-3 px-4 text-left text-sm text-gray-200 border borde-white-700";


  return (
    <div className="">
      <button
        className="float-right text-md md:text-xl font-semibold border rounded-md border-slate-800 bg-slate-300 px-2 md:px-4 py-2 mb-2"
        onClick={handleModal}
      >
        Add/Register Teacher
      </button>

         <div className="overflow-auto max-h-[350px] w-full rounded-lg border border-gray-700 bg-slate-800">
  <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr className="uppercase text-sm leading-normal">
          
              <th className={tablehead}>Teacher Name</th>
              <th className={tablehead}>Teacher Email</th>
              <th className={tablehead}>Teacher Phone</th>
              <th className={tablehead}>Assigned Courses</th>
              <th className={tablehead}>Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="5" className="text-center text-red-500 py-4">
                  Error loading teachers.
                </td>
              </tr>
            ) : currentTeachers.length > 0 ? (
              currentTeachers.map((teacher, idx) => (
                <tr
                  key={teacher.id}
                  className="border-b border-gray-200 "
                >
                
                  <td className={tabledata}>{teacher.name}</td>
                  <td className={tabledata}>{teacher.email}</td>
                  <td className={tabledata}>{teacher.phone}</td>
                  <td className={tabledata}>
                    {(teacher.courses || []).length}
                  </td>
                  <td className={`${tabledata} text-center`}>
                    <button
                      className="px-4 py-1 rounded-lg bg-slate-400"
                      onClick={handleModal}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 px-6 text-center text-gray-500"
                >
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end gap-4 text-white">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {addTeacherModal && <AddTeacher handleModal={handleModal} />}
    </div>
  );
};
