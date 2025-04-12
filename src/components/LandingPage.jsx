import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">DFA Playground</h1>
          <p className="text-xl mb-8">
            Design, simulate, and validate your deterministic finite automata effortlessly.
          </p>
          <button 
            onClick={() => navigate('/app/starts-with')}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">What is DFA Playground?</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto">
            DFA Playground is an interactive DFA simulator that converts a string into a deterministic finite automaton, automatically generates its transition tables, and lets you test input strings to determine if they're accepted by the DFA. Perfect for students, educators, or professionals working with automata theory.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg p-6 h-full">
                <h3 className="text-2xl font-semibold mb-2">Interactive Simulation</h3>
                <p className="text-gray-600">
                  Visualize each state and transition in real time as your DFA processes input strings.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg p-6 h-full">
                <h3 className="text-2xl font-semibold mb-2">Automated Table Generation</h3>
                <p className="text-gray-600">
                  Let the system automatically generate detailed transition tables based on your input.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white shadow-lg rounded-lg p-6 h-full">
                <h3 className="text-2xl font-semibold mb-2">String Tester</h3>
                <p className="text-gray-600">
                  Enter custom strings to test whether they are accepted by your defined DFA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-To-Action Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8">
            Begin exploring your DFA projects with our interactive, user-friendly simulator!
          </p>
          <button 
            onClick={() => navigate('/app/starts-with')}
            className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} DFA Playground. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
