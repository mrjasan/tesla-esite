// components/Sidebar.tsx
import React from "react";
import SectionTitle from "./SectionTitle";
import SectionDescription from "./SectionDescription";
import DeviceManager from "./DeviceManager";

const Sidebar: React.FC = () => {
  return (
    <div className="py-4 px-10 border-r border-gray-100flex-grow h-full">
      <SectionTitle>Devices</SectionTitle>
      <SectionDescription>
        Manage the assembly of batteries and devices for your Industrial Energy Site.
      </SectionDescription>
      <DeviceManager />
    </div>
  );
};

export default Sidebar;
