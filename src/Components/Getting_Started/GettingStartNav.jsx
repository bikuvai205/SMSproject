import React from "react";
import logo from "../../assets/image/logos.png";

const GettingStartNav = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img src={logo} className="h-11" alt="Adhyanam Logo" />
          <span className="text-2xl font-semibold dark:text-white">
            Adhyanam
          </span>
        </div>

        {/* Go Back to Home Link */}
        <a
          href="/"
          className="text-blue-600 hover:underline font-medium text-sm"
        >
          Go Back to Home
        </a>
      </div>
    </nav>
  );
};

export default GettingStartNav;
