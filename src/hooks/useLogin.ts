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
  userId: string;
  role: Role;
  email: string;
  adminId: string;
  teacherId: string;
  studentId: string;
};

export type AuthState = {
  accessToken: string;
  userId: string;
  role: Role;
  email: string;
  adminId: string;
  teacherId: string;
  studentId: string;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
};

let authState = {
  accessToken: "",
  adminId: "",
  teacherId: "",
  studentId: "",
  userId: "",
  email: "",
  role: "",
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
      // console.log("decoded token", decodedToken);

      // Save the accessToken and role in TanStack Query state

      // role wise id adding
      if (decodedToken.role === "admin") {
        authState = {
          ...authState,
          accessToken: data.data.accessToken,
          userId: decodedToken.userId,
          email: decodedToken.email,
          role: decodedToken.role,
        };
      } else if (decodedToken.role === "student") {
        authState = {
          ...authState,
          accessToken: data.data.accessToken,
          userId: decodedToken.userId,
          email: decodedToken.email,
          role: decodedToken.role,
          studentId: decodedToken.studentId,
        };
      } else if (decodedToken.role === "teacher") {
        authState = {
          ...authState,
          accessToken: data.data.accessToken,
          userId: decodedToken.userId,
          email: decodedToken.email,
          role: decodedToken.role,
          teacherId: decodedToken.teacherId,
        };
      }

      // Tanstack cache
      queryClient.setQueryData(authKey, authState);

      // Fallback: Set the token in localStorage for persistence across sessions
      // TODO: This one is working not tanstack query neither persist
      localStorage.setItem("accessToken", data?.data?.accessToken);

      // Current Bug:
      // 1. The user is logged out when the page is refreshed occasionally.
      // 2. queryClient.setQueryData(authKey, authState);
      // 3. localStorage.setItem("accessToken", data?.data?.accessToken);
      // 4. I can't access the dashboard if i remove/disable any of the 2 or 3 steps.
      // 5. What's wrong with the app ?
      // 6. I can't refresh the page and the user is logged out. Why this sudden logout is happening ? It ruining the user experience.

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
          location.state?.from || `/dashboard/${authState?.role}/profile`;
        navigate(from, { replace: true });
      });
    },
    onError: (error: AxiosError) => {
      handleAxiosError(error, "Login Failed");
    },
  });
};
