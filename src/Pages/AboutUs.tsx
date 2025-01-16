import HeaderSection from "@/components/Shared/HeaderSection";

import { motion } from "framer-motion";

import WhyStudy from "./WhyChoose";
import SchoolFacilities from "./SchoolFacilities";
import Achievements from "./AchievmentPage";

const AboutUs = () => {
  return (
    <div className="font-robotoCondensed">
      <div className="bg-gradient-to-r from-slate-100 to- bg-cyan-100 p-5 font-robotoCondensed">
        <section className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <HeaderSection name="About Us"></HeaderSection>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <p className="w-[80%] mx-auto text-justify mt-8 leading-loose pb-5 font-robotoCondensed ">
            Notre Dame College was established in Lakshmibazar, Dhaka in
            November, 1949. It was established by the Roman Catholic Priests
            from the Congregation of Holy Cross for the reason of existing
            crisis in education sector of the new born East Pakistan of that
            time. It was Archbishop Graner, CSC, as Archbishop of Dhaka and
            leader of the Catholic Church in East Pakistan, invited the
            Congregation of Holy Cross Priest Society to found and administer a
            college in this new country. Initially, it was known as the St.
            Gregory College, an extension of the St. Gregory School, which was
            also established by the Congregation. It was relocated to its
            current location in Motijheel in 1954 and renamed to Notre Dame
            College. The Congregation of Holy Cross also maintains the
            University of Notre Dame, Portland University, and Kings and
            Stonehill College in the United States. The new name was a tribute
            to the University of Notre Dame, the alma mater of many of the
            faculty members. In French Notre Dame means Our Lady that stands for
            Mother Mary. From the very beginning the two main objectives of the
            founders of the college have been to provide education at a college
            level to Christian students and to provide quality and value based
            education to students for the benefit of contributing to the
            development of this country. In keeping with the ideals of social
            justice special emphasis is to be given to students who would
            otherwise be deprived of opportunity for such a quality and value
            based education due to their economic condition, ethnic, rural or
            otherwise backward or deprived social situation. The educational
            objective is to instill in the student a love of God, his country
            and wisdom. Emphasis is given to character formation. Notre Dame
            College is seeing as a family. All the students, teaching and
            non-teaching staff and administrative staff are the members of Notre
            Dame Family. Notre Dame Family life is based on mutual respect,
            love, sharing of responsibility and common interest for the integral
            formation of the students. 
          </p>
        </motion.div>
      </div>

      {/* Why Study at Our Institution ?*/}
      <section>
        <WhyStudy />
      </section>

      {/* School facilities  */}
      <section>
        <SchoolFacilities />
      </section>

      {/* Achievements section */}
      <section >
        <Achievements />
      </section>
    </div>
  );
};

export default AboutUs;
