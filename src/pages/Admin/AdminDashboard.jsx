import Sidebar from "../../components/layouts/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen">
            <Sidebar />
            <main className="p-4 md:ml-64">
                <Outlet />
            </main>
        </div>
    );
}
