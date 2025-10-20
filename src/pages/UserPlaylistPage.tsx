import React, { useState, useEffect } from 'react';
import { 
  FaPlay, 
  FaEllipsisH, 
  FaHeart, 
  FaRegHeart, 
  FaClock, 
  FaSpotify,
  FaPlus,
  FaShare,
  FaDownload,
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaPause
} from 'react-icons/fa';

// Proper type casting for all icons
const PlayIcon = FaPlay as React.ComponentType<any>;
const EllipsisIcon = FaEllipsisH as React.ComponentType<any>;
const HeartIcon = FaHeart as React.ComponentType<any>;
const RegHeartIcon = FaRegHeart as React.ComponentType<any>;
const ClockIcon = FaClock as React.ComponentType<any>;
const SpotifyIcon = FaSpotify as React.ComponentType<any>;
const PlusIcon = FaPlus as React.ComponentType<any>;
const ShareIcon = FaShare as React.ComponentType<any>;
const DownloadIcon = FaDownload as React.ComponentType<any>;
const RandomIcon = FaRandom as React.ComponentType<any>;
const StepBackwardIcon = FaStepBackward as React.ComponentType<any>;
const StepForwardIcon = FaStepForward as React.ComponentType<any>;
const PauseIcon = FaPause as React.ComponentType<any>;

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  plays?: string;
  added?: string;
  liked?: boolean;
}

