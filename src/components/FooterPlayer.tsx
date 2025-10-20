import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPlay,
  FaPause, 
  FaStepForward, 
  FaStepBackward, 
  FaVolumeUp,
  FaVolumeMute,
  FaHeart,
  FaRegHeart,
  FaExpand,
  FaRandom,
  FaRedo
} from 'react-icons/fa';

// Proper type casting with className support
const PlayIcon = FaPlay as React.ComponentType<{ className?: string }>;
const PauseIcon = FaPause as React.ComponentType<{ className?: string }>;
const StepForwardIcon = FaStepForward as React.ComponentType<{ className?: string }>;
const StepBackwardIcon = FaStepBackward as React.ComponentType<{ className?: string }>;
const VolumeUpIcon = FaVolumeUp as React.ComponentType<{ className?: string }>;
const VolumeMuteIcon = FaVolumeMute as React.ComponentType<{ className?: string }>;
const HeartIcon = FaHeart as React.ComponentType<{ className?: string }>;
const RegHeartIcon = FaRegHeart as React.ComponentType<{ className?: string }>;
const ExpandIcon = FaExpand as React.ComponentType<{ className?: string }>;
const RandomIcon = FaRandom as React.ComponentType<{ className?: string }>;
const RedoIcon = FaRedo as React.ComponentType<{ className?: string }>;

interface Podcast {
  id: string;
  title: string;
  publisher: string;
  audio: string;
  image: string;
}

interface FooterPlayerProps {
  currentPodcast?: Podcast;
  onNext: () => void;
  onPrevious: () => void;
  onToggleLike: (podcast: Podcast) => void;
}

const FooterPlayer: React.FC<FooterPlayerProps> = ({ 
  currentPodcast, 
  onNext, 
  onPrevious,
  onToggleLike
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update like status when currentPodcast changes
  useEffect(() => {
    if (currentPodcast) {
      const liked = JSON.parse(localStorage.getItem('likedEpisodes') || '[]');
      setIsLiked(liked.some((item: any) => item.id === currentPodcast.id));
    } else {
      setIsLiked(false);
    }
  }, [currentPodcast]);

  // Handle play/pause when isPlaying or currentPodcast changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentPodcast]);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!currentPodcast) return;
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 1;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    
    if (audioRef.current) {
      const dur = audioRef.current.duration || 0;
      const newTime = (newProgress / 100) * dur;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLikeToggle = () => {
    if (currentPodcast) {
      onToggleLike(currentPodcast);
      const liked = JSON.parse(localStorage.getItem('likedEpisodes') || '[]');
      const isNowLiked = liked.some((item: any) => item.id === currentPodcast.id);
      setIsLiked(isNowLiked);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentPodcast) {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 border-t border-gray-700 shadow-2xl">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-2">🎵</div>
            <p className="text-gray-400 text-sm">Select a podcast to start listening</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-gray-900 to-black text-white p-6 border-t border-gray-700 shadow-2xl transition-all duration-300 ${isExpanded ? 'h-40' : 'h-28'}`}>
      <audio
        ref={audioRef}
        src={currentPodcast?.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          onNext();
        }}
        onLoadedMetadata={handleTimeUpdate}
        hidden
      />

      <div className="flex items-center justify-between h-full">
        {/* Podcast Info */}
        <div className="flex items-center w-1/4">
          <div className="relative group">
            <img
              src={currentPodcast.image}
              alt={currentPodcast.title}
              className="w-16 h-16 object-cover rounded-xl shadow-2xl mr-4 transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button 
                onClick={handlePlayPause}
                className="bg-green-500 hover:bg-green-400 text-black p-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300"
              >
                {isPlaying ? <PauseIcon className="w-3 h-3" /> : <PlayIcon className="w-3 h-3 ml-0.5" />}
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-white truncate max-w-[180px]">
              {currentPodcast.title}
            </h4>
            <p className="text-xs text-gray-400">{currentPodcast.publisher}</p>
            <div className="flex items-center gap-2 mt-1">
              <button 
                onClick={handleLikeToggle}
                className={`p-1 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'text-red-500 bg-red-500/20' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                }`}
              >
                {isLiked ? <HeartIcon className="w-4 h-4" /> : <RegHeartIcon className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
              >
                <ExpandIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4 space-y-3">
          {/* Control Buttons */}
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <RandomIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={onPrevious}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <StepBackwardIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handlePlayPause}
              className="bg-green-500 hover:bg-green-400 text-black rounded-full p-3 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
            </button>
            <button 
              onClick={onNext}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <StepForwardIcon className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <RedoIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-3">
            <span className="text-xs text-gray-400 w-12 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative group">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb-hidden"
              />
              <div 
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg pointer-events-none"
                style={{ width: `${progress}%` }}
              ></div>
              <div 
                className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ left: `calc(${progress}% - 6px)` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 w-12">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-end w-1/4 gap-3">
          <button 
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            {isMuted || volume === 0 ? <VolumeMuteIcon className="w-5 h-5" /> : <VolumeUpIcon className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2 w-32">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb-hidden"
            />
          </div>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>Bitrate: 320kbps</span>
              <span>•</span>
              <span>Format: MP3</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-white transition-colors duration-200">Lyrics</button>
              <span>•</span>
              <button className="hover:text-white transition-colors duration-200">Share</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterPlayer;