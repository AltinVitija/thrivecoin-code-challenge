import React, { useState } from "react";
import SearchBar from "../search/SearchBar";
import { IconButton } from "@mui/material";

interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className = "", onMenuClick }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <header className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Open menu"></button>
            <div className="ml-4 flex items-center">
              <span className="text-2xl font-semibold text-gray-900">
                Dashboard
              </span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search dashboard..."
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
