// MainLayout.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import StartsWithPage from "../pages/options/StartsWithPage";
import EndsWithPage from "../pages/options/EndsWithPage";
import ContainsPage from "../pages/options/ContainsPage";
import ParityDFAVisualizer from "../pages/options/ParityDFAVisualizer";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="font-serif flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto relative">
        {/* Toggle button visible only on mobile */}
        <button
          className="md:hidden absolute top-4 left-4 z-50"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <img
            src={sidebarOpen ? "/icons/close.png" : "/icons/menu.png"}
            alt={sidebarOpen ? "Close menu" : "Open menu"}
            className="w-6 h-6"
          />
        </button>

        <Routes>
          <Route path="starts-with" element={<StartsWithPage />} />
          <Route path="ends-with" element={<EndsWithPage />} />
          <Route path="contains" element={<ContainsPage />} />
          <Route path="even-odd" element={<ParityDFAVisualizer />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;
