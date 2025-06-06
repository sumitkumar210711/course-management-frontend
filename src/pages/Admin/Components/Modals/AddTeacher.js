import React, { useContext, useState } from "react";
import { RegisterationForm } from "../../../../Components/RegisterationForm";
import { displayToastError, displayToastSuccess } from "../../../../utils/toastHandler";
import { registerTeacher } from "../../../../services/TeacherService/TeacherApi";
import { userAccountContext } from "../../../../contextAPI/userAccountContext";
import { ToastContainer } from "react-toastify";

export const AddTeacher = ({ handleModal }) => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const {userAuth} =useContext(userAccountContext);

const handleSave = async () => {
  // Trim values to avoid spaces-only issues
  const trimmedName = name.trim();
  const trimmedEmail = emailId.trim();
  const trimmedPassword = password.trim();
  const trimmedPhone = phoneNo.trim();

  // Basic validations
  if (!trimmedName) {
    return displayToastError("Name is required.");
  }

  if (trimmedName.length < 3) {
    return displayToastError("Name should be at least 3 characters long.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return displayToastError("Please enter a valid email address.");
  }

  if (!trimmedPassword) {
    return displayToastError("Password is required.");
  }

  if (trimmedPassword.length < 6) {
    return displayToastError("Password should be at least 6 characters long.");
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
    return displayToastError("Phone number must be a valid 10-digit number.");
  }

  const teacherData = {
    name: trimmedName,
    emailId: trimmedEmail,
    password: trimmedPassword,
    phoneNo: trimmedPhone,
    role: "teacher",
  };

  try{
            const res = registerTeacher(teacherData, userAuth.token);
            console.log("Teacher Registered Successfully", res);
            displayToastSuccess(`Teacher ${teacherData.name} Registered Successfully`);
    
        }catch(error){
            if(error.message === 'Network Error'){
                            displayToastError(error.message);
                        }
                        if(error?.response?.data){
                            displayToastError(error?.response?.data?.error);
                        }
         }   
  };

  return (
    
    
    <div className="flex items-center justify-center fixed bg-black bg-opacity-50 inset-0 z-50">
      
      <div className="bg-white rounded-xl text-[14px] md:w-[50%] md:h-[40%] w-[95%] h-[60%] relative">
        
        <header className="w-full h-16 bg-gray-300 rounded-t-xl">
          <p className="pl-6 pt-4 text-[20px] font-bold">Add New Teacher</p>
        </header>

        <ToastContainer />
                <RegisterationForm 
                name={name}
                setName={setName}
                emailId={emailId}
                setEmailId={setEmailId}
                phoneNo={phoneNo}
                setPhoneNo={setPhoneNo}
                password={password}
                setPassword={setPassword}
                handleModal={handleModal}
                handleSave={handleSave}
        
                />
      </div>
    </div>
  );
};
