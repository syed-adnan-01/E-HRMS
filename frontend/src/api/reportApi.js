import axios from "axios"

const API = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL + "/reports"
})

API.interceptors.request.use(req => {
const token = localStorage.getItem("token")
if (token) req.headers.Authorization = `Bearer ${token}`
return req
})

export const getAttendanceReport = () => API.get("/attendance")
export const getPayrollReport = () => API.get("/payroll")
export const getDashboardStats = () => API.get("/dashboard")
export const getAttendanceSummary = () => API.get("/attendance-summary")
export const getEmployeeStatus = () => API.get("/employee-status")
