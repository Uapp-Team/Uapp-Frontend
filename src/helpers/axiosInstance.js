import axios from "axios";
import { rootUrl } from "../constants/constants";

const axiosInstance = axios.create({
  baseURL: rootUrl,
});

// Request Interceptor - Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get stored token
    if (token) {
      config.headers["Authorization"] = token; // Attach token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Token Refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const currentDate = new Date();
    const expiryDateString = localStorage.getItem("date");

    if (!expiryDateString) {
      console.error("No expiration date found");
      return Promise.reject(error);
    }

    const expiryDate = new Date(expiryDateString);

    if (
      currentDate.getTime() > expiryDate.getTime() && // Token expired
      error.response?.status === 401 && // Unauthorized error
      !originalRequest._retry // Prevent infinite loops
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("Refresh token not found");

        // Request new access token
        const res = await axios.post(`${rootUrl}Account/renewtoken`, null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (res.status === 200) {
          const newAccessToken = "Bearer " + res.data.newToken;
          localStorage.setItem("token", newAccessToken);

          // Set new token for the retry request
          originalRequest.headers["Authorization"] = newAccessToken;

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/sessionTimeOut"; // Redirect on failure
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
