import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import podcastData from '../data/podcast.json';

interface Podcast {
  id: string;
  title: string;
  publisher: string;
  image: string;
  audio: string;
  genre: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  creator: string;
  likes: number;
  duration: string;
  episodes?: Podcast[];
}

interface AllPodcastProps {
  onPlayPodcast?: (podcast: Podcast) => void;
}

const AllPodcast: React.FC<AllPodcastProps> = ({ onPlayPodcast }) => {
  const { playlistId } = useParams<{ playlistId?: string }>();
  const location = useLocation();
  
  // Also check query params as fallback for backward compatibility
  const queryParams = new URLSearchParams(location.search);
  const queryPlaylistId = queryParams.get('playlistId');
  const effectivePlaylistId = playlistId || queryPlaylistId;

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const itemsPerPage = 30;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('playlists') || '[]');
    setPlaylists(stored);
    
    // Find the selected playlist if in add mode
    if (effectivePlaylistId) {
      const playlist = stored.find((pl: Playlist) => pl.id === effectivePlaylistId);
      setSelectedPlaylist(playlist || null);
    }
  }, [effectivePlaylistId]);

  const handleAddToPlaylist = (podcast: Podcast) => {
    if (!effectivePlaylistId) {
      alert('No playlist selected!');
      return;
    }

    const updatedPlaylists = playlists.map((pl) => {
      if (pl.id === effectivePlaylistId) {
        const episodes = pl.episodes || [];
        const alreadyAdded = episodes.some((ep) => ep.id === podcast.id);
        if (alreadyAdded) {
          alert('Podcast already in playlist!');
          return pl;
        }
        return {
          ...pl,
          episodes: [...episodes, podcast],
        };
      }
      return pl;
    });

    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    alert(`"${podcast.title}" added to playlist!`);
  };

  const filteredPodcasts = podcastData.filter((podcast: Podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPodcasts = filteredPodcasts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gray-900 text-white px-4 sm:px-6 py-6 max-w-[1400px] mx-auto min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        {effectivePlaylistId ? (
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Add to Playlist</h1>
            {selectedPlaylist && (
              <p className="text-gray-300">
                Adding podcasts to: <span className="text-cyan-400 font-semibold">{selectedPlaylist.name}</span>
              </p>
            )}
            <p className="text-sm text-gray-400 mt-1">
              Select podcasts to add to your playlist
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">All Podcasts</h1>
            <p className="text-gray-300">
              Browse through our complete collection of podcasts
            </p>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search podcasts by title, publisher, or genre..."
          className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <p className="text-sm text-gray-400 mt-2">
          Found {filteredPodcasts.length} podcasts
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Podcasts Grid */}
      {currentPodcasts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No matching podcasts found.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {currentPodcasts.map((podcast: Podcast) => (
            <div
              key={podcast.id}
              className="bg-gray-800 hover:bg-gray-750 p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20 border border-gray-700"
            >
              <div className="relative group">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => onPlayPodcast?.(podcast)}
                    className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 bg-cyan-500 hover:bg-cyan-400 text-white p-3 rounded-full shadow-lg"
                  >
                    ▶
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold truncate mb-1">{podcast.title}</h3>
              <p className="text-sm text-gray-400 truncate mb-2">{podcast.publisher}</p>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-cyan-400 bg-cyan-900 bg-opacity-30 px-3 py-1 rounded-full">
                  {podcast.genre}
                </span>
                
                {effectivePlaylistId ? (
                  <button
                    className="bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                    onClick={() => handleAddToPlaylist(podcast)}
                  >
                    Add to Playlist
                  </button>
                ) : (
                  <button
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                    onClick={() => onPlayPodcast?.(podcast)}
                  >
                    Play Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPodcasts.length)} of {filteredPodcasts.length} podcasts
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-gray-300 px-4 py-2 bg-gray-800 rounded-lg min-w-[100px] text-center">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPodcast;