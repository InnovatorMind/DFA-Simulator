// PatternInput.jsx
import React from "react";

const PatternInput = ({ id, label, value, onChange, placeholder }) => {
  const handleInputChange = (e) => {
    // Remove any characters that are not "0" or "1"
    const filteredValue = e.target.value.replace(/[^01]/g, "");
    onChange(filteredValue);
  };

  return (
    <div className="flex items-center space-x-4 border border-gray-300 p-2">
      <label htmlFor={id} className="whitespace-nowrap ml-4">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PatternInput;
