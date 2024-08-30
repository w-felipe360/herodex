import React from 'react';

interface SearchFiltersProps {
  hasDescription: boolean;
  setHasDescription: (value: boolean) => void;
  minComics: number;
  setMinComics: (value: number) => void;
  minSeries: number;
  setMinSeries: (value: number) => void;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  hasDescription,
  setHasDescription,
  minComics,
  setMinComics,
  minSeries,
  setMinSeries,
  handleSearchSubmit
}) => {
  return (
    <form className="flex flex-col mb-4" onSubmit={handleSearchSubmit}>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={hasDescription}
          onChange={(e) => setHasDescription(e.target.checked)}
          className="mr-2"
        />
        Has Description
      </label>
      <label className="flex flex-col mb-2">
        <span className="mb-1">Min Comics Available</span>
        <input
          type="number"
          value={minComics}
          onChange={(e) => setMinComics(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="flex flex-col mb-2">
        <span className="mb-1">Min Series Available</span>
        <input
          type="number"
          value={minSeries}
          onChange={(e) => setMinSeries(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        />
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default SearchFilters;