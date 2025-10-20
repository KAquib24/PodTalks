import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaEdit, FaMusic, FaUser } from "react-icons/fa";

// Use IconType for proper typing with className support
const FaPlusIcon = FaPlus as React.ComponentType<{ className?: string }>;
const FaEditIcon = FaEdit as React.ComponentType<{ className?: string }>;
const FaTrashIcon = FaTrash as React.ComponentType<{ className?: string }>;
const FaMusicIcon = FaMusic as React.ComponentType<{ className?: string }>;
const FaUserIcon = FaUser as React.ComponentType<{ className?: string }>;

type Playlist = {
  id: string;
  name: string;
  description: string;
  image: string;
  creator: string;
  likes: number;
  duration: string;
};

const CreatePlaylist: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Playlist, 'id' | 'likes' | 'duration'>>({
    name: '',
    description: '',
    image: '',
    creator: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('playlists') || '[]');
    setPlaylists(stored);
  }, []);

  const resetForm = () => {
    setFormData({ name: '', description: '', image: '', creator: '' });
    setEditMode(false);
    setEditingId(null);
  };

  const openModalForCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const openModalForEdit = (playlist: Playlist) => {
    setFormData({
      name: playlist.name,
      description: playlist.description,
      image: playlist.image,
      creator: playlist.creator,
    });
    setEditingId(playlist.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Please enter a playlist name');
      return;
    }

    let updatedPlaylists: Playlist[];

    if (editMode && editingId) {
      updatedPlaylists = playlists.map(pl =>
        pl.id === editingId ? { ...pl, ...formData } : pl
      );
    } else {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        image: formData.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        creator: formData.creator || 'You',
        likes: 0,
        duration: '0 hr 0 min',
      };
      updatedPlaylists = [...playlists, newPlaylist];
      navigate(`/playlist/${newPlaylist.id}`);
    }

    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      const updated = playlists.filter(p => p.id !== id);
      setPlaylists(updated);
      localStorage.setItem('playlists', JSON.stringify(updated));
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 min-h-screen max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Your Playlists
          </h1>
          <p className="text-gray-400 mt-2">Create and manage your podcast collections</p>
        </div>
        <button
          onClick={openModalForCreate}
          className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black px-6 py-3 rounded-full font-semibold mt-4 sm:mt-0 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
        >
          <FaPlusIcon className="text-lg" />
          Create Playlist
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500 rounded-lg">
                <FaMusicIcon className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {editMode ? 'Edit Playlist' : 'New Playlist'}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Playlist Name *
                </label>
                <input
                  type="text"
                  placeholder="My Awesome Podcasts"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Describe your playlist..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Creator Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  value={formData.creator}
                  onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-700">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                {editMode ? 'Update Playlist' : 'Create Playlist'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playlist Grid */}
      {playlists.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
            <FaMusicIcon className="text-4xl text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-300 mb-3">No playlists yet</h3>
          <p className="text-gray-500 mb-8">Create your first playlist to get started</p>
          <button
            onClick={openModalForCreate}
            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Create Your First Playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 p-5 rounded-2xl transition-all duration-500 border border-gray-700 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button
                  onClick={() => openModalForEdit(playlist)}
                  className="p-2 bg-yellow-500 hover:bg-yellow-400 rounded-full text-black transition-colors duration-200 shadow-lg"
                  title="Edit playlist"
                >
                  <FaEditIcon className="text-sm" />
                </button>
                <button
                  onClick={() => handleDelete(playlist.id)}
                  className="p-2 bg-red-500 hover:bg-red-400 rounded-full text-white transition-colors duration-200 shadow-lg"
                  title="Delete playlist"
                >
                  <FaTrashIcon className="text-sm" />
                </button>
              </div>

              {/* Add Podcast Button */}
              <button
                onClick={() => navigate(`/all-podcasts?playlistId=${playlist.id}`)}
                className="absolute bottom-4 right-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full text-white shadow-lg transition-all duration-300 transform group-hover:scale-110"
                title="Add podcasts"
              >
                <FaPlusIcon className="text-lg" />
              </button>

              {/* Playlist Image */}
              <div 
                className="relative mb-4 rounded-xl overflow-hidden cursor-pointer transform group-hover:scale-105 transition-transform duration-500"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <FaMusicIcon className="text-white text-2xl" />
                  </div>
                </div>
              </div>

              {/* Playlist Info */}
              <div 
                className="cursor-pointer"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <h3 className="text-xl font-bold text-white truncate mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {playlist.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                  {playlist.description || 'No description'}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaUserIcon className="text-xs" />
                    <span>{playlist.creator}</span>
                  </div>
                  <span>{playlist.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePlaylist;