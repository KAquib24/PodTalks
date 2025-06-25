import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import podcastData from '../data/podcast.json'; // adjust the path based on your structure

interface Podcast {
  id: string;
  title: string;
  publisher: string;
  audio: string;
  image: string;
  genre: string;
}

const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q')?.toLowerCase() || '';
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const results = podcastData.filter(podcast =>
      podcast.title.toLowerCase().includes(query) ||
      podcast.publisher.toLowerCase().includes(query) ||
      podcast.genre.toLowerCase().includes(query)
    );
    setFilteredPodcasts(results);
  }, [query]);

  return (
    <div className="bg-gray-900 text-white px-6 py-6 rounded-lg mr-5 max-w-[1115px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {filteredPodcasts.length === 0 ? (
        <p className="text-gray-400">No matching podcasts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPodcasts.map(podcast => (
            <div key={podcast.id} className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg">
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-medium">{podcast.title}</h3>
              <p className="text-sm text-gray-400">{podcast.publisher}</p>
              <span className="text-xs text-cyan-400 bg-cyan-900 bg-opacity-50 px-2 py-1 rounded-full mt-1 inline-block">
                {podcast.genre}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
