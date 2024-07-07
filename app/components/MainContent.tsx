// components/Content.tsx
import React from "react";


const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full flex-grow flex overflow-scroll">
      {children}
    </div>
  );
};

export default MainContent;
