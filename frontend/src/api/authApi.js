import api from "./axios"

export const loginUser = (data) =>
  api.post("/auth/login", data)

export const organizationSignup = (data) =>
  api.post("/auth/organization-signup", data)
