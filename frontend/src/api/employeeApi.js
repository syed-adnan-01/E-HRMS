import api from "./axios"


// Optionally pass department to filter
export const getEmployees = (department) => {
  if (department) {
    return api.get(`/employees?department=${encodeURIComponent(department)}`)
  }
  return api.get("/employees")
}

export const addEmployee = (data) =>
  api.post("/employees", data)

export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, data)

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`)
