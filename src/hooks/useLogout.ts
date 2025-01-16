import { queryClient } from "@/queryClientSetup";
import { authKey } from "../api/authKey";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { AxiosError } from "axios";
import "../styles/swal.css";

// Define the custom hook
export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // Simulate server-side logout logic if needed
      // Example: Clear refreshToken cookie using backend API
      // await axiosInstance.post("/auth/logout");

      return true; // No actual backend call, just clearing the state
    },
    onSuccess: () => {
      // Clear authentication state
      console.log("Logging out user");
      queryClient.setQueryData(authKey, null); // Clear accessToken or any auth state

      // Redirect the user
      navigate("/");

      Swal.fire({
        icon: "success",
        title: "Logout Successful",
        text: "See you again !",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
    },
    onError: (error: AxiosError) => {
      handleAxiosError(error, "Logout Failed");
      navigate("/");
    },
  });
};
