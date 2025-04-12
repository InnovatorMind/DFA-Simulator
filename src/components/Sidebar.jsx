// Sidebar.jsx
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`bg-gray-800 text-white p-6 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 z-40`}
    >
      <h2 className="text-2xl font-bold mt-6 mb-6">String Options</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/app/starts-with"
            onClick={toggleSidebar} // closes sidebar on mobile
            className="hover:text-gray-300 transition-colors"
          >
            Starts With...
          </Link>
        </li>
        <li>
          <Link
            to="/app/ends-with"
            onClick={toggleSidebar}
            className="hover:text-gray-300 transition-colors"
          >
            Ends With...
          </Link>
        </li>
        <li>
          <Link
            to="/app/contains"
            onClick={toggleSidebar}
            className="hover:text-gray-300 transition-colors"
          >
            Contains...
          </Link>
        </li>
        <li>
          <Link
            to="/app/even-odd"
            onClick={toggleSidebar}
            className="hover:text-gray-300 transition-colors"
          >
            EvenOdd
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
