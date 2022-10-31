import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";
import Login from "./components/Auth/Login";
import Categories from "./components/Categories/Categories";
import ToDos from "./components/ToDos/ToDos";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Logout from "./components/Auth/Logout";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Navigation />

                    <Routes>
                        <Route path="/" element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
                        <Route path="/todos" element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
                        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />                       
                        <Route path='/login' element={<Login/>} />
                        <Route path='/logout' element={<Logout/>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer/>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
