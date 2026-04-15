import { useMemo, useState } from "react";
import { useMusic } from "../hooks/useMusic";

export function Playlists() {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    allSongs,
    playlists,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    handlePlaySong,
    currentTrack,
    isPlaying,
  } = useMusic();

  const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedPlaylistId);
  const availableSongs = useMemo(() => {
    const selectedSongIds = new Set(selectedPlaylist?.songs.map((song) => song.id) ?? []);
    const query = searchQuery.trim().toLowerCase();

    return allSongs.filter((song) => {
      const matchesQuery =
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query);

      return !selectedSongIds.has(song.id) && (!query || matchesQuery);
    });
  }, [allSongs, searchQuery, selectedPlaylist]);

  const handleCreatePlaylist = (event) => {
    event.preventDefault();
    createPlaylist(newPlaylistName);
    setNewPlaylistName("");
  };

  const handleAddSong = (playlistId, song) => {
    addSongToPlaylist(playlistId, song);
    setSearchQuery("");
  };

  return (
    <div className="create-playlist">
      <div className="section-heading">
        <h2>Playlists</h2>
        <p>Build your own collections from the songs in this player.</p>
      </div>

      <form className="playlist-form" onSubmit={handleCreatePlaylist}>
        <input
          type="text"
          placeholder="Playlist name"
          className="playlist-input"
          value={newPlaylistName}
          onChange={(event) => setNewPlaylistName(event.target.value)}
        />
        <button className="create-btn" type="submit">
          Create
        </button>
      </form>

      <div className="playlist-list">
        {playlists.length === 0 ? (
          <p className="empty-message">No playlists yet. Create one to start adding songs.</p>
        ) : (
          playlists.map((playlist) => {
            const isSelected = selectedPlaylistId === playlist.id;

            return (
              <article className="playlist-item" key={playlist.id}>
                <div className="playlist-header">
                  <div>
                    <h3 className="playlist-name">{playlist.name}</h3>
                    <p className="playlist-count">
                      {playlist.songs.length} {playlist.songs.length === 1 ? "song" : "songs"}
                    </p>
                  </div>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => deletePlaylist(playlist.id)}
                  >
                    Delete
                  </button>
                </div>

                <div className="add-songs-search">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search songs to add"
                    value={isSelected ? searchQuery : ""}
                    onChange={(event) => {
                      setSelectedPlaylistId(playlist.id);
                      setSearchQuery(event.target.value);
                    }}
                    onFocus={() => setSelectedPlaylistId(playlist.id)}
                  />
                </div>

                {isSelected && (
                  <div className="search-results">
                    {availableSongs.length === 0 ? (
                      <p className="empty-message small">No matching songs available.</p>
                    ) : (
                      availableSongs.map((song) => (
                        <button
                          className="search-result"
                          key={song.id}
                          type="button"
                          onClick={() => handleAddSong(playlist.id, song)}
                        >
                          <span>{song.title}</span>
                          <small>{song.artist}</small>
                        </button>
                      ))
                    )}
                  </div>
                )}

                <div className="songs-container">
                  {playlist.songs.length === 0 ? (
                    <p className="empty-message small">This playlist is empty.</p>
                  ) : (
                    playlist.songs.map((song) => (
                      <div className="song-in-playlist" key={song.id}>
                        <button
                          className={`playlist-song-button ${
                            currentTrack.id === song.id && isPlaying ? "active" : ""
                          }`}
                          type="button"
                          onClick={() => handlePlaySong(song)}
                        >
                          <span className="song-in-playlist-title">{song.title}</span>
                          <span className="song-in-playlist-artist">{song.artist}</span>
                        </button>
                        <span className="song-in-playlist-duration">{song.duration}</span>
                        <button
                          className="remove-song-btn"
                          type="button"
                          onClick={() => removeSongFromPlaylist(playlist.id, song.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
