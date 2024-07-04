import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MainContainer from "./MainContainer";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <div className="flex-shrink-0" >
        <Header />
      </div>
      <div className="flex-grow bg-slate-200">
        <MainContainer>{children}</MainContainer>
      </div>
      <div className="flex-shrink-0" >
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
