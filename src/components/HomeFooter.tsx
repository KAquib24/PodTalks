import React from 'react';
import { FaSpotify, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

// Proper type casting
const SpotifyIcon = FaSpotify as React.ComponentType<any>;
const TwitterIcon = FaTwitter as React.ComponentType<any>;
const FacebookIcon = FaFacebook as React.ComponentType<any>;
const InstagramIcon = FaInstagram as React.ComponentType<any>;

const HomeFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-green-500/20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 text-black p-2 rounded-lg">
                <SpotifyIcon className="text-2xl" />
              </div>
              <span className="text-2xl font-bold text-white">PodcastHub</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Discover millions of podcasts from around the world. Stream your favorite shows, 
              explore new genres, and connect with amazing creators.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:text-white">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:text-white">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:text-white">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative">
              Company
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {['About', 'Careers', 'For the Record', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Communities Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative">
              Communities
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {['For Artists', 'Developers', 'Advertising', 'Investors', 'Vendors'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Useful Links Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative">
              Support
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {['Help Center', 'Community', 'Contact Us', 'Free Mobile App', 'Web Player'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative">
              Plans
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {['Premium Individual', 'Premium Duo', 'Premium Family', 'Premium Student', 'Free'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-6 mb-6">
            {[
              'Legal',
              'Privacy Center', 
              'Privacy Policy',
              'Cookies',
              'About Ads',
              'Accessibility',
              'Terms of Use'
            ].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-sm hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                {item}
              </a>
            ))}
          </div>
          
          {/* Copyright and Location */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Worldwide
              </span>
              <span>•</span>
              <span>English</span>
              <span>•</span>
              <span>India</span>
            </div>
            
            <div className="text-sm">
              <span className="text-gray-500">© {currentYear} PodcastHub AB. </span>
              <span className="text-gray-400">Made with ❤️ for podcast lovers</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute -top-10 -left-10 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-xl"></div>
      </div>

      {/* Mobile App CTA */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold text-lg mb-2">Get our mobile app</h4>
              <p className="text-gray-400">Listen to podcasts anywhere, anytime</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Google Play
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                App Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;