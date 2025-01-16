import React from "react";
import Carousel from "./CarouselHome";

const CarouselMain = () => {
  const slides = [
    {
      image: "https://images2.alphacoders.com/747/thumb-1920-747506.jpg",
      title: "Discover the World",
      subtitle: "Explore amazing places around the globe",
      buttonLabel: "Learn More",
    },
    {
      image: "https://images2.alphacoders.com/747/thumb-1920-747506.jpg",
      title: "Adventure Awaits",
      subtitle: "Your journey starts here",
      buttonLabel: "Get Started",
    },
    {
      image: "https://images2.alphacoders.com/747/thumb-1920-747506.jpg",
      title: "Experience Nature",
      subtitle: "Reconnect with the great outdoors",
      buttonLabel: "Explore Now",
    },
  ];

  return (
    <div className=" bg-gray-100 flex items-center justify-center ">
      <Carousel items={slides} />
    </div>
  );
};

export default CarouselMain;
