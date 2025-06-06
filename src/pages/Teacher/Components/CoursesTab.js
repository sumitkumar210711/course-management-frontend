import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AddEditCourse } from './Modals/AddEditCourse';
import { fetchTeachers } from '../../../services/TeacherService/TeacherApi';
import { userAccountContext } from '../../../contextAPI/userAccountContext';
import { getCoursesByTeacherId } from '../../../services/mappingApi';
import { useQuery } from '@tanstack/react-query';

export const CoursesTab = () => {
  const [AddCourseModal, setAddCourseModal] =useState(false);

  const {userAuth} =useContext(userAccountContext);


  const handleModal = ()=>{
    setAddCourseModal(!AddCourseModal);
  }

  const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: ['courses', userAuth.token],
    queryFn: () => getCoursesByTeacherId(userAuth.user.id,userAuth.token),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  



const tablehead  = "py-3 px-6 text-left text-lg text-black border border-gray-800";

  return (
    <div className=" w-full md:mb-32 mb-44 pt-4">

        <button className=' text-[16px] font-medium float-right md:mr-0
         text-black border px-4 py-2 rounded-lg shadow-xl border-gray-600 bg-slate-400 mb-2'
         onClick={()=>handleModal()}
         >
            + Add New Course
        </button>

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
            <th className={tablehead}>Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 text-sm font-light">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <tr key={course.courseId} className="border-b border-gray-200 hover:bg-gray-100">
                <td className={tablehead}>{course.id}</td>
                <td className={tablehead}>{course.title}</td>
                <td className={tablehead}>{course.description}</td>
                <td className={tablehead}>{course.cost}</td>
                <td className={tablehead}>{course.status}</td>
                
                <td className={`${tablehead} text-center`}><button 
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

