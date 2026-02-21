import API from "./axios"

export const getDashboardStats = () => API.get("/reports/dashboard")
export const getAttendanceSummary = () => API.get("/reports/attendance-summary")
export const getHeadcount = () => API.get("/reports/headcount")