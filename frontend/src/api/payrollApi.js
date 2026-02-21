import axios from "axios"

const API = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL + "/payroll"
})

API.interceptors.request.use(req => {
const token = localStorage.getItem("token")
if (token) req.headers.Authorization = `Bearer ${token}`
return req
})

export const getPayroll = () => API.get("/")
export const addPayroll = data => API.post("/", data)
export const updatePayroll = (id, data) => API.put(`/${id}`, data)
export const deletePayroll = id => API.delete(`/${id}`)
