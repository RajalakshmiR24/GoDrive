import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

const PasswordField = ({ name, value, onChange, placeholder, className }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-3 text-black"><FaLock /></span>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-2 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-400 ${className}`}
        required
      />
      <span className="absolute right-3 top-3 text-black cursor-pointer" onClick={togglePasswordVisibility}>
        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default PasswordField;
