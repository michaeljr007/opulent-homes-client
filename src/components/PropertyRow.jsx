import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import duplex1 from "../assets/img/duplex1.JPG";
import duplex2 from "../assets/img/duplex2.JPG";
import duplex3 from "../assets/img/duplex3.JPG";
import duplex4 from "../assets/img/duplex4.JPG";
import bungalo1 from "../assets/img/bongalo1.JPG";
import bungalo2 from "../assets/img/bongalo2.JPG";
import PropertyColumn from "./PropertyColumn";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";

const PropertyRow = () => {
  const properties = [
    {
      id: 1,
      img: duplex1,
      name: "duplex 1",
      price: "230,000,000",
      location: "Lagos",
      condition: "sale",
    },
    {
      id: 2,
      img: bungalo1,
      name: "duplex 1",
      price: "50,000,000",
      location: "Lagos",
      condition: "rent",
    },
    {
      id: 3,
      img: duplex3,
      name: "duplex 1",
      price: "80,000,000",
      location: "Lagos",
      condition: "sale",
    },
    {
      id: 4,
      img: duplex2,
      name: "duplex 1",
      price: "300,000,000",
      location: "Lagos",
      condition: "rent",
    },
    {
      id: 5,
      img: bungalo2,
      name: "duplex 1",
      price: "35,000,000",
      location: "Lagos",
      condition: "sale",
    },
    {
      id: 6,
      img: duplex4,
      name: "duplex 1",
      price: "95,000,000",
      location: "Lagos",
      condition: "rent",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 100 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 1 }}
      className="mt-20 pb-16 pt-4 w-full px-4 relative"
    >
      {/* Section heading */}
      <span className="flex gap-3 items-center">
        <h2 className="text-xl md:text-2xl border-b-2 border-gray-400 mb-12 font-semibold">
          Featured <span className="text-blue-600">Properties</span>
        </h2>
        <FaFire className="text-yellow-400 text-[1.4rem] mt-[-2.5rem] animate-pulse" />
      </span>

      {/* Scrollable Row */}
      <Carousel responsive={responsive} swipeable draggable>
        {properties.map((property) => (
          <div key={property.id}>
            <PropertyColumn
              img={property.img}
              name={property.name}
              price={property.price}
              location={property.location}
              condition={property.condition}
            />
          </div>
        ))}
      </Carousel>
    </motion.div>
  );
};

export default PropertyRow;
