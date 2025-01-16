import { useQueryClient } from "@tanstack/react-query";
import { Role } from "@/components/DashboardAndSidebar/dashboard.type";
import { authKey } from "@/api/authKey";
import { useNavigate } from "react-router-dom";

type AuthState = {
  accessToken: string;
  role: Role;
};

export const useRole = (): Role | void => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const authData = queryClient.getQueryData<{ accessToken: string }>(authKey);
  const authData = queryClient.getQueryData<AuthState>(authKey);
  // console.log("auth data from useRole", authData);

  // If no auth data exists, assume no role (or redirect)
  if (!authData?.accessToken || !authData?.role) {
    console.error("No valid auth data found, redirecting to login...");
    navigate("/auth/login", { replace: true });
    return undefined;
  }

  return authData?.role; // Return the role directly
};
