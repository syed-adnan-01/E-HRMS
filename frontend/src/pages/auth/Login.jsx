import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { loginUser } from "../../api/authApi"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {

      const res = await loginUser({
        email,
        password
      })

      // Store JWT Token
      localStorage.setItem("token", res.data.token)

      // Store user role & name in AuthContext
      login({
        role: res.data.role,
        name: res.data.name
      })

      // Redirect to Dashboard
      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.message || "Login Failed")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-950 selection:bg-blue-500/30">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(59,130,246,0.1)] w-[90%] max-w-md"
      >

        <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          Login to E-HRMS
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl relative mb-6">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 placeholder-slate-400 px-4 py-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 placeholder-slate-400 px-4 py-3 mb-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-0.5"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <Link to="/register" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Don't have an account? Register here.
          </Link>
        </div>

      </form>

    </div>
  )
}
