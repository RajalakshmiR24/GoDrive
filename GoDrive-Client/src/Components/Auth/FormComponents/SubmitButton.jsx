import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ label }) => (
  <button
    type="submit"
    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {label}
  </button>
);

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SubmitButton;
