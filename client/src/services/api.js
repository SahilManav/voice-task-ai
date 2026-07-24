import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;

// Update user profile (name, email, password)
export const updateProfile = (data) => api.put("/auth/profile", data);
