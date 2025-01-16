import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PrincipalMessage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Flexbox Layout with 50% Width Control */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          ref={ref} // Attach the ref to the parent container
        >
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <img
              className="w-64 lg:w-80 object-cover rounded-md shadow-lg"
              src="https://bbhsc.edu.bd/asset/images/BBHSC/HusneAra.jpg"
              alt="Principal"
            />
          </motion.div>

          {/* Message Section */}
          <motion.div
            className="w-full md:w-1/2 text-justify font-siliguri"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-600 text-center md:text-start">
              Principal's Message
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              একটি মানসম্মত ও আদর্শ শিক্ষা প্রতিষ্ঠানের প্রয়োজনীয়তা সিলেটবাসী
              অনেকদিন ধরেই অনুভব করে আসছিল। এর প্রতিফলনস্বরূপ ১৯৬১ সালের ০৬
              জানুয়ারি যে কিন্ডারগার্টেনটির উদ্বোধন হয়েছিল, কালের পরিক্রমায়
              আস্তে আস্তে প্রাথমিক ও মাধ্যমিকের গণ্ডি পেরিয়ে এখন উচ্চমাধ্যমিক
              শ্রেণি পর্যন্ত শিক্ষার্থীদের একটি নির্ভরযোগ্য ও আশার স্থল হয়ে
              দাঁড়িয়েছে।
            </p>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              ডিজিটাল বাংলাদেশের স্বপ্ন পূরণে জীবনযাত্রার সবক্ষেত্রে উন্নত
              প্রযুক্তির ছোঁয়া লেগেছে। শিক্ষাঙ্গনও এর বাইরে নয়। যার ফলশ্রুতিতে
              ব্লু বার্ড হাই স্কুল এন্ড কলেজ এর এই ওয়েবসাইট সর্বসাধারণের জন্য
              প্রস্তুত করা হলো।
            </p>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              সকলকে এ কর্মযজ্ঞে যুক্ত থাকার সনির্বন্ধ আমন্ত্রণ জানাচ্ছি।
            </p>

            {/* Signature Section */}
            <strong>
              <div className="mt-6 text-gray-800 text-lg">
                <p className="font-bold">হুসনে আরা</p>
                <p>অধ্যক্ষ</p>
                <p>ব্লু বার্ড স্কুল এন্ড কলেজ</p>
              </div>
            </strong>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalMessage;
