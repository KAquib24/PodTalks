import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay as OriginalFaPlay, FaHeart as OriginalFaHeart } from 'react-icons/fa';

// Cast icons to 'any' to bypass TypeScript errors
const FaPlay: any = OriginalFaPlay;
const FaHeart: any = OriginalFaHeart;

interface Podcast {
  id: string;
  title: string;
  publisher: string;
  audio: string;
  image: string;
  genre: string;
}

const LikedEpisode: React.FC<{ onPlayPodcast?: (podcast: Podcast) => void }> = ({ onPlayPodcast }) => {
  const [likedEpisodes, setLikedEpisodes] = useState<Podcast[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem('likedEpisodes') || '[]');
    setLikedEpisodes(liked);
  }, []);

  const handleRemove = (id: string) => {
    const updatedLiked = likedEpisodes.filter(episode => episode.id !== id);
    setLikedEpisodes(updatedLiked);
    localStorage.setItem('likedEpisodes', JSON.stringify(updatedLiked));
  };

  const handlePlay = (podcast: Podcast) => {
    if (onPlayPodcast) {
      onPlayPodcast(podcast);
    }
  };

  return (
    <div className='bg-gray-900 rounded-lg px-6 py-6 text-white max-w-[1115px] mr-5 overflow-y-auto'>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Liked Episodes</h1>
        <p className="text-sm text-gray-400">{likedEpisodes.length} episodes</p>
      </div>

      {/* Episodes Grid */}
      {likedEpisodes.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">You haven't liked any episodes yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {likedEpisodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer transition-colors relative group"
            >
              <div className="relative">
                <img
                  src={episode.image}
                  alt={episode.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(episode);
                  }}
                  className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaPlay className="text-white" />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white line-clamp-1">{episode.title}</h3>
                  <p className="text-xs text-gray-400">{episode.publisher}</p>
                  <span className="text-xs text-cyan-400 bg-cyan-900 bg-opacity-50 px-2 py-1 rounded-full mt-1 inline-block">
                    {episode.genre}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(episode.id);
                  }}
                  className="text-red-400 hover:text-red-500 p-1"
                  title="Remove from liked"
                >
                  <FaHeart className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedEpisode;