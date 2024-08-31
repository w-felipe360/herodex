import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

interface HeroCardProps {
  id: string;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
}

const Heroes: React.FC<HeroCardProps> = ({ id, name, description, thumbnail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      key={id}
      className="hero-card inline-block p-4 m-2 bg-gray-800 rounded-lg shadow-lg"
      style={{ cursor: "pointer", width: "300px", height: "380px" }}
    >
      <h2
        className="text-white text-xl font-bold mb-2"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </h2>
      <div
        className="image-container"
        onClick={handleOpenModal}
        style={{ position: "relative", overflow: "hidden", width: "100%", height: "300px" }}
      >
        <Image
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={name}
          width={300}
          height={300}
          className="hero-image transition-transform duration-300 ease-in-out"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ease-in-out image-overlay"></div>
      </div>

      <style jsx>{`
        .image-container:hover .hero-image {
          transform: scale(1.1);
        }
        .image-container:hover .image-overlay {
          opacity: 0.5; 
        }
      `}</style>
    </div>
  );
};

export default Heroes;