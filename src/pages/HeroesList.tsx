"use client"
import api from "@/services/api";
import { useState } from "react";
import Heroes from "../components/Heroes";
import SearchFilters from "../components/SearchFilters";
import Modal from "../components/Modal";

interface ResponseData {
  id: string;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  comics: { available: number };
  series: { available: number };
}

const HeroList: React.FC = () => {
  const [heroes, setHeroes] = useState<ResponseData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [hasDescription, setHasDescription] = useState(false);
  const [minComics, setMinComics] = useState(0);
  const [minSeries, setMinSeries] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHero, setSelectedHero] = useState<ResponseData | null>(null);

  const limit = 10;

  const fetchHeroes = async (page: number, search: string = "") => {
    setLoading(true);
    const offset = (page - 1) * limit;
    try {
      const response = await api.get('/characters', {
        params: {
          offset,
          limit: limit * 2,
          nameStartsWith: search,
        }
      });
      let allHeroes = response.data.data.results;

      if (hasDescription) {
        allHeroes = allHeroes.filter((hero: { description: string; }) => hero.description && hero.description.trim().length > 0);
      }

      if (minComics > 0) {
        allHeroes = allHeroes.filter((hero: { comics: { available: number; }; }) => hero.comics.available >= minComics);
      }
      if (minSeries > 0) {
        allHeroes = allHeroes.filter((hero: { series: { available: number; }; }) => hero.series.available >= minSeries);
      }

      setHeroes(allHeroes.slice(0, limit));
      setTotalPages(Math.ceil(response.data.data.total / limit));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      fetchHeroes(newPage, search);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    fetchHeroes(1, search);
  };

  const handleHeroClick = (hero: ResponseData) => {
    setSelectedHero(hero);
  };

  const handleCloseModal = () => {
    setSelectedHero(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <form className="flex flex-row mb-4 mt-8" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search your hero (or villain)"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-l mb-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors duration-300 mb-2"
        >
          Search
        </button>
      </form>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 mb-4"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {showFilters && (
        <SearchFilters
          hasDescription={hasDescription}
          setHasDescription={setHasDescription}
          minComics={minComics}
          setMinComics={setMinComics}
          minSeries={minSeries}
          setMinSeries={setMinSeries}
          handleSearchSubmit={handleSearchSubmit}
        />
      )}
      {loading ? (
        <div className="spinner-container flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className={`hero-list flex justify-center items-center flex-wrap ${heroes.length === 0 ? 'mb-8' : ''}`}>
            {heroes.length > 0 ? (
              heroes.map(hero => (
                <div key={hero.id} onClick={() => handleHeroClick(hero)}>
                  <Heroes
                    id={hero.id}
                    name={hero.name}
                    description={hero.description}
                    thumbnail={hero.thumbnail}
                  />
                </div>
              ))
            ) : (
              <p>No heroes found.</p>
            )}
          </div>
          <div className="pagination flex items-center mt-4 space-x-2 mb-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === 1}
            >
              &lt;
            </button>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
      {selectedHero && (
        <Modal isOpen={!!selectedHero} onClose={handleCloseModal} hero={selectedHero} />
      )}
      <style jsx>{`
        .spinner-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 9999;
        }
        .spinner {
          border: 8px solid rgba(0, 0, 0, 0.1);
          border-left-color: #000;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HeroList;