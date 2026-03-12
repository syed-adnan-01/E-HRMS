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
        <div className="flex items-center justify-center min-h-screen bg-black selection:bg-blue-500/30 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <form
                onSubmit={handleSubmit}
                className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                        Create an Account
                    </h2>
                    <p className="text-gray-400 text-sm">Join WorkSphere today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl relative mb-6" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Role</label>
                        <select
                            className="w-full bg-black/50 border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="ADMIN" className="bg-black text-white">Admin</option>
                            <option value="HR" className="bg-black text-white">HR</option>
                            <option value="MANAGER" className="bg-black text-white">Manager</option>
                            <option value="EMPLOYEE" className="bg-black text-white">Employee</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3.5 flex justify-center rounded-xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-0.5"
                >
                    Register
                </button>

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                        Already have an account? <span className="text-blue-400">Login here</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}
