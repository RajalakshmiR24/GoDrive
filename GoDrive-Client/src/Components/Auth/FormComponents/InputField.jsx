import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ type, name, value, onChange, placeholder = '', icon = null, className = '' }) => (
  <div className="relative">
    {icon && <span className="absolute left-3 top-3 text-black">{icon}</span>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full pl-10 pr-3 py-2 bg-transparent border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-400 ${className}`}
      required
    />
  </div>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default InputField;
