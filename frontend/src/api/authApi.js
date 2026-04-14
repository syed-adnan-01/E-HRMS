import api from "./axios"

export const loginUser = (data) =>
  api.post("/auth/login", data)

export const registerUser = (data) =>
  api.post("/auth/register", data)

export const organizationSignup = (data) =>
  api.post("/auth/organization-signup", data)
