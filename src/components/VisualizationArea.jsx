import StartsWith from "./functions/StartsWith";
import EndsWith from "./functions/EndsWith";
import Contains from "./functions/Contains";
// import EvenOdd from "./functions/EvenOdd";

const VisualizationArea = ({ selectedOption, pattern }) => {

  // Define mapping between options and components
  const components = {
    "Starts With": StartsWith,
    "Ends With": EndsWith,
    "Contains": Contains,
    // "EvenOdd": EvenOdd,
  };

  // Get the corresponding component based on selection
  const SelectedComponent = components[selectedOption] || null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="w-full h-[400px] relative flex items-center justify-center">
        {/* Render selected component dynamically */}
        {SelectedComponent ? <SelectedComponent pattern={pattern} /> : <p className="text-gray-500">Select an option to visualize</p>}
      </div>
    </div>
  );
};

export default VisualizationArea;
