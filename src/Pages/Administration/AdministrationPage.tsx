import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GiPin } from "react-icons/gi";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Loader from "@/components/Loader/Loader";

// Fetch administration data from backend
const fetchAdministrationData = async () => {
  const response = await axiosInstance.get("/administration");
  return response.data.data; // Expecting a flat array of objects
};

// Define categories for filtering
const categories = ["Governing Body", "Teacher", "Staff"];

const AdministrationPage = () => {
  const [activeTab, setActiveTab] = useState("Governing Body");

  const { data, isLoading, error } = useQuery({
    queryKey: ["administration"],
    queryFn: fetchAdministrationData,
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching administration data.</p>;

  // Filter the data based on the active category tab
  const filteredData = data.filter(
    (person: any) => person.category === activeTab
  );

  return (
    <section className="bg-gradient-to-r from-slate-200 to bg-cyan-100 py-12 px-4 font-robotoCondensed pb-80">
      <div className="w-[80%] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-800">Administration</h2>
          <p className="text-gray-600 mt-4">
            Meet the people who ensure the smooth functioning of our
            institution.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="Governing Body" onValueChange={setActiveTab}>
          <TabsList className="flex justify-center mb-6 p-8 space-x-5 bg-gradient-to-r from-slate-200 to bg-cyan-100">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          <TabsContent value={activeTab}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredData.length > 0 ? (
                  filteredData.map((person: any) => (
                    <div
                      key={person._id}
                      className="w-full max-w-sm bg-gradient-to-r from-cyan-50 to-blue-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      {/* Pin Icon */}
                      <div className="flex justify-end px-4 pt-4">
                        <button
                          id="dropdownButton"
                          className="inline-block text-red-500 bg-slate-200 p-1 rounded-full"
                          type="button"
                        >
                          <GiPin />
                        </button>
                      </div>

                      {/* Profile Section */}
                      <div className="flex flex-col items-center pb-10">
                        <img
                          className="w-24 h-24 mb-3 rounded-full shadow-lg"
                          src={person.photo}
                          alt={person.name}
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {person.name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {person.role || person.designation}
                        </span>

                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-4 mt-4">
                          {person.linkedIn && (
                            <a
                              href={person.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 hover:text-blue-800"
                            >
                              <FaLinkedin size={24} />
                            </a>
                          )}
                          {person.fb && (
                            <a
                              href={person.fb}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FaFacebook size={24} />
                            </a>
                          )}
                          {person.x && (
                            <a
                              href={person.x}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-gray-800"
                            >
                              <FaTwitter size={24} />
                            </a>
                          )}
                          {person.youtube && (
                            <a
                              href={person.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaYoutube size={24} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )) // Show Fallback Message
                ) : (
                  <div className="text-center py-12 text-red-700">
                    <p className="text-2xl font-semibold">
                      No records available under this category.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AdministrationPage;
