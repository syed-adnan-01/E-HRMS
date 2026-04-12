import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { loginUser } from "../../api/authApi"
import Loader from "../../components/ui/Loader"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {

      const res = await loginUser({
        email,
        password
      })

      // Block Super Admin from regular login
      if (res.data.role === "SUPERADMIN") {
        setError("Access Denied.")
        setLoading(false)
        return
      }

      // Store JWT Token
      localStorage.setItem("token", res.data.token)

      // Store user role & name in AuthContext
      login({
        role: res.data.role,
        name: res.data.name
      })

      // Redirect based on role
      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.message || "Login Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black selection:bg-blue-500/30 relative overflow-hidden">
      {loading && <div className="fixed inset-0 z-[100]"><Loader fullScreen={true} /></div>}
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl w-[90%] max-w-md relative z-10"
      >
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            WorkSphere Portal
            </h2>
            <p className="text-gray-400 text-sm">HR & Manager Secure Login</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl relative mb-6">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Corporate email"
          className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-500 px-4 py-3.5 mb-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-500 px-4 py-3.5 mb-6 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-0.5"
        >
          Access Portal
        </button>

        <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Authorized Personnel Only</p>
        </div>

      </form>

    </div>
  )
}
