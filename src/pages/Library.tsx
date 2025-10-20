import React from 'react';
import { useNavigate } from 'react-router-dom';
import podcastData from '../data/podcast.json';
import { FaBook, FaChevronRight } from 'react-icons/fa';
import { IconType } from 'react-icons';

// Import all icons with type casting
import { FaPalette as OriginalFaPalette } from 'react-icons/fa';
import { FaBriefcase as OriginalFaBriefcase } from 'react-icons/fa';
import { FaLaugh as OriginalFaLaugh } from 'react-icons/fa';
import { FaGraduationCap as OriginalFaGraduationCap } from 'react-icons/fa';
import { FaLandmark as OriginalFaLandmark } from 'react-icons/fa';
import { FaHeartbeat as OriginalFaHeartbeat } from 'react-icons/fa';
import { FaHistory as OriginalFaHistory } from 'react-icons/fa';
import { FaChild as OriginalFaChild } from 'react-icons/fa';
import { FaCocktail as OriginalFaCocktail } from 'react-icons/fa';
import { FaMusic as OriginalFaMusic } from 'react-icons/fa';
import { FaNewspaper as OriginalFaNewspaper } from 'react-icons/fa';
import { FaChurch as OriginalFaChurch } from 'react-icons/fa';
import { FaFlask as OriginalFaFlask } from 'react-icons/fa';
import { FaFootballBall as OriginalFaFootballBall } from 'react-icons/fa';
import { FaLaptop as OriginalFaLaptop } from 'react-icons/fa';

const FaPalette: any = OriginalFaPalette;
const FaBriefcase: any = OriginalFaBriefcase;
const FaLaugh: any = OriginalFaLaugh;
const FaGraduationCap: any = OriginalFaGraduationCap;
const FaLandmark: any = OriginalFaLandmark;
const FaHeartbeat: any = OriginalFaHeartbeat;
const FaHistory: any = OriginalFaHistory;
const FaChild: any = OriginalFaChild;
const FaCocktail: any = OriginalFaCocktail;
const FaMusic: any = OriginalFaMusic;
const FaNewspaper: any = OriginalFaNewspaper;
const FaChurch: any = OriginalFaChurch;
const FaFlask: any = OriginalFaFlask;
const FaFootballBall: any = OriginalFaFootballBall;
const FaLaptop: any = OriginalFaLaptop;
const FaChevronRightIcon: any = FaChevronRight;

type GenreItem = {
  name: string;
  count: number;
  color: string;
  gradient: string;
};

const genreData: Record<string, Omit<GenreItem, 'name' | 'count'>> = {
  "Arts": { 
    color: "text-pink-400", 
    gradient: "from-pink-500 to-rose-500" 
  },
  "Business": { 
    color: "text-green-400", 
    gradient: "from-green-500 to-emerald-500" 
  },
  "Comedy": { 
    color: "text-yellow-400", 
    gradient: "from-yellow-500 to-orange-500" 
  },
  "Education": { 
    color: "text-purple-400", 
    gradient: "from-purple-500 to-indigo-500" 
  },
  "Fiction": { 
    color: "text-blue-400", 
    gradient: "from-blue-500 to-cyan-500" 
  },
  "Government": { 
    color: "text-gray-400", 
    gradient: "from-gray-500 to-slate-500" 
  },
  "Health & Fitness": { 
    color: "text-red-400", 
    gradient: "from-red-500 to-pink-500" 
  },
  "History": { 
    color: "text-amber-400", 
    gradient: "from-amber-500 to-orange-500" 
  },
  "Kids & Family": { 
    color: "text-cyan-400", 
    gradient: "from-cyan-500 to-blue-500" 
  },
  "Leisure": { 
    color: "text-lime-400", 
    gradient: "from-lime-500 to-green-500" 
  },
  "Music": { 
    color: "text-violet-400", 
    gradient: "from-violet-500 to-purple-500" 
  },
  "News": { 
    color: "text-sky-400", 
    gradient: "from-sky-500 to-blue-500" 
  },
  "Religion & Spirituality": { 
    color: "text-indigo-400", 
    gradient: "from-indigo-500 to-purple-500" 
  },
  "Science": { 
    color: "text-teal-400", 
    gradient: "from-teal-500 to-cyan-500" 
  },
  "Sports": { 
    color: "text-orange-400", 
    gradient: "from-orange-500 to-red-500" 
  },
  "Technology": { 
    color: "text-cyan-400", 
    gradient: "from-cyan-500 to-green-500" 
  }
};

const genreIcons: Record<string, IconType> = {
  "Arts": FaPalette,
  "Business": FaBriefcase,
  "Comedy": FaLaugh,
  "Education": FaGraduationCap,
  "Fiction": FaBook,
  "Government": FaLandmark,
  "Health & Fitness": FaHeartbeat,
  "History": FaHistory,
  "Kids & Family": FaChild,
  "Leisure": FaCocktail,
  "Music": FaMusic,
  "News": FaNewspaper,
  "Religion & Spirituality": FaChurch,
  "Science": FaFlask,
  "Sports": FaFootballBall,
  "Technology": FaLaptop
};

const Library: React.FC = () => {
  const navigate = useNavigate();

  // Count podcasts per genre
  const genreCountMap: Record<string, number> = {};
  podcastData.forEach(podcast => {
    const genre = podcast.genre;
    genreCountMap[genre] = (genreCountMap[genre] || 0) + 1;
  });

  const genres: GenreItem[] = Object.entries(genreCountMap).map(([name, count]) => ({
    name,
    count,
    ...genreData[name]
  }));

  const totalPodcasts = podcastData.length;
  const totalGenres = genres.length;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-4">
              Browse Categories
            </h1>
            <p className="text-xl text-gray-400">
              Explore {totalPodcasts} podcasts across {totalGenres} genres
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{totalPodcasts}</div>
              <div className="text-sm text-gray-400">Total Podcasts</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400">{totalGenres}</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
          </div>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {genres.map(({ name, count, color, gradient }) => {
            const Icon = genreIcons[name] || FaBook;
            const IconComponent: any = Icon;

            return (
              <div
                key={name}
                onClick={() => navigate(`/genre/${encodeURIComponent(name)}`)}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-500 border border-gray-700 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
                      <IconComponent className="text-white text-xl" />
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">
                      <span className="text-sm">{count}</span>
                      <FaChevronRightIcon className="text-xs transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {count} podcast{count !== 1 ? 's' : ''}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Collection</span>
                      <span>{Math.round((count / totalPodcasts) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full bg-gradient-to-r ${gradient}`}
                        style={{ width: `${Math.max(10, (count / totalPodcasts) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-[2px] bg-gray-900 rounded-2xl"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">{totalPodcasts}</div>
              <div className="text-gray-400">Total Episodes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{totalGenres}</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {new Set(podcastData.map(p => p.publisher)).size}
              </div>
              <div className="text-gray-400">Publishers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;