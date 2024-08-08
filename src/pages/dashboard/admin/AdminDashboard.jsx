import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUsers,
  FaUserTie,
  FaCreditCard,
  FaBuilding,
  FaArrowLeft,
  FaUserSecret,
} from "react-icons/fa";
import useScrollToTop from "../../../components/useScrollToTop";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeProfile } from "../../../redux/slices/ProfileSlice";
import ChartComponent from "./ChartComponent";
import BottomNavbar from "../../../components/BottomNavbar";

let properties = [
  {
    id: 1,
    title: "Luxury Villa in Beverly Hills",
    image: "https://via.placeholder.com/300",
    location: "Beverly Hills, CA",
    price: "$4,500,000",
  },
  {
    id: 2,
    title: "Modern Apartment in New York",
    image: "https://via.placeholder.com/300",
    location: "New York, NY",
    price: "$2,300,000",
  },
  // Add more properties here
];

const AdminDashboard = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const State = useSelector((state) => state);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    title: "",
    image: "",
    location: "",
    price: "",
  });
  const [newPropertyForm, setNewPropertyForm] = useState({
    title: "",
    images: [], // Updated to handle multiple images
    location: "",
    price: "",
    bathrooms: "",
    bedrooms: "",
    description: "",
    features: "",
    condition: "",
    propertyType: "",
    address: "",
  });

  const userProfile = State.Profile[0];
  console.log(userProfile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDeleteConfirm = () => {
    const updatedProperties = properties.filter(
      (property) => property.id !== editFormData.id
    );
    properties = updatedProperties;
    setShowDeleteConfirmation(false);
    alert(`Property with ID ${editFormData.id} deleted!`);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Property updated!");
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleNewPropertyInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setNewPropertyForm({
        ...newPropertyForm,
        images: files,
      });
    } else {
      setNewPropertyForm({
        ...newPropertyForm,
        [name]: value,
      });
    }
  };

  const handleAddPropertySubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for the secondary images
      const secondaryImagesFormData = new FormData();
      for (let i = 0; i < newPropertyForm.images.length; i++) {
        secondaryImagesFormData.append("images", newPropertyForm.images[i]);
      }

      // Upload the secondary images
      const secondaryImagesResponse = await axios.post(
        "http://localhost:5000/api/v1/uploads",
        secondaryImagesFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const secondaryImageUrls = secondaryImagesResponse.data.images;

      // Add other form data
      const propertyData = {
        title: newPropertyForm.title,
        location: newPropertyForm.location,
        address: newPropertyForm.address,
        price: newPropertyForm.price,
        description: newPropertyForm.description,
        features: newPropertyForm.features,
        bathrooms: newPropertyForm.bathrooms,
        bedrooms: newPropertyForm.bedrooms,
        images: secondaryImageUrls, // Use uploaded secondary image URLs
        propertyType: newPropertyForm.propertyType,
        condition: newPropertyForm.condition,
      };

      // Submit property data
      await axios.post("http://localhost:5000/api/v1/properties", propertyData);
    } catch (error) {
      console.error("There was an error uploading the images:", error);
    }
  };

  // Calculate total residents, staff, and properties (dummy data)
  const totalResidents = 120;
  const totalStaff = 15;
  const totalProperties = properties.length;

  const logoutHandler = () => {
    if (window.confirm("Log out?")) {
      dispatch(removeProfile());
      navigate("/home");
    }
  };

  return (
    <>
      {!userProfile ? (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="text-center bg-gray-700 flex-1 h-screen w-screen content-center mx-auto text-white"
        >
          <div>
            <h2 className="font-semibold text-xl">Please log in or sign up</h2>
            <div className="flex gap-3 my-5 justify-center">
              <Link to={"/login"}>
                <button className="bg-gray-500 rounded hover:bg-gray-600 py-[0.5rem] px-[1.5rem]">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="bg-gray-500 rounded hover:bg-gray-600 py-[0.5rem] px-[1.5rem]">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="flex max-[450px]:block min-h-screen w-screen bg-gray-800"
        >
          {/* Sidebar */}
          <div
            className={`fixed md:static inset-0 z-50 bg-gray-600 lg:bg-gray-50 shadow w-64 lg:ml-[2%] lg:mt-[1.5%] lg:rounded-lg p-6 transition-transform duration-300 ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            <h1 className="text-xl pt-6 md:pt-0 md:text-3xl max-[450px]:text-white font-bold mb-10">
              Admin Dashboard
            </h1>
            <ul className="space-y-6">
              <li
                className="flex items-center space-x-3 cursor-pointer bg-gray-800 md:bg-gray-600 text-white py-1 pl-2"
                onClick={() => setSidebarOpen(false)}
              >
                <FaHome />
                <span>Overview</span>
              </li>
              <Link to={"/home"}>
                <li
                  className="flex items-center space-x-3 mt-4 cursor-pointer text-white lg:text-black md:hover:text-white lg:hover:bg-gray-600 hover:bg-gray-800 py-1 pl-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaArrowLeft />
                  <span>Back Home</span>
                </li>
              </Link>
              <li
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 lg:text-black md:hover:text-white lg:hover:bg-gray-600 text-white py-1 pl-2"
                onClick={() => {
                  handleAddModalOpen();
                  setSidebarOpen(false);
                }}
              >
                <FaPlus />
                <span>Create New Listing</span>
              </li>
              <Link to={"/admin-properties"}>
                <li className="flex items-center space-x-3 mt-5 cursor-pointer lg:text-black md:hover:text-white lg:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
                  <FaBuilding />
                  <span>Properties</span>
                </li>
              </Link>
              <Link to={"/admin-residents"}>
                <li className="flex items-center space-x-3 mt-5 cursor-pointer lg:text-black md:hover:text-white lg:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
                  <FaUsers />
                  <span>Residents</span>
                </li>
              </Link>
              <Link to={"/admin-staff"}>
                <li className="flex items-center space-x-3 mt-5 cursor-pointer lg:text-black md:hover:text-white lg:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
                  <FaUserTie />
                  <span>Staff</span>
                </li>
              </Link>
              <Link to={"/admin-payments"}>
                <li className="flex items-center space-x-3 mt-5 cursor-pointer lg:text-black md:hover:text-white lg:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
                  <FaCreditCard />
                  <span>Payments</span>
                </li>
              </Link>
              <Link to={"/admin-code"}>
                <li className="flex items-center space-x-3 mt-5 cursor-pointer lg:text-black md:hover:text-white lg:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2">
                  <FaUserSecret />
                  <span>Entry Code</span>
                </li>
              </Link>
              <li
                className="flex items-center space-x-3 cursor-pointer lg:text-black md:hover:text-white lg:hover:bg-gray-600 hover:bg-gray-800 text-white py-1 pl-2"
                onClick={() => {
                  setSidebarOpen(false);
                  logoutHandler();
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
          <div className="flex-1 py-4 px-8 ml-4 md:ml-0">
            {/* Top Navbar */}
            <div className="max-w-7xl mx-auto">
              <h1 className="text-[1.45rem] md:text-3xl font-bold mb-8 text-white text-center">
                Admin Dashboard
              </h1>
              {/* Dashboard Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="bg-gray-50 rounded-lg p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUsers className="text-4xl text-blue-500 mx-auto" />
                  <p className="text-center text-xl font-semibold mt-4">
                    Total Residents
                  </p>
                  <p className="text-center text-3xl font-bold">
                    {totalResidents}
                  </p>
                </motion.div>
                <motion.div
                  className="bg-gray-50 rounded-lg p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUserTie className="text-4xl text-green-500 mx-auto" />
                  <p className="text-center text-xl font-semibold mt-4">
                    Total Staff
                  </p>
                  <p className="text-center text-3xl font-bold">{totalStaff}</p>
                </motion.div>
                <motion.div
                  className="bg-gray-50 rounded-lg p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaBuilding className="text-4xl text-purple-500 mx-auto" />
                  <p className="text-center text-xl font-semibold mt-4">
                    Total Properties
                  </p>
                  <p className="text-center text-3xl font-bold">
                    {totalProperties}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Chart component */}
          <div className="pt-5 md:pl-[22.9%] pb-9 pl-[5%] md:h-[55vh] max-[450px]:block w-[100vw] md:absolute md:mt-[45vh] bg-gray-100">
            <div className="w-[90vw] md:w-[40vw] h-[30vh] md:h-[50vh] p-5 md:mt-[-3rem] border shadow-lg shadow-gray-500 bg-gray-50 rounded">
              <ChartComponent />
            </div>
          </div>

          {/* Add New Property Modal */}
          {showAddModal && (
            <div className="fixed pt-[15rem] overflow-y-scroll inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg mt-12 w-[90%] md:w-[70%] lg:w-[50%]">
                <h2 className="text-xl font-bold mb-2">Add New Property</h2>
                <form onSubmit={handleAddPropertySubmit}>
                  <div className="mb-2">
                    <label className="block font-semibold mb-2">Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={newPropertyForm.title}
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block font-semibold mb-2">
                      Images: (The first image you select will be your primary
                      image)
                    </label>
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold mb-2">
                      Location:
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={newPropertyForm.location}
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold mb-2">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={newPropertyForm.address}
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold mb-2">Price:</label>
                    <input
                      type="text"
                      name="price"
                      value={newPropertyForm.price}
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold mb-2">
                      Bathrooms:
                    </label>
                    <input
                      type="text"
                      name="bathrooms"
                      value={newPropertyForm.bathrooms}
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold mb-2">
                      Bedrooms:
                    </label>
                    <input
                      type="text"
                      name="bedrooms"
                      value={newPropertyForm.bedrooms}
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold mb-2">
                      Description:
                    </label>
                    <textarea
                      name="description"
                      value={newPropertyForm.description}
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-1 border rounded-lg"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold mb-2">
                      Features: (Seperate each feature with a comma)
                    </label>
                    <textarea
                      name="features"
                      value={newPropertyForm.features}
                      onChange={handleNewPropertyInputChange}
                      className="w-full px-4 py-1 border rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4 mb-3 md:w-[60vw] text-black lg:w-[40vw]">
                    <label htmlFor="condition">Condition</label>
                    <select
                      name="condition"
                      value={newPropertyForm.condition}
                      onChange={handleNewPropertyInputChange}
                      className="flex items-center gap-1"
                    >
                      <option value="">Select Condition</option>
                      <option value="sale">Sale</option>
                      <option value="rent">Rent</option>
                      <option value="lease">Lease</option>
                    </select>
                  </div>
                  <div className="flex gap-4 mb-3 md:w-[60vw] text-black lg:w-[40vw]">
                    <label htmlFor="propertyType">Property Type</label>
                    <select
                      name="propertyType"
                      value={newPropertyForm.propertyType}
                      onChange={handleNewPropertyInputChange}
                      className="flex items-center gap-1"
                    >
                      <option value="">Select Type</option>
                      <option value="duplex">Duplex</option>
                      <option value="bungalow">Bungalow</option>
                      <option value="apartment">Apartment</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddModalClose}
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Add Property
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg w-full max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Edit Property</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={editFormData.image}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={editFormData.price}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                    >
                      Update Property
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg w-full max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6">Confirm Delete</h2>
                <p className="mb-6">
                  Are you sure you want to delete this property?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleDeleteCancel}
                    className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      <BottomNavbar current={"dashboard"} />
    </>
  );
};

export default AdminDashboard;
