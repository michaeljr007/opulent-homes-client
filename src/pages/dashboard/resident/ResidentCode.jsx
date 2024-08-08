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
} from "react-icons/fa";
import { BsMegaphoneFill } from "react-icons/bs";
import useScrollToTop from "../../../components/useScrollToTop";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import BottomNavbar from "../../../components/BottomNavbar";
import { FaRegMessage } from "react-icons/fa6";
import GetDate from "../GetDate";

const ResidentCode = () => {
  useScrollToTop();
  const secretCode = useSelector((state) => state.EntryCode);
  const code = secretCode.entryCode;

  const status = useSelector((state) => state.EntryCode.status);
  const error = useSelector((state) => state.EntryCode.error);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex max-[450px]:block min-h-screen w-screen bg-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-0 z-50 bg-gray-600 lg:bg-gray-50 shadow w-64 lg:ml-[2%] lg:mt-[1.5%] lg:rounded-lg p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="text-xl md:text-3xl pt-6 md:pt-0 max-[450px]:text-white font-bold mb-10 pl-2">
          Resident Dashboard
        </h1>
        <ul className="space-y-6">
          <Link to={"/resident-dashboard"}>
            <li
              className="flex items-center space-x-3 cursor-pointer md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2"
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
          <Link to={"/entry-code"}>
            <li className="flex items-center space-x-3 mt-5 cursor-pointer py-1 bg-gray-800 md:bg-gray-600 text-white pl-2">
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
            <li className="flex items-center space-x-3 mt-5 cursor-pointer py-1 md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white pl-2">
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
            <li className="flex items-center space-x-3 mt-5 cursor-pointer py-1 md:text-black md:hover:text-white md:hover:bg-gray-600 hover:bg-gray-800 text-white pl-2">
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
      <div className="pt-[9vh] text-white text-center mx-auto">
        <span className="absolute font-semibold max-[450px]:right-[6%] max-[450px]:bottom-[14%] md:left-[24%] text-white md:top-[5%]">
          <GetDate />
        </span>
        <h1 className="font-bold text-2xl lg:text-3xl">Today's Entry Code</h1>
        <motion.p
          initial={{
            translateX: -100,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="text-[3.4rem] font-sans mt-2"
        >
          {code}
        </motion.p>
        <motion.h1
          initial={{
            translateY: 100,
            opacity: 0,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 2.5,
          }}
        >
          <FaUserSecret className="text-[12rem] mx-auto mt-12 animate-pulse" />
        </motion.h1>
      </div>

      <BottomNavbar current={"dashboard"} />
    </div>
  );
};

export default ResidentCode;
