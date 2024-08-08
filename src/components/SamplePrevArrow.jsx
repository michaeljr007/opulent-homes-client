import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

// Custom previous arrow component for slider navigation
const SamplePrevArrow = (props) => {
  const { className, onClick } = props; // Destructuring props to get className and onClick function
  return (
    <div onClick={onClick} className={`arrow ${className}`}>
      {/* Arrow icon */}
      <AiOutlineArrowLeft className="arrows" style={{ color: "white" }} />
    </div>
  );
};

export default SamplePrevArrow;
