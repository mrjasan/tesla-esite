// components/Sidebar.tsx
import React from "react";
import SectionTitle from "./SectionTitle";
import SectionDescription from "./SectionDescription";
import ComponentManager from "./ComponentManager";

const Sidebar: React.FC = () => {
  return (
    <div className="py-4 px-10 h-full border-r border-gray-100">
      <SectionTitle>Components</SectionTitle>
      <SectionDescription>
        Manage the assembly of batteries and components for your Industrial Energy Site.
      </SectionDescription>
      <ComponentManager />
    </div>
  );
};

export default Sidebar;
