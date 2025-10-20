import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === '/') setActiveTab('home');
    else if (location.pathname.startsWith('/search')) setActiveTab('search');
  }, [location]);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setActiveTab('search');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const quickLinks = [
    { label: 'Recently played', path: '/history' },
    { label: 'Trending', path: '/trending' },
    { label: 'New releases', path: '/new-releases' },
    { label: 'Top Charts', path: '/charts' }
  ];

  return (
    <div className={`sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black text-white px-6 py-4 rounded-2xl mx-4 shadow-2xl transition-all duration-500 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700' : 'bg-transparent'
    }`}>
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-green-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Main Navbar */}
      <nav className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Logo and Refresh */}
          <div className="flex items-center gap-3">
            <div 
              className={`p-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                activeTab === 'home' 
                  ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                navigate('/');
                setActiveTab('home');
              }}
            >
              <HomeIcon className="h-5 w-5" />
            </div>
            <div 
              className="p-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-cyan-400"
              onClick={handleRefresh}
              title="Refresh"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
            <input
              type="text"
              placeholder="Search podcasts, genres, creators..."
              className="relative w-full pl-12 pr-4 py-3 rounded-xl border border-gray-700 bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-3.5 pointer-events-none transition-colors duration-300 group-focus-within:text-cyan-400" />
            
            {/* Search Suggestions */}
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700 shadow-2xl z-50 overflow-hidden">
                <div className="p-3 text-sm text-gray-400 border-b border-gray-700">
                  Press Enter to search for "{searchTerm}"
                </div>
                <div className="p-2">
                  <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2">
                    Quick Suggestions
                  </div>
                  {['Technology', 'Business', 'Comedy', 'Health'].map((suggestion) => (
                    <div 
                      key={suggestion}
                      className="px-3 py-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200"
                      onClick={() => setSearchTerm(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden ml-auto p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
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
        <ul className="hidden md:flex gap-2 text-sm font-medium">
          {[
            { label: 'Home', path: '/', tab: 'home' },
            { label: 'Discover', path: '/discover', tab: 'discover' },
            { label: 'Library', path: '/library', tab: 'library' }
          ].map((item) => (
            <li
              key={item.label}
              className={`
                relative cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105
                ${activeTab === item.tab 
                  ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }
              `}
              onClick={() => {
                navigate(item.path);
                setActiveTab(item.tab);
              }}
            >
              {item.label}
              {activeTab === item.tab && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-700/50 backdrop-blur-xl">
          <ul className="flex flex-col gap-2 text-sm font-medium">
            {[
              { label: 'Home', path: '/', tab: 'home' },
              { label: 'Discover', path: '/discover', tab: 'discover' },
              { label: 'Library', path: '/library', tab: 'library' },
              { label: 'Search', path: '/search', tab: 'search' }
            ].map((item) => (
              <li
                key={item.label}
                className={`
                  cursor-pointer py-3 px-4 rounded-xl transition-all duration-300
                  ${activeTab === item.tab 
                    ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }
                `}
                onClick={() => {
                  navigate(item.path);
                  setActiveTab(item.tab);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Secondary Navigation - Underneath */}
      <div className="hidden md:block mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 text-sm">
            {quickLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <button 
                  onClick={() => navigate(link.path)}
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105 hover:font-medium"
                >
                  {link.label}
                </button>
                {index < quickLinks.length - 1 && (
                  <span className="text-gray-600">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <button 
            className="flex items-center gap-2 text-sm bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => navigate('/browse-all')}
          >
            Browse All
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Progress Bar for Page Load */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full scale-x-0 animate-pulse"></div>
    </div>
  );
};

export default Navbar;