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

  return {
    selectedOption,
    pattern,
    isDropdownOpen,
    selectedOptionData,
    handleOptionSelect,
    handleToggleDropdown,
    handlePatternChange,
  };
};


export function createNodesWithDeadState(text, type) {
  const totalNodes = text.length + 1;
  const nodeQueue = [];

  for (let i = 0; i < totalNodes; i++) {
    nodeQueue.push({
      id: i,
      label: `q${i}`,
      x: i * 120,
      y: 0,
      fixed: true,
      color: {
        background: "#FFCDD2",
        border: "#B71C1C",
      },
      size: 15,
    });
  }

  if (type === "Starts With") {
    nodeQueue.push({
      id: "dead",
      label: "qX",
      x: ((totalNodes - 1) * 120) / 2,
      y: 150,
      fixed: { x: true, y: false },
      color: {
        background: "#E0E0E0",
        border: "#424242",
      },
      size: 15,
    });
  }

  return nodeQueue;
}