const UserPlaylistInfo: React.FC = () => {
  const [playlist, setPlaylist] = useState({
    name: "Chill Vibes",
    creator: "Spotify",
    description: "Relaxing tunes for your downtime. Updated weekly with the best chill tracks to help you unwind and focus.",
    likes: "1,245,678",
    duration: "5 hr 45 min",
    isLiked: false,
    followers: "2.3M",
    lastUpdated: "2 days ago"
  });

  const [songs, setSongs] = useState<Song[]>([
    { id: 1, title: "Sunset Dreams", artist: "Chill Wave", album: "Ocean Breeze", duration: "3:45", plays: "2.4M", added: "2 weeks ago", liked: true },
    { id: 2, title: "Midnight Thoughts", artist: "LoFi Beats", album: "Night Owl", duration: "4:12", plays: "1.8M", added: "1 week ago", liked: false },
    { id: 3, title: "Morning Coffee", artist: "Jazz Vibes", album: "Wake Up Call", duration: "3:28", plays: "3.1M", added: "3 days ago", liked: true },
    { id: 4, title: "Urban Rain", artist: "City Sounds", album: "Metropolitan", duration: "5:02", plays: "1.2M", added: "5 days ago", liked: false },
    { id: 5, title: "Mountain Air", artist: "Nature Beats", album: "Wilderness", duration: "4:35", plays: "890K", added: "1 month ago", liked: true },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const toggleLike = () => {
    setPlaylist(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? "1,245,677" : "1,245,679"
    }));
  };

  const toggleSongLike = (songId: number) => {
    setSongs(prev => prev.map(song => 
      song.id === songId ? { ...song, liked: !song.liked } : song
    ));
  };

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayAll = () => {
    if (songs.length > 0) {
      setCurrentSong(songs[0]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8">
            {/* Playlist Image */}
            <div className="relative group">
              <div className="w-60 h-60 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-2xl shadow-2xl flex items-center justify-center">
                <span className="text-7xl font-bold text-white drop-shadow-lg">C</span>
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-green-500 hover:bg-green-400 text-black p-5 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                  <PlayIcon className="text-2xl ml-1" />
                </button>
              </div>
            </div>
            
            {/* Playlist Info */}
            <div className="flex-1">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Public Playlist</p>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {playlist.name}
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
                {playlist.description}
              </p>

              <div className="flex items-center gap-4 text-gray-400 mb-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-black text-sm font-bold">S</span>
                  </div>
                  <span className="font-semibold text-white">{playlist.creator}</span>
                </div>
                <span>•</span>
                <span className="text-green-400 font-semibold">{playlist.followers} followers</span>
                <span>•</span>
                <span>{playlist.likes} likes</span>
                <span>•</span>
                <span>{playlist.duration}</span>
                <span>•</span>
                <span className="text-gray-500">Updated {playlist.lastUpdated}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={handlePlayAll}
                  className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-12 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
                >
                  {isPlaying && currentSong ? <PauseIcon className="text-xl" /> : <PlayIcon className="text-xl" />}
                  {isPlaying && currentSong ? "Pause" : "Play"}
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

                <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all duration-300">
                  <ShareIcon />
                  Share
                </button>

                <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all duration-300">
                  <DownloadIcon />
                  Download
                </button>

                <button className="text-gray-400 hover:text-white p-4 rounded-full hover:bg-gray-800 transition-colors duration-200">
                  <EllipsisIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Now Playing Bar (if song is playing) */}
        {currentSong && (
          <div className="fixed bottom-20 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 mx-6 rounded-xl p-4 shadow-2xl z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <div className="font-bold text-white">{currentSong.title}</div>
                  <div className="text-white/80 text-sm">{currentSong.artist}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="text-white/80 hover:text-white">
                  <RandomIcon />
                </button>
                <button className="text-white/80 hover:text-white">
                  <StepBackwardIcon />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white text-black p-3 rounded-full hover:scale-105 transition-transform"
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon className="ml-0.5" />}
                </button>
                <button className="text-white/80 hover:text-white">
                  <StepForwardIcon />
                </button>
                <button className="text-white/80 hover:text-white">
                  <EllipsisIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Songs Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Songs</h2>
            <div className="text-gray-400">
              {songs.length} songs • {playlist.duration}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[50px_4fr_2fr_2fr_100px_100px_80px] gap-4 px-6 py-4 text-gray-400 border-b border-gray-700 bg-gray-800/30">
              <span className="text-center">#</span>
              <span>TITLE</span>
              <span>ALBUM</span>
              <span>ARTIST</span>
              <span className="text-center">PLAYS</span>
              <span className="text-center">ADDED</span>
              <span className="flex justify-center"><ClockIcon /></span>
            </div>
            
            {/* Songs List */}
            {songs.map((song, index) => (
              <div 
                key={song.id}
                className="grid grid-cols-[50px_4fr_2fr_2fr_100px_100px_80px] gap-4 px-6 py-4 hover:bg-gray-700/30 group transition-all duration-300 cursor-pointer"
                onClick={() => handlePlaySong(song)}
              >
                <div className="flex items-center justify-center">
                  <span className="group-hover:hidden text-gray-400">{index + 1}</span>
                  <button className="hidden group-hover:block text-black bg-green-500 rounded-full p-2 hover:scale-110 transition-transform">
                    <PlayIcon className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-400 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <div>
                    <div className={`font-medium ${currentSong?.id === song.id ? 'text-green-400' : 'text-white'}`}>
                      {song.title}
                    </div>
                  </div>
                </div>
                
                <div className="text-gray-400 flex items-center">{song.album}</div>
                <div className="text-gray-400 flex items-center">{song.artist}</div>
                <div className="text-gray-400 text-center flex items-center justify-center">{song.plays}</div>
                <div className="text-gray-400 text-center flex items-center justify-center">{song.added}</div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{song.duration}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSongLike(song.id);
                      }}
                      className={`p-2 rounded-full ${
                        song.liked ? 'text-green-500 bg-green-500/20' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <HeartIcon className="w-3 h-3" />
                    </button>
                    <button className="text-gray-400 hover:text-white p-2">
                      <EllipsisIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">About this playlist</h2>
          
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="bg-gradient-to-br from-green-600 to-blue-700 w-32 h-32 rounded-xl flex items-center justify-center shadow-2xl">
                <SpotifyIcon className="text-4xl text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{playlist.name}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{playlist.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{playlist.followers}</div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{playlist.likes}</div>
                    <div className="text-gray-400 text-sm">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">{songs.length}</div>
                    <div className="text-gray-400 text-sm">Songs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">{playlist.duration}</div>
                    <div className="text-gray-400 text-sm">Duration</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-gray-400">
                    Created by <span className="text-white font-semibold">{playlist.creator}</span> • 
                    Updated <span className="text-white font-semibold">{playlist.lastUpdated}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <SpotifyIcon className="text-3xl text-green-500" />
              <div>
                <div className="font-bold text-white">Spotify</div>
                <p className="text-gray-400 text-sm">© 2025 Spotify AB</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div>India</div>
              <div>English (IN)</div>
              <div>Privacy</div>
              <div>Terms</div>
              <div>Cookies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlaylistInfo;