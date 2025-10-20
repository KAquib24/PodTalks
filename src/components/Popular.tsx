import React from 'react';
import { FaPlay, FaHeadphones, FaClock, FaStar } from 'react-icons/fa';

// Proper type casting
const PlayIcon = FaPlay as React.ComponentType<any>;
const HeadphonesIcon = FaHeadphones as React.ComponentType<any>;
const ClockIcon = FaClock as React.ComponentType<any>;
const StarIcon = FaStar as React.ComponentType<any>;

interface PopularProps {
  title: string;
  name: string;
  image: string;
  onClick?: () => void;
  duration?: string;
  listeners?: string;
  rating?: number;
  isTrending?: boolean;
}

const Popular: React.FC<PopularProps> = ({ 
  title, 
  name, 
  image, 
  onClick,
  duration = "45 min",
  listeners = "1.2M",
  rating = 4.8,
  isTrending = false
}) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl p-5 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer transform hover:scale-105"
      onClick={onClick}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

      {/* Trending Badge */}
      {isTrending && (
        <div className="absolute -top-2 -left-2 z-10">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <span>🔥</span>
            <span>TRENDING</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative">
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
            className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-2xl transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            <PlayIcon className="w-4 h-4 ml-0.5" />
          </button>

          {/* Stats Overlay */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {/* Rating */}
            <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <StarIcon className="w-3 h-3 text-yellow-400" />
              <span>{rating}</span>
            </div>
            
            {/* Duration */}
            <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <ClockIcon className="w-3 h-3 text-cyan-400" />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          {/* Title */}
          <h1 className="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight min-h-[3rem]">
            {title}
          </h1>
          
          {/* Publisher */}
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-1">
            {name}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <HeadphonesIcon className="w-3 h-3 text-green-400" />
              <span>{listeners}</span>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
              <span className="text-xs text-gray-500">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-[2px] bg-gray-900 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default Popular;