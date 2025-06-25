import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Components
import PodcastCard from "../components/PodcastCard";
import Popular from "../components/Popular";
import HomeFooter from "../components/HomeFooter";

// Data
import podcast from "../data/podcast.json";
import podcastInfluencer from "../data/podcastInfluencer.json";

interface HomeProps {
  onPlayPodcast: (podcast: any) => void;
}

const Home: React.FC<HomeProps> = ({ onPlayPodcast }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="bg-gray-900 rounded-lg px-6 py-6 text-white max-w-[1115px] mr-5 overflow-y-auto">
      {/* Header Of Home */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-cyan-100">Expert Voices</h1>
          <p className="text-sm text-gray-400 cursor-pointer hover:underline">
            Show More
          </p>
        </div>

        {/* Experts Cards */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide h-auto">
          {podcastInfluencer.map((host) => (
           <PodcastCard
              key={host.id}
              name={host.name}
              title={host.podcast}
              image={host.image}
              onClick={() => navigate(`/voices/${host.id}`)} // 🟢 Navigate to VoicesInfo
            />
          ))}
        </div>
      </div>

      {/* Popular Cards */}
      <div className="popular mt-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-cyan-100">Popular Podcasts</h1>
          <p
            className="text-sm text-gray-400 cursor-pointer hover:underline"
            onClick={() => navigate("/all-podcasts")}
          >
            Show More
          </p>
        </div>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide h-auto">
          {podcast
            .filter((p) => p.isPopular)
            .map((podcast) => (
              <Popular
                key={podcast.id}
                name={podcast.publisher}
                title={podcast.title}
                image={podcast.image}
                onClick={() => onPlayPodcast(podcast)}
              />
            ))}
        </div>
      </div>

      {/* Best Of The Week Cards */}
      <div className="popular mt-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-cyan-100">Best Of The Week</h1>
          <p
            className="text-sm text-gray-400 cursor-pointer hover:underline"
            onClick={() => navigate("/all-podcasts")}
          >
            Show More
          </p>
        </div>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide h-auto">
          {podcast
            .filter((p) => p.bestOfTheWeek)
            .map((podcast) => (
              <Popular
                key={podcast.id}
                name={podcast.publisher}
                title={podcast.title}
                image={podcast.image}
                onClick={() => onPlayPodcast(podcast)}
              />
            ))}
        </div>
      </div>

      <div className="mt-auto">
        <hr className="border-t border-gray-700 my-4" />
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
