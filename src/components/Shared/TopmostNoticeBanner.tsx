import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Loader from "@/components/Loader/Loader";

// Fetch the latest notice banner from the backend
const fetchTopNoticeBanner = async () => {
  const response = await axiosInstance.get("/noticebanner");
  if (response.data.data.length > 0) {
    return response.data.data[0]; // Return the first notice banner
  } else {
    // If no notice exists, create a random one on the backend
    const randomBanner = await axiosInstance.post(
      "/noticebanner/create-notice-banner",
      {
        title: `Important Notice - ${Math.floor(Math.random() * 1000)}`,
      }
    );
    return randomBanner.data.data;
  }
};

const TopmostNoticeBanner = () => {
  // Fetching the notice banner using react-query
  const {
    data: noticeBanner,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["noticeBanner"],
    queryFn: fetchTopNoticeBanner,
  });

  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-red-500">Failed to fetch the notice banner.</p>;

  return (
    <div className="bg-blue-600 font-robotoCondensed">
      <div className="container mx-auto w-2/4 h-[40px] p-2">
        <marquee className="text-yellow-300 font-siliguri" behavior="scroll" direction="left">
          {noticeBanner?.title || "Important Notice - Stay Tuned!"}
        </marquee>
      </div>
    </div>
  );
};

export default TopmostNoticeBanner;
