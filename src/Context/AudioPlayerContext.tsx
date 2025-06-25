// src/context/AudioPlayerContext.tsx
import React, { createContext, useState, useContext } from "react";
import { Track } from "../types/Track";

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType>({
  currentTrack: null,
  isPlaying: false,
  playTrack: () => {},
  togglePlayPause: () => {},
});

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioPlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlayPause }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};