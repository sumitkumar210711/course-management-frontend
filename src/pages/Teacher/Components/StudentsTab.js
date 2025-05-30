import React, { useEffect, useState } from 'react';
import { EnrollmentForm } from './Modals/EnrollmentForm';

export const StudentsTab = () => {
  const [students, setStudents] = useState([]);
  const [enrollmentModal, setEnrollmentModal] =useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleModal = ()=>{
    setEnrollmentModal(!enrollmentModal);
  }

  


useEffect(() => {
    const dummyStudents = [
      {
        _id: '1',
        name: 'Dr. Ramesh Verma',
        email: 'ramesh.verma@example.com',
        courses_Enrolled: ['Math 101', 'Physics 201'],
      },
      {
        _id: '2',
        name: 'Ms. Anjali Mehta',
        email: 'anjali.mehta@example.com',
        courses_Enrolled: ['English Literature'],
      },
      {
        _id: '3',
        name: 'Mr. Arjun Sen',
        email: 'arjun.sen@example.com',
        courses_Enrolled: ['Computer Science'],
      },
    ];
    setStudents(dummyStudents);
  }, []);


const tablehead  = "py-3 px-6 text-left text-lg text-gray-800 border border-gray-800";

  return (
    <div className=" w-full md:mb-32 mb-44 pt-4">
    <button className=' text-[16px] font-medium float-right md:mr-0
         text-black border px-4 py-2 rounded-lg shadow-xl border-gray-600 bg-slate-400 mb-2'
         onClick={()=> handleModal()}>
            Enrollment Form
                    </button>
                <div className='overflow-auto h-[350px] w-full border border-gray-400'>
          
      <table className="w-full overflow-y-auto border border-collapse
      border-r-1 border-gray-800 bg-white  rounded-lg overflow-x-auto">

        <thead className='sticky top-0 z-10 border border-b-1  border-gray-800'>
      
          <tr className="bg-gray-100  uppercase text-sm leading-normal">
            <th className={tablehead}>Student Id</th>
            <th className={tablehead}>Student Name</th>
            <th className={tablehead}>Student Email</th>
            <th className={tablehead}>Courses Enrolled</th>
            
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {currentStudents.length > 0 ? (
            currentStudents.map((student, index) => (
              <tr key={student._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className={tablehead}>{index + 1}</td>
                <td className={tablehead}>{student.name}</td>
                <td className={tablehead}>{student.email}</td>
                <td className={tablehead}>{student.courses_Enrolled?.length || 0}</td>
                
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

    {
      enrollmentModal &&(
      <EnrollmentForm handleModal={handleModal}/>
    )

    }


    </div>


  );
};

