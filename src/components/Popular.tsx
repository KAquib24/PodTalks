import React from 'react';

interface PopularProps {
  title: string;
  name: string;
  image: string;
  onClick?: () => void;
}

const Popular: React.FC<PopularProps> = ({ title, name, image, onClick }) => {
  return (
    <div
      className="bg-gray-900 p-6 text-white min-w-[250px] cursor-pointer hover:bg-gray-800 transition-colors duration-200"
      onClick={onClick}
    >
      <div className="flex flex-col items-start p-4 shadow-md w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h1 className="text-lg font-semibold line-clamp-2">{title}</h1>
        <p className="text-sm text-gray-400 mt-1">{name}</p>
      </div>
    </div>
  );
};

export default Popular;
