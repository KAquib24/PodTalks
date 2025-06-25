import React from 'react';
import { useNavigate } from 'react-router-dom';
import podcastData from '../data/podcast.json';
import { FaBook } from 'react-icons/fa';
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
import { FaChevronRight as OriginalFaChevronRight } from 'react-icons/fa';

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
const FaChevronRight: any = OriginalFaChevronRight;

type GenreItem = {
  name: string;
  count: number;
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
    count
  }));

  return (
    <div className='bg-gray-900 rounded-lg px-6 py-6 text-white max-w-[1115px] mr-5 overflow-y-auto'>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Browse Categories</h1>
        <button className="text-sm text-gray-400 hover:underline flex items-center">
          View all <FaChevronRight className="ml-1 text-xs" />
        </button>
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genres.map(({ name, count }) => {
          const Icon = genreIcons[name] || FaBook;
          const IconComponent: any = Icon; 

          return (
            <div
              key={name}
              onClick={() => navigate(`/genre/${encodeURIComponent(name)}`)}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <IconComponent className="text-cyan-400 text-lg" />
                <div>
                  <h3 className="font-medium text-white">{name}</h3>
                  <p className="text-xs text-gray-400">{count} podcasts</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Library;