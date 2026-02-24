import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LenisScroll from "./components/LenisScroll";
import Dashboard from "./pages/dashboard/dashboard";
import Interview from "./pages/dashboard/interview";

export default function App() {
    return (
        <>
            <LenisScroll />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/interview" element={<Interview />} />


            </Routes>
        </>
    );
}