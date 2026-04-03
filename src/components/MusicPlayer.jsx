import React, { useEffect } from 'react'
import { useMusic } from '../hooks/useMusic'
import { useRef } from 'react'
export function MusicPlayer() {

const audioRef=useRef()

  const { 
    duration,
     currentTime,
      setCurrentTime,
       currentTrack, 
       formatTime,
       setDuration ,
       nextTrack,
       prevTrack,
       isPlaying,
       play,
       pause
      
      
      
      
      } = useMusic()

      const handletimeChange= (e)=>{
        
              const audio=audioRef.current
    if(!audio) return;
    const newTime= parseFloat(e.target.value)
    audio.currentTime=newTime
    setCurrentTime(newTime)

      }
 

useEffect(()=>{
      const audio=audioRef.current
    if(!audio) return;

  audio.load()
    if(isPlaying){
      audio.play().catch((err)=>console.log(err))
    }else{
      audio.pause( )

    }
  
},[isPlaying])

  useEffect(()=>{

    const audio=audioRef.current
    if(!audio) return;

    const handleLoadedMetadata = ()=>{
        setDuration(audio.duration)

    }
      const handleTimeUpdate = ()=>{
        setCurrentTime(audio.currentTime)
      
    }
      const handleEnded = ()=>{
      
        nextTrack()
    }

    audio.addEventListener("loadedmetadata",handleLoadedMetadata)
      audio.addEventListener("timeupdate",handleTimeUpdate)
            audio.addEventListener("ended",handleEnded)


    return  () =>{
      audio.removeEventListener("loadedmetadata",handleLoadedMetadata) 
          audio.removeEventListener("timeupdate",handleTimeUpdate)
           audio.removeEventListener("ended",handleEnded)
    }

  },[currentTrack,setDuration,setCurrentTime])
  return (
    <div className="music-player">
      <audio ref={audioRef} preload='metadata' crossOrigin='anonymous' src={currentTrack.url}></audio>
      <div className="track-info">
        <h3 className='track-title'>{currentTrack.title}</h3>
        <p className="tarck-artist">{currentTrack.artist}</p>
      </div>
      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input type="range" 
        value={currentTime}
         min="0" 
        max={duration || 0} 
        step="0.1"
         className='progress-bar'
        //  onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
        onChange={handletimeChange}
        //  style={}
         />
        <span className="time">{formatTime(duration)}</span>
      </div>
      <div className="controls">
        <button className="control-btn" onClick={prevTrack}> ⏮</button>
         <button className="control-btn play-btn" onClick={()=> isPlaying?pause():play()}>      {isPlaying ? "⏸" : "▶"} </button>
          <button className="control-btn" onClick={nextTrack}>  ⏭</button>
      </div>
    </div>
  )
}
