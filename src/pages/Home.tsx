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
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen p-6 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-4">
            Welcome to PodcastHub
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing podcasts, expert voices, and curated collections to fuel your curiosity
          </p>
        </div>

        {/* Expert Voices Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Expert Voices</h2>
              <p className="text-gray-400">Leading thinkers and industry experts</p>
            </div>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-cyan-400 font-medium transition-all duration-300"
            >
              {showAll ? 'Show Less' : 'Show All'}
              <span className="text-lg">{showAll ? '↑' : '↓'}</span>
            </button>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${showAll ? '' : 'max-h-96 overflow-hidden'}`}>
            {podcastInfluencer.map((host) => (
              <div key={host.id} className="transform hover:scale-105 transition-transform duration-300">
                <PodcastCard
                  name={host.name}
                  title={host.podcast}
                  image={host.image}
                  onClick={() => navigate(`/voices/${host.id}`)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Podcasts Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Popular Podcasts</h2>
              <p className="text-gray-400">Trending episodes everyone's listening to</p>
            </div>
            <button
              onClick={() => navigate("/all-podcasts")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              Browse All
              <span className="text-lg">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
        </section>

        {/* Best of the Week Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Best of the Week</h2>
              <p className="text-gray-400">Top picks curated just for you</p>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Updated weekly</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {podcast
              .filter((p) => p.bestOfTheWeek)
              .map((podcast) => (
                <div key={podcast.id} className="transform hover:scale-105 transition-transform duration-300">
                  <Popular
                    name={podcast.publisher}
                    title={podcast.title}
                    image={podcast.image}
                    onClick={() => onPlayPodcast(podcast)}
                  />
                </div>
              ))}
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{podcast.length}</div>
            <div className="text-gray-400">Total Podcasts</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {podcast.filter(p => p.isPopular).length}
            </div>
            <div className="text-gray-400">Popular Shows</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {new Set(podcast.map(p => p.genre)).size}
            </div>
            <div className="text-gray-400">Genres</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {podcastInfluencer.length}
            </div>
            <div className="text-gray-400">Expert Voices</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <HomeFooter />
        </div>
      </div>
    </div>
  );
};

export default Home;