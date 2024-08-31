"use client"
import api from "@/services/api";
import { useState } from "react";
import Heroes from "../components/Heroes";
import SearchFilters from "../components/SearchFilters";
import Modal from "../components/Modal";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const limit = 10;

  const fetchHeroes = async (page: number, search: string = "") => {
    setLoading(true);
    setIsInitialLoad(false); // Set to false after the first search
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
    <div className="flex flex-col items-center min-h-screen p-4">
      <form className="flex items-center mb-4 mt-8 w-full max-w-2xl" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search your hero (or villain)"
          value={search}
          onChange={handleSearchChange}
          className="p-3 border border-gray-300 rounded-full w-full flex-grow"
        />
        <button
          type="submit"
          className="ml-2 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
        >
          <FaSearch />
        </button>
      </form>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 mb-4"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {showFilters && (
        <div className="w-full max-w-2xl mb-4">
          <SearchFilters
            hasDescription={hasDescription}
            setHasDescription={setHasDescription}
            minComics={minComics}
            setMinComics={setMinComics}
            minSeries={minSeries}
            setMinSeries={setMinSeries}
            handleSearchSubmit={handleSearchSubmit}
          />
        </div>
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
                <div key={hero.id} onClick={() => handleHeroClick(hero)} className="hero-card m-4 rounded-lg overflow-hidden">
                  <Heroes
                    id={hero.id}
                    name={hero.name}
                    description={hero.description}
                    thumbnail={hero.thumbnail}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center mt-8">
                {isInitialLoad ? (
                  <div className="flex flex-col items-center justify-center h-96">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" alt="No results" width={256} height={256} className="w-64 h-64 mb-4" />
                    <p className="text-gray-500 text-2xl md:text-4xl mb-4 text-center">Search your heroes (or villains)</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-lg mb-4">No heroes found. Try adjusting your search or filters.</p>
                )}
              </div>
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
          background-color: rgba(255, 255, 255, 0.3);
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
        .hero-card {
          margin: 6px;
        }
      `}</style>
    </div>
  );
};

export default HeroList;