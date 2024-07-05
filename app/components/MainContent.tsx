// components/Content.tsx
import React from 'react';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) =>  {
  return (
    <div className="bg-neutral-50 py-4 px-10 h-full w-full">
     {children}
    </div>
  );
};

export default MainContent;
