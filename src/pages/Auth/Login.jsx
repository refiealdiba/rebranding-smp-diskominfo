import { useState } from 'react'
import { supabase } from '../../config/db';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        setSuccessMsg('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setErrorMsg(error.message)
        } else {
            setSuccessMsg('Login berhasil!')
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-1/3">
            <div className="w-full p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-center">Silahkan Masuk</h1>
                {errorMsg && <div className="p-2 text-sm text-red-600 bg-red-100 rounded">{errorMsg}</div>}
                {successMsg && (
                    <div className="p-2 text-sm text-green-600 bg-green-100 rounded">{successMsg}</div>
                )}
                <form onSubmit={handleLogin} className="space-y-4 w-full ">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-base font-medium w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-base font-medium w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button type="submit" className="text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg px-4 py-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
