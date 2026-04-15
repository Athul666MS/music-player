import { useMusic } from "../hooks/useMusic";

export const AllSongs = () => {
  const { allSongs, handlePlaySong, currentTrackIndex, isPlaying } = useMusic();

  return (
    <div className="all-songs">
      <h2>All Songs ({allSongs.length})</h2>
      <div className="songs-grid">
        {allSongs.map((song, index) => (
          <button
            key={song.id}
            className={`song-card ${currentTrackIndex === index ? "active" : ""}`}
            onClick={() => handlePlaySong(song, index)}
            type="button"
          >
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-artist">{song.artist}</p>
              <span className="song-duration">{song.duration}</span>
            </div>
            <span className="play-button">
              {currentTrackIndex === index && isPlaying ? "Now playing" : "Play"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
