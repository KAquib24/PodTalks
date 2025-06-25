import { Link, useLocation } from "react-router-dom";
import React from "react";
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
} from "react-icons/fa";

// Type definition for icons
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Interface for SidebarItem props
interface SidebarItemProps {
  icon: IconType;
  label: string;
  isActive?: boolean;
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

const SidebarItem = ({
  icon: Icon,
  label,
  isActive = false,
}: SidebarItemProps) => (
  <div
    className={`
    flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all
    ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }
  `}
  >
    <Icon className="text-xl" />
    <span className="font-medium">{label}</span>
  </div>
);

const Sidebar = () => {
  const location = useLocation();
  return (
    <div
      className="
      hidden md:flex md:flex-col
      min-w-80 md:w-64 lg:w-72 min-h-screen rounded-lg p-6
      bg-gray-900 text-white 
      overflow-y-auto mt-4 ml-4 mb-4 max-h-[900px]
    "
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <MicrophoneIcon className="text-green-500 text-2xl" />
          <span className="text-xl font-bold tracking-tight">TalksonPod</span>
        </div>

        {/* Main Navigation - Column Layout */}
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
            />
          </Link>
        </div>

        {/* Your Podcasts */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 px-3">
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
              <SidebarItem icon={HeartIcon} label="Liked Episodes" isActive={location.pathname === "/likedepisodes"}/>
            </Link>
            <Link to="/history">
              <SidebarItem icon={HistoryIcon} label="Listening History" isActive={location.pathname === "/history"}/>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto space-y-1 pt-4 border-t border-gray-800">
          <button>
            <SidebarItem icon={CogIcon} label="Settings" />
          </button>
          <button>
            <SidebarItem icon={SignOutIcon} label="Log Out" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
