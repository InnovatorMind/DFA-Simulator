import { ChevronDown } from 'lucide-react';

const MobileDropdown = ({ 
  stringOptions, 
  selectedOption, 
  selectedOptionData, 
  isDropdownOpen, 
  onToggleDropdown, 
  onOptionSelect 
}) => {
  return (
    <div className="md:hidden mb-6">
      <div className="relative">
        <button
          onClick={onToggleDropdown}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-700 text-white rounded-lg"
        >
          <div className="flex items-center gap-3">
            {selectedOptionData && <selectedOptionData.icon size={20} />}
            <span>{selectedOption}</span>
          </div>
          <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 text-white rounded-lg shadow-lg z-10">
            {stringOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => onOptionSelect(option)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-600 first:rounded-t-lg last:rounded-b-lg ${
                    selectedOption === option.label ? 'bg-slate-600' : ''
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileDropdown;