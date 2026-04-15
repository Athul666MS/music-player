import { useMemo, useState } from "react";
import { MusicContext } from "./MusicContextValue";

const songs = [
  {
    id: 1,
    title: "Ariyathe Ariyathe",
    artist: "P. Jayachandran",
    url: "/songs/Ariyathe Ariyathe.mp3",
    duration: "3:45",
  },
  {
    id: 2,
    title: "Dheema Dheema",
    artist: "Unknown Artist",
    url: "/songs/Dheema dheema.mp3",
    duration: "3:30",
  },
  {
    id: 3,
    title: "Enakke Enakkaa",
    artist: "Unknown Artist",
    url: "/songs/Enakke Enakkaa.mp3",
    duration: "4:10",
  },
  {
    id: 4,
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    url: "/songs/Tum Hi Ho.mp3",
    duration: "4:20",
  },
];

export const MusicProvider = ({ children }) => {
  const allSongs = useMemo(() => songs, []);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [isPlaying, setIsplaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const progressPrecentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handlePlaySong = (song, index) => {
    const songIndex = index ?? allSongs.findIndex((item) => item.id === song.id);

    setCurrentTrackIndex(songIndex >= 0 ? songIndex : 0);
    setCurrentTrack(song);
    setIsplaying(true);
  };

  const formatTime = (time) => {
    if (Number.isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume || 1);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsplaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsplaying(true);
  };

  const play = () => setIsplaying(true);
  const pause = () => setIsplaying(false);

  const createPlaylist = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newPlaylist = {
      id: Date.now(),
      name: trimmedName,
      songs: [],
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId));
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id !== playlistId || playlist.songs.some((item) => item.id === song.id)) {
          return playlist;
        }

        return {
          ...playlist,
          songs: [...playlist.songs, song],
        };
      }),
    );
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: playlist.songs.filter((song) => song.id !== songId) }
          : playlist,
      ),
    );
  };

  return (
    <MusicContext.Provider
      value={{
        formatTime,
        allSongs,
        currentTrack,
        currentTrackIndex,
        handlePlaySong,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume,
        progressPrecentage,
        toggleMute,
        playlists,
        createPlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
