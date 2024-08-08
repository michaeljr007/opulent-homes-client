import React, { useState } from "react";
import login from "../assets/img/login.png";
import { motion } from "framer-motion";
import opulent from "../assets/img/opulent.png";
import desktopLogin from "../assets/img/desktopbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    code: "",
    role: "",
  });

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
      const result = await axios.post("/api/v1/users/signup", formData);
      const { msg } = result.data;
      const { newUser } = result.data;
      console.log(result);
      console.log(msg);
      console.log(newUser);

      if (newUser && msg === "User Created") {
        navigate("/signup-success");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        className="absolute w-[100vw] h-[100vh] lg:hidden"
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
          className="w-[6rem] absolute z-20 ml-[-2.4vw] lg:ml-0"
          alt=""
        />
        <Link to={"/login"}>
          <button className="ml-[80%] bg-blue-600 py-1 px-2 rounded absolute lg:ml-[84%] mt-[4vh]">
            Back
          </button>
        </Link>
        <h1 className="text-center text-[1.5rem] font-bold pt-[15vh] lg:pt-[3vh]">
          Sign up
        </h1>

        <div className="p-6 max-[450px]:mt-[0rem] md:mt-8 lg:mt-2 rounded-lg shadow-xl lg:ml-[5rem]">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              className="border border-gray-100 bg-gray-900 placeholder:text-white py-[0.4rem] px-4 w-full rounded mb-3 md:mb-5 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              className="border border-gray-100 bg-gray-900 placeholder:text-white py-[0.4rem] px-4 w-full rounded mb-3 md:mb-5 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-100 bg-gray-900 placeholder:text-white py-[0.4rem] px-4 w-full rounded mb-3 md:mb-5 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
            />
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-100 bg-gray-900 placeholder:text-white py-[0.4rem] px-4 w-full rounded mb-3 md:mb-5 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-100 bg-gray-900 placeholder:text-white py-[0.4rem] px-4 w-full rounded mb-3 md:mb-5 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
            />
            <input
              type="text"
              name="code"
              id="code"
              placeholder="Admin Code"
              value={formData.code}
              onChange={handleChange}
              className="border border-gray-100 bg-gray-900 placeholder:text-white py-[0.4rem] px-4 w-full rounded mb-3 md:mb-5 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
            />
            <div className="flex gap-4 mb-3 md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]">
              <label htmlFor="role">Gender</label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  value="male"
                />
                Male
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  value="female"
                />
                Female
              </label>
            </div>

            <div className="flex gap-4 mb-3 md:w-[60vw] md:ml-[18vw] text-black lg:w-[40vw] lg:ml-[22vw]">
              <label htmlFor="role" className="text-white">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="flex items-center gap-1"
              >
                <option value="">Select Role</option>
                <option value="owner">Home Owner</option>
                <option value="tenant">Tenant</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <p className="mt-2 flex gap-2 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]">
              Already have an account?{" "}
              <Link
                className="font-semibold text-blue-600 bg-black bg-opacity-60 px-1 py-[0.1rem]"
                to="/login"
              >
                Log in
              </Link>
            </p>
            <button
              className="w-full py-2 mt-5 bg-blue-600 text-white font-semibold transition rounded hover:bg-blue-800 md:w-[60vw] md:ml-[18vw] lg:w-[40vw] lg:ml-[22vw]"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
