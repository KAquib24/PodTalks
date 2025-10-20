import React, { useEffect, useState } from 'react';
import { FaPlay, FaTrash, FaClock, FaHistory } from 'react-icons/fa';

const FaPlayIcon = FaPlay as any;
const FaTrashIcon = FaTrash as any;
const FaClockIcon = FaClock as any;
const FaHistoryIcon = FaHistory as any;

interface Podcast {
  id: string;
  title: string;
  publisher: string;
  audio: string;
  image: string;
  genre: string;
  timestamp?: number;
}

const History: React.FC<{ onPlayPodcast?: (podcast: Podcast) => void }> = ({ onPlayPodcast }) => {
  const [history, setHistory] = useState<Podcast[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('playHistory') || '[]');
    // Add timestamp for sorting if not present
    const historyWithTimestamps = stored.map((item: Podcast) => ({
      ...item,
      timestamp: item.timestamp || Date.now()
    }));
    setHistory(historyWithTimestamps);
  }, []);

  const handlePlay = (podcast: Podcast) => {
    if (onPlayPodcast) {
      onPlayPodcast(podcast);
    }
  };

  const handleRemove = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('playHistory', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all your listening history?')) {
      setHistory([]);
      localStorage.removeItem('playHistory');
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <FaHistoryIcon className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Listening History
              </h1>
              <p className="text-gray-400 mt-2">Your recently played episodes</p>
            </div>
          </div>
          
          {history.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300"
            >
              <FaTrashIcon className="text-sm" />
              Clear All History
            </button>
          )}
        </div>

        {/* Stats */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-white mb-1">{history.length}</div>
              <div className="text-gray-400 text-sm">Total Plays</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {new Set(history.map(item => item.publisher)).size}
              </div>
              <div className="text-gray-400 text-sm">Different Publishers</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {new Set(history.map(item => item.genre)).size}
              </div>
              <div className="text-gray-400 text-sm">Genres</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {formatTimeAgo(history[history.length - 1]?.timestamp || Date.now())}
              </div>
              <div className="text-gray-400 text-sm">Last Played</div>
            </div>
          </div>
        )}

        {/* History Grid */}
        {history.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <FaClockIcon className="text-4xl text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-3">No listening history</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Your played episodes will appear here. Start listening to some podcasts to build your history!
            </p>
            <div className="animate-bounce">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mx-auto"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {history.map((episode, index) => (
              <div
                key={`${episode.id}-${index}`}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl p-5 border border-gray-700 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Timestamp */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                    <FaClockIcon className="text-purple-400 text-xs" />
                    <span className="text-xs text-gray-300">
                      {formatTimeAgo(episode.timestamp || Date.now())}
                    </span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(episode.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 hover:text-red-300 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                  title="Remove from history"
                >
                  <FaTrashIcon className="text-sm" />
                </button>

                {/* Episode Image */}
                <div className="relative mb-4 rounded-xl overflow-hidden">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-500"
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
                  <h3 className="font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
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
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Recently played"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        {history.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              Your listening history is stored locally and automatically updates as you play episodes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;