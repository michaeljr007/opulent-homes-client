import { Route, Routes } from "react-router-dom";
import IntroSlider from "./pages/IntroSlider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllProperties from "./pages/AllProperties";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import AdminProperties from "./pages/dashboard/admin/AdminProperties";
import AdminResidents from "./pages/dashboard/admin/AdminResidents";
import AdminStaff from "./pages/dashboard/admin/AdminStaff";
import AdminPayments from "./pages/dashboard/admin/AdminPayments";
import AdminCode from "./pages/dashboard/admin/AdminCode";
import UserProfile from "./pages/UserProfile";
import ResidentDashboard from "./pages/dashboard/resident/ResidentDashboard";
import ResidentCode from "./pages/dashboard/resident/ResidentCode";
import ResidentPayments from "./pages/dashboard/resident/ResidentPayments";
import ResidentMaintenance from "./pages/dashboard/resident/ResidentMaintenance";
import ResidentProfile from "./pages/dashboard/resident/ResidentProfile";
import SignupSucess from "./pages/SignupSuccess";
import { useDispatch } from "react-redux";
import { fetchCode } from "./redux/slices/EntryCodeSlice";
import { useEffect, useState } from "react";
import Contact from "./pages/Contact";
import Loader from "./components/Loader";
import PropertyInfo from "./pages/PropertyInfo";

function App() {
  const dispatch = useDispatch();
  // Preloader state
  const [isloading, setIsLoading] = useState(true);

  // Preloader timeout
  useEffect(() => {
    dispatch(fetchCode());
    const preloaderShown = localStorage.getItem("preloaderShown");

    if (!preloaderShown) {
      const fakeDataFetch = () => {
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem("preloaderShown", "true");
        }, 3000);
      };

      fakeDataFetch();
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  return (
    <div className="App">
      {isloading ? (
        <span>
          <Loader />
        </span>
      ) : (
        <Routes>
          <Route path="/" element={<IntroSlider />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup-success" element={<SignupSucess />} />
          <Route path="/all-properties" element={<AllProperties />} />
          <Route path="/property-info" element={<PropertyInfo />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-properties" element={<AdminProperties />} />
          <Route path="/admin-residents" element={<AdminResidents />} />
          <Route path="/admin-staff" element={<AdminStaff />} />
          <Route path="/admin-payments" element={<AdminPayments />} />
          <Route path="/admin-code" element={<AdminCode />} />
          <Route path="/resident-dashboard" element={<ResidentDashboard />} />
          <Route path="/resident-code" element={<ResidentCode />} />
          <Route path="/resident-payments" element={<ResidentPayments />} />
          <Route
            path="/resident-maintenance"
            element={<ResidentMaintenance />}
          />
          <Route path="/resident-profile" element={<ResidentProfile />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
