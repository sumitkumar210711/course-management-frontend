/*
* file @login.js
This file is a react page which allows users to login as admin or student or teacher with the authenticated email id 
and password.
*/
import React,{useState, useEffect} from "react";
import {ToastContainer, toast} from 'react-toastify';
import { displayToastError, displayToastSuccess } from "../utils/toastHandler";
import { registration } from "../services/authAPI";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLoginForm = async(e) => {
        e.preventDefault();
        if (!email) {
            displayToastError("Please enter Your Email Id")
            return;
        }
        if(!password) {
            displayToastError("Please enter your password")
            return;
        }

        try{
            const loginResult = await registration(email, password);
            console.log("login Results", loginResult);
            displayToastSuccess("Logged In Successfull")
        
        }catch(error){
            console.log("Error",error);
            displayToastError(error.response.data.error);
        }

    }   

    const infoText  = "text-lg mb-4";
    const inputLabel = "block text-[14px] md:text-[18px] font-medium mb-2";
    const inputField = "w-full p-3 border border-gray-300 rounded";

    return(
        <>
        <ToastContainer />
        
        <div className="flex flex-col mt-16 m-10 md:ml-24 md:mr-24 md:mt-16 
        items-center gap-20 justify-center md:flex-row min-h-[calc(100vh-200px)] ">

            {/* Welcome Section : This section defines the info part */}
            <div className="w-full p-14 items-center justify-center rounded-2xl shadow-md md:hover:shadow-2xl bg-white">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Course Management System</h1>
                <p className={infoText}>
                    This is a simple course management system built with React and Tailwind CSS.</p>
                <p className={infoText}>
                    You can manage courses, students, and teachers easily.</p>
                <p className={infoText}>
                    Please login to access the system.</p>
            </div>

            {/* Login Form Section : This section defines the login form which allows you to log in */}

            <div>
            <div className="flex h-[300px] md:h-[350px] items-center 
            justify-center rounded-4xl shadow-md md:hover:shadow-2xl mb-36 md:mb-0">
                <div className="bg-white p-8 h-full w-96">
                    <h2 className=" text-[25px] md:text-[28px] font-bold mb-4 text-center">Login</h2>
                    <form>
                        <div className="mb-6">
                            <label className={inputLabel}>Email</label>
                            <input type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                             className={inputField} placeholder="Enter your email" />
                        </div>
                        <div className="mb-10">
                            <label className={inputLabel}>Password</label>
                            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required
                             className={inputField} placeholder="Enter your password" />
                        </div>
                        <button type="button" onClick={(e)=>handleLoginForm(e)}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
        
        </>
    )
}
export default LoginPage;