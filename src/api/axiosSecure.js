import axios from "axios";
import { auth } from "../firebase/firebase.init";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Auto attach Firebase ID token to every request
axiosSecure.interceptors.request.use(
  async (config) => {
    if (auth.currentUser) {
      try {
        // Get fresh Firebase ID token
        const token = await auth.currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error getting Firebase token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration and refresh
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired or unauthorized
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh Firebase token
        if (auth.currentUser) {
          const newToken = await auth.currentUser.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Retry original request with new token
          return axiosSecure(originalRequest);
        } else {
          // No user logged in, redirect to login
          window.location.href = "/login";
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        
        // Clear auth and redirect to login
        if (auth.currentUser) {
          await auth.signOut();
        }
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;