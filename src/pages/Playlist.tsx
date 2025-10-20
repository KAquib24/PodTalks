import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaPlay,
  FaEllipsisH,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaTrash,
  FaShare,
  FaPlus,
  FaMusic
} from 'react-icons/fa';

const PlayIcon = FaPlay as React.ComponentType<{ className?: string }>;
const EllipsisIcon = FaEllipsisH as React.ComponentType<{ className?: string }>;
const HeartIcon = FaHeart as React.ComponentType<{ className?: string }>;
const RegHeartIcon = FaRegHeart as React.ComponentType<{ className?: string }>;
const ClockIcon = FaClock as React.ComponentType<{ className?: string }>;
const TrashIcon = FaTrash as React.ComponentType<{ className?: string }>;
const ShareIcon = FaShare as React.ComponentType<{ className?: string }>;
const PlusIcon = FaPlus as React.ComponentType<{ className?: string }>;
const MusicIcon = FaMusic as React.ComponentType<{ className?: string }>;

interface Podcast {
  id: string;
  title: string;
  publisher: string;
  image: string;
  audio: string;
  genre: string;
  duration?: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  creator: string;
  likes: number;
  duration: string;
  isLiked?: boolean;
  episodes?: Podcast[];
}

interface PlaylistProps {
  onPlayPodcast?: (podcast: Podcast) => void;
  onPlayAll?: (episodes: Podcast[]) => void; 
}

const Playlist: React.FC<PlaylistProps> = ({ onPlayPodcast, onPlayAll }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists') || '[]');
    const selected = storedPlaylists.find((pl: Playlist) => pl.id === id);
    setPlaylist(selected || null);
  }, [id]);

  const updateLocalStorage = (updated: Playlist) => {
    const all = JSON.parse(localStorage.getItem('playlists') || '[]');
    const newData = all.map((pl: Playlist) => (pl.id === id ? updated : pl));
    localStorage.setItem('playlists', JSON.stringify(newData));
    setPlaylist(updated);
  };

  const removePodcast = (podcastId: string) => {
    if (!playlist) return;
    const updated = {
      ...playlist,
      episodes: playlist.episodes?.filter(p => p.id !== podcastId)
    };
    updateLocalStorage(updated);
  };

  const toggleLike = () => {
    if (!playlist) return;
    const updated = {
      ...playlist,
      isLiked: !playlist.isLiked,
      likes: playlist.isLiked ? playlist.likes - 1 : playlist.likes + 1
    };
    updateLocalStorage(updated);
  };

  if (!playlist) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MusicIcon className="text-6xl text-gray-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-300 mb-2">Playlist Not Found</h2>
          <p className="text-gray-500 mb-6">The playlist you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/create-playlist')}
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Create New Playlist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors duration-200 mb-6"
        >
          ← Back
        </button>

        {/* Playlist Header */}
        <div className="relative mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8">
            {/* Playlist Image */}
            <div className="relative group">
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-green-500 hover:bg-green-400 text-black p-4 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <PlayIcon className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Playlist Info */}
            <div className="flex-1">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Playlist</p>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {playlist.name}
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                {playlist.description || 'No description available'}
              </p>

              <div className="flex items-center gap-4 text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-black text-sm font-bold">{playlist.creator.charAt(0)}</span>
                  </div>
                  <span className="font-semibold text-white">{playlist.creator}</span>
                </div>
                <span>•</span>
                <span>{playlist.likes} likes</span>
                <span>•</span>
                <span>{playlist.duration}</span>
                <span>•</span>
                <span>{playlist.episodes?.length || 0} episodes</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => playlist.episodes && onPlayAll?.(playlist.episodes)}
                  className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-12 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
                >
                  <PlayIcon className="text-xl" />
                  Play All
                </button>

                <button
                  onClick={toggleLike}
                  className={`${
                    playlist.isLiked 
                      ? 'bg-green-500/20 border-green-500 text-green-400' 
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                  } border font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all duration-300`}
                >
                  {playlist.isLiked ? <HeartIcon className="text-green-400" /> : <RegHeartIcon />}
                  {playlist.isLiked ? 'Liked' : 'Like'}
                </button>

                <button
                  onClick={() => navigate(`/all-podcasts?playlistId=${playlist.id}`)}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all duration-300"
                >
                  <PlusIcon />
                  Add Episodes
                </button>

                <button className="text-gray-400 hover:text-white p-4 rounded-full hover:bg-gray-800 transition-colors duration-200">
                  <EllipsisIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Episodes</h2>
            <div className="text-gray-400">
              {playlist.episodes?.length || 0} episodes • {playlist.duration}
            </div>
          </div>

          {playlist.episodes?.length ? (
            <div className="space-y-4">
              {playlist.episodes.map((ep, index) => (
                <div
                  key={ep.id}
                  className="group bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl p-6 flex items-center justify-between border border-gray-700 hover:border-cyan-500/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-6 flex-1">
                    {/* Episode Number */}
                    <div className="text-2xl font-bold text-gray-500 group-hover:text-cyan-400 transition-colors duration-300 w-12 text-center">
                      {index + 1}
                    </div>

                    {/* Episode Image */}
                    <img
                      src={ep.image}
                      alt={ep.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />

                    {/* Episode Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-2">
                        {ep.title}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-400">
                        <span>{ep.publisher}</span>
                        <span>•</span>
                        <span className="text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full text-sm">
                          {ep.genre}
                        </span>
                        {ep.duration && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="text-xs" />
                              {ep.duration}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onPlayPodcast?.(ep)}
                      className="bg-green-500 hover:bg-green-400 p-4 rounded-full text-black transition-colors duration-200"
                    >
                      <PlayIcon />
                    </button>
                    <button
                      onClick={() => removePodcast(ep.id)}
                      className="bg-red-500 hover:bg-red-400 p-4 rounded-full text-white transition-colors duration-200"
                      title="Remove from playlist"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <MusicIcon className="text-6xl text-gray-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No episodes yet</h3>
              <p className="text-gray-500 mb-6">Start building your playlist by adding some podcasts!</p>
              <button
                onClick={() => navigate(`/all-podcasts?playlistId=${playlist.id}`)}
                className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Add Your First Episode
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;