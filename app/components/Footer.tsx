import React from "react";
import SectionDescription from "./SectionDescription";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-100">
      <div className="p-6 justify-center text-center flex">
        <SectionDescription>
        &copy; {new Date().getFullYear()} Made with ❤️ from Tesla at Palo Alto
        </SectionDescription>
      </div>
    </footer>
  );
};

export default Footer;
