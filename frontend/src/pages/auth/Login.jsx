import { useEffect, useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  requestLoginOtp,
  verifyLoginOtp,
  resendLoginOtp
} from "../../api/authApi"
import Loader from "../../components/ui/Loader"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [otpMessage, setOtpMessage] = useState("")
  const [showOtpSection, setShowOtpSection] = useState(false)
  const [resendAfter, setResendAfter] = useState(0)
  const [loading, setLoading] = useState(false)
  const resendTimerRef = useRef(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current)
      }
    }
  }, [])

  const startResendCountdown = (seconds) => {
    setResendAfter(seconds)
    clearInterval(resendTimerRef.current)

    resendTimerRef.current = setInterval(() => {
      setResendAfter((currentValue) => {
        if (currentValue <= 1) {
          clearInterval(resendTimerRef.current)
          resendTimerRef.current = null
          return 0
        }

        return currentValue - 1
      })
    }, 1000)
  }

  const completeLogin = (res) => {
    // Keep the final login success flow exactly the same.
    localStorage.setItem("token", res.data.token)

    login({
      role: res.data.role,
      name: res.data.name
    })

    navigate("/dashboard")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setOtpMessage("")
    setLoading(true)

    try {
      if (!showOtpSection) {
        const res = await requestLoginOtp({
          email,
          password
        })

        // Show the OTP step only after the backend accepts credentials.
        setShowOtpSection(true)
        setOtp("")
        setOtpMessage(res.data.message || "OTP sent successfully")
        startResendCountdown(res.data.resendAfter || 60)
      } else {
        const res = await verifyLoginOtp({
          email,
          password,
          otp
        })

        completeLogin(res)
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login Failed")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setError("")
    setOtpMessage("")
    setLoading(true)

    try {
      const res = await resendLoginOtp({
        email,
        password
      })

      setOtpMessage(res.data.message || "OTP resent successfully")
      startResendCountdown(res.data.resendAfter || 60)
    } catch (err) {
      setError(err.response?.data?.message || "OTP resend failed")

      if (err.response?.data?.retryAfter) {
        startResendCountdown(err.response.data.retryAfter)
      }
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
            Welcome Back
            </h2>
            <p className="text-gray-400 text-sm">Login to WorkSphere</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl relative mb-6">
            {error}
          </div>
        )}

        {otpMessage && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl relative mb-6">
            {otpMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Email address"
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

        {showOtpSection && (
          <>
            {/* Basic OTP step shown only after credentials are accepted. */}
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className="w-full bg-black/50 border border-white/10 text-white placeholder-gray-500 px-4 py-3.5 mb-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading || resendAfter > 0}
              className="w-full mb-4 bg-white/10 text-white font-semibold py-3 rounded-xl hover:bg-white/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {resendAfter > 0 ? `Resend OTP in ${resendAfter}s` : "Resend OTP"}
            </button>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-0.5"
        >
          {showOtpSection ? "Verify OTP" : "Sign In"}
        </button>

        <div className="mt-8 text-center">
          <Link to="/register" className="text-sm text-gray-400 hover:text-white transition-colors">
            Don't have an account? <span className="text-blue-400">Register here</span>
          </Link>
        </div>

      </form>

    </div>
  )
}
