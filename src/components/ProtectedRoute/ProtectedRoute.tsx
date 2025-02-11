import { authKey } from "@/api/authKey";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData<{
    accessToken: string;
    role: string;
  }>(authKey);

  // TODO: Debug the sudden logout issue
  // if (!authData?.accessToken) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Error",
  //     text: "No valid auth data found.",
  //   });
  // }

  // TODO: Debug the sudden logout issue
  // if (!authData?.role) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Error",
  //     text: "No role found.",
  //   });
  // }

  // Redirect to login if accessToken doesn't exist
  if (!authData?.accessToken || !authData?.role) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
