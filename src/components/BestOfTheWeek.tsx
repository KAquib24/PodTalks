import React from 'react';
import { FaPlay as OriginalFaPlay } from 'react-icons/fa';

interface BestOfTheWeekCards {
  title: string;
  name: string;
  image: string;
}

const FaPlay = OriginalFaPlay as React.ComponentType<React.SVGProps<SVGSVGElement>>;

const BestOfTheWeek = ({ title, name, image }: BestOfTheWeekCards) => {
  return (
    
    <div className="bg-gray-900 p-6 text-white min-w-[250px] group">
      <div className="flex flex-col items-start hover:bg-gray-800 p-4 rounded-xl shadow-md w-full transition-all duration-300 ease-in-out">
        
        {/* Image with play button overlay */}
        <div className="relative w-full">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-lg mb-2"
          />
          
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-green-500 text-black p-3 rounded-full shadow-lg hover:scale-105 hover:bg-green-400 z-20">
              <FaPlay className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-gray-400">{name}</p>
      </div>
    </div>
  );
};

export default BestOfTheWeek;