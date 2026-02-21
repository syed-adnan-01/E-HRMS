import API from "./axios"

// ATTENDANCE REPORT

export const getAttendanceReport = () =>
  API.get("/attendance")

export const addAttendanceReport = (data) =>
  API.post("/attendance", data)

export const updateAttendanceReport = (id, data) =>
  API.put(`/attendance/${id}`, data)

export const deleteAttendanceReport = (id) =>
  API.delete(`/attendance/${id}`)


// =======================
// PAYROLL REPORT
// =======================

export const getPayrollReport = () =>
  API.get("/payroll")

export const addPayrollReport = (data) =>
  API.post("/payroll", data)

export const updatePayrollReport = (id, data) =>
  API.put(`/payroll/${id}`, data)

export const deletePayrollReport = (id) =>
  API.delete(`/payroll/${id}`)