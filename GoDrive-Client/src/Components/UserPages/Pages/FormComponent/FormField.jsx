import React from 'react';
import InputField from './InputField';

const FormField = ({ label, type = 'text', value, onChange, options = [], suggestions = [], icon = null, onSuggestionSelect }) => {
  return (
    <div className="mb-4 w-auto ">
      <InputField
        type={type}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={`Enter ${label.toLowerCase()}`}
        suggestions={suggestions}
        icon={icon}
        onSuggestionSelect={onSuggestionSelect}
      />
    </div>
  );
};

export default FormField;
