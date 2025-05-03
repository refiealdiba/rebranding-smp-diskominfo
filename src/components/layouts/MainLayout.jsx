import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const MainLayout = () => {
    return (
        <div className="min-h-screen w-full">
            <Navbar />
            <div className="text-3xl font-bold flex justify-center min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
