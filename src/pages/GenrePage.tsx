// src/pages/GenrePage.tsx
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

  return (
    <div className="bg-gray-900 rounded-lg px-6 py-6 text-white max-w-[1115px] mr-5 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-cyan-100">{genreName} Podcasts</h1>

      {filtered.length === 0 ? (
        <p className="text-gray-400">No podcasts found in this genre.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((podcast) => (
            <Popular
              key={podcast.id}
              title={podcast.title}
              name={podcast.publisher}
              image={podcast.image}
              onClick={() => onPlayPodcast(podcast)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;