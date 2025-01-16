import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { Contact } from "lucide-react";

const WelcomePage = ({ isVisible }: { isVisible: boolean }) => {
  const animationProps = {
    initial: { opacity: 0, y: 50 },
    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
    transition: { duration: 1, ease: "easeOut" },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.2 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationProps}
      className="bg-gradient-to-r from-cyan-50 to-blue-50 overflow-x-hidden font-robotoCondensed w-full py-10"
    >
      {/* Main Content Grid */}
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Text Content Section with Animation */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-start w-[80%] mx-auto "
        >
          <h1 className="text-4xl text-[#3a3a3a] font-bold mb-4 leading-snug">
            Welcome to <br />
            <span className="text-6xl bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
              Blue Bird High School & College
            </span>
          </h1>
          <p className="lg:w-10/12 text-gray-700 leading-relaxed text-lg">
            At Blue Bird, we believe in soaring high and nurturing bright
            futures. Explore endless learning opportunities with our dedicated
            faculty and vibrant community.
          </p>

          {/* Animated Buttons Section */}
          <motion.div
            className="flex items-center justify-center lg:justify-start my-6 gap-4"
            variants={fadeInLeft}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
              <Link to="/about-us">
                <Button className="w-full text-white font-semibold text-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center gap-2 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
                  <IoBookOutline />
                  About Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="w-full text-white font-semibold text-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center gap-2 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
                  <Contact />
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Section with Animation */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          className="mx-auto z-30"
        >
          <img
            className="w-[400px] rounded-md shadow-lg hover:shadow-2xl transition-all duration-500"
            src="https://w0.peakpx.com/wallpaper/504/874/HD-wallpaper-kid-running-to-school-art-u-aero-colorful-artwork-digital-art-design-autumn-school-backpack-september-going-to-school-first-day-of-school-kid-child-boy-painting-school-bag-running.jpg"
            alt="Hero Image"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
