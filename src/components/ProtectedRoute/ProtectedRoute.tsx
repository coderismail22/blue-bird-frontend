import { authKey } from "@/api/authKey";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData<{
    accessToken: string;
    role: string;
  }>(authKey);

  // Redirect to login if accessToken doesn't exist
  if (!authData?.accessToken || !authData?.role) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
