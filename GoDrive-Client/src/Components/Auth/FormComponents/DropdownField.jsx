import React from 'react';
import PropTypes from 'prop-types';

const DropdownField = ({ name, value, onChange, options, placeholder, className }) => (
  <div className="relative">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full pl-3 pr-3 py-2 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-400 ${className}`}
      required
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

DropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default DropdownField;
