import React from "react";

const PatternInput = ({ value, onChange, ...props }) => {
  const handleInputChange = (e) => {
    const input = e.target.value;
  
    if (input === "") {
      onChange(""); // Explicitly reset state
      return;
    }
  
    const isBinary = /^[01]+$/.test(input);
    const isAlpha = /^[ab]+$/.test(input);
  
    if (isBinary || isAlpha) {
      onChange(input);
    }
  };
  
  return (
    <div className="flex items-center space-x-4 border border-gray-300 p-2">
      <label htmlFor={props.id} className="whitespace-nowrap ml-4">
        {props.label}
      </label>
      <input
        {...props} // Spread remaining props like id, placeholder
        type="text"
        value={value}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PatternInput;
