import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import podcastData from '../data/podcast.json';
import { FaSearch, FaPlay, FaMusic, FaFilter } from 'react-icons/fa';

// Proper type casting
const FaSearchIcon = FaSearch as React.ComponentType<any>;
const FaPlayIcon = FaPlay as React.ComponentType<any>;
const FaMusicIcon = FaMusic as React.ComponentType<any>;
const FaFilterIcon = FaFilter as React.ComponentType<any>;

interface Podcast {
  id: string;
  title: string;
  publisher: string;
  audio: string;
  image: string;
  genre: string;
}

interface SearchPageProps {
  onPlayPodcast: (podcast: Podcast) => void; // Changed to required prop
}

const SearchPage: React.FC<SearchPageProps> = ({ onPlayPodcast }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search).get('q')?.toLowerCase() || '';
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');

  // Fixed Set iteration by converting to array
  const genres = ['All', ...Array.from(new Set(podcastData.map(p => p.genre)))];

  useEffect(() => {
    let results = podcastData.filter(podcast =>
      podcast.title.toLowerCase().includes(query) ||
      podcast.publisher.toLowerCase().includes(query) ||
      podcast.genre.toLowerCase().includes(query)
    );

    // Apply genre filter
    if (selectedGenre !== 'All') {
      results = results.filter(podcast => podcast.genre === selectedGenre);
    }

    // Apply sorting
    if (sortBy === 'title') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'publisher') {
      results.sort((a, b) => a.publisher.localeCompare(b.publisher));
    }

    setFilteredPodcasts(results);
    setSearchTerm(query);
  }, [query, selectedGenre, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handlePlayPodcast = (podcast: Podcast, e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent event bubbling
    
    console.log('🎵 Playing podcast from SearchPage:', podcast.title);
    console.log('🎵 Audio URL:', podcast.audio);
    
    // Call the parent's play function
    onPlayPodcast(podcast);
  };

  const handleCardClick = (podcast: Podcast) => {
    handlePlayPodcast(podcast);
  };

  // Helper function to get unique counts without Set iteration issues
  const getUniqueGenresCount = () => {
    const genreSet = new Set<string>();
    filteredPodcasts.forEach(podcast => genreSet.add(podcast.genre));
    return genreSet.size;
  };

  const getUniquePublishersCount = () => {
    const publisherSet = new Set<string>();
    filteredPodcasts.forEach(podcast => publisherSet.add(podcast.publisher));
    return publisherSet.size;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Search Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-4">
            Search Podcasts
          </h1>
          <p className="text-xl text-gray-400">
            Discover your next favorite episode from our extensive library
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearchIcon className="text-gray-400 text-xl" />
            </div>
            <input
              type="text"
              placeholder="Search podcasts by title, publisher, or genre..."
              className="w-full pl-12 pr-6 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black px-6 py-2 rounded-xl font-semibold transition-all duration-300"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <FaFilterIcon />
              <span>Filter by:</span>
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="relevance">Relevance</option>
              <option value="title">Title</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {query ? `Results for "${query}"` : 'All Podcasts'}
            </h2>
            <p className="text-gray-400 mt-2">
              Found {filteredPodcasts.length} podcast{filteredPodcasts.length !== 1 ? 's' : ''}
              {selectedGenre !== 'All' && ` in ${selectedGenre}`}
            </p>
          </div>
          <div className="text-cyan-400 font-semibold">
            {filteredPodcasts.length} results
          </div>
        </div>

        {/* Results Grid */}
        {filteredPodcasts.length === 0 ? (
          <div className="text-center py-20">
            <FaMusicIcon className="text-6xl text-gray-500 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No podcasts found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              {query 
                ? `We couldn't find any podcasts matching "${query}". Try different keywords or browse all categories.`
                : 'Start searching to discover amazing podcasts!'
              }
            </p>
            {query && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  navigate('/search');
                }}
                className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Browse All Podcasts
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPodcasts.map(podcast => (
              <div
                key={podcast.id}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl p-5 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
                onClick={() => handleCardClick(podcast)}
              >
                <div className="relative mb-4 rounded-xl overflow-hidden">
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play Button */}
                  <button
                    onClick={(e) => handlePlayPodcast(podcast, e)}
                    className="absolute bottom-4 right-4 p-4 bg-green-500 hover:bg-green-400 rounded-full text-white shadow-2xl transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <FaPlayIcon className="text-lg" />
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                    {podcast.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 truncate">
                    {podcast.publisher}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <span className="text-xs text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full">
                      {podcast.genre}
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {filteredPodcasts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {filteredPodcasts.length}
                </div>
                <div className="text-gray-400">Results Found</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {getUniqueGenresCount()}
                </div>
                <div className="text-gray-400">Genres</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {getUniquePublishersCount()}
                </div>
                <div className="text-gray-400">Publishers</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;