import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet /> {/* Ini menampilkan konten dari route child */}
                </main>
            </div>
        </div>
    );
}
