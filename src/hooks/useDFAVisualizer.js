// hooks/useDFAVisualizer.js
import { useState } from 'react';

export const useDFAVisualizer = (stringOptions, defaultOption = 'Starts With') => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [pattern, setPattern] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedOptionData = stringOptions.find(opt => opt.label === selectedOption);

  const handleOptionSelect = (option) => {
    if (typeof option === 'string') {
      setSelectedOption(option);
    } else {
      setSelectedOption(option.label);
    }
    setIsDropdownOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // console.log(isDropdownOpen);
  };

  const handlePatternChange = (newPattern) => {
    setPattern(newPattern);
    // console.log(pattern);
  };

  const handleVisualize = () => {
    console.log(`Visualizing: ${selectedOption} with pattern: ${pattern}`);
  };

  return {
    selectedOption,
    pattern,
    isDropdownOpen,
    selectedOptionData,
    handleOptionSelect,
    handleToggleDropdown,
    handlePatternChange,
    handleVisualize
  };
};
