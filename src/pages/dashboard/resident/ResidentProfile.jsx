import React, { useState } from "react";
import {
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaCreditCard,
  FaUserSecret,
  FaTools,
  FaUser,
  FaEdit,
} from "react-icons/fa";
import useScrollToTop from "../../../components/useScrollToTop";
import { Link } from "react-router-dom";
import BottomNavbar from "../../../components/BottomNavbar";
import user1 from "./img/bruce-mars.jpg";
import waiting from "./img/waiting.gif";
import { motion } from "framer-motion";
import { BsMegaphoneFill } from "react-icons/bs";
import { FaRegMessage } from "react-icons/fa6";

const ResidentProfile = () => {
  useScrollToTop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  setTimeout(() => {
    setShowWaiting(true);
  }, 6000);

  return (
    <div className="flex overflow-x-hidden max-[450px]:block min-h-screen w-screen bg-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed md:fixed inset-0 z-50 bg-gray-600 lg:bg-gray-50 shadow w-64 lg:ml-[2%] lg:mt-[1.5%] lg:rounded-lg p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="text-xl md:text-3xl pt-6 md:pt-0 max-[450px]:text-white font-bold mb-10 pl-2">
          Resident Dashboard
        </h1>
        <ul className="space-y-6">
          <Link to={"/resident-dashboard"}>
            <li
              className="flex items-center space-x-3 cursor-pointer py-1 text-white md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 pl-2"
              onClick={() => setSidebarOpen(false)}
            >
              <FaHome />
              <span>Overview</span>
            </li>
          </Link>
          <Link to={"/home"}>
            <li
              className="flex items-center space-x-3 mt-4 cursor-pointer text-white md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 py-1 pl-2"
              onClick={() => setSidebarOpen(false)}
            >
              <FaArrowLeft />
              <span>Back Home</span>
            </li>
          </Link>
          <Link to={"/resident-code"}>
            <li className="flex items-center space-x-3 mt-5 cursor-pointer md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
              <FaUserSecret />
              <span>Entry Code</span>
            </li>
          </Link>
          <Link to={"/resident-annoucements"}>
            <li className="flex items-center space-x-3 mt-5 cursor-pointer md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
              <BsMegaphoneFill />
              <span>Annoucements</span>
            </li>
          </Link>
          <Link to={"/resident-messages"}>
            <li className="flex items-center space-x-3 mt-5 cursor-pointer md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
              <FaRegMessage />
              <span>Messages</span>
            </li>
          </Link>
          <Link to={"/resident-payments"}>
            <li className="flex items-center space-x-3 mt-5 cursor-pointer md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
              <FaCreditCard />
              <span>Payments</span>
            </li>
          </Link>
          <Link to={"/resident-maintenance"}>
            <li className="flex items-center space-x-3 mt-5 cursor-pointer py-1 md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white pl-2">
              <FaTools />
              <span>Maintenance</span>
            </li>
          </Link>
          <Link to={"/resident-profile"}>
            <li className="flex items-center space-x-3 mt-5 cursor-pointer py-1 pl-2 bg-gray-800 md:bg-gray-600 text-white">
              <FaUser />
              <span>Profile</span>
            </li>
          </Link>
          <li
            className="flex items-center space-x-3 cursor-pointer md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2"
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 md:hidden bg-gray-800 text-white p-2 rounded-full z-50"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Main Content */}
      <div className="flex-1 py-4 px-8 ml-4 md:ml-[20.5%]">
        {/* Top Navbar */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[1.45rem] md:text-3xl font-bold mb-8 text-white text-center">
            Profile
          </h1>
          {showWaiting ? (
            <motion.img
              initial={{
                opacity: 0,
                translateX: -100,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 2,
              }}
              src={waiting}
              className="w-[10rem] md:w-[15rem] waiting absolute right-2 top-[9.6%] md:top-[1.4%]"
              alt=""
            />
          ) : null}

          {/* Profile Overview */}
          <div className="absolute z-30 rounded-2xl w-[95%] ml-[-11%] md:ml-0 md:w-[70%] grid grid-cols-1 md:grid-cols-2 justify-between mb-8 py-6 mt-[6rem] shadow-xl bg-white px-5">
            <div className="flex gap-4 items-center">
              <img src={user1} className="w-[4rem] rounded-lg" alt="" />
              <span>
                <h2>David</h2>
                <h3>david@gmail.com</h3>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form component */}
      <div className="py-[6rem] overflow-x-hidden md:pl-[22.9%] max-[450px]:block w-[100vw] md:absolute mt-[18vh] md:mt-[34vh] bg-gray-100">
        <div className="w-[90vw] md:w-[50vw] mt-6 p-8 max-[450px]:mx-auto border shadow bg-gray-50 rounded">
          <h2 className="text-2xl font-bold">Edit Profile</h2>

          <div className="flex items-center mb-6">
            <img
              src={user1}
              alt=""
              className="w-24 h-24 mt-3 rounded-full object-cover mr-4"
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 flex items-center">
              <FaEdit className="mr-2" /> Edit Picture
            </button>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Old Password</label>
              <input
                type="password"
                name="password"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                name="password"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <BottomNavbar current={"dashboard"} />
    </div>
  );
};

export default ResidentProfile;
