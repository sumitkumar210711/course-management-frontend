import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AddEditCourse } from './Modals/AddEditCourse';
import { fetchTeachers } from '../../../services/TeacherService/TeacherApi';
import { userAccountContext } from '../../../contextAPI/userAccountContext';
import { getCoursesByTeacherId } from '../../../services/mappingApi';


export const CoursesTab = () => {
  const [AddCourseModal, setAddCourseModal] =useState(false);

  const {userAuth} =useContext(userAccountContext);


  const handleModal = ()=>{
    setAddCourseModal((v) => {
      // If modal is open and now closing, refetch data
      if (v === true) {
        refetch();
      }
      return !v;
    });
  };
  const { data: courses = [], isLoading, isError,refetch } = useQuery({
    queryKey: ['courses', userAuth.token],
    queryFn: () => getCoursesByTeacherId(userAuth.user.userId,userAuth.token),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  



const tablehead = "py-3 px-4 text-left text-sm font-semibold text-black border border-gray-700";
const tabledata = "py-3 px-4 text-left text-sm text-gray-200 border borde-white-700";
  

  return (
    <div className=" w-full md:mb-32 mb-44 pt-4">

        <button className=' text-[16px] font-medium float-right md:mr-0
         text-black border px-4 py-2 rounded-lg shadow-xl border-gray-600 bg-slate-400 mb-2'
         onClick={()=>handleModal()}
         >
            + Add New Course
        </button>

        <div className="overflow-auto max-h-[350px] w-full rounded-lg border border-gray-700 bg-slate-800">
  <table className="w-full text-sm border-separate border-spacing-y-2">

        <thead className='sticky top-0 z-10 border border-b-1  border-gray-800'>
         <tr className="bg-gray-100  uppercase text-sm leading-normal">
            <th className={tablehead}>Course Id</th>
            <th className={tablehead}>Course Title</th>
            <th className={tablehead}>Course Description</th>
            <th className={tablehead}>Course Cost</th>
            <th className={tablehead}>Course Status</th>
            <th className={tablehead}>Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 text-sm font-light">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <tr key={course.courseId} className="border-b border-gray-200 hover:bg-gray-100">
                <td className={tabledata}>{index+1}</td>
                <td className={tabledata}>{course.title}</td>
                <td className={tabledata}>{course.description}</td>
                <td className={tabledata}>{course.cost}</td>
                <td className={tabledata}>{course.status}</td>
                
                <td className={`${tabledata} text-center`}><button 
                onClick={handleModal}
                className="px-4 py-1 rounded-lg bg-slate-400">

                    Edit

                    </button>
                    </td>
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

      {AddCourseModal &&(
        <AddEditCourse handleModal={handleModal} />
      )

      }

    </div>


  );
};

