import API from "./axios"

export const getPayroll = () => API.get("/payroll")
export const addPayroll = (data) => API.post("/payroll", data)
export const updatePayroll = (id, data) => API.put(`/payroll/${id}`, data)
export const deletePayroll = (id) => API.delete(`/payroll/${id}`)