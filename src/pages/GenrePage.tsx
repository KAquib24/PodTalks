import React from "react";
import { useParams } from "react-router-dom";
import podcastData from "../data/podcast.json";
import Popular from "../components/Popular";

interface GenrePageProps {
  onPlayPodcast: (podcast: any) => void;
}

const GenrePage: React.FC<GenrePageProps> = ({ onPlayPodcast }) => {
  const { genreName } = useParams();

  const filtered = podcastData.filter(
    (podcast) => podcast.genre.toLowerCase() === genreName?.toLowerCase()
  );

  const genreColors: { [key: string]: string } = {
    'Technology': 'from-blue-500 to-cyan-500',
    'Business': 'from-green-500 to-emerald-500',
    'Comedy': 'from-yellow-500 to-orange-500',
    'Education': 'from-purple-500 to-pink-500',
    'Health': 'from-red-500 to-rose-500',
    'News': 'from-gray-500 to-slate-500',
    'True Crime': 'from-red-800 to-rose-800',
    'Science': 'from-indigo-500 to-purple-500',
    'Arts': 'from-pink-500 to-rose-500',
    'Sports': 'from-orange-500 to-red-500'
  };

  const gradient = genreColors[genreName || ''] || 'from-cyan-500 to-green-500';

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Genre Header */}
        <div className={`mb-8 p-8 rounded-2xl bg-gradient-to-r ${gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl font-bold text-white">🎙️</span>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                  {genreName}
                </h1>
                <p className="text-white/90 text-lg mt-2">
                  Explore the best {genreName?.toLowerCase()} podcasts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-semibold">{filtered.length} podcasts</span>
              </div>
              <div className="w-1 h-6 bg-white/30 rounded-full"></div>
              <span>Curated collection</span>
            </div>
          </div>
        </div>

        {/* Podcasts Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-3">No podcasts found</h3>
            <p className="text-gray-500">
              We couldn't find any podcasts in the {genreName} genre.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                Featured Podcasts
                <span className="text-cyan-400 ml-2">({filtered.length})</span>
              </h2>
              <div className="text-gray-400 text-sm">
                Scroll to discover more →
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filtered.map((podcast) => (
                <div 
                  key={podcast.id} 
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <Popular
                    title={podcast.title}
                    name={podcast.publisher}
                    image={podcast.image}
                    onClick={() => onPlayPodcast(podcast)}
                  />
                </div>
              ))}
            </div>

            {/* Stats Footer */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {filtered.length}
                  </div>
                  <div className="text-gray-400">Total Podcasts</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {new Set(filtered.map(p => p.publisher)).size}
                  </div>
                  <div className="text-gray-400">Unique Publishers</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {genreName}
                  </div>
                  <div className="text-gray-400">Genre</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;