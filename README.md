# Music Player

A React music player built with Vite. The app plays local MP3 files, shows an all-songs library, and lets users create custom playlists from the available songs.

## Features

- Browse all available songs
- Play, pause, skip next, and skip previous tracks
- Seek through the current track with a progress bar
- Adjust volume and mute/unmute playback
- Create and delete playlists
- Search songs while adding them to playlists
- Add songs to playlists without duplicates
- Remove songs from playlists
- Play songs directly from playlist views
- Responsive layout for desktop, tablet, and mobile screens

## Tech Stack

- React
- Vite
- React Router
- CSS

## Project Structure

```text
myapp/
  public/
    songs/              Local MP3 files used by the player
  src/
    components/         UI components
      AllSongs.jsx
      MusicPlayer.jsx
      Navbar.jsx
      Playlists.jsx
    contexts/           Music player state provider
      MusicContext.jsx
      MusicContextValue.js
    hooks/
      useMusic.js
    App.jsx
    App.css
    main.jsx
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

On Windows PowerShell, if `npm` is blocked by script execution policy, run:

```powershell
npm.cmd run dev
```

Then open the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

## Available Scripts

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Adding More Songs

1. Add the MP3 file to:

```text
public/songs/
```

2. Add the song details to the `songs` array in:

```text
src/contexts/MusicContext.jsx
```

Example:

```jsx
{
  id: 5,
  title: "Song Title",
  artist: "Artist Name",
  url: "/songs/Song File.mp3",
  duration: "3:45",
}
```

Make sure the `url` matches the exact file name inside `public/songs`.

## Notes

Playlists are stored in React state, so they reset when the page is refreshed. To make playlists permanent, the next improvement would be saving them in `localStorage` or connecting the app to a backend.
