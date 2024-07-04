// components/Content.tsx
import React from 'react';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) =>  {
  return (
    <div className="bg-green p-4 h-full w-full">
     {children}
    </div>
  );
};

export default MainContent;
