// components/DFAVisualizer.jsx 
import Sidebar from './Sidebar';
import MobileDropdown from './MobileDropdown';
import InputSection from './InputSection';
import VisualizationArea from './VisualizationArea';
import { useDFAVisualizer } from '../hooks/useDFAVisualizer';
import { STRING_OPTIONS } from '../constants/stringOptions';
import StateLogger from './StateLogger';

const DFAVisualizer = () => {
  const {
    selectedOption,
    pattern,
    isDropdownOpen,
    selectedOptionData,
    handleOptionSelect,
    handleToggleDropdown,
    handlePatternChange,
  } = useDFAVisualizer(STRING_OPTIONS);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        stringOptions={STRING_OPTIONS}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
      />

      <div className="flex-1 p-4 md:p-8 bg-gray-200 overflow-y-auto">
        <MobileDropdown
          stringOptions={STRING_OPTIONS}
          selectedOption={selectedOption}
          selectedOptionData={selectedOptionData}
          isDropdownOpen={isDropdownOpen}
          onToggleDropdown={handleToggleDropdown}
          onOptionSelect={handleOptionSelect}
        />

        <h1 className="hidden md:block text-2xl font-bold text-gray-800 mb-8">
          DFA Visualizer: {selectedOption}
        </h1>


        <InputSection
          selectedOption={selectedOption}
          pattern={pattern}
          onPatternChange={handlePatternChange}
        />

        <StateLogger  />

        <VisualizationArea
          pattern={pattern}
          selectedOption={selectedOption}
        />
      </div>
    </div>
  );
};

export default DFAVisualizer;