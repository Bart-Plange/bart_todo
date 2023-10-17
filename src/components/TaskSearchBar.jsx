import React, { useState } from 'react';

const TaskSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 border rounded-md w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-400"
      >
        Search
      </button>
    </div>
  );
};

export default TaskSearchBar;
