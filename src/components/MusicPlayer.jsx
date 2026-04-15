import { useEffect, useRef } from "react";
import { useMusic } from "../hooks/useMusic";

export function MusicPlayer() {
  const audioRef = useRef();

  const {
    duration,
    currentTime,
    setCurrentTime,
    currentTrack,
    formatTime,
    setDuration,
    nextTrack,
    prevTrack,
    isPlaying,
    play,
    pause,
    volume,
    setVolume,
    progressPrecentage,
    toggleMute,
  } = useMusic();

  const handleTimeChange = (event) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(event.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.log(err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, setDuration, setCurrentTime, nextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [currentTrack, setCurrentTime, setDuration]);

  return (
    <div className="music-player">
      <audio ref={audioRef} preload="metadata" src={currentTrack.url}></audio>
      <div className="track-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          value={currentTime}
          min="0"
          max={duration || 0}
          step="0.1"
          className="progress-bar"
          onChange={handleTimeChange}
          style={{ "--progress": `${progressPrecentage}%` }}
          aria-label="Seek track"
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button className="control-btn" onClick={prevTrack} aria-label="Previous track" type="button">
          Prev
        </button>
        <button
          className="control-btn play-btn"
          onClick={() => (isPlaying ? pause() : play())}
          aria-label={isPlaying ? "Pause" : "Play"}
          type="button"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button className="control-btn" onClick={nextTrack} aria-label="Next track" type="button">
          Next
        </button>
      </div>

      <div className="volume-container">
        <button className="volume-icon" onClick={toggleMute} type="button">
          {volume === 0 ? "Unmute" : "Mute"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          className="volume-bar"
          onChange={handleVolumeChange}
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
