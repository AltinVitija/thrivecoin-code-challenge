import React from "react";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  className,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={`max-w-lg w-full ${className}`}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="search"
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg 
                   text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 
                   focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Search;
