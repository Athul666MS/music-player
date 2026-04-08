import { useState } from 'react';


export const useMusic = () => {




  return {
    formatTime, allSongs,
    currentTrack, currentTrackIndex,
    handlePlaySong, currentTime, setCurrentTime
    , duration, setDuration, nextTrack, prevTrack,play,pause,isPlaying,volume,setVolume,progressPrecentage,
     toggleMute


  };
};