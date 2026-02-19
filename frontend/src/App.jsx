import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./routes/ProtectedRoute"

import Login from "./pages/auth/Login"

import Dashboard from "./pages/hr/Dashboard"
import Employees from "./pages/hr/Employees"
import Attendance from "./pages/hr/Attendance"
import Payroll from "./pages/hr/Payroll"
import Reports from "./pages/hr/Reports"

export default function App() {

  return (
    <AuthProvider>

      <Router>

        <Routes>

          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <Payroll />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

        </Routes>

      </Router>

    </AuthProvider>
  )
}
