// import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { authKey } from "./authKey";
import { queryClient } from "@/queryClientSetup";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api/v1", // local
  baseURL: "https://school-management-backend-kappa.vercel.app/api/v1", // server

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach accessToken to every request
axiosInstance.interceptors.request.use((config) => {
  const authData = queryClient.getQueryData<{ accessToken: string }>(authKey);
  // TODO: sudden logout issue has to be fixed
  // const token = authData?.accessToken;
  const token = authData?.accessToken || localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `${token}`;
  } else {
    // TOOD: fix the issue of being undefined
    console.warn("No token found, proceeding without authorization.");
  }

  return config;
});

// Refresh token logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("trying to refresh token");
        // Call refresh token endpoint
        const { data } = await axiosInstance.post("/auth/refresh-token");

        // Save new token
        queryClient.setQueryData(authKey, { accessToken: data.accessToken });

        // Update the authorization header for the original request
        originalRequest.headers.Authorization = `${data.accessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear the token and redirect to login
        queryClient.setQueryData(authKey, null);
        // Redirect to login
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden (Access Denied)
    if (error.response?.status === 403) {
      console.warn("Access denied: insufficient permissions.");
      window.location.href = "/unauthorized"; // Redirect to login
      return Promise.reject(error); // Stop further processing
    }

    // Handle other status codes
    if (error.response?.status === 404) {
      console.error("Resource not found:", error.config.url);
      // Optionally redirect or show a toast/message
    } else if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
      // Show a generic error message
    }

    // Reject for all other cases
    return Promise.reject(error);
  }
);

export default axiosInstance;
