import React from 'react';
import { FaCar } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaBusinessTime } from "react-icons/fa";
import { FaTruckFront } from "react-icons/fa6";
import constants from '../../../Utils/constant';

function Help() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
      <header className="w-full bg-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-lg font-semibold">Help</h1>
        </div>
      </header>

      <main
        className="flex-grow w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${constants.help})` }}
      >
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Godrive Support</h1>
          <p className="text-lg mb-10">We’re here to help. Looking for customer service contact information? Explore support resources for the relevant products below to find the best way to reach out about your issue.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Riders', icon: <FaCar /> },
              { name: 'Driving & Delivering', icon: <MdDeliveryDining /> },
              { name: 'Bikes & Scooters', icon: <RiMotorbikeFill /> },
              { name: 'Business', icon: <FaBusinessTime /> },
              { name: 'Freight', icon: <FaTruckFront /> }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Help;
