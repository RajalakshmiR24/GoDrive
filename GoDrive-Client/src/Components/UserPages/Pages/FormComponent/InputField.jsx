import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const InputField = ({ type, value, onChange, options, placeholder = '', suggestions = [], icon = null, onSuggestionSelect }) => {
  return (
    <div className="relative flex items-center">
      {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-lg">{icon}</span>}
      {type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full pl-10 p-2 rounded-md bg-gray-100 hover:bg-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full pl-10 p-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          />
          {/* Render suggestions if provided */}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 z-10 bg-gray-100 border border-gray-300 mt-2 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer  hover:text-black-600 transition duration-150"
                  onClick={() => onSuggestionSelect(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};


export default InputField;
