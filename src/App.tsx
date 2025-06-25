import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FooterPlayer from "./components/FooterPlayer";

// Pages
import Home from "./pages/Home";
import Library from "./pages/Library";
import Playlist from "./pages/Playlist";
import LikedEpisode from "./pages/LikedEpisode";
import History from "./pages/History";
import VoicesInfo from "./pages/VoicesInfo";
import UserPlaylistInfo from "./pages/UserPlaylistPage";
import GenrePage from "./pages/GenrePage";
import CreatePlaylist from "./pages/CreatePlaylist";
import SearchPage from "./pages/SearchPage";
import AllPodcast from "./pages/AllPodcast";

// Data
import podcast from "./data/podcast.json";

function App() {
  const [currentPodcast, setCurrentPodcast] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistQueue, setPlaylistQueue] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePodcastPlay = (podcast: any) => {
    setCurrentPodcast(podcast);
    setIsPlaying(true);

    const previous = JSON.parse(localStorage.getItem("playHistory") || "[]");
    const withoutDuplicate = previous.filter((p: any) => p.id !== podcast.id);
    const updatedHistory = [podcast, ...withoutDuplicate].slice(0, 50);
    localStorage.setItem("playHistory", JSON.stringify(updatedHistory));

    setPlaylistQueue([]); 
    setCurrentIndex(0);
  };

  const handlePlayAllQueue = (episodes: any[]) => {
    if (!episodes || episodes.length === 0) return;
    setPlaylistQueue(episodes);
    setCurrentPodcast(episodes[0]);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const toggleLike = (podcast: any) => {
    const liked = JSON.parse(localStorage.getItem("likedEpisodes") || "[]");
    const isLiked = liked.some(
      (item: any) => item.id.toString() === podcast.id.toString()
    );

    const updatedLiked = isLiked
      ? liked.filter((item: any) => item.id.toString() !== podcast.id.toString())
      : [...liked, podcast];

    localStorage.setItem("likedEpisodes", JSON.stringify(updatedLiked));
  };

  const handleNext = () => {
    if (playlistQueue.length > 0) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < playlistQueue.length) {
        setCurrentIndex(nextIndex);
        setCurrentPodcast(playlistQueue[nextIndex]);
      }
    } else if (currentPodcast) {
      const currentIndex = podcast.findIndex((p) => p.id === currentPodcast.id);
      const nextIndex = (currentIndex + 1) % podcast.length;
      setCurrentPodcast(podcast[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (playlistQueue.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentPodcast(playlistQueue[prevIndex]);
    } else if (currentPodcast) {
      const currentIndex = podcast.findIndex((p) => p.id === currentPodcast.id);
      const prevIndex = (currentIndex - 1 + podcast.length) % podcast.length;
      setCurrentPodcast(podcast[prevIndex]);
    }
  };

  return (
    <div className="App flex flex-col h-screen bg-black">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto py-6 pl-3 pr-4">
          <Routes>
            <Route path="/" element={<Home onPlayPodcast={handlePodcastPlay} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/all-podcasts" element={<AllPodcast onPlayPodcast={handlePodcastPlay} />} />
            <Route path="/library" element={<Library />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route
              path="/playlist/:id"
              element={<Playlist onPlayPodcast={handlePodcastPlay} onPlayAll={handlePlayAllQueue} />}
            />
            <Route path="/likedepisodes" element={<LikedEpisode onPlayPodcast={handlePodcastPlay} />} />
            <Route path="/history" element={<History onPlayPodcast={handlePodcastPlay} />} />
            <Route
              path="/voices/:id"
              element={<VoicesInfo onPlayPodcast={handlePodcastPlay} />}
            />
            <Route path="/myplaylist" element={<UserPlaylistInfo />} />
            <Route
              path="/genre/:genreName"
              element={<GenrePage onPlayPodcast={handlePodcastPlay} />}
            />
          </Routes>
        </div>
      </div>

      <FooterPlayer
        key={currentPodcast?.id}
        currentPodcast={currentPodcast}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onToggleLike={toggleLike}
      />
    </div>
  );
}

export default App;
