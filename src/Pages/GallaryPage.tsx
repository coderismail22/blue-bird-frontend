import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import HeaderSection from "@/components/Shared/HeaderSection";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import Loader from "@/components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";

// Interface Definition
interface IGalleryItem {
  _id: { $oid: string };
  title: string;
  description: string;
  date: string;
  category: "video" | "image";
  imageUrl: string;
  videoUrl: string;
  type: string;
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
}

// Fetch events from API
const fetchEvents = async () => {
  const response = await axiosInstance.get("/event");
  return response.data.data;
};

const GalleryPage = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", "Photo", "Video"];
  const images = events;

  // Filter based on the selected tag
  const filteredImages =
    selectedTag === "All"
      ? images
      : images.filter(
          (image: IGalleryItem) => image.category === selectedTag.toLowerCase()
        );

  // Animation Variants - Fixed the stretching issue
  const gridVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9 },
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" min-h-screen bg-gradient-to-r from-slate-200 to- bg-cyan-100 pb-36">
      <div className="px-4 py-6 w-[80%] mx-auto">
        {/* Header Section */}
        <header className="mb-10 text-center mt-20">
          <HeaderSection name="Gallery" />
          <p className="text-sm text-gray-500 my-5">
            Explore moments from Photos, sports, events, and campus activities.
          </p>
        </header>

        {/* Tags Filter Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`cursor-pointer px-4 py-2 text-sm ${
                selectedTag === tag ? "bg-amber-400 text-white" : ""
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Image Grid Section */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.length > 0 ? (
              filteredImages.map((item: IGalleryItem) => {
                const isVideo = item.category === "video";

                // Function to extract VIDEO_ID from YouTube URL
                const getYouTubeVideoId = (url: string) => {
                  try {
                    const urlObj = new URL(url);
                    return (
                      urlObj.searchParams.get("v") ||
                      urlObj.pathname.split("/")[2]
                    );
                  } catch {
                    return null;
                  }
                };

                const videoId = isVideo
                  ? getYouTubeVideoId(item.videoUrl)
                  : null;

                return (
                  <motion.div
                    key={item._id.$oid}
                    layout
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative overflow-hidden rounded-lg shadow-lg"
                  >
                    {/* Render Image or Video */}
                    {isVideo && videoId ? (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-64"
                      >
                        <motion.img
                          layout="position"
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                          alt={item.title}
                          className="w-full h-64 object-cover rounded-md"
                        />
                      </a>
                    ) : (
                      <motion.img
                        layout="position"
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-64 object-cover rounded-md"
                      />
                    )}

                    {/* Image Description Section */}
                    <motion.div
                      layout="position"
                      className="absolute bottom-0 left-0 bg-gradient-to-t from-black text-white w-full py-2 px-3"
                    >
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </motion.div>

                    {/* Optional Button */}
                    <Button
                      variant={"destructive"}
                      className="absolute top-2 right-2"
                    >
                      <Image />
                    </Button>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                key="no-items"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="col-span-3 text-center text-gray-500"
              >
                Nothing to show.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryPage;
