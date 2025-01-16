import ManageUser from "@/components/Admin/ManageUser";
import Profile from "@/components/Shared/Profile";
import TakeAttendance from "@/components/Teacher/TakeAttendance";



// Define a type for routes
export interface DashboardRoute {
  path: string;
  element: JSX.Element;
  roles: string[]; // Define which roles can access this route
}

// Define all dashboard routes
const allDashboardRoutes: DashboardRoute[] = [
  {
    path: "/dashboard/profile",
    element: <Profile />,
    roles: ["admin","student","teacher"], // Only admin can access this route
  },
  {
    path: "/dashboard/manage-user",
    element: <ManageUser />,
    roles: ["admin"], // Only admin can access this route
  },
  {
    path: "/dashboard/attendance",
    element: <TakeAttendance />,
    roles: ["teacher"], // Only admin can access this route
  },
  
 
 
  
  
];

// Function to filter routes based on the role
export const getDashBoardChild = (role: string): DashboardRoute[] => {
  return allDashboardRoutes.filter((route) => route.roles.includes(role));
};
