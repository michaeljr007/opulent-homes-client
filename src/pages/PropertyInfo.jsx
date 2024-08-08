import React, { useState } from "react";
import { FaNairaSign, FaLocationDot, FaBed, FaBath } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import duplex1 from "../assets/img/duplex1.JPG";
import duplex2 from "../assets/img/duplex2.JPG";
import duplex3 from "../assets/img/duplex3.JPG";
import duplex4 from "../assets/img/duplex4.JPG";
import duplex5 from "../assets/img/duplex5.JPG";
import SampleNextArrow from "../components/SampleNextArrow";
import SamplePrevArrow from "../components/SamplePrevArrow";
import PropertyRow from "../components/PropertyRow";
import useScrollToTop from "../components/useScrollToTop";

const PropertyInfo = () => {
  useScrollToTop();
  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slides",
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
    dots: true,
    appendDots: (dots) => (
      <div style={{ position: "relative", bottom: "33px" }}>
        <ul style={{ margin: "0px", padding: "0px" }}>{dots}</ul>
      </div>
    ),
  };

  const images = [duplex1, duplex2, duplex3, duplex4, duplex5];

  const handleImageClick = (index) => {
    setZoomedImageIndex(index);
    setZoomedImage(images[index]);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  const zoomedSliderSettings = {
    ...settings,
    initialSlide: zoomedImageIndex,
    afterChange: (current) => setZoomedImageIndex(current),
    nextArrow: null,
    prevArrow: null,
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
      }}
      className="w-full min-h-screen bg-slate-50"
    >
      <Navbar />
      <div className="mt-20 pt-4 px-5 md:px-20">
        <h3 className="font-bold text-xl md:text-2xl">
          Luxury 5 Bedroom Duplex
        </h3>
        <div className="md:flex mt-4">
          <div className="md:w-2/3 w-full">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-64 md:h-[70vh] rounded-lg shadow-lg object-cover cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="md:w-1/3 w-full mt-6 md:mt-0 md:ml-6 bg-white p-4 rounded-2xl shadow-lg">
            <ul className="grid grid-cols-2 gap-2 items-center">
              <li className="flex font-semibold text-lg gap-1 items-center">
                Price: <FaNairaSign />
                120,000,000
              </li>
              <li className="text-gray-600 ml-4 text-sm">Posted: 11-09-2024</li>
              <li className="flex gap-1 items-center w-[140%] text-gray-700 text-sm">
                <FaLocationDot className="text-gray-700 animate-pulse" /> Lagos,
                Lekki, Osapa London
              </li>
              <li className="flex gap-3 ml-[4rem] items-center text-gray-700 text-sm">
                <span className="flex items-center gap-1">
                  <FaBed /> 5
                </span>
                <span className="flex items-center gap-1">
                  <FaBath /> 4
                </span>
              </li>
            </ul>
            <ul className="mt-6 text-sm space-y-2">
              <li>- All rooms ensuite</li>
              <li>- Expansive Family Lounge</li>
              <li>- Multiple lounges</li>
              <li>- Multiple balconies</li>
              <li>- Fitted and furnished kitchen</li>
              <li>- In-built 6-seater cinema</li>
              <li>- Swimming pool</li>
              <li>- Walk-in shower</li>
              <li>- Walk-in closet</li>
              <li>- Bath tub</li>
              <li>- Large parking area</li>
              <li>- Gated and secure estate</li>
            </ul>
            <div data className="mt-8">
              <h3 className="mb-3 font-semibold text-lg">Book Physical Tour</h3>
              <form>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First name"
                  className="border border-gray-400 mb-2 py-2 px-3 rounded w-full"
                />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last name"
                  className="border border-gray-400 mb-2 py-2 px-3 rounded w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone number"
                  className="border border-gray-400 mb-2 py-2 px-3 rounded w-full"
                />
                <input
                  type="text"
                  name="interested property"
                  id="interested-property"
                  value={"propertyID"}
                  className="hidden"
                />
                <button
                  className="py-2 px-3 flex justify-center items-center gap-2 mt-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 w-full"
                  type="submit"
                >
                  Book Tour <FaRocket className="animate-bounce" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Featured */}
        <PropertyRow />
      </div>

      {/* Modal for zoomed image */}
      {zoomedImage !== null && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={handleCloseZoom}
        >
          <div className="lg:w-[59vw] w-[90vw] h-[90vh] mt-[35vh] lg:h-[70vh] lg:mt-[-5rem]">
            <Slider {...zoomedSliderSettings}>
              {images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`Zoomed Slide ${index + 1}`}
                    className="w-full object-contain rounded-lg shadow-lg"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyInfo;
