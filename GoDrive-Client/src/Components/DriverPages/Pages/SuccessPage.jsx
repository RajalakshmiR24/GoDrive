import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../../assets/Animations/greeenTick.json";
import api from "../../../Utils/axios";

function SuccessPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [rejectionComments, setRejectionComments] = useState(""); // State for rejection comments
  const navigate = useNavigate();
  const intervalRef = useRef(null); // Ref to store the interval ID

  useEffect(() => {
    const fetchDriverId = async () => {
      const driverId = localStorage.getItem("driverId"); // Retrieve driverId from localStorage

      if (!driverId) {
        console.error("Driver ID not found in localStorage.");
        return;
      }

      try {
        const { data: verificationData } = await api.get(`/drivers/checkVerification/${driverId}`);
        setIsVerified(verificationData.verified);

        // Check if the application is rejected and update rejection comments
        if (verificationData.status === "Rejected") {
          setRejectionComments(verificationData.rejectionComments); // Set rejection comments if present
        } else {
          setRejectionComments(""); // Clear rejection comments if not rejected
        }
      } catch (error) {
        console.error("Error fetching driver verification status:", error);
      }
    };

    // Fetch the driver's verification status immediately and then every 3 seconds
    fetchDriverId();
    intervalRef.current = setInterval(fetchDriverId, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    // Clear the interval once the driver is verified
    if (isVerified && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [isVerified]); // Dependency on isVerified

  const handleNavigation = (path) => navigate(path);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg shadow-gray-300 rounded w-8/12">
        <div className="bg-green-500 h-3"></div>

        <Lottie animationData={animationData} loop className="w-60 h-60 mx-auto" />

        <h1 className="text-center font-bold py-4 text-lg">
          Thank you for your patience.
        </h1>
        <p className="text-center text-lg py-4 px-6">
          {isVerified
            ? "Your application has been successfully submitted. You can now proceed to the duty page."
            : "Your application is under review. Please wait for the admin to verify it."}
        </p>

        {/* Conditionally render rejection comments with a red border if present */}
        {rejectionComments && (
          <div className="border border-red-500 text-red-500 bg-red-100 text-center p-4 rounded-md mx-6 my-4">
            <p>{rejectionComments}</p>
          </div>
        )}

        <div className="flex justify-center py-4">
          <button
            onClick={() => handleNavigation(isVerified ? "/duty" : "/driver")}
            className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-700"
          >
            {isVerified ? "Go to Duty Page" : "Home"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
