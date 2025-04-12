import React from "react";

const SidebarExample = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar: hidden on small screens, visible on md and larger */}
      <aside className="hidden md:block w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Sidebar</h2>
          <ul>
            <li className="py-2 hover:bg-gray-700 px-2 rounded">Item 1</li>
            <li className="py-2 hover:bg-gray-700 px-2 rounded">Item 2</li>
            <li className="py-2 hover:bg-gray-700 px-2 rounded">Item 3</li>
          </ul>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Main Content</h1>
        <p>
          This content area is always visible. On smaller screens, the sidebar will hide.
          On medium screens and larger, the sidebar is displayed.
        </p>
      </main>
    </div>
  );
};

export default SidebarExample;
