import { Link, Routes, Route } from 'react-router-dom';
import StartsWithPage from '../pages/options/StartsWithPage';
import EndsWithPage from '../pages/options/EndsWithPage';
import ContainsPage from '../pages/options/ContainsPage';

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">String Options</h2>
        <ul className="space-y-4">
          <li>
            <Link 
              to="/app/starts-with" 
              className="hover:text-gray-300 transition-colors"
            >
              Starts With...
            </Link>
          </li>
          <li>
            <Link 
              to="/app/ends-with" 
              className="hover:text-gray-300 transition-colors"
            >
              Ends With...
            </Link>
          </li>
          <li>
            <Link 
              to="/app/contains" 
              className="hover:text-gray-300 transition-colors"
            >
              Contains...
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <Routes>
          <Route path="starts-with" element={<StartsWithPage />} />
          <Route path="ends-with" element={<EndsWithPage />} />
          <Route path="contains" element={<ContainsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;
