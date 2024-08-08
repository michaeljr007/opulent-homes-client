import React, { useState } from "react";
import { motion } from "framer-motion";
import contactGif from "../assets/img/contactGif.gif";
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import BottomNavbar from "../components/BottomNavbar";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = "Please enter your name";
    }
    if (!message) {
      errors.message = "Please enter your message";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert(`Welcome ${name}, your message has been sent!`);
      setName("");
      setMessage("");
      setErrors({});
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
        <motion.div
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-5"
        >
          <img
            src={contactGif}
            alt="Contact"
            className="w-full h-[230px] object-cover rounded-lg"
          />
        </motion.div>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-4">Get In Touch!</h1>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-2">{errors.name}</p>
          )}
          <label className="block text-sm font-semibold mb-1">Message</label>
          <textarea
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-2 w-full h-20"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mb-2">{errors.message}</p>
          )}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
          <div className="mt-4 text-center">
            <span className="block">Follow Us</span>
            <div className="flex justify-center gap-4 mt-2">
              <IoLogoInstagram size={20} color="blue" />
              <IoLogoFacebook size={20} color="blue" />
            </div>
          </div>
        </div>
      </div>
      <BottomNavbar current={"contact"} />
    </>
  );
};

export default Contact;
