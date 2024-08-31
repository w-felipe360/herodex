import Image from "next/image";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  hero: {
    name: string;
    description: string;
    thumbnail: { path: string; extension: string };
    comics?: { available: number };
    series?: { available: number };
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, hero }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-2xl shadow-lg transform transition-all duration-500 ease-out opacity-0 scale-75 animate-fadeInZoom w-96 h-auto flex flex-col items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-red-500"
        >
          <FaTimes className="text-xl" />
        </button>
        <div className="relative w-32 h-32 mb-4">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
              <div className="spinner"></div>
            </div>
          )}
          <Image
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={hero.name}
            width={128}
            height={128}
            className={`w-32 h-32 object-cover rounded-full transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <h2 className="text-xl font-bold mb-2">{hero.name}</h2>
        <p className="text-gray-700 text-center mb-4">{hero.description}</p>
        <div className="flex flex-col items-center">
          <p className="text-gray-700 mb-2">Comics Available: {hero.comics?.available ?? 'N/A'}</p>
          <p className="text-gray-700">Series Available: {hero.series?.available ?? 'N/A'}</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInZoom {
          0% {
            opacity: 0;
            transform: scale(0.75);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInZoom {
          animation: fadeInZoom 0.5s ease-out forwards;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #000;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Modal;