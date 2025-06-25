import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaPlay,
  FaEllipsisH,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaSpotify,
  FaTrash
} from 'react-icons/fa';

const PlayIcon = FaPlay as React.ComponentType<{ className?: string }>;
const EllipsisIcon = FaEllipsisH as React.ComponentType<{ className?: string }>;
const HeartIcon = FaHeart as React.ComponentType<{ className?: string }>;
const RegHeartIcon = FaRegHeart as React.ComponentType<{ className?: string }>;
const ClockIcon = FaClock as React.ComponentType<{ className?: string }>;
const SpotifyIcon = FaSpotify as React.ComponentType<{ className?: string }>;
const TrashIcon = FaTrash as React.ComponentType<{ className?: string }>;

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
  isLiked?: boolean;
  episodes?: Podcast[];
}

interface PlaylistProps {
  onPlayPodcast?: (podcast: Podcast) => void;
  onPlayAll?: (episodes: Podcast[]) => void; 
}

const Playlist: React.FC<PlaylistProps> = ({ onPlayPodcast }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // 
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

  if (!playlist) {
    return <div className="text-white p-6">Playlist not found.</div>;
  }

  return (
    <div className="bg-gray-900 rounded-lg px-6 py-4 text-white max-w-[1115px] mx-auto overflow-y-auto">
      
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition duration-200"
      >
        ← Back
      </button>


      {/* Playlist Header */}
      <div className="relative pt-10 pb-8 px-8">
        <div className="flex items-end gap-6">
          <img
            src={playlist.image}
            alt={playlist.name}
            className="w-60 h-60 object-cover rounded-md shadow-2xl"
          />
          <div className="flex flex-col">
            <p className="text-sm uppercase tracking-wider mb-2">Playlist</p>
            <h1 className="text-7xl font-bold mb-4">{playlist.name}</h1>
            <p className="text-gray-300 mb-1">{playlist.description}</p>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <span className="font-bold">{playlist.creator}</span>
              <span>•</span>
              <span>{playlist.likes} likes</span>
              <span>•</span>
              <span>{playlist.duration}</span>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => {
                  if (playlist?.episodes?.length) {
                    onPlayPodcast?.(playlist.episodes[0]);
                  }
                }}
                className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-transform hover:scale-105"
              >
                <PlayIcon /> Play All
              </button>

              <button className="bg-transparent border border-gray-500 hover:border-white text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors">
                {playlist.isLiked ? <HeartIcon className="text-green-500" /> : <RegHeartIcon />}
                {playlist.isLiked ? 'Liked' : 'Like'}
              </button>

              <button className="text-gray-400 hover:text-white p-3 rounded-full hover:bg-gray-800">
                <EllipsisIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="px-8">
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        {playlist.episodes?.length ? (
          <ul className="space-y-4">
            {playlist.episodes.map((ep) => (
              <li
                key={ep.id}
                className="bg-gray-800 p-4 rounded-md flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={ep.image}
                    alt={ep.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{ep.title}</h3>
                    <p className="text-gray-400 text-sm">{ep.publisher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onPlayPodcast?.(ep)}
                    className="bg-green-600 hover:bg-green-500 p-2 rounded-full text-black"
                  >
                    <PlayIcon />
                  </button>
                  <button
                    onClick={() => removePodcast(ep.id)}
                    className="bg-red-600 hover:bg-red-500 p-2 rounded-full text-white"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No podcasts in this playlist yet.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
