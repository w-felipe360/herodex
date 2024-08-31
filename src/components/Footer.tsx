import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-red-800 to-red-900 p-8 shadow-md min-h-[100px]">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}></div>
      <div className="relative container mx-auto flex flex-col md:flex-row justify-between items-center text-white">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Herodex</h2>
          <p>© 2024 Herodex.</p>
        </div>
        <div className="flex flex-col space-y-2 mb-4 md:mb-0">
          <p>Email: w.felipebraz@gmail.com</p>
          <p>Telefone: 81 98951-2027</p>
        </div>
      </div>
    </footer>
  );
}