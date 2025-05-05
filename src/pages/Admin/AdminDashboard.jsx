import Sidebar from "../../components/layouts/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
                <main className="flex-1 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
