import { BookUser, Facebook, Linkedin, Mail, Phone,  Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const TopNavbarSection = () => {
  return (
    <div className="bg-blue-900 hidden lg:flex">
      <div className="flex justify-between items-center h-10 container mx-auto px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <BookUser className="w-6 h-4 text-yellow-400" />
          <span className="truncate text-white font-sriracha">Mirer Moydan, Sylhet</span>
          <span className="text-white shadow-2xl">|</span>
          <Mail className="w-6 h-4 text-amber-400" />
          <span className="truncate text-white font-sriracha">info@example.com</span>
          <span className="text-white shadow-2xl">|</span>
          <Phone className="w-6 h-4 text-amber-400" />
          <span className="truncate text-white font-sriracha">+01733-377614</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-8">
          
          <Link to=""><Facebook className="text-white hover:text-yellow-400 w-5 h-5 " /></Link>
         
          <Link to=""><Twitter className="text-white hover:text-yellow-400 w-5 h-5 " /></Link>
          
          <Link to=""><Linkedin className="text-white hover:text-yellow-400 w-5 h-5 " /></Link>
          
          <Link to=""><Youtube className="text-white hover:text-yellow-400 w-5 h-5 " /></Link>
         
          
        </div>
      </div>
    </div>
  );
};

export default TopNavbarSection;
