import { useState } from "react";
import { supabase } from "../../config/db";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg("Login berhasil!");
            navigate("/admin");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-smporange font-inter gap-7">
            <div className="flex flex-col items-center gap-5">
                <img src="logo.png" alt="logo" className="w-30" />
                <h1 className="text-center font-bold text-white text-xl font-inter">
                    Login Admin <br />
                    SMP Negeri 20 Semarang
                </h1>
            </div>
            <div className="flex flex-col items-center gap-5 bg-white px-9 py-7 rounded-lg w-lg">
                <h2 className="text-center font-bold text-xl">Silahkan Login</h2>
                {errorMsg && (
                    <div className="p-2 text-sm text-red-600 bg-red-100 rounded">{errorMsg}</div>
                )}
                {successMsg && (
                    <div className="p-2 text-sm text-green-600 bg-green-100 rounded">
                        {successMsg}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-7 w-full ">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-regular">Email</label>
                        <input
                            type="email"
                            placeholder="Masukkan Email Anda"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-sm font-normal w-full px-4 py-2 border border-smpgray/50 rounded-sm focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Masukkan Password Anda"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-sm font-medium w-full px-4 py-2 border border-smpgray/50 rounded-sm focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-base text-white bg-smporange hover:bg-smpdarkorange rounded-lg px-4 py-2 transition-all duration-300 ease-in-out font-semibold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
