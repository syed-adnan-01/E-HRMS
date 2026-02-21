import API from "./axios"

// ================= AUTH =================

// REGISTER
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data)
  return res.data
}

// LOGIN  ✅ THIS IS WHAT LOGIN.JSX NEEDS
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data)
  return res.data
}