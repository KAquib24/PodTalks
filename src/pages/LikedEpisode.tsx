import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaHeart, FaRegHeart, FaMusic } from 'react-icons/fa';

const FaPlayIcon: any = FaPlay;
const FaHeartIcon: any = FaHeart;
const FaRegHeartIcon: any = FaRegHeart;
const FaMusicIcon: any = FaMusic;

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

  const clearAllLiked = () => {
    if (window.confirm('Are you sure you want to remove all liked episodes?')) {
      setLikedEpisodes([]);
      localStorage.setItem('likedEpisodes', JSON.stringify([]));
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="flex items-center gap-4 mb-6 lg:mb-0">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <FaHeartIcon className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Liked Episodes
              </h1>
              <p className="text-gray-400 mt-2">Your personal collection of favorite episodes</p>
            </div>
          </div>
          
          {likedEpisodes.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-pink-400">{likedEpisodes.length}</div>
                <div className="text-sm text-gray-400">Loved Episodes</div>
              </div>
              <button 
                onClick={clearAllLiked}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        {likedEpisodes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-pink-400 mb-1">{likedEpisodes.length}</div>
              <div className="text-gray-400 text-sm">Total Liked</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {new Set(likedEpisodes.map(item => item.publisher)).size}
              </div>
              <div className="text-gray-400 text-sm">Publishers</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {new Set(likedEpisodes.map(item => item.genre)).size}
              </div>
              <div className="text-gray-400 text-sm">Genres</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {Math.round(likedEpisodes.length / 10)}h+
              </div>
              <div className="text-gray-400 text-sm">Total Content</div>
            </div>
          </div>
        )}

        {/* Episodes Grid */}
        {likedEpisodes.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <FaRegHeartIcon className="text-4xl text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-3">No liked episodes yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Start exploring podcasts and click the heart icon to save your favorite episodes here!
            </p>
            <button
              onClick={() => navigate('/all-podcasts')}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Explore Podcasts
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedEpisodes.map((episode) => (
              <div
                key={episode.id}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl p-5 border border-gray-700 hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10"
              >
                {/* Like Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(episode.id);
                  }}
                  className="absolute top-4 right-4 p-3 bg-pink-500 hover:bg-pink-400 rounded-full text-white shadow-lg transform scale-100 hover:scale-110 transition-all duration-300 z-10"
                  title="Remove from liked"
                >
                  <FaHeartIcon className="text-lg" />
                </button>

                {/* Episode Image */}
                <div className="relative mb-4 rounded-xl overflow-hidden">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(episode);
                    }}
                    className="absolute bottom-4 right-4 p-4 bg-green-500 hover:bg-green-400 rounded-full text-white shadow-2xl transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <FaPlayIcon className="text-lg" />
                  </button>
                </div>

                {/* Episode Info */}
                <div className="space-y-3">
                  <h3 className="font-bold text-white line-clamp-2 group-hover:text-pink-400 transition-colors duration-300 leading-tight">
                    {episode.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 truncate flex-1 mr-2">
                      {episode.publisher}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <span className="text-xs text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full">
                      {episode.genre}
                    </span>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" title="Liked episode"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        {likedEpisodes.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              Your liked episodes are saved locally and will persist between sessions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedEpisode;