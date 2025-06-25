import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPlay as OriginalFaPlay,
  FaPause as OriginalFaPause, 
  FaStepForward as OriginalFaStepForward, 
  FaStepBackward as OriginalFaStepBackward, 
  FaVolumeUp as OriginalFaVolumeUp,
  FaHeart as OriginalFaHeart,
  FaRegHeart as OriginalFaRegHeart
} from 'react-icons/fa';

const FaStepBackward: any = OriginalFaStepBackward;
const FaPause: any = OriginalFaPause;
const FaPlay: any = OriginalFaPlay;
const FaStepForward: any = OriginalFaStepForward;
const FaVolumeUp: any = OriginalFaVolumeUp;
const FaHeart: any = OriginalFaHeart;
const FaRegHeart: any = OriginalFaRegHeart;

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
  const [isLiked, setIsLiked] = useState(false);
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
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    
    if (audioRef.current) {
      const duration = audioRef.current.duration || 0;
      audioRef.current.currentTime = (newProgress / 100) * duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
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

  return (
    <div className="bg-gray-800 text-white p-4 border-t border-gray-700">
      <audio
        ref={audioRef}
        src={currentPodcast?.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        hidden
      />

      <div className="flex items-center justify-between">
        {/* Podcast Info */}
        <div className="flex items-center w-1/4">
          {currentPodcast?.image && (
            <img
              src={currentPodcast.image}
              alt={currentPodcast.title}
              className="w-12 h-12 object-cover rounded-md mr-3"
            />
          )}
          <div className="flex items-center">
            <div>
              <h4 className="text-sm font-medium truncate">{currentPodcast?.title || 'No podcast selected'}</h4>
              <p className="text-xs text-gray-400">{currentPodcast?.publisher}</p>
            </div>
            {currentPodcast && (
              <button 
                onClick={handleLikeToggle}
                className="ml-3 text-red-400 hover:text-red-500 transition-colors cursor-pointer"
                style={{ zIndex: 10 }}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            )}
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center space-x-4 mb-2">
            <button onClick={onPrevious} className="text-gray-400 hover:text-white">
              <FaStepBackward />
            </button>
            <button
              onClick={handlePlayPause}
              className="bg-green-500 hover:bg-green-600 rounded-full p-2"
            >
              {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
            </button>
            <button onClick={onNext} className="text-gray-400 hover:text-white">
              <FaStepForward />
            </button>
          </div>
          <div className="w-full flex items-center">
            <span className="text-xs text-gray-400 w-10">
              {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="flex-1 mx-2 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-400 w-10">
              {audioRef.current ? formatTime(audioRef.current.duration || 0) : '0:00'}
            </span>
          </div>
        </div>
        

        {/* Volume Control */}
        <div className="flex items-center justify-end w-1/4">
          <FaVolumeUp className="text-gray-400 mr-2" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterPlayer;
