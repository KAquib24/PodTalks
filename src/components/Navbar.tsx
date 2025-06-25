import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === '/') setActiveTab('home');
    else if (location.pathname.startsWith('/search')) setActiveTab('search');
  }, [location]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setActiveTab('search');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl ml-4 mr-4 shadow-md">
      {/* Main Navbar */}
      <nav className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <HomeIcon 
              className={`h-6 w-6 cursor-pointer ${activeTab === 'home' ? 'text-green-400' : 'text-white'}`} 
              onClick={() => {
                navigate('/');
                setActiveTab('home');
              }} 
            />
            <ArrowPathIcon 
              className="h-5 w-5 text-gray-400 cursor-pointer hover:text-green-400 transition-colors" 
              onClick={handleRefresh}
            />
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search podcasts..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Right: Nav Links - Desktop */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li
            className={`cursor-pointer transition-colors ${activeTab === 'home' ? 'text-green-400' : 'text-white hover:text-green-400'}`}
            onClick={() => {
              navigate('/');
              setActiveTab('home');
            }}
          >
            Home
          </li>
          <li
            className="cursor-pointer text-white hover:text-green-400 transition-colors"
            onClick={() => navigate('/discover')}
          >
            Discover
          </li>
          <li
            className="cursor-pointer text-white hover:text-green-400 transition-colors"
            onClick={() => navigate('/library')}
          >
            Your Library
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-800">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li
              className={`cursor-pointer py-2 px-4 rounded-md transition-colors ${activeTab === 'home' ? 'bg-gray-800 text-green-400' : 'text-white hover:bg-gray-800'}`}
              onClick={() => {
                navigate('/');
                setActiveTab('home');
                setIsMenuOpen(false);
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer py-2 px-4 rounded-md text-white hover:bg-gray-800 transition-colors"
              onClick={() => {
                navigate('/discover');
                setIsMenuOpen(false);
              }}
            >
              Discover
            </li>
            <li
              className="cursor-pointer py-2 px-4 rounded-md text-white hover:bg-gray-800 transition-colors"
              onClick={() => {
                navigate('/library');
                setIsMenuOpen(false);
              }}
            >
              Your Library
            </li>
          </ul>
        </div>
      )}

      {/* Secondary Navigation - Underneath */}
      <div className="hidden md:block mt-4 pt-4 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 text-xs text-gray-400">
            <span>Recently played</span>
            <span>•</span>
            <span>Trending</span>
            <span>•</span>
            <span>New releases</span>
          </div>
          <button 
            className="text-xs text-green-400 hover:text-green-300 transition-colors"
            onClick={() => navigate('/browse-all')}
          >
            Browse all →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;