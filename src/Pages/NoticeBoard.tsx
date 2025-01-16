import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import HeaderSection from "@/components/Shared/HeaderSection";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { Link } from "react-router-dom";

// Fetch notices from the API
const fetchNotices = async () => {
  const response = await axiosInstance.get("/notice");
  return response.data.data; // Assuming `data` contains the notices array
};

// Define Notice type
interface INotice {
  _id: string;
  title: string;
  publishDate: string;
  category: string;
  tag: string;
  noticePdfUrl: string;
}

const NoticeBoardPage = () => {
  // Fetch all notices
  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: fetchNotices,
  });
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", "General", "Update", "Exam", "Other"];

  // Filter notices based on the selected tag
  const filteredNotices =
    selectedTag === "All"
      ? notices
      : notices.filter(
          (notice: INotice) =>
            notice.category?.toLowerCase() === selectedTag.toLowerCase()
        );

  // Animation Variants
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const tabContentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 pb-56">
      <div className="w-[80%] mx-auto  border-t  mb-20">
        {/* Header */}
        <header className="mb-10 text-center mt-20">
          <HeaderSection name="Notice Board"></HeaderSection>
          <p className="text-sm text-gray-500 my-5">
            Stay updated with the latest announcements and notices.
          </p>
        </header>

        {/* Tags Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`cursor-pointer px-4 py-2 text-sm ${
                selectedTag === tag
                  ? "bg-amber-400 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Notices Table */}
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ overflow: "hidden", minHeight: "200px" }} // Add consistent min-height
        >
          <div className="overflow-x-auto rounded-lg shadow">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTag} // Trigger animation on tab change
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ overflow: "hidden" }} // Prevent overflow during transitions
              >
                <table className="min-w-full bg-white ">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 text-left">Date</th>
                      <th className="px-2 sm:px-4 py-2 text-left">Title</th>
                      {/* <th className="px-2 sm:px-4 py-2 text-left">Category</th> */}
                      <th className="px-2 sm:px-4 py-2 text-left ">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredNotices.length > 0 ? (
                        filteredNotices.map((notice: INotice) => (
                          <motion.tr
                            key={notice._id}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="px-4 py-3 text-gray-600">
                              {notice.publishDate}
                            </td>
                            <td className="px-4 py-3 text-gray-800 font-medium">
                              {notice.title}
                            </td>
                            {/* <td className="px-4 py-3">
                      <Badge className="bg-gray-600 text-white hover:text-white">
                        {notice.category}
                      </Badge>
                    </td> */}
                            <td className="px-4 py-3 text-gray-500">
                              <Link to={notice.noticePdfUrl} target="_blank">
                                <Button variant={"destructive"}>
                                  <BsFillFileEarmarkPdfFill />
                                </Button>
                              </Link>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <motion.tr
                          key="no-notices"
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="border-b"
                        >
                          <td
                            colSpan={4}
                            className="px-4 py-3 text-center text-gray-500"
                          >
                            No notices available for this category.
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoticeBoardPage;
