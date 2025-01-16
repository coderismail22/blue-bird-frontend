import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Simulated user object
  const [user, setUser] = useState({
    isLoggedIn: true, // Toggle this to simulate login/logout
    name: "John Doe",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const profileRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);
  const closeProfileDropdown = () => setIsProfileDropdownOpen(false);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        closeProfileDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Administration", path: "/administration" },
    { name: "Notice", path: "/notice" },
    { name: "Gallery", path: "/gallery" },
    { name: "Admission", path: "/admission" },
    { name: "Contact", path: "/contact" },
  ];

  const renderNavItems = (isMobile = false) =>
    navItems.map((item) => (
      <NavLink
        key={item.name}
        to={item.path}
        onClick={isMobile ? toggleMenu : undefined}
        className={({ isActive }) =>
          `block py-1 px-2 text-lg transition-all duration-300 ${
            isActive ? "text-yellow-400" : "text-white hover:text-cyan-200"
          }`
        }
      >
        {item.name}
      </NavLink>
    ));

  return (
    <>
      {/* Main Navbar */}
      <nav className="shadow-md sticky top-0 z-50 bg-blue-500 w-full">
        <div className="w-[80%] sm:w-[90%] md:w-[80%] mx-auto flex items-center justify-between px-1 py-4 font-robotoCondensed flex-wrap md:flex-nowrap">
          {/* Mobile Login/Logout Button */}
          <div className="flex md:hidden items-center space-x-6">
            {user.isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="size-8 rounded-full border-2 border-gray-200"
                  />
                </button>

                {/* Dropdown (conditionally rendered only when clicked) */}
                {isProfileDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l border border-gray-200  rounded-md shadow-lg z-50">
                    <p className="px-4 py-2 text-sm font-semibold">
                      {user.name}
                    </p>
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() =>
                        setUser((prev) => ({
                          ...prev,
                          isLoggedIn: false,
                        }))
                      }
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <MdOutlineLogout /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-white text-lg px-4 py-2 hover:text-cyan-200"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Desktop Menu Section */}
          <div className="hidden md:flex flex-wrap items-center space-x-6 w-full">
            {renderNavItems()}
          </div>

          {/* Login/Profile Section Aligned to Right */}
          <div className="hidden md:flex items-center space-x-6">
            {user.isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="size-8 rounded-full border-2 border-gray-200"
                  />
                </button>

                {/* Dropdown (conditionally rendered only when clicked) */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l border border-gray-200  rounded-md shadow-lg z-50">
                    <p className="px-4 py-2 text-sm font-semibold">
                      {user.name}
                    </p>
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() =>
                        setUser((prev) => ({
                          ...prev,
                          isLoggedIn: false,
                        }))
                      }
                      className=" flex  items-center  gap-1 w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                     <MdOutlineLogout className="text-red-800"/> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-white text-lg px-4 py-2 hover:text-cyan-200"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#052E59] text-white flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-5 right-5 text-3xl"
              aria-label="Close Menu"
            >
              <X />
            </button>
            <div className="flex flex-col space-y-6 text-center">
              {renderNavItems(true)}
              {user.isLoggedIn ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className="text-white hover:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      setUser((prev) => ({
                        ...prev,
                        isLoggedIn: false,
                      }));
                      toggleMenu();
                    }}
                    className="text-white hover:text-gray-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="text-white hover:text-gray-400"
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
