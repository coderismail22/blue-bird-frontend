import  { useState } from "react";
import { ChevronDown } from "lucide-react";

const AnimatedDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <button
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        Services
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform origin-top transition-all duration-500 ease-in-out ${
          isOpen
            ? "scale-100 opacity-100 animate-dropdown"
            : "scale-75 opacity-0 pointer-events-none"
        }`}
      >
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Service 1
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Service 2
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Service 3
        </a>
      </div>
    </div>
  );
};

export default AnimatedDropdown;
