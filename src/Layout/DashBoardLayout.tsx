import { FC, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { roleLinks, RoleLink } from "@/Route/RoleBaseRoute"; // Import roleLinks and RoleLink type

// Define the props type
interface DashBoardLayoutProps {
  role: "admin" | "teacher" | "student"; // Define the role types based on your roleLinks
}

const DashBoardLayout: FC<DashBoardLayoutProps> = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Get the links based on the role
  const links: RoleLink[] = roleLinks[role] || [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex flex-col shadow-2xl sm:static sm:w-64 sm:bg-transparent sm:text-black sm:shadow-none transition-all duration-300 ${
          isSidebarOpen ? "" : "hidden sm:flex"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 text-xl font-bold flex items-center justify-between border-b border-gray-700 sm:border-none ">
          <span className="text-[15px]">
            <i>Blue Bird School & College</i>
          </span>
          <button
            className="sm:hidden text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            x
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-2 mt-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex items-center gap-4 px-4 py-2 hover:bg-blue-600 rounded-md transition-all duration-300"
            >
              {link.icon}
              <span className="text-sm">{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 shadow-md flex items-center justify-between sm:justify-start sm:gap-4">
          {/* Hamburger Button */}
          <button
            className="sm:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
