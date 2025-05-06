import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/db";
import Sidebar from "../../components/layouts/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                navigate("/login");
            }
        };

        checkSession();
    }, [navigate]);

    return (
        <div className="min-h-screen">
            <Sidebar />
            <main className="p-4 md:ml-64">
                <Outlet />
            </main>
        </div>
    );
}
