import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './Components/Header';
import Footer from "./Components/Footer";
import Login from "./pages/LoginPage"; // Ensure the path is correct based on your project structure

import { SecureRoute } from "./Components/SecureRoute";
import { StudentDashboard } from "./pages/Student/StudentDashboard";
import { TeacherDashboard } from "./pages/Teacher/TeacherDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
const App= () =>{
    return(
        <BrowserRouter>

              <div className="flex flex-col min-h-screen">
                <Header />
                     <main className=" bg-gray-100">

                <Routes>
                    <Route path = "*" element={<Login />} />
                    <Route path="/" element={<Login />} />
                <Route path="/login" element ={<Login />}/>

                
        <Route element={<SecureRoute allowedUserRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<SecureRoute allowedUserRoles={['student']} />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Route>

        <Route element={<SecureRoute allowedUserRoles={['teacher']} />}>
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        </Route>


                </Routes>
            
            </main>
        
        <Footer />
        </div>


        </BrowserRouter>
    )
}

export default App;