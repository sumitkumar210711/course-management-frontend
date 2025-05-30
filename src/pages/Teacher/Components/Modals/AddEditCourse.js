import React, { useState, useEffect } from "react";

import { displayToastSuccess } from "../../../../utils/toastHandler";
import { useContext } from 'react';
import { userAccountContext } from "../../../../contextAPI/userAccountContext";
import { addEditCourse } from "../../../../services/CourseServices/CourseApi";
import { ToastContainer } from "react-toastify";

export const AddEditCourse = ({ handleModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [status, setStatus] = useState("Draft");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);

  const { userAuth } = useContext(userAccountContext);



  const handleSave = () => {
    const courseData = {
      title,
      description,
      cost,
      status,
      startDate,
      endDate,
      teacherId: userAuth.user.id
    };
    console.log("Saved Course:", courseData, );
    
    try{
        const res = addEditCourse(courseData, userAuth.token);
        console.log("course created successfully", res);
        displayToastSuccess(`Course ${courseData.title} Created Successfully`)

    }catch(error){
        console.error("error",error);

    }
    
  };


  return (

    <div className="flex items-center justify-center fixed bg-black bg-opacity-50 inset-0 z-50">
      <div className="bg-white rounded-xl text-[14px] md:w-[60%] w-[95%] h-[70%] overflow-y-auto relative">
        <header className=" w-full h-16 bg-green-300 rounded-t-xl">
          <p className="pl-6 pt-4 text-[20px] font-bold">Add New Course</p>
        </header>
<ToastContainer />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Title</label>
            <input
              type="text"
              className="border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Cost</label>
            <input
              type="number"
              className="border rounded px-3 py-2"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Enter cost"
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="mb-1 font-medium">Description</label>
            <textarea
              className="border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              rows={3}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Status</label>
            <select
              className="border rounded w-full md:px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Start Date</label>
            <input
              type="date"
              className="border rounded px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">End Date</label>
            <input
              type="date"
              className="border rounded px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>


        </div>

        
        <div className="p-6 float-right flex gap-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={handleModal}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
