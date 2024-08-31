import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className="relative bg-gradient-to-r from-red-600 to-red-800 p-4 shadow-md">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}></div>
      <div className="relative container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" alt="Marvel Logo" width={64} height={64} className="w-16 h-16 mr-4" />
          <h1 className="text-white text-3xl font-bold">Herodex</h1>
        </div>
      </div>
    </nav>
  );
}