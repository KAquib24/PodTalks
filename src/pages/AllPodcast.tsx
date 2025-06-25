import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const playlistId = queryParams.get('playlistId');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const itemsPerPage = 30;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('playlists') || '[]');
    setPlaylists(stored);
  }, []);

  const handleAddToPlaylist = (podcast: Podcast) => {
    if (!playlistId) {
      alert('No playlist selected!');
      return;
    }

    const updatedPlaylists = playlists.map((pl) => {
      if (pl.id === playlistId) {
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
    alert('Podcast added to playlist!');
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
    <div className="bg-gray-900 text-white px-6 py-6 max-w-[1115px] mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Podcasts</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search podcasts..."
          className="w-full sm:w-96 px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {currentPodcasts.length === 0 ? (
        <p className="text-gray-400">No matching podcasts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {currentPodcasts.map((podcast: Podcast) => (
            <div
              key={podcast.id}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors"
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold truncate">{podcast.title}</h3>
              <p className="text-sm text-gray-400 truncate">{podcast.publisher}</p>
              <span className="text-xs text-cyan-400 bg-cyan-900 bg-opacity-50 px-2 py-1 rounded-full mt-2 inline-block">
                {podcast.genre}
              </span>

              {playlistId ? (
                <button
                  className="mt-3 w-full bg-green-600 hover:bg-green-500 text-black font-semibold py-2 rounded"
                  onClick={() => handleAddToPlaylist(podcast)}
                >
                  Add to Playlist
                </button>
              ) : (
                <button
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded"
                  onClick={() => onPlayPodcast?.(podcast)}
                >
                  ▶ Play Podcast
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPodcast;
