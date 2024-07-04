import React from "react";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <header className="w-full">
      <div className="p-6">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
