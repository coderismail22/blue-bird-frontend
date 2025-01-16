import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { CalendarIcon } from "lucide-react";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

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

const HomeNoticeBoard = () => {
  // Fetch all notices
  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: fetchNotices,
  });
  // Sample data

  // Modal state
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" bg-gray-100 text-gray-800 font-robotoCondensed   pb-32">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500  to-cyan-500 text-white py-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold">Latest Notices</h1>
        <p className="text-sm mt-2">
          Stay updated with the latest announcements
        </p>
      </header>

      {/* Notice List */}
      <main className="w-[80%] mx-auto px-4 py-8  ">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {notices.map((notice: INotice) => (
            <motion.div
              key={notice?._id}
              variants={itemVariants}
              className="bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l  rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform"
              onClick={() => setSelectedNotice(notice)}
            >
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600 font-bold">
                  {notice?.publishDate}
                </p>
              </div>
              <h2 className="text-lg font-bold text-blue-500 mt-2">
                {notice.title}
              </h2>
              <Badge
                variant={"outline"}
                className="mt-2  bg-gradient-to-r from-green-400 via-blue-400  to-blue-500 text-white"
              >
                {notice.category}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* See More Button */}
      <div className="flex justify-center my-6">
        <Link to="/notice">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold text-lg">
            Get All Notices
          </button>
        </Link>
      </div>

      {/* Modal for Notice Details */}
      {selectedNotice && (
        <Dialog
          open={Boolean(selectedNotice)}
          onOpenChange={() => setSelectedNotice(null)}
        >
          <DialogContent className="font-robotoCondensed flex flex-col items-center justify-center bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l h-[200px] w-[80%] rounded-md">
            <DialogHeader>
              <DialogTitle className="text-left text-blue-400">
                {selectedNotice?.title}
              </DialogTitle>
            </DialogHeader>
            <p className=" text-gray-500 flex gap-2  justify-center">
              <CalendarIcon className="w-5 h-5 text-gray-500" />
              {selectedNotice?.publishDate}
            </p>
            <Link to={selectedNotice?.noticePdfUrl} target="_blank">
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 ">
                <BsFillFileEarmarkPdfFill className="text-white" />
                Download PDF
              </Button>
            </Link>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default HomeNoticeBoard;
