import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ✅ Handle auth errors (role-based redirect)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.clear();

      if (user?.role === "admin") {
        window.location.href = "/login/admin";
      } else {
        window.location.href = "/login/user";
      }
    }
    return Promise.reject(error);
  }
);

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// TASKS
export const getTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// ✅ ADMIN
export const getUserStats = () => API.get("/admin/users-stats");

export default API;