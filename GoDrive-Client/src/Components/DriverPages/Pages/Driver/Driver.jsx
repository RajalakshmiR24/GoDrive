import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../Utils/axios'; // Import your API instance
import constants from '../../../Utils/constant';

const Driver = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const checkDriverStatus = async () => {
    setIsChecking(true);
    navigate('/driver/success'); // Navigate to success page immediately when checking starts

    try {
      // First API call to check driver status
      const statusResponse = await api.get('/drivers/checkStatus', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Extract driverId from the status response
      const { exists, driverId } = statusResponse.data;

      if (driverId) {
        localStorage.setItem('driverId', driverId); // Store the driverId in localStorage

        // Second API call to check verification status
        const verificationResponse = await api.get(`/drivers/checkVerification/${driverId}`);
        setIsVerified(verificationResponse.data.verified);
      }

      if (exists) {
        if (isVerified) {
          navigate('/duty');
        } else {
          navigate('/driver/success');
        }
      } else {
        navigate('/driver/form');
      }
    } catch (error) {
      console.error('Error checking driver status or verification:', error.response || error.message);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title and Subtitle */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Drive on Your Terms, Earn What You Deserve
      </h1>
      <p className="mb-10 text-lg text-gray-600 text-center">
        Drive when it suits you and make the income you need.
      </p>

      {/* Image */}
      <img
        src={constants.driver}
        alt="Driving with GoDrive"
        className="w-full h-72 object-cover rounded-lg mb-8 shadow-lg"
      />

      {/* Button */}
      <button
        onClick={checkDriverStatus}
        className="bg-black hover:bg-white border border-black text-white hover:text-black px-6 py-3 rounded-full mb-8 transition duration-200 ease-in-out transform hover:scale-105 shadow-md w-full max-w-xs mx-auto block"
        disabled={isChecking}
      >
        {isChecking ? 'Checking...' : 'Get Started'}
      </button>

      {/* Why Choose Us Section */}
      <h3 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Why Choose Us?</h3>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Flexible Hours Card */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300">
          <img src={constants.flexible_hours} alt="Flexible Hours" className="w-16 h-16 mb-4" />
          <h4 className="font-bold text-gray-800 mb-2">Flexible Hours</h4>
          <p className="text-gray-600">Drive on your schedule. Choose when and how often you want to work.</p>
        </div>

        {/* Fast Payments Card */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300">
          <img src={constants.fast_payments} alt="Fast Payments" className="w-16 h-16 mb-4" />
          <h4 className="font-bold text-gray-800 mb-2">Fast Payments</h4>
          <p className="text-gray-600">Enjoy weekly deposits directly to your bank account.</p>
        </div>

        {/* 24/7 Support Card */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300">
          <img src={constants.Support} alt="24/7 Support" className="w-16 h-16 mb-4" />
          <h4 className="font-bold text-gray-800 mb-2">24/7 Support</h4>
          <p className="text-gray-600">Need assistance? We're here for you around the clock.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-12">
        <h3 className="text-3xl font-semibold text-gray-700 mb-6 text-center">How It Works</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Requirements for Driving */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">What You Need to Get Started</h4>
            <div className="mb-6">
              <p className="mb-3 font-semibold text-gray-700">To Drive:</p>
              <div className="flex items-start space-x-4">
                <img src={constants.DriveRequirements} alt="Drive Requirements" className="w-16 h-16 object-cover rounded-full shadow-md"/>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Clear a background check</li>
                </ul>
              </div>
            </div>
            {/* Requirements for Delivering */}
            <div>
              <p className="mb-3 font-semibold text-gray-700">To Deliver:</p>
              <div className="flex items-start space-x-4">
                <img src={constants.DeliverRequirements} alt="Deliver Requirements" className="w-16 h-16 object-cover rounded-full shadow-md"/>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Valid driver’s license (private or commercial)</li>
                  <li>Proof of residency</li>
                  <li>Vehicle documents such as insurance, registration, and permit</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Apply Process */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Apply Process</h4>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-6">
              <li>Visit your nearest Partner Seva Kendra.</li>
              <li>Submit your documents and photo. Ensure that all documents are up-to-date and valid.</li>
              <li>Provide information for a background check. This includes your identity verification, criminal record check, and driving history.</li>
              <li>Complete a short driving skills assessment to demonstrate your ability to safely operate a vehicle.</li>
              <li>Attend a brief orientation session that covers the platform's policies, guidelines, and best practices for providing a quality service.</li>
              <li>Once all steps are completed, await confirmation of your application status, which will be communicated via email or SMS.</li>
              <li>Upon approval, receive your welcome kit and start your journey with us!</li>
            </ol>
          </div>    

        </div>
      </div>

      {/* Additional Information Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Protection on Every Trip */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Protection on Every Trip</h3>
          <p className="text-gray-600">Every trip with GoDrive is insured to keep you and your passengers safe.</p>
        </div>

        {/* Emergency Support */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Emergency Support</h3>
          <p className="text-gray-600">The Emergency Button contacts 911 directly and allows you to share your trip details with authorities.</p>
        </div>

        {/* Community Standards */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Community Standards</h3>
          <p className="text-gray-600">We take our Community Standards seriously and encourage respectful and safe behavior.</p>
        </div>
      </div>
    </div>
  );
};

export default Driver;
