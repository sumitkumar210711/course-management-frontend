/*
* file @login.js
This file is a react page which allows users to login as admin or student or teacher with the authenticated email id 
and password.
*/
import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { displayToastError, displayToastSuccess } from "../utils/toastHandler";
import { registration } from "../services/authAPI";
import { userAccountContext } from "../contextAPI/userAccountContext";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, logout } = useContext(userAccountContext);
    const { userAuth } = useContext(userAccountContext);
    const navigateRoute = useNavigate();

    const handleLoginForm = async (e) => {
        e.preventDefault();
        if (!email) {
            displayToastError("Please enter Your Email Id")
            return;
        }
        if (!password) {
            displayToastError("Please enter your password")
            return;
        }

        setIsLoading(true);
        try {
            const loginResult = await registration(email, password);
            console.log("login results:", loginResult);

            const user = loginResult.data.data.loggedUser.user;
            const token = loginResult.data.data.token;
            displayToastSuccess("Logged In Successfull");
            console.log("token and user", token, user.role);

            login(token, user);

            if (user.role === 'admin') {
                setTimeout(() => {
                    navigateRoute('/admin-dashboard')
                }, 1500);
            }
            if (user.role === 'teacher') {
                setTimeout(() => {
                    navigateRoute('/teacher-dashboard')
                }, 1500);
            }
            if (user.role === 'student') {
                setTimeout(() => {
                    navigateRoute('/student-dashboard')
                }, 1500);
            }

        } catch (error) {
            console.log("Error", error.message);
            if (error.message === 'Network Error') {
                displayToastError(error.message);
            }
            if (error?.response?.data) {
                displayToastError(error?.response?.data?.error);
            }
            logout();
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <ToastContainer />
            
            {/* Background with gradient and animated shapes */}
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            
                            {/* Welcome Section with modern glassmorphism */}
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3 mb-8">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                            Course Management System
                                        </h1>
                                    </div>
                                    
                                    <div className="space-y-4 text-gray-300">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-lg leading-relaxed">
                                                Modern course management system built with cutting-edge technology
                                            </p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-lg leading-relaxed">
                                                Seamlessly manage courses, students, and teachers in one place
                                            </p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-lg leading-relaxed">
                                                Secure authentication with role-based access control
                                            </p>
                                        </div>
                                    </div>

                                    {/* Feature badges */}
                                    <div className="flex flex-wrap gap-3 mt-8">
                                        <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-300/30 rounded-full text-sm text-purple-200 backdrop-blur-sm">
                                            Admin Panel
                                        </span>
                                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-300/30 rounded-full text-sm text-blue-200 backdrop-blur-sm">
                                            Teacher Portal
                                        </span>
                                        <span className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-300/30 rounded-full text-sm text-indigo-200 backdrop-blur-sm">
                                            Student Access
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Login Form with modern design */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="w-full max-w-md">
                                    <div className="backdrop-blur-xl bg-white/95 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
                                        
                                        {/* Header */}
                                        <div className="text-center mb-2">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                                            <p className="text-gray-600">Sign in to access your dashboard</p>
                                            <p className="text-gray-600 text-sm"> Admin User: sumitkumar210711@gmail.com </p> 
                                            <p className="text-gray-600 text-sm"> Admin Password: sumitkumar2107  </p>


                                        </div>



                                        <form className="space-y-6">
                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white"
                                                        placeholder="Enter your email"
                                                    />
                                                </div>
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700">Password</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white"
                                                        placeholder="Enter your password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? (
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Login Button */}
                                            <button
                                                type="button"
                                                onClick={(e) => handleLoginForm(e)}
                                                disabled={isLoading}
                                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        <span>Signing In...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <span>Sign In</span>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        </form>

                                        {/* Footer */}
                                        <div className="mt-8 text-center">
                                            <p className="text-sm text-gray-500">
                                                Secure login powered by advanced encryption
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;