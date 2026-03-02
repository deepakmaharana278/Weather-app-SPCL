import React, { useState, useEffect } from 'react';

const Search = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

   useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);

      // Save to recent searches
      const updated = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));

      setCity('');
    }
  };

  const handleRecentClick = (recentCity) => {
    onSearch(recentCity);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>
    </form>

    {recentSearches.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-sm text-white/70">Recent:</span>
          {recentSearches.map((recent, index) => (
            <button
              key={index}
              onClick={() => handleRecentClick(recent)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition"
              disabled={loading}
            >
              {recent}
            </button>
          ))}
        </div>
      )}
      </div>
  );
};

export default Search;