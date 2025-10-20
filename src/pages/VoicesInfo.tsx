import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import podcastData from "../data/podcast.json";
import podcastInfluencer from "../data/podcastInfluencer.json";
import Popular from "../components/Popular";
import { FaPlay, FaHeart, FaRegHeart, FaShare, FaSpotify, FaUserFriends, FaPodcast } from "react-icons/fa";

// Proper type casting for all icons
const PlayIcon = FaPlay as React.ComponentType<any>;
const HeartIcon = FaHeart as React.ComponentType<any>;
const RegHeartIcon = FaRegHeart as React.ComponentType<any>;
const ShareIcon = FaShare as React.ComponentType<any>;
const SpotifyIcon = FaSpotify as React.ComponentType<any>;
const UserFriendsIcon = FaUserFriends as React.ComponentType<any>;
const PodcastIcon = FaPodcast as React.ComponentType<any>;

interface VoicesInfoProps {
  onPlayPodcast: (podcast: any) => void;
}

const VoicesInfo: React.FC<VoicesInfoProps> = ({ onPlayPodcast }) => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);
  const itemsPerPage = 8;

  const influencer = podcastInfluencer.find((inf) => inf.id.toString() === id);

  useEffect(() => {
    // Check if user is following this influencer
    const following = JSON.parse(localStorage.getItem('followingInfluencers') || '[]');
    setIsFollowing(following.includes(id));
  }, [id]);

  if (!influencer) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
            <UserFriendsIcon className="text-4xl text-gray-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-300 mb-4">Influencer Not Found</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            The podcast influencer you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const matchedPodcasts = podcastData.filter(
    (p) =>
      p.publisher.toLowerCase().includes(influencer.name.toLowerCase()) ||
      p.title.toLowerCase().includes(influencer.podcast.toLowerCase())
  );

  // Calculate influencer stats
  const totalPlays = matchedPodcasts.length * 1245678; // Mock data
  const avgDuration = "45 min";
  const topGenre = matchedPodcasts.length > 0 ? matchedPodcasts[0].genre : "Various";

  // Pagination
  const totalPages = Math.ceil(matchedPodcasts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPodcasts = matchedPodcasts.slice(startIndex, startIndex + itemsPerPage);

  const toggleFollow = () => {
    const following = JSON.parse(localStorage.getItem('followingInfluencers') || '[]');
    
    if (isFollowing) {
      const updated = following.filter((infId: string) => infId !== id);
      localStorage.setItem('followingInfluencers', JSON.stringify(updated));
    } else {
      const updated = [...following, id];
      localStorage.setItem('followingInfluencers', JSON.stringify(updated));
    }
    
    setIsFollowing(!isFollowing);
  };

  const handlePlayAll = () => {
    if (matchedPodcasts.length > 0) {
      onPlayPodcast(matchedPodcasts[0]);
    }
  };

  // Fallback bio if not available in data
  const influencerBio = (influencer as any).bio || `Host of "${influencer.podcast}" podcast. Explore amazing content across ${topGenre} genre.`;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Influencer Header */}
        <div className="relative mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8">
            {/* Influencer Image */}
            <div className="relative group">
              <img
                src={influencer.image}
                alt={influencer.name}
                className="w-60 h-60 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button 
                  onClick={handlePlayAll}
                  className="bg-green-500 hover:bg-green-400 text-black p-5 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
                >
                  <PlayIcon className="text-2xl ml-1" />
                </button>
              </div>
            </div>
            
            {/* Influencer Info */}
            <div className="flex-1">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Podcast Creator</p>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {influencer.name}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6 max-w-2xl leading-relaxed">
                Host of <span className="text-cyan-400 font-semibold">"{influencer.podcast}"</span> • {influencerBio}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-gray-400 mb-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <PodcastIcon className="text-cyan-400" />
                  <span className="text-white font-semibold">{matchedPodcasts.length} episodes</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <PlayIcon className="text-green-400" />
                  <span>{totalPlays.toLocaleString()} plays</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <SpotifyIcon className="text-green-500" />
                  <span>Spotify Exclusive</span>
                </div>
                <span>•</span>
                <span>Top Genre: <span className="text-cyan-400">{topGenre}</span></span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={handlePlayAll}
                  className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-12 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
                >
                  <PlayIcon className="text-xl" />
                  Play All Episodes
                </button>

                <button
                  onClick={toggleFollow}
                  className={`${
                    isFollowing 
                      ? 'bg-green-500/20 border-green-500 text-green-400' 
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                  } border font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all duration-300`}
                >
                  {isFollowing ? <HeartIcon className="text-green-400" /> : <RegHeartIcon />}
                  {isFollowing ? 'Following' : 'Follow'}
                </button>

                <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all duration-300">
                  <ShareIcon />
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-2xl p-6 border border-cyan-500/20">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{matchedPodcasts.length}</div>
            <div className="text-gray-400">Total Episodes</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/20">
            <div className="text-3xl font-bold text-green-400 mb-2">{(totalPlays / 1000000).toFixed(1)}M</div>
            <div className="text-gray-400">Total Plays</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-6 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400 mb-2">{avgDuration}</div>
            <div className="text-gray-400">Avg. Duration</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-2xl p-6 border border-yellow-500/20">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{topGenre}</div>
            <div className="text-gray-400">Top Genre</div>
          </div>
        </div>

        {/* Podcasts Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Latest Episodes</h2>
              <p className="text-gray-400">All episodes from {influencer.name}'s podcast "{influencer.podcast}"</p>
            </div>
            <div className="text-cyan-400 font-semibold">
              {matchedPodcasts.length} episodes
            </div>
          </div>

          {currentPodcasts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <PodcastIcon className="text-4xl text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-3">No episodes found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {influencer.name} hasn't published any episodes yet. Check back later for new content!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentPodcasts.map((podcast) => (
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    ← Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-cyan-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* About Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">About {influencer.name}</h2>
          
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="bg-gradient-to-br from-cyan-500 to-green-500 w-32 h-32 rounded-xl flex items-center justify-center shadow-2xl">
                <UserFriendsIcon className="text-4xl text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{influencer.name}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{influencerBio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-cyan-400 mb-3">Podcast Details</h4>
                    <div className="space-y-2 text-gray-300">
                      <div>Show: <span className="text-white">{influencer.podcast}</span></div>
                      <div>Episodes: <span className="text-white">{matchedPodcasts.length}</span></div>
                      <div>Genre: <span className="text-white">{topGenre}</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-400 mb-3">Audience Stats</h4>
                    <div className="space-y-2 text-gray-300">
                      <div>Total Plays: <span className="text-white">{(totalPlays / 1000000).toFixed(1)}M</span></div>
                      <div>Avg. Duration: <span className="text-white">{avgDuration}</span></div>
                      <div>Platform: <span className="text-white">Spotify Exclusive</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoicesInfo;