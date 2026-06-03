import axios from "axios";

const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : "https://to-do-list-agee.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (email, password) =>
  api.post("/auth/register", {
    email: email,
    password: password,
    name: email.split("@")[0],
  });

export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const getTasks = () => api.get("/tasks");
export const createTask = (taskData) => api.post("/tasks", taskData);
export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
