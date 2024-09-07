import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-lg focus:outline-none"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
  );
};

export default BackButton;
