import React, { useState } from "react";
import login from "../assets/img/login.png";
import desktopLogin from "../assets/img/desktopbg.jpg";
import { motion } from "framer-motion";
import opulent from "../assets/img/opulent.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProfile } from "../redux/slices/ProfileSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const reloadPage = () => {
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/users/login", formData);
      const { data } = response;

      if (data.user) {
        dispatch(
          addProfile({
            id: data.user.id,
            name: data.user.name,
            image: data.user.image,
            token: data.user.token,
            role: data.user.role,
          })
        );
        navigate("/home");
      } else {
        alert("No user found");
      }
    } catch (error) {
      const {
        response: {
          data: { msg: errorMsg },
        },
      } = error;

      if (errorMsg) {
        showAlert(errorMsg);
      }
    }
  };

  function showAlert(msg) {
    let errDiv = document.querySelector(".error-div");

    errDiv.textContent = msg;

    errDiv.classList.toggle("hidden");

    setTimeout(() => {
      errDiv.classList.toggle("hidden");
    }, 2000);
  }

  return (
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
      viewport={{
        amount: "all",
      }}
    >
      <img
        src={login}
        className="absolute w-[100vw] h-[100vh] object-cover lg:hidden"
        alt=""
      />

      <img
        src={desktopLogin}
        className="absolute w-[100vw] h-[100vh] object-cover max-[450px]:hidden"
        alt=""
      />
      <div className="text-white relative">
        <img
          src={opulent}
          className="w-[6rem] md:w-[8rem] absolute z-20 ml-[-2.4vw] md:ml-0"
          alt=""
        />

        <button
          onClick={reloadPage}
          className="ml-[80%] bg-blue-600 hover:bg-blue-800 py-1 px-2 rounded absolute lg:ml-[84%] mt-[4vh] md:mt-[6vh]"
        >
          Back
        </button>

        <h1 className="text-center text-[1.5rem] md:text-[1.8rem] font-bold pt-[22vh] md:pt-[18vh]">
          Login
        </h1>

        {!isFormVisible ? (
          <div className="mt-12 md:mt-20">
            <Link to={"/home"}>
              <button
                className="w-[80%] md:w-[40%] ml-[10%] md:ml-[30vw] py-2 md:py-4 lg:py-3 md:text-[1.2rem] mt-5 bg-blue-600 text-white font-semibold rounded transition hover:bg-blue-800 md:block"
                type="submit"
              >
                Guest Login
              </button>
            </Link>
            <button
              className="w-[80%] md:w-[40%] ml-[10%] md:ml-[30vw] py-2 md:py-4 lg:py-3 md:text-[1.2rem] mt-5 bg-blue-600 text-white font-semibold rounded transition hover:bg-blue-800 md:block"
              type="submit"
              onClick={() => setIsFormVisible(true)}
            >
              User Login
            </button>
          </div>
        ) : (
          <motion.div
            initial={{
              translateX: -100,
            }}
            animate={{
              translateX: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              amount: "all",
            }}
            className="p-6 max-[450px]:mt-[3.6rem] lg:ml-[4.4rem] md:mt-8 rounded-lg shadow-xl"
          >
            <div className="error-div hidden mb-4 bg-red-500 text-white w-[63%] px-6 mx-auto py-2 rounded-lg"></div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Email address"
                value={formData.userEmail}
                onChange={handleChange}
                className="border border-gray-100 bg-gray-900 placeholder:text-white py-2 px-4 w-full md:w-[60vw] rounded mb-3 md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
              />
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                placeholder="Password"
                value={formData.userPassword}
                onChange={handleChange}
                className="border border-gray-100 bg-gray-900 placeholder:text-white py-2 px-4 w-full rounded mb-3 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
              />
              <p className="mt-2 flex gap-2 ml-1 md:ml-[18vw] lg:ml-[22vw]">
                Don't have an account?{" "}
                <Link className="font-semibold text-blue-600" to="/signup">
                  Sign up
                </Link>
              </p>
              <button
                className="w-[80%] md:w-[60vw] ml-[10%] md:ml-[18vw] py-2 mt-5 bg-blue-600 text-white font-semibold rounded transition hover:bg-blue-800 lg:w-[40vw] lg:ml-[22vw]"
                type="submit"
              >
                Submit
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Login;
