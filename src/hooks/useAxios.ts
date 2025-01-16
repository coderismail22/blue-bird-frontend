// src/hooks/useAxios.ts
import axiosInstance from "@/api/axiosInstance";
import { useState, useEffect } from "react";

type THttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type UseAxiosResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (
    endpoint?: string,
    payload?: Record<string, unknown>
  ) => Promise<void>;
};

function useAxios<T>(
  url: string,
  method: THttpMethod = "GET",
  initialPayload: Record<string, unknown> | null = null
): UseAxiosResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle API calls dynamically
  const fetchData = async (
    endpoint: string = url,
    payload: Record<string, unknown> | null = initialPayload
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.request({
        url: endpoint,
        method,
        data: payload,
      });
      setData(response.data.data); // Adjust based on response structure
    } catch (err) {
      console.error("API Request Error:", err); // Log the error for debugging
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch data on GET requests when component mounts
  useEffect(() => {
    if (method === "GET") {
      fetchData();
    }
  }, [url]);

  return { data, loading, error, fetchData };
}

export default useAxios;
