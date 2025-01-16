import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion"; // Import Framer Motion
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ items }) => {
  return (
    <div className="relative w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {/* Motion div for animating the slide */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Fix: aspect ratio with object-contain */}
              <img
                src={item.image}
                alt={`Slide ${index + 1}`}
                className="w-full aspect-[16/9] object-contain"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 p-4">
                <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4">
                  {item.title}
                </h1>
                <p className="text-sm md:text-lg lg:text-2xl mb-6">
                  {item.subtitle}
                </p>
                <button className="rounded-md bg-yellow-400 text-black px-2 py-2 md:px-4 md:py-3 shadow-md hover:bg-yellow-300">
                  {item.buttonLabel}
                </button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
