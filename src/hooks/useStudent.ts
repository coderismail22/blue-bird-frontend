import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Role } from "@/components/DashboardAndSidebar/dashboard.type";
import { authKey } from "@/api/authKey";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

type AuthState = {
  accessToken: string;
  role: Role;
  email: string;
};

// Fetch function to get student data based on email
const fetchStudent = async (email: string) => {
  const { data } = await axiosInstance.get(`/students/${email}`);
  return data?.data?.data; // Assuming you want the student data returned
};

// Custom hook to get student data
export const useStudent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get auth data (accessToken, role, and email)
  const authData = queryClient.getQueryData<AuthState>(authKey);

  // **Always call useQuery**, but conditionally disable the query if authData is invalid
  const { data, isLoading, error } = useQuery({
    queryKey: ["student", authData?.email], // You can pass email as a part of the query key
    queryFn: () => fetchStudent(authData?.email as string), // Fetch student based on email
    enabled: !!authData?.accessToken && !!authData?.role && !!authData?.email, // Run the query only if authData is valid
  });

  // If authData is invalid, navigate to login and return an empty result
  if (!authData?.accessToken || !authData?.role || !authData?.email) {
    console.error("No valid auth data found, redirecting to login...");
    navigate("/auth/login", { replace: true });
    return { student: null, isLoading: false, error: "No valid auth data" }; // Return early without triggering useQuery
  }

  return { data, isLoading, error }; // Return the data, loading, and error states
};
