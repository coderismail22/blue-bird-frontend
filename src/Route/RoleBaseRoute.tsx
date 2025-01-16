

import { Home,  User, Settings, UserRoundCog, Megaphone } from "lucide-react";

// Define the RoleLink type
export interface RoleLink {
  name: string;
  path: string;
  icon: JSX.Element;
}

// Define the roleLinks object
export const roleLinks: { [key: string]: RoleLink[] } = {
  admin: [
    { name: "Admin", path: "/dashboard/admin", icon: <Home size={20} /> },
    { name: "Manage-User", path: "/dashboard/manage-user", icon: <UserRoundCog size={20} /> },
    { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> },
    { name: "Home", path: "/", icon: <Home size={20} /> },
  ],
  teacher: [
    
    { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
    { name: "Take Attendance", path: "/dashboard/attendance", icon: <Megaphone  size={20} /> },
    { name: "Home", path: "/", icon: <Home size={20} /> },
  ],
  student: [
   
    { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
    { name: "Home", path: "/", icon: <Home size={20} /> },
  ],
};
 

