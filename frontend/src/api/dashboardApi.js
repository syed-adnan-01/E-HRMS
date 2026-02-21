import API from "./axios"

// KPI CARDS
export const getDashboardStats = () =>
  API.get("/reports/dashboard")

// TODAY ATTENDANCE SUMMARY
export const getAttendanceSummary = () =>
  API.get("/reports/attendance-summary")

// EMPLOYEE STATUS
export const getEmployeeStatus = () =>
  API.get("/reports/employee-status")

// HEADCOUNT
export const getHeadcount = () =>
  API.get("/reports/headcount")