import React from "react";

export const RegisterationForm = ({
    name, setName, emailId, setEmailId, phoneNo, setPhoneNo, password, setPassword, handleModal, handleSave
})=>{
    return(
        <>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Name</label>
            <input
              type="text"
              className="border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email ID</label>
            <input
              type="email"
              className="border rounded px-3 py-2"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              className="border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Phone No</label>
            <input
              type="tel"
              className="border rounded px-3 py-2"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="absolute bottom-0 right-0 mb-6 mr-6 flex gap-4">
          
          <button
            onClick={handleModal}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>

        </>
    )
}