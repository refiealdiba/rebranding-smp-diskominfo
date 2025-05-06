import { useState } from "react";
import { supabase } from "../../config/db";
import { Mail, Lock } from "lucide-react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg("Registrasi berhasil! Silakan cek email untuk verifikasi.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
            <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl space-y-6">
                <h1 className="text-3xl font-extrabold text-center text-blue-600">Buat Akun</h1>

                {errorMsg && (
                    <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md shadow">
                        {errorMsg}
                    </div>
                )}
                {successMsg && (
                    <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md shadow">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 bg-white">
                            <Mail className="text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 bg-white">
                            <Lock className="text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-200"
                    >
                        Daftar Sekarang
                    </button>
                </form>

                <p className="text-xs text-center text-gray-500">
                    Dengan mendaftar, Anda menyetujui kebijakan privasi kami.
                </p>
            </div>
        </div>
    );
}
