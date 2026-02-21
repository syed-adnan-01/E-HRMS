import API from "./axios"

export const getAttendance = () => API.get("/attendance")
export const addAttendance = (data) => API.post("/attendance", data)
export const updateAttendance = (id, data) => API.put(`/attendance/${id}`, data)
export const deleteAttendance = (id) => API.delete(`/attendance/${id}`)