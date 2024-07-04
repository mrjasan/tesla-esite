import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="p-6 justify-center text-center flex">
        <p>
          &copy; {new Date().getFullYear()} Made with ❤️ from Tesla at Palo Alto
        </p>
      </div>
    </footer>
  );
};

export default Footer;
