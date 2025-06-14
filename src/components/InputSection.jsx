
const InputSection = ({ selectedOption, pattern, onPatternChange }) => {
  const handleInputChange = (e) => {
    const input = e.target.value;
    
    if (input === "") {
      onPatternChange(""); // Explicitly reset state
      return;
    }

    const isBinary = /^[01]+$/.test(input);
    const isAlpha = /^[ab]+$/.test(input);

    if (isBinary || isAlpha) {
      onPatternChange(input);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-4 flex-1">
          <label className="text-gray-700 font-medium whitespace-nowrap">
            {selectedOption.replace('...', '')}
          </label>
          <input
            type="text"
            value={pattern}
            onChange={handleInputChange}
            placeholder="Enter pattern (e.g., 101 or ab)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
      </div>
    </div>
  );
};

export default InputSection;
