import React from 'react';
import PropTypes from 'prop-types';

const SocialButton = ({ label, onClick, icon, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${className}`}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

SocialButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default SocialButton;
