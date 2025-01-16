import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import TopLogoBanner from "@/components/Shared/TopLogoBanner";
import TopmostNoticeBanner from "@/components/Shared/TopmostNoticeBanner";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <TopmostNoticeBanner />
      <TopLogoBanner />
      <Navbar />
      <ScrollToTop />
      <div className="justify-between items-center min-h-screen relative overflow-hidden">
        <Outlet />
      </div>
      <div className="-mt-32 relative z-[9999] pointer-events-auto">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
