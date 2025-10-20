import React from 'react';
import { FaPlay as OriginalFaPlay } from 'react-icons/fa';

interface BestOfTheWeekCards {
  title: string;
  name: string;
  image: string;
  onClick?: () => void;
}

const FaPlay = OriginalFaPlay as React.ComponentType<any>;

const BestOfTheWeek: React.FC<BestOfTheWeekCards> = ({ title, name, image, onClick }) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl p-4 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer transform hover:scale-105">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      
      {/* Image Container */}
      <div className="relative mb-4 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button */}
        <button 
          onClick={onClick}
          className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-2xl transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
        >
          <FaPlay className="w-4 h-4 ml-0.5" />
        </button>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
          <div className="absolute inset-[2px] bg-gray-900 rounded-xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 mb-2 leading-tight">
          {title}
        </h1>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {name}
        </p>
        
        {/* Featured Badge */}
        <div className="absolute -top-2 -left-2">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            🔥 Featured
          </span>
        </div>
      </div>

      {/* Pulse Animation */}
      <div className="absolute top-3 right-3">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
      </div>
    </div>
  );
};

export default BestOfTheWeek;