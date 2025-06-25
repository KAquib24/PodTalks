import React, { useState } from "react";
import { useParams } from "react-router-dom";
import podcastData from "../data/podcast.json";
import podcastInfluencer from "../data/podcastInfluencer.json";
import Popular from "../components/Popular";

interface VoicesInfoProps {
  onPlayPodcast: (podcast: any) => void;
}

const VoicesInfo: React.FC<VoicesInfoProps> = ({ onPlayPodcast }) => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const influencer = podcastInfluencer.find((inf) => inf.id.toString() === id);

  if (!influencer) {
    return (
      <div className="text-white text-center py-10">
        <h1 className="text-2xl font-bold">Influencer not found</h1>
      </div>
    );
  }

  const matchedPodcasts = podcastData.filter(
    (p) =>
      p.publisher.toLowerCase().includes(influencer.name.toLowerCase()) ||
      p.title.toLowerCase().includes(influencer.podcast.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(matchedPodcasts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPodcasts = matchedPodcasts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gray-900 text-white px-6 py-6 max-w-[1115px] mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        {influencer.name}'s Podcasts
      </h1>

      {currentPodcasts.length === 0 ? (
        <p className="text-gray-400">No matching podcasts found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentPodcasts.map((podcast) => (
              <Popular
                key={podcast.id}
                name={podcast.publisher}
                title={podcast.title}
                image={podcast.image}
                onClick={() => onPlayPodcast(podcast)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VoicesInfo;
