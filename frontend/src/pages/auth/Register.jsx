/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { registerUser } from "../../api/authApi"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("EMPLOYEE")
    const [error, setError] = useState("")

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const res = await registerUser({
                name,
                email,
                password,
                role
            })

            // Assuming login directly after registration is desired, or redirect to login.
            // E-HRMS currently issues a token on login. Because our register route doesn't return a token,
            // we'll redirect them to the login page after successful registration.
            navigate("/login")

        } catch (err) {
            setError(err.response?.data?.message || "Registration Failed")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 selection:bg-blue-500/30 py-12 px-4 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(59,130,246,0.1)] w-full max-w-md"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                    Create an Account
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl relative mb-6" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Role</label>
                        <select
                            className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="ADMIN">Admin</option>
                            <option value="HR">HR</option>
                            <option value="MANAGER">Manager</option>
                            <option value="EMPLOYEE">Employee</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 flex justify-center rounded-xl hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all transform hover:-translate-y-0.5"
                >
                    Register
                </button>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        Already have an account? Login here.
                    </Link>
                </div>
            </form>
        </div>
    )
}
