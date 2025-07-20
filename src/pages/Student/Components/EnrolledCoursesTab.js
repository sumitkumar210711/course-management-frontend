import React, { useEffect, useState } from 'react';
import { EnrollmentForm } from './Modals/EnrollmentForm';
import { useQuery } from '@tanstack/react-query';
import { getCoursesByStudentId, getTeacherByStudentId } from '../../../services/mappingApi';
import { userAccountContext } from '../../../contextAPI/userAccountContext';
import { useContext } from 'react';

export const EnrolledCoursesTab = () => {
 
  const { userAuth } = useContext(userAccountContext);


    const { data: coursesEnrolled = [], isLoading, isError,refetch } = useQuery({
    queryKey: ['coursesEnrolled', userAuth.token],
    queryFn: () => getCoursesByStudentId(userAuth.user.userId,userAuth.token),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = coursesEnrolled.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(coursesEnrolled.length / coursesPerPage);


     const [enrollmentModal, setEnrollmentModal] =useState(false);
  const handleModal = ()=>{
    setEnrollmentModal(!enrollmentModal);
  }


const tablehead = "py-3 px-4 text-left text-sm font-semibold text-black border border-gray-700";
const tabledata = "py-3 px-4 text-left text-sm text-gray-200 border borde-white-700";
  

  return (
    <div className=" w-full md:mb-32 mb-44  pl-4 md:pl-16 md:pr-16 pt-6">
      <button className=' text-[16px] font-medium float-right md:mr-0
         text-black border px-4 py-2 rounded-lg shadow-xl border-gray-600 bg-slate-400 mb-2'
         onClick={()=> handleModal()}>
            Enrollment Form
                    </button>
        
     <div className="overflow-auto max-h-[350px] w-full rounded-lg border border-gray-700 bg-slate-800">
  <table className="w-full text-sm border-separate border-spacing-y-2">

        <thead className='sticky top-0 z-10 border border-b-1  border-gray-800'>
          <tr className="bg-gray-100  uppercase text-sm leading-normal">
           
            <th className={tablehead}>Course Title</th>
            <th className={tablehead}>Course Description</th>
            <th className={tablehead}>Course Cost</th>
            <th className={tablehead}>Course Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 text-sm font-light">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <tr key={course.courseId} className="border-b border-gray-200">
              
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
            <div className=" mt-4 flex justify-end gap-4 text-white">
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
          className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
        {
      enrollmentModal &&(
      <EnrollmentForm handleModal={handleModal}/>
    )

    }
    </div>
    


  );
};

