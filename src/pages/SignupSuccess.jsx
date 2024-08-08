import React, { useEffect } from "react";
import signupGif from "../assets/img/dancingGif.gif";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logoImg from "../assets/img/opulent.png";
import confetti from "canvas-confetti";

const SignupSuccess = () => {
  useEffect(() => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#992c99", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 2,
        }}
        className="bg-gray-900 text-white w-[100vw] h-[100vh] text-center justify-items-center py-[6.2rem] md:py-[8rem] lg:py-8"
      >
        <img
          src={logoImg}
          className="absolute top-1 left-2 w-[3.2rem]"
          alt=""
        />
        <h1 className="text-[1.5rem] md:text-[2rem]">Welcome Aboard!</h1>
        <p className="text-[1.3rem] mt-1 md:mt-3 md:text-[1.5rem]">
          Please{" "}
          <Link to={"/login"}>
            <button className="text-[#992c99] md:text-[1.5rem] font-bold pl-1">
              Login
            </button>
          </Link>
        </p>
        <motion.img
          initial={{
            translateY: 10,
            opacity: 0,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
          }}
          transition={{
            duration: 2,
            delay: 1,
          }}
          className="mx-auto mt-5 md:mt-10 lg:mt-5 w-[100vw] md:w-[67vw]"
          src={signupGif}
          alt=""
        />
      </motion.div>
    </>
  );
};

export default SignupSuccess;
