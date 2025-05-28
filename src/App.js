import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './Components/Header';
import Footer from "./Components/Footer";
import Login from "./pages/LoginPage"; // Ensure the path is correct based on your project structure
const App= () =>{
    return(
        <BrowserRouter>

              <div className="flex flex-col min-h-screen">
        <Header />
                     <main className="flex-grow pt-10 bg-gray-100">

                <Routes>
                    <Route path="/" element={<Login />} />
                <Route path="/login" element ={<Login />}/>
                </Routes>
            
            </main>
        
        <Footer />
        </div>


        </BrowserRouter>
    )
}

export default App;