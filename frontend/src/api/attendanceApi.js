import axios from "axios"

const API = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL + "/attendance"
})

API.interceptors.request.use(req => {
const token = localStorage.getItem("token")
if (token) req.headers.Authorization = `Bearer ${token}`
return req
})

export const getAttendance = () => API.get("/")
export const addAttendance = data => API.post("/", data)
export const updateAttendance = (id, data) => API.put(`/${id}`, data)
export const deleteAttendance = id => API.delete(`/${id}`)
