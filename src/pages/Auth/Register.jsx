import { useState } from 'react'
import { supabase } from '../../config/db'


export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        setSuccessMsg('')

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setErrorMsg(error.message)
        } else {
            setSuccessMsg('Registrasi berhasil! Silakan cek email untuk verifikasi.')
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                {errorMsg && <div className="p-2 text-sm text-red-600 bg-red-100 rounded">{errorMsg}</div>}
                {successMsg && (
                    <div className="p-2 text-sm text-green-600 bg-green-100 rounded">{successMsg}</div>
                )}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button type="submit" className="w-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg px-4 py-2">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
