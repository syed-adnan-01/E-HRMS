import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api",
})

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export const getDashboardStats = () => API.get("/reports/dashboard")
export const getAttendanceSummary = () => API.get("/reports/attendance-summary")
export const getEmployeeStatus = () => API.get("/reports/employee-status")