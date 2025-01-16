// import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { authKey } from "../api/authKey";
import { TLoginForm } from "@/types/login.type";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { Role } from "@/components/DashboardAndSidebar/dashboard.type";
import { useLocation, useNavigate } from "react-router-dom";
import { queryClient } from "@/queryClientSetup";
import { handleAxiosError } from "@/utils/handleAxiosError";
import "../styles/swal.css";

type DecodedToken = {
  role: Role;
  email: string;
};

export type AuthState = {
  accessToken: string;
  role: Role;
  email: string;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Save the route the user was trying to access

  return useMutation<TLoginResponse, AxiosError, TLoginForm>({
    // Explicitly define mutation function with mutationFn
    mutationFn: async (formData: TLoginForm): Promise<TLoginResponse> => {
      const { data } = await axiosInstance.post<TLoginResponse>(
        "/auth/login",
        formData
      );

      return data;
    },
    // Options
    onSuccess: (data) => {
      // Decode the role from the token
      const decodedToken: DecodedToken = jwtDecode(data?.data?.accessToken);
      // console.log(decodedToken);
      // console.log(decodedToken?.role);

      // Save the accessToken and role in TanStack Query state
      const authState: AuthState = {
        accessToken: data.data.accessToken,
        email: decodedToken.email,
        role: decodedToken.role,
      };
      // Tanstack cache
      queryClient.setQueryData(authKey, authState);

      // Fallback: Set the token in localStorage for persistence across sessions
      // TOOD: This one is working not tanstack query neither persist
      localStorage.setItem("accessToken", data?.data?.accessToken);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in !",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      }).then(() => {
        const from =
          location.state?.from || `/dashboard/${authState?.role}/home`;
        navigate(from, { replace: true });
      });
    },
    onError: (error: AxiosError) => {
      handleAxiosError(error, "Login Failed");
      navigate("/");
    },
  });
};
