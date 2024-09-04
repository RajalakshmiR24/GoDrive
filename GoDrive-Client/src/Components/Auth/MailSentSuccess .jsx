import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const MailSentSuccess = () => {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <FaCheckCircle className="text-green-500 text-5xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Email Sent Successfully!</h2>
          <p className="text-gray-700 mb-4">
            Please check your email inbox and follow the instructions to reset your password.
          </p>
          <Link to="/signin" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    );
  };
  
  export default MailSentSuccess;
  