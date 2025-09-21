import React from 'react';
import { Filter, Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative mb-6 group">
      {/* Highlight Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      
      <div className="relative flex items-center bg-white rounded-lg shadow-lg border-2 border-blue-100 group-hover:border-blue-200 transition-all duration-300">
        <Search className="absolute left-4 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Search by ID, age, gender, or condition..."
          className="w-full pl-12 pr-12 py-3 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Filter className="absolute right-4 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );
};

export default SearchBar;