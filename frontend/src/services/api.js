// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.clear();

      window.location.href =
        user?.role === "admin" ? "/login/admin" : "/login/user";
    }

    if (status === 403) {
      alert("Access denied");
      const user = JSON.parse(localStorage.getItem("user"));

      window.location.href =
        user?.role === "admin" ? "/admin" : "/user";
    }

    return Promise.reject(error);
  }
);

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

export const getTasks = () => API.get("/tasks");
export const getMyCreatedTasks = () => API.get("/tasks/my-created"); 
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const getUserStats = () => API.get("/admin/users-stats");

export default API;