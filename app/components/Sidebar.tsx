// components/Sidebar.tsx
import React from 'react';
import SectionTitle from './SectionTitle';

const Sidebar: React.FC = () => {
  return (
    <div className="p-4 border-r h-full bg-stone-50">
      <SectionTitle>Components</SectionTitle>
      {/* Add your tools and controls here */}
      <button className="w-full mb-2 p-2 bg-blue-500 text-white rounded">Add Component</button>
      <button className="w-full mb-2 p-2 bg-red-500 text-white rounded">Remove Component</button>
    </div>
  );
};

export default Sidebar;
