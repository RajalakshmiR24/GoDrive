import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label, name, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="mr-2 form-checkbox h-4 w-4 text-black border-black"
    />
    <label htmlFor={name} className="text-black">{label}</label>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
