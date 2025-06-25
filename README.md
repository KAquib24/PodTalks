# 🎙️ TalksOnPod

TalksOnPod is a sleek and powerful podcast website where users can explore, listen to, and manage podcasts from different genres and creators. Featuring smooth playback, personalized playlists, and modern UI inspired by streaming giants — all built with React + TypeScript + Tailwind CSS.

![TalksOnPod Banner](public/assets/Screenshot%202025-06-25%20170728.png)


---

## 🚀 Features

- 🔎 **Discover Podcasts** — Browse expert voices, trending shows, genres, and search episodes
- ▶️ **Seamless Playback** — Responsive footer player with play/pause, skip, volume, seek, and like
- ❤️ **Like Episodes** — Save your favorite episodes to your Liked section
- 📃 **Create Playlists** — Build your own custom playlists from any podcast episode
- 📂 **Library Management** — View and manage your playlists and liked episodes
- 🔊 **Genre & Influencer Filters** — Easily explore content by voice or category
- 📱 **Responsive Design** — Built mobile-first with Tailwind CSS

---

## 🛠️ Tech Stack

| Component          | Responsibility                                    |
| ------------------ | ------------------------------------------------- |
| **Navbar**         | Navigation bar with logo, links, dark mode toggle |
| **Footer**         | Footer with copyright                             |
| **PodcastCard**    | Individual card to show podcast preview           |
| **AudioPlayer**    | Player UI with play, pause, seek                  |
| **Tag**            | Show podcast categories/tags                      |
| **SearchBar**      | Search/filter episodes                            |
| **DarkModeToggle** | Toggle between light/dark themes                  |

---

## ✅ TypeScript Interfaces Example (`types/podcast.d.ts`)

```ts
export interface Episode {
  id: string
  title: string
  description: string
  duration: string
  audioUrl: string
  coverImage: string
  publishedAt: string
  tags: string[]
  guest?: {
    name: string
    avatar: string
    bio: string
  }
}
```

---

## ✅ Example JSON Episode Data (`data/episodes.json`)

```json
[
  {
    "id": "ep01",
    "title": "Building for the Web in 2025",
    "description": "We discuss modern frontend tools with guest Dev X.",
    "duration": "35:10",
    "audioUrl": "/audio/ep01.mp3",
    "coverImage": "/cover.jpg",
    "publishedAt": "2025-06-18",
    "tags": ["Web", "Frontend", "Tech"],
    "guest": {
      "name": "Dev X",
      "avatar": "/assets/guest1.jpg",
      "bio": "A senior engineer working in frontend at XYZ."
    }
  }
]
```

---

## ✅ Basic Component Sample (`PodcastCard.tsx`)

```tsx
import { Episode } from '../types/podcast'

type Props = { episode: Episode }

export default function PodcastCard({ episode }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <img src={episode.coverImage} className="w-full h-40 object-cover rounded-md" />
      <h2 className="mt-2 font-semibold text-lg">{episode.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{episode.description}</p>
    </div>
  )
}
```

---

## ✅ App.tsx Example

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EpisodeDetails from './pages/EpisodeDetails'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episode/:id" element={<EpisodeDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
```

---

## ✅ Tailwind Setup in `index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional custom styles */
body {
  @apply bg-white dark:bg-black text-gray-900 dark:text-white;
}
```

---

## ✅ Final Touches

* 🌓 Add dark mode toggle
* 🎙️ Add responsive `<audio>` tag
* 🚀 Deploy on Vercel or Netlify

---

Would you like me to:

* Generate all files and starter code for you?
* Give you a day-by-day development plan?
* Provide a design mockup or Figma-style layout idea?

Let me know what you’d like next!
