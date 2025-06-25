import React from 'react';
import { 
  FaPlay as OriginalFaPlay, 
  FaEllipsisH as OriginalFaEllipsisH, 
  FaHeart as OriginalFaHeart, 
  FaRegHeart as OriginalFaRegHeart, 
  FaClock as OriginalFaClock, 
  FaSpotify as OriginalFaSpotify,
  FaPlus as OriginalFaPlus
} from 'react-icons/fa';

const FaPlay = OriginalFaPlay as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaEllipsisH = OriginalFaEllipsisH as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaHeart = OriginalFaHeart as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaRegHeart = OriginalFaRegHeart as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaClock = OriginalFaClock as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaSpotify = OriginalFaSpotify as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaPlus = OriginalFaPlus as React.ComponentType<React.SVGProps<SVGSVGElement>>;

const UserPlaylistInfo = () => {
  const playlist = {
    name: "Chill Vibes",
    creator: "Spotify",
    description: "Relaxing tunes for your downtime. Updated weekly.",
    likes: "1,245,678",
    duration: "5 hr 45 min",
    isLiked: false,
  };

  const songs = [
    { id: 1, title: "Sunset Dreams", artist: "Chill Wave", album: "Ocean Breeze", duration: "3:45" },
    { id: 2, title: "Midnight Thoughts", artist: "LoFi Beats", album: "Night Owl", duration: "4:12" },

  ];

  return (
    <div className="bg-gray-900 rounded-lg px-6 py-4 text-white max-w-[1115px] mr-5 overflow-y-auto">
      {/* Header section */}
      <div className="relative pt-16 pb-8 px-8">
        <div className="flex items-end gap-6">
          {/* Playlist image placeholder */}
          <div className="w-60 h-60 bg-gradient-to-br from-purple-600 to-blue-400 rounded-md shadow-2xl flex items-center justify-center">
            <span className="text-6xl font-bold">C</span>
          </div>
          
          <div className="flex flex-col">
            <p className="text-sm uppercase tracking-wider mb-2">Playlist</p>
            <h1 className="text-7xl font-bold mb-4">{playlist.name}</h1>
            <p className="text-gray-300 mb-1">{playlist.description}</p>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <span className="font-bold">{playlist.creator}</span>
              <span>•</span>
              <span>{playlist.likes} likes</span>
              <span>•</span>
              <span>{playlist.duration}</span>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              <button className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-transform hover:scale-105">
                <FaPlay /> Play
              </button>
              
              <button className="bg-transparent border border-gray-500 hover:border-white text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors">
                {playlist.isLiked ? <FaHeart className="text-green-500" /> : <FaRegHeart />}
                {playlist.isLiked ? "Liked" : "Like"}
              </button>
              
              <button className="text-gray-400 hover:text-white p-3 rounded-full hover:bg-gray-800">
                <FaEllipsisH />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Songs section */}
      <div className="mt-12 px-8">
        <div className="mb-12">
          <div className="grid grid-cols-[50px_4fr_2fr_2fr_100px] gap-4 px-4 py-2 text-gray-400 border-b border-gray-700">
            <span>#</span>
            <span>TITLE</span>
            <span>ALBUM</span>
            <span>ARTIST</span>
            <span className="flex justify-center"><FaClock /></span>
          </div>
          
          {songs.map((song, index) => (
            <div 
              key={song.id}
              className="grid grid-cols-[50px_4fr_2fr_2fr_100px] gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg group"
            >
              <div className="flex items-center">
                <span className="group-hover:hidden">{index + 1}</span>
                <button className="hidden group-hover:block text-black bg-green-500 rounded-full p-1">
                  <FaPlay className="w-2.5 h-2.5" />
                </button>
              </div>
              <div>
                <div className="font-medium">{song.title}</div>
              </div>
              <div className="text-gray-400">{song.album}</div>
              <div className="text-gray-400">{song.artist}</div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{song.duration}</span>
                <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaEllipsisH />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About section */}
      <div className="px-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">About</h2>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 max-w-3xl">
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-green-600 to-blue-700 w-32 h-32 rounded-lg flex items-center justify-center">
              <FaSpotify className="text-4xl" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">{playlist.name}</h3>
              <p className="text-gray-400 mb-4">{playlist.description}</p>
              <p className="text-gray-400 text-sm">Created by {playlist.creator} • {playlist.likes} likes • {playlist.duration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <FaSpotify className="text-2xl text-green-500" />
              <span className="font-bold">Spotify</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">© 2025 Spotify AB</p>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p>India • English (IN)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlaylistInfo;