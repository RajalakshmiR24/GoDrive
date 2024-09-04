import React, { useState } from "react";
import animationData from "../../../../assets/Animations/handmobile2.json"; 
import Lottie from "lottie-react";


const OffDutyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className="p-6 min-h-screen bg-cover bg-center w-full flex flex-col items-center">
      {/* Dropdown Button */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6 bg-white bg-opacity-50 p-4 rounded-lg shadow-lg">
        <p className="text-gray-700 font-semibold text-lg">Today's Earnings</p>
        <button
          onClick={toggleDropdown}
          className="text-lg font-bold text-gray-800 focus:outline-none"
        >
          ₹4 {isOpen ? "▲" : "▼"}
        </button>
      </div>

      {/* Conditional Content Rendering */}
      {isOpen ? (
        <div className="w-full max-w-3xl bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-4 text-center">
              <p className="text-gray-600 font-semibold">Rapido Wallet Balance</p>
              <p className="text-2xl font-bold text-gray-800">₹ -260.15</p>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-4 text-center">
              <p className="text-gray-600 font-semibold">Today's Earnings</p>
              <p className="text-2xl font-bold text-gray-800">₹ 444</p>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-4 text-center">
              <p className="text-gray-600 font-semibold">Total Order Earnings</p>
              <p className="text-2xl font-bold text-gray-800">₹ 444</p> {/* Default value */}
            </div>
          </div>

          {/* Low Balance Alert */}
          <div className="bg-red-100 bg-opacity-90 text-red-600 p-4 rounded-lg text-center my-6">
            <p className="text-lg font-semibold">Low Wallet Balance</p>
            <p>Please recharge your wallet!</p>
          </div>
        </div>
      ) : (
        // Header when the dropdown is closed
        <div className="w-full max-w-3xl text-center my-6 bg-white bg-opacity-50 p-6 rounded-lg shadow-lg">
          <p className="text-lg">Good Afternoon, Captain 🚖</p>
          <p className="font-bold text-xl mt-2">Go ON DUTY to start earning</p>
          
          <Lottie animationData={animationData} loop className="w-60 h-60 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default OffDutyPage;
