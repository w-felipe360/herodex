import React from 'react';

export default function Header() {
  return (
    <nav className="relative bg-gradient-to-r from-red-600 to-red-800 p-4 shadow-md">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}></div>
      <div className="relative container mx-auto flex justify-center items-center">
        <h1 className="text-white text-3xl font-bold flex items-center">
          <span className="mr-2">🔍</span>
          Herodex
        </h1>
      </div>
    </nav>
  );
}