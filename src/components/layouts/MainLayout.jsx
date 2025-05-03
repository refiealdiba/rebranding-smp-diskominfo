import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MainLayout = () => {
    return (
        <div className="min-h-screen w-full">
            <Navbar />
            <div className="text-3xl font-bold flex justify-center min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
