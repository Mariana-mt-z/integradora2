import React from 'react';
import { Link } from 'react-router-dom';
import casaAstooz from '../assets/casa-astooz.jpeg';

function HomePage() {
  return (
    <div>
      {/* Barra de color azul */}
      <div className="bg-blue-800 py-6 flex justify-end px-6">
        <Link to="/login" className="text-xl font-semibold text-white">Iniciar Sesión</Link>
      </div>

      <div className="flex flex-row justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-start flex-1 pl-20">
          <h1 className="text-6xl font-bold text-purple-800">BIENVENIDO A ASTOOZ</h1>
          <p className="text-3xl text-gray-700 mt-4">Donde el Futuro se Construye en Casa</p>
        </div>
        <div className="flex justify-center items-end flex-1">
      
          <img
            src={casaAstooz}
            alt="casa-astooz"
            className="w-96 h-96 mr-24"
          />
        </div>
        <div className="mr-20">
         
        </div>
      </div>
    </div>
  );
}

export default HomePage;
