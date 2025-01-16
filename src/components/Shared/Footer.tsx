import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import FloatingSectionForFooter from "./FloatingSectionForFooter";

const Footer = () => {
  return (
    <div>
      <div className="relative z-10 -mb-16 w-full ">
        <FloatingSectionForFooter />
      </div>
      <div
        className="bg-gray-900 text-white relative pt-6 sm:pt-32 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg')`,
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10">
          {/* Top Section */}
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Logo and Description */}
              <div className="max-w-md mx-auto">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 lg:w-36 mb-4 mx-auto"
                />
                <p>
                  At the present time, the College receives no financial aid
                  from the government of Bangladesh. It is supported entirely by
                  tuition fees collected from the students.
                </p>
              </div>

              {/* Sitemap */}
              <div>
                <h3 className="font-bold text-lg lg:text-2xl mb-4 text-amber-400">
                  Quick Links
                </h3>

                <ul className="space-y-2 text-sm">
                  <li className="hover:text-amber-400">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="hover:text-amber-400">
                    <Link to="/admission">Admission Information</Link>
                  </li>
                  <li className="hover:text-amber-400">
                    <Link to="/why-study">Why Study At NDC</Link>
                  </li>
                  <li className="hover:text-amber-400">
                    <Link to="/holy-cross">Holy Cross</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg lg:text-2xl mb-4 text-amber-400">
                  Contact Us
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-amber-400">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="hover:text-amber-400">
                    <Link to="/admission">Admission Information</Link>
                  </li>
                  <li className="hover:text-amber-400">
                    <Link to="/why-study">Why Study At NDC</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-gray-800 py-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
              {/* Social Media */}
              <div className="flex items-center gap-4">
                <Link to="#">
                  <Facebook className="text-gray-400 hover:text-white transition-all text-2xl" />
                </Link>
                <Link to="#">
                  <Twitter className="text-gray-400 hover:text-white transition-all text-2xl" />
                </Link>
                <Link to="#">
                  <Instagram className="text-gray-400 hover:text-white transition-all text-2xl" />
                </Link>
                <Link to="#">
                  <Linkedin className="text-gray-400 hover:text-white transition-all text-2xl" />
                </Link>
              </div>

              {/* Copyright */}
              <p className="text-gray-400 text-sm mt-4 md:mt-0">
                &copy; 2025 BBS. All Rights Reserved.
                <span className="text-white font-lobster"> FWS</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;