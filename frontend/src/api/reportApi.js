import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

// Attach Token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

// Attendance Report
export const getAttendanceReport = () =>
  API.get("/reports/attendance")

// Payroll Report
export const getPayrollReport = () =>
  API.get("/reports/payroll")

export const getHeadcountChart = () =>
  axios.get("/reports/headcount-chart")

export const getAttendanceChart = () =>
  axios.get("/reports/attendance-chart")