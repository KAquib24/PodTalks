import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const FaPlusIcon = FaPlus as React.ComponentType;
const FaEditIcon = FaEdit as React.ComponentType;
const FaTrashIcon = FaTrash as React.ComponentType;

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
        image: formData.image || 'https://via.placeholder.com/150',
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
    <div className="bg-gray-900 text-white p-6 min-h-screen max-w-[1115px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Playlists</h1>
        <button
          onClick={openModalForCreate}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-full font-semibold"
        >
          <FaPlusIcon /> Create Playlist
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-xl w-[400px] space-y-4">
            <h2 className="text-xl font-bold">
              {editMode ? 'Edit Playlist' : 'New Playlist'}
            </h2>

            <input
              type="text"
              placeholder="Playlist Name"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <input
              type="text"
              placeholder="Creator Name"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              value={formData.creator}
              onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-400"
              >
                {editMode ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playlist Grid */}
      {playlists.length === 0 ? (
        <p className="text-gray-400">No playlists created yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="relative bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors"
            >
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-full h-40 object-cover rounded-md mb-3 cursor-pointer"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              />
              <h3
                className="text-lg font-semibold truncate cursor-pointer"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                {playlist.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">{playlist.description}</p>
              <p className="text-xs text-gray-500 mt-1">Created by {playlist.creator}</p>

              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => openModalForEdit(playlist)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <FaEditIcon />
                </button>
                <button
                  onClick={() => handleDelete(playlist.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <FaTrashIcon />
                </button>
              </div>

              <button
                onClick={() => navigate(`/all-podcasts?playlistId=${playlist.id}`)}
                className="absolute bottom-3 right-3 bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-full"
                title="Add Podcast"
              >
                <FaPlusIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePlaylist;
