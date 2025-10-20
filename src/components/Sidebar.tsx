import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaPodcast,
  FaHeart,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaCompass,
  FaMicrophone,
  FaUser,
  FaChartLine,
  FaBell
} from "react-icons/fa";

// Type definition for icons
type IconType = React.ComponentType<any>;

// Interface for SidebarItem props
interface SidebarItemProps {
  icon: IconType;
  label: string;
  isActive?: boolean;
  notification?: number;
  isNew?: boolean;
}

// Type assertions for all icons
const HomeIcon = FaHome as IconType;
const BookIcon = FaBook as IconType;
const PodcastIcon = FaPodcast as IconType;
const HeartIcon = FaHeart as IconType;
const HistoryIcon = FaHistory as IconType;
const CogIcon = FaCog as IconType;
const SignOutIcon = FaSignOutAlt as IconType;
const PlusIcon = FaPlus as IconType;
const CompassIcon = FaCompass as IconType;
const MicrophoneIcon = FaMicrophone as IconType;
const UserIcon = FaUser as IconType;
const ChartIcon = FaChartLine as IconType;
const BellIcon = FaBell as IconType;

const SidebarItem = ({
  icon: Icon,
  label,
  isActive = false,
  notification = 0,
  isNew = false
}: SidebarItemProps) => (
  <div className="relative">
    <div
      className={`
      flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 group
      ${
        isActive
          ? "bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg shadow-cyan-500/25"
          : "text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1"
      }
    `}
    >
      <Icon className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span className="font-medium transition-all duration-300">{label}</span>
      
      {/* Notification Badge */}
      {notification > 0 && (
        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {notification}
        </span>
      )}
      
      {/* New Badge */}
      {isNew && (
        <span className="ml-auto bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
          NEW
        </span>
      )}
    </div>
    
    {/* Active Indicator */}
    {isActive && (
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-full animate-pulse"></div>
    )}
  </div>
);

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    plays: "1,234",
    level: "Explorer"
  });

  return (
    <div
      className={`
      hidden md:flex md:flex-col
      min-w-20 md:w-72 lg:w-80 min-h-screen rounded-2xl p-6
      bg-gradient-to-b from-gray-900 to-black text-white 
      overflow-y-auto mt-4 ml-4 mb-4 max-h-[900px] shadow-2xl
      border border-gray-700 backdrop-blur-sm
      transition-all duration-500
      ${isCollapsed ? 'md:w-20' : ''}
    `}
    >
      <div className="flex flex-col h-full">
        {/* Header with Collapse Button */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-green-500 rounded-xl shadow-lg">
                <MicrophoneIcon className="text-white text-xl" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  TalksonPod
                </span>
                <p className="text-xs text-gray-400">Premium Podcasts</p>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
          >
            <div className={`w-4 h-4 transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`}>
              ⬅️
            </div>
          </button>
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <UserIcon className="text-white text-lg" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{userData.name}</h3>
                <p className="text-xs text-gray-400">{userData.plays} plays</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: '65%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Level {userData.level}</span>
              <span>65%</span>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex flex-col gap-2 mb-8">
          <Link to="/">
            <SidebarItem
              icon={HomeIcon}
              label="Home"
              isActive={location.pathname === "/"}
            />
          </Link>

          <Link to="/library">
            <SidebarItem
              icon={BookIcon}
              label="Library"
              isActive={location.pathname === "/library"}
              notification={3}
            />
          </Link>

          <Link to="/discover">
            <SidebarItem
              icon={CompassIcon}
              label="Discover"
              isActive={location.pathname === "/discover"}
              isNew={true}
            />
          </Link>
        </div>

        {/* Your Podcasts Section */}
        {!isCollapsed && (
          <div className="space-y-4 mb-8">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 px-3 font-bold">
              Your Podcasts
            </h3>
            <div className="space-y-1 flex flex-col items-start">
              <Link to="/create-playlist">
                <SidebarItem
                  icon={PlusIcon}
                  label="Create Playlist"
                  isActive={location.pathname === "/create-playlist"}
                />
              </Link>
              <Link to="/likedepisodes">
                <SidebarItem 
                  icon={HeartIcon} 
                  label="Liked Episodes" 
                  isActive={location.pathname === "/likedepisodes"}
                  notification={12}
                />
              </Link>
              <Link to="/history">
                <SidebarItem 
                  icon={HistoryIcon} 
                  label="Listening History" 
                  isActive={location.pathname === "/history"}
                />
              </Link>
              <Link to="/stats">
                <SidebarItem 
                  icon={ChartIcon} 
                  label="Listening Stats" 
                  isActive={location.pathname === "/stats"}
                />
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="mt-auto mb-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">24</div>
                <div className="text-xs text-gray-400">Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">156</div>
                <div className="text-xs text-gray-400">Podcasts</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto space-y-2 pt-4 border-t border-gray-700/50">
          <button>
            <SidebarItem 
              icon={CogIcon} 
              label="Settings" 
              isActive={location.pathname === "/settings"}
            />
          </button>
          <button>
            <SidebarItem 
              icon={BellIcon} 
              label="Notifications" 
              notification={5}
            />
          </button>
          <button>
            <SidebarItem icon={SignOutIcon} label="Log Out" />
          </button>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-green-500 rounded-t-2xl"></div>
      <div className="absolute bottom-20 right-4 w-8 h-8 bg-cyan-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 left-4 w-6 h-6 bg-green-500/10 rounded-full blur-xl"></div>
    </div>
  );
};

export default Sidebar;