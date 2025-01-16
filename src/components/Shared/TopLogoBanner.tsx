import logo from "../../assets/logo_with_text.png";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LucidePhoneCall } from "lucide-react";

const TopLogoBanner = () => {
  return (
    <div className="bg-gradient-to-tr from-slate-50  to-cyan-200  ">
      <div className="h-30 flex flex-col items-center md:flex-row justify-between md:py-2 md:w-[80%] mx-auto ">
        {/* Left Box with Icon, Title, and Description (Hidden on Small Devices) */}
        <div className="hidden md:flex items-center space-x-4 font-robotoCondensed">
          <HiOutlineMailOpen className="size-10 text-blue-400" />
          <div>
            <h3 className="text-xl font-semibold">Mail Us</h3>
            <p className="text-base text-gray-600">abc@gmail.com</p>
          </div>
        </div>

        {/* Logo (Centered) */}
        <div className="flex flex-col items-center justify-center  ">
          <img src={logo} alt="Logo" className="w-[250px] " />
        </div>

        {/* Right Box with Icon, Title, and Description (Hidden on Small Devices) */}
        <div className="hidden md:flex items-center space-x-4 font-robotoCondensed">
          <LucidePhoneCall className="size-10 text-blue-400" />
          <div>
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p className="text-base text-gray-600">+123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLogoBanner;
