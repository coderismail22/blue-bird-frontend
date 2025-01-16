import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useState, useEffect } from "react";

const Counter = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (start < end) {
      const increment = Math.ceil((end - start) / (duration * 60)); // Increment based on duration and frame rate
      const interval = setInterval(() => {
        setCount((prev) => {
          const nextValue = prev + increment;
          return nextValue >= end ? end : nextValue;
        });
      }, 1000 / 60); // Update 60 times per second

      return () => clearInterval(interval);
    }
  }, [start, end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const ParallaxSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="relative lg:h-screen p-5 bg-fixed bg-center bg-cover overflow-hidden"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg")',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-white text-center max-w-3xl ">
          <div className="mb-8 space-y-5">
            {/* Title and Description */}
            <h1 className="py-2 text-4xl md:text-5xl font-bold font-robotoCondensed bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
              Blue Bird School & College, Sylhet
            </h1>
            <p className="text-md  max-w-md mx-auto text-white font-robotoCondensed">
              A wonderful serenity has taken possession of my entire soul, like
              these sweet mornings of spring which I enjoy with my whole heart
              like mine.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 justify-center items-center">
            {/* Image */}

            <img src="/counterImage.png" alt="" className="w-full" />

            {/* Counters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-robotoCondensed">
              <motion.div
                ref={ref}
                className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg text-center "
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xl lg:text-4xl font-semibold text-blue-400">
                  {isInView && <Counter start={0} end={250} duration={2} />}
                </p>
                <p className="mt-2">TEACHERS</p>
              </motion.div>

              <motion.div
                className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xl lg:text-4xl font-bold text-green-500">
                  {isInView && <Counter start={0} end={120} duration={2} />}
                </p>
                <p className="mt-2 uppercase">Classrooms</p>
              </motion.div>

              <motion.div
                className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
              >
                <p className="text-xl lg:text-4xl font-bold text-red-500">
                  {isInView && <Counter start={0} end={10000} duration={3} />}
                </p>
                <p className="mt-2">STUDENTS</p>
              </motion.div>

              <motion.div
                className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2 }}
              >
                <p className="text-xl lg:text-4xl font-bold text-yellow-500">
                  {isInView && <Counter start={0} end={40} duration={2} />}
                </p>
                <p className="mt-2">LAB</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;
