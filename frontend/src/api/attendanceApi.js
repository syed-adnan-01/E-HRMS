import axios from "axios"

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/attendance`
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

// GET ALL
export const getAttendance = () => API.get("/")

// CREATE / MARK ATTENDANCE  ✅ REQUIRED FOR BUILD
export const markAttendance = (data) => API.post("/", data)

// UPDATE
export const updateAttendance = (id, data) =>
  API.put(`/${id}`, data)

// DELETE
export const deleteAttendance = (id) =>
  API.delete(`/${id}`)