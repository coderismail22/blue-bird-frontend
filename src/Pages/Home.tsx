import { useEffect, useRef, useState } from "react";
import CarouselMain from "./CarouselMain";
import WelcomePage from "./WelcomeMessage";
import HeroCards from "./CornerCard/HeroCard";
import PrincipalsMessage from "./PrincipalMessage";
import UpcomingEvents from "./UpcomingEvents";
import HomeNoticeBoard from "./HomeNotice";
import CountDownSection from "./Countdownpage";

const Home = () => {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);

  const welcomeRef = useRef(null);

  useEffect(() => {
    const welcomeObserver = new IntersectionObserver(
      ([entry]) => {
        setIsWelcomeVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (welcomeRef.current) {
      welcomeObserver.observe(welcomeRef.current);
    }

    return () => {
      if (welcomeRef.current) welcomeObserver.unobserve(welcomeRef.current);
    };
  }, []);

  return (
    <div>
      <CarouselMain />
      <div ref={welcomeRef}>
        <WelcomePage isVisible={isWelcomeVisible} />
      </div>
      <HeroCards />
      <PrincipalsMessage />
      <CountDownSection/> 

      <UpcomingEvents />
      <HomeNoticeBoard />
    </div>
  );
};

export default Home;
