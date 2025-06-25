import React from 'react';
import { FaPlay as OriginalFaPlay } from 'react-icons/fa';

interface PodcastCardProps {
  name: string;
  title: string;
  image: string;
  onClick?: () => void; // 🟢 NEW
}

//  Cast play icon
const FaPlay = OriginalFaPlay as React.ComponentType<React.SVGProps<SVGSVGElement>>;

const PodcastCard: React.FC<PodcastCardProps> = ({ name, title, image, onClick }) => {
  return (
    <div
      onClick={onClick} 
      className="bg-gray-900 rounded-lg p-6 text-white min-w-[250px] group transition-all duration-300 ease-in-out cursor-pointer"
    >
      {/* Card */}
      <div className="flex flex-col items-start hover:bg-gray-800 p-4 rounded-xl shadow-md w-full transition-all duration-300 ease-in-out">
        {/* Image + Play Button */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-40 h-40 rounded-full object-cover mb-4"
          />

          {/* Floating Play Button */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="bg-green-500 text-black p-3 rounded-full shadow-lg hover:scale-105 hover:bg-green-400"
              onClick={(e) => {
                e.stopPropagation(); 
                onClick?.();
              }}
            >
              <FaPlay className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Name & Title */}
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default PodcastCard;
