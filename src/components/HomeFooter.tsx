// components/HomeFooter.tsx
import React from 'react';

const HomeFooter = () => {
  return (
    <footer className=" text-gray-400 px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For the Record</a></li>
            </ul>
          </div>
          
          {/* Communities Column */}
          <div>
            <h3 className="text-white font-bold mb-4">Communities</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">For Artists</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advertising</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vendors</a></li>
            </ul>
          </div>
          
          {/* Useful Links Column */}
          <div>
            <h3 className="text-white font-bold mb-4">Useful links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Mobile App</a></li>
            </ul>
          </div>
          
          {/* Spotify Plans Column */}
          <div>
            <h3 className="text-white font-bold mb-4">Spotify Plans</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Premium Individual</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Premium Duo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Premium Family</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Premium Student</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spotify Free</a></li>
            </ul>
          </div>
        </div>
        
        {/* Legal and copyright section */}
        <div className="pt-8 border-t border-gray-800">
          {/* Legal links */}
          <div className="flex flex-wrap gap-4 mb-4">
            <a href="#" className="text-xs hover:text-white transition-colors">Legal</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Safety & Privacy Center</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Cookies</a>
            <a href="#" className="text-xs hover:text-white transition-colors">About Ads</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Accessibility</a>
          </div>
          
          {/* Copyright */}
          <div className="text-xs">
            © 2025 Spotify AB
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;