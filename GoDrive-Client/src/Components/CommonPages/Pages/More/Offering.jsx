import constants from '../../../../Utils/constant';
import React from "react";

const Offerings = () => {
  return (
    <div className="offerings-container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="header text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">GoDrive's Innovative Solutions</h1>
        <p className="text-lg text-gray-600 mb-6">
          Redefining the way people travel, deliver, and connect—our solutions go beyond just rides.
        </p>
        <button className="explore-button bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white transition duration-300">
          Explore Our Solutions
        </button>
      </div>

      <div className="content">
        <h2 className="text-3xl font-semibold mb-6">
          GoDrive Services, Products, and Solutions
        </h2>
        <div className="description text-gray-700 space-y-4 mb-8">
          <p>
            At GoDrive, we aim to transform transportation and logistics through technology. Our platform offers a wide range of services, including ride-hailing, delivery solutions, and innovative transportation methods that connect users with services efficiently.
          </p>
          <p>
            We bridge the gap between consumers and service providers, ensuring a seamless experience for rides, deliveries, and more. Our technology also supports businesses by optimizing operations and connecting them with their customers effectively.
          </p>
          <p>
            Serving over 50 countries and thousands of cities, GoDrive is at the forefront of modern transportation and logistics solutions.
          </p>
        </div>

        <div className="offerings-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="offering bg-white shadow-md p-6 rounded-lg text-center">
            <img
              src={constants.scale_blue}
              alt="Ride Options"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Ride Options</h3>
            <p className="text-gray-600 mb-4">Choose from a range of ride options tailored to your needs.</p>
            <button className="bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white transition duration-300">
              Learn more
            </button>
          </div>

          <div className="offering bg-white shadow-md p-6 rounded-lg text-center">
            <img
              src={constants.phone_map}
              alt="Earning Opportunities"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Earning Opportunities</h3>
            <p className="text-gray-600 mb-4">Explore ways to earn with GoDrive, whether driving or delivering.</p>
            <button className="bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white transition duration-300">
              Learn more
            </button>
          </div>

          <div className="offering bg-white shadow-md p-6 rounded-lg text-center">
            <img
              src={constants.dollar}
              alt="Innovative Solutions"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Innovative Solutions</h3>
            <p className="text-gray-600 mb-4">Driving innovation in transportation and logistics for a better experience.</p>
            <button className="bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white transition duration-300">
              Learn more
            </button>
          </div>
        </div>
      </div>

      <div className="ride-options my-10">
        <h2 className="text-3xl font-semibold mb-6">
          GoDrive's Top Services
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Seamless solutions at your fingertips.
        </p>


        <div className="ride-options-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="option bg-white shadow-md p-6 rounded-lg text-center">
            <img
              src={constants.airplane}
              alt="Service 1"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">GoDrive Ride</h3>
            <p className="text-gray-600 mb-4">
              Convenient and affordable rides with just a tap.
            </p>
            <button className="bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white transition duration-300">
              Learn more
            </button>
          </div>

          <div className="option bg-white shadow-md p-6 rounded-lg text-center">
            <img
              src={constants.airplane}
              alt="Delivery Service"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">GoDrive Delivery</h3>
            <p className="text-gray-600 mb-4">
              Reliable delivery services for all your needs.
            </p>
            <button className="bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white transition duration-300">
              Learn more
            </button>
          </div>

          <div className="option bg-white shadow-md p-6 rounded-lg text-center">
            <img
              src={constants.airplane}
              alt="Business Solutions"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Business Solutions</h3>
            <p className="text-gray-600 mb-4">Optimize your business operations with GoDrive.</p>
            <button className="bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white transition duration-300">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offerings;
