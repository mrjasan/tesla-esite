import React from "react";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-100 shadow-xs">
      <div className="py-6 px-10">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
