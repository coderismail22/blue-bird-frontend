import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import Loader from "@/components/Loader/Loader";
import { CalendarIcon } from "lucide-react";

// Fetch events from the backend API
const fetchEvents = async () => {
  const response = await axiosInstance.get("/event");
  return response.data.data; // Assuming the API returns events in `data`
};

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessEvents = async () => {
      try {
        const events = await fetchEvents();

        // Filter and sort events, then limit to 6
        const sortedUpcoming = events
          .filter((event) => event.type === "upcoming")
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 6);
        const sortedRecent = events
          .filter((event) => event.type === "ended")
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);

        setUpcomingEvents(sortedUpcoming);
        setRecentEvents(sortedRecent);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessEvents();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // Render events dynamically
  const renderEvents = (events) => {
    if (events.length === 0) {
      return (
        <p className="text-center text-gray-500 ">
          No events available at the moment.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {events.map((event, index) => (
          <motion.div
            key={event._id?.$oid || index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l shadow-lg rounded-lg p-6 "
          >
            <div className="flex items-center  space-x-2 text-gray-500">
              <CalendarIcon className="size-5" />
              <p className="text-sm  font-bold">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
            <h2 className="text-lg font-bold text-blue-500 mt-2">
              {event.title}
            </h2>
            <p className="text-gray-500 mt-2">{event.description}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <header className=" bg-gradient-to-r from-blue-500  to-cyan-500 text-white py-6 text-center shadow-lg font-robotoCondensed">
        <h1 className="text-3xl font-bold">Latest Events</h1>
        <p className="text-sm mt-2">
          Explore our latest events
        </p>
      </header>

      <section className="bg-gray-100 py-12 px-6 font-robotoCondensed">
        <div className="w-[80%] mx-auto">
          {/* Title Section */}
          {/* <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8 "
        >
          Recent and Upcoming Events
        </motion.h2> */}

          {/* Tabs Section */}

          <div className="flex justify-center mb-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 mr-4 rounded-full text-lg font-semibold ${
                activeTab === "upcoming"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-6 py-2 rounded-full text-lg font-semibold ${
                activeTab === "recent"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Recent Events
            </button>
          </div>

          {/* Events Section */}
          <div>
            {activeTab === "upcoming" && (
              <>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Upcoming Events
                </h3>
                {renderEvents(upcomingEvents)}
              </>
            )}

            {activeTab === "recent" && (
              <>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Recent Events
                </h3>
                {renderEvents(recentEvents)}
              </>
            )}
          </div>

          {/* See More Button */}
          <div className="flex justify-center mt-6">
            <Link to="/gallary">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold text-lg">
                Explore All Events
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingEvents;
