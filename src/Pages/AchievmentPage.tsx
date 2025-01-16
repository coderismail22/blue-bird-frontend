import { motion } from "framer-motion";

const achievements = [
  {
    id: 1,
    title: "Best Academic Institution 2023",
    description:
      "Awarded for excellence in academics and overall performance nationwide.",
    image:
      "https://d2u0ktu8omkpf6.cloudfront.net/10cb6154624228ad59056368a4d812bc5cedd8521343441d.jpg",
  },
  {
    id: 2,
    title: "Outstanding Sports Achievements",
    description:
      "Recognized for winning multiple national sports competitions.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpdq-denCqDXkZ9vcsZ69WiP13KRXbeiHArw&s",
  },
  {
    id: 3,
    title: "Innovation in Education",
    description:
      "Received for implementing creative and effective teaching methods.",
    image:
      "https://www.graduateprogram.org/wp-content/uploads/2021/07/July-15-The-Impact-of-Innovation-in-Education_web.jpg",
  },
];

const Achievements = () => {
  return (
      <section className="bg-gradient-to-r from-slate-200 to- bg-cyan-100 py-12 pb-40 ">
        <div className="w-[80%] mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800"></h2>
            <p className="text-gray-600 mt-4"></p>
          </motion.div>

          {/* Header */}
          <div className="relative  p-10 rounded-lg shadow-lg text-center mb-12 bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l ">
            <h1 className="text-4xl font-bold"> Our Achievements</h1>
            <p className="mt-4 text-lg">
              A glimpse of our outstanding accomplishments.
            </p>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Achievements;
