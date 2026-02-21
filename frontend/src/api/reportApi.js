import API from "./axios"

export const getAttendanceReport = () =>
  API.get("/reports/attendance")

export const getPayrollReport = () =>
  API.get("/reports/payroll")

export const getDashboardStats = () =>
  API.get("/reports/dashboard")

export const getAttendanceSummary = () =>
  API.get("/reports/attendance-summary")