import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useInView } from "react-intersection-observer";
const FloatingSectionForFooter = () => {
  const items = [
    {
      icon: <MapPin className="text-yellow-500 w-6 h-6" />,
      title: "Address",
      description:
        "G.P.O. Box No. 5, Tayenbee Circular Rd, Dhaka 1000, Bangladesh",
    },
    {
      icon: <Phone className="text-yellow-500 w-6 h-6" />,
      title: "Phone Number",
      description: "+88-02-41070/13",
    },
    {
      icon: <Mail className="text-yellow-500 w-6 h-6" />,
      title: "Email Address",
      description: "notredamecollege@ndc.edu.bd",
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };
  // Scroll trigger setup
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  return (
<div>
<motion.div
      ref={ref}
      className="bg-[#052E59] text-white py-6 px-4 md:rounded-3xl shadow-2xl w-full max-w-screen-lg mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center text-center p-4 ${
              index !== items.length - 1
                ? " md:border-r-2  md:border-yellow-500"
                : ""
            }`}
            variants={itemVariants}
          >
            <div>{item.icon}</div>
            <h3 className="font-semibold text-xl mt-3">{item.title}</h3>
            <p className="text-sm mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
</div>
  );
};
export default FloatingSectionForFooter;
