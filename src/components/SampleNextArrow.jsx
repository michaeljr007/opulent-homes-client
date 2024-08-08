import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

// Custom arrow component for slider navigation
function SampleNextArrow(props) {
  const { className, onClick } = props; // Destructuring props to get className and onClick function
  return (
    <div onClick={onClick} className={`arrow ${className}`}>
      {/* Arrow icon */}
      <AiOutlineArrowRight className="arrows" style={{ color: "white" }} />
    </div>
  );
}

export default SampleNextArrow;
