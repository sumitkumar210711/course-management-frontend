import React, { useEffect, useState } from 'react';

export const EnrolledCoursesTab = () => {
  const [courses, setCourses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(courses.length / coursesPerPage);


useEffect(() => {
   const dummyCourses = [
  {
    courseId: 'C101',
    title: 'Full-Stack Web Dev',
    description: 'Learn MERN Stack in-depth with hands-on labs.',
    cost: 10000,
    status: 'Published',
  },
  {
    courseId: 'C102',
    title: 'Data Structures',
    description: 'Master DS & Algo with real-world problems.',
    cost: 8500,
    status: 'Published',
  },
  {
    courseId: 'C103',
    title: 'UI/UX Design',
    description: 'Design intuitive UIs using Figma & Adobe XD.',
    cost: 7000,
    status: 'Draft',
  },
  {
    courseId: 'C104',
    title: 'Machine Learning',
    description: 'ML fundamentals with Python & Scikit-learn.',
    cost: 12000,
    status: 'Published',
  },
  {
    courseId: 'C105',
    title: 'Cloud Computing',
    description: 'Intro to AWS, Azure & Google Cloud.',
    cost: 9500,
    status: 'Archived',
  },
];
setCourses(dummyCourses);
},[]);



const tablehead  = "py-3 px-6 text-left text-lg text-black border  border-gray-800";

  return (
    <div className=" w-full md:mb-32 mb-44  pl-4 md:pl-16 md:pr-16 pt-6">
        
        <div className='overflow-auto h-[380px] w-full border border-gray-400'>
          
      <table className="w-full overflow-y-auto border border-collapse
      border-r-2 border-gray-800 bg-white   rounded-lg overflow-x-auto">

        <thead className='sticky top-0 z-10 border border-b-1  border-gray-800'>
          <tr className="bg-gray-100  uppercase text-sm leading-normal">
            <th className={tablehead}>Course Id</th>
            <th className={tablehead}>Course Title</th>
            <th className={tablehead}>Course Description</th>
            <th className={tablehead}>Course Cost</th>
            <th className={tablehead}>Course Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 text-sm font-light">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <tr key={course.courseId} className="border-b border-gray-200 hover:bg-gray-100">
                <td className={tablehead}>{course.courseId}</td>
                <td className={tablehead}>{course.title}</td>
                <td className={tablehead}>{course.description}</td>
                <td className={tablehead}>{course.cost}</td>
                <td className={tablehead}>{course.status}</td>
                
                    
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
            <div className=" mt-4 flex justify-end gap-4">
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

