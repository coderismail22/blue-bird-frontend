import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InfoCard = ({ title, description, details, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="rounded-lg shadow-lg bg-white p-6 cursor-pointer hover:shadow-xl transition-all"
      onClick={() => setIsOpen(!isOpen)}
      layout
    >
      <motion.div layout="position" className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          {!isOpen && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-4 text-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {details}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InfoCard;
