import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faDollarSign, faListAlt } from '@fortawesome/free-solid-svg-icons';
import animationData from "../../../../assets/Animations/handmobile2.json";
import api from "../../../../Utils/axios"; 

const OffDutyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [earnings, setEarnings] = useState({
    walletBalance: 0,
    todayEarnings: 0,
    totalOrderEarnings: 0,
  });
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    // Determine the time of day
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setTimeOfDay("morning");
    } else if (hour >= 12 && hour < 17) {
      setTimeOfDay("noon");
    } else if (hour >= 17 && hour < 21) {
      setTimeOfDay("evening");
    } else {
      setTimeOfDay("night");
    }
    
    // Fetch earnings from API
    const fetchEarnings = async () => {
      try {
        const response = await api.get('/earnings/get-earnings'); // Adjust the endpoint as needed
        setEarnings(response.data);
      } catch (error) {
        console.error("Error fetching earnings data:", error);
      }
    };

    fetchEarnings();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className="p-6 min-h-screen w-full flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-3xl flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
        <p className="text-gray-800 text-lg font-semibold">Today's Earnings</p>
        <button
          onClick={toggleDropdown}
          className="text-lg font-bold text-gray-900 focus:outline-none"
        >
          ₹{earnings.todayEarnings} {isOpen ? "▲" : "▼"}
        </button>
      </header>

      {/* Conditional Content Rendering */}
      {isOpen ? (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg shadow-sm p-4 text-center flex items-center justify-center">
              <FontAwesomeIcon icon={faWallet} className="text-gray-600 text-3xl mb-2" />
              <div className="ml-4">
                <p className="text-gray-600 font-medium">GoDrive Wallet Balance</p>
                <p className="text-2xl font-bold text-gray-800">₹{earnings.walletBalance}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-sm p-4 text-center flex items-center justify-center">
              <FontAwesomeIcon icon={faDollarSign} className="text-gray-600 text-3xl mb-2" />
              <div className="ml-4">
                <p className="text-gray-600 font-medium">Today's Earnings</p>
                <p className="text-2xl font-bold text-gray-800">₹{earnings.todayEarnings}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-sm p-4 text-center flex items-center justify-center">
              <FontAwesomeIcon icon={faListAlt} className="text-gray-600 text-3xl mb-2" />
              <div className="ml-4">
                <p className="text-gray-600 font-medium">Total Order Earnings</p>
                <p className="text-2xl font-bold text-gray-800">₹{earnings.totalOrderEarnings}</p>
              </div>
            </div>
          </div>

          {/* Low Balance Alert */}
          {earnings.walletBalance < 0 && (
            <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center mb-6">
              <p className="text-lg font-semibold">Low Wallet Balance</p>
              <p>Please recharge your wallet!</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                Recharge Now
              </button>
            </div>
          )}
        </div>
      ) : (
        // Header when the dropdown is closed
        <div className="w-full max-w-3xl text-center bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg text-gray-800">Good {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}, Captain 🚖</p>
          <p className="font-semibold text-xl mt-2 text-gray-900">Go ON DUTY to start earning</p>
          
          <Lottie animationData={animationData} loop className="w-64 h-64 mx-auto mt-4" />
        </div>
      )}
    </div>
  );
};

export default OffDutyPage;
