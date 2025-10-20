import React from 'react';
import { FaPlay, FaSpotify, FaHeadphones } from 'react-icons/fa';

// Proper type casting
const PlayIcon = FaPlay as React.ComponentType<any>;
const SpotifyIcon = FaSpotify as React.ComponentType<any>;
const HeadphonesIcon = FaHeadphones as React.ComponentType<any>;

interface PodcastCardProps {
  name: string;
  title: string;
  image: string;
  onClick?: () => void;
  listeners?: string;
  category?: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ 
  name, 
  title, 
  image, 
  onClick,
  listeners = "2.4M",
  category = "Technology"
}) => {
  return (
    <div
      onClick={onClick} 
      className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer transform hover:scale-105"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      
      {/* Premium Badge */}
      <div className="absolute -top-2 -right-2 z-10">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <SpotifyIcon className="w-3 h-3" />
          <span>PRO</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Image Container */}
        <div className="relative mb-6">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-40 h-40 rounded-full object-cover shadow-2xl transform group-hover:scale-110 transition-transform duration-700 border-4 border-gray-700 group-hover:border-cyan-500/50"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Animated Ring */}
            <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-cyan-500 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-spin-slow">
              <div className="absolute inset-[4px] bg-gray-900 rounded-full"></div>
            </div>

            {/* Play Button */}
            <button
              className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-2xl transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
              onClick={(e) => {
                e.stopPropagation(); 
                onClick?.();
              }}
            >
              <PlayIcon className="w-5 h-5 ml-0.5" />
            </button>
          </div>

          {/* Listener Count */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-gray-600 flex items-center gap-1 shadow-lg">
            <HeadphonesIcon className="w-3 h-3 text-cyan-400" />
            <span>{listeners}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Name */}
          <h2 className="text-xl font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
            {name}
          </h2>
          
          {/* Title */}
          <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
            {title}
          </p>

          {/* Category Badge */}
          <div className="flex justify-center">
            <span className="inline-block bg-gray-700/50 text-cyan-400 text-xs font-medium px-3 py-1 rounded-full border border-cyan-500/30 group-hover:bg-cyan-500/10 group-hover:border-cyan-400 transition-all duration-300">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-[2px] bg-gray-900 rounded-2xl"></div>
      </div>

      {/* Pulse Animation */}
      <div className="absolute top-4 left-4">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
      </div>
    </div>
  );
};

export default PodcastCard;