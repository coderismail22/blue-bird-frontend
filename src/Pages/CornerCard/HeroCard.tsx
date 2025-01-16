import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Define card data with React Icons and consistent structure
const cardData = [
  {
    title: "Principal's Corner",
    description: "Welcome message and vision from the principal.",
    details:
      "Our principal is dedicated to fostering an environment of academic excellence and holistic development. Learn about the initiatives and messages from the principal here.",
    icon: <FaUserGraduate className="text-blue-500 w-12 h-12" />,
    link: "/principal",
  },
  {
    title: "Faculty & Staff",
    description: "Meet our qualified and dedicated team.",
    details:
      "Our faculty comprises highly qualified educators committed to nurturing students' academic and personal growth. Explore their profiles and achievements.",
    icon: <FaChalkboardTeacher className="text-blue-500 w-12 h-12" />,
    link: "/faculty",
  },
  {
    title: "Results",
    description: "Check out our outstanding results.",
    details:
      "View the academic achievements and results of our students, which reflect the hard work of both students and faculty.",
    icon: <FaChartLine className="text-blue-500 w-12 h-12" />,
    link: "/results",
  },
  {
    title: "Admission Information",
    description: "Learn about the admission process.",
    details:
      "Find out how to join our institution, admission guidelines, eligibility criteria, and key dates for the application process.",
    icon: <FaClipboardList className="text-blue-500 w-12 h-12" />,
    link: "/admissions",
  },
];

const HeroCards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  return (
    <section className="container mx-auto px-4 py-20" ref={ref}>
      {/* Section Heading with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-robotoCondensed">
          Explore Our Excellence
        </h2>
        <p className="text-lg text-gray-600 font-robotoCondensed">
          Empowering students with knowledge and growth opportunities.
        </p>
      </motion.div>

      {/* Card Grid Section with Consistent Alignment and Animation */}
      <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-robotoCondensed">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="p-8  bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l  rounded-lg shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-5 text-center  "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Icon Section */}
            <div>{card.icon}</div>

            {/* Card Title & Content Section */}
            <h3 className="text-md font-semibold text-gray-800 ">
              {card.title}
            </h3>
            {/* <p className="text-gray-600 text-sm">{card.description}</p> */}
            <p className="text-gray-500 text-sm">{card.details}</p>

            {/* Call to Action Button */}
            <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300">
              Explore
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroCards;
