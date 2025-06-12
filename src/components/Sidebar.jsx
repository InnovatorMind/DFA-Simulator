
const Sidebar = ({ stringOptions, selectedOption, onOptionSelect }) => {
  return (
    <div className="hidden md:block w-64 bg-slate-700 text-white p-4">
      <h2 className="text-xl font-bold mb-6">String Options</h2>
      <div className="space-y-2">
        {stringOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onOptionSelect(option.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedOption === option.label
                  ? 'bg-slate-600 text-white'
                  : 'text-gray-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              <IconComponent size={20} />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;