import { createContext,useContext } from "react";


const MusicContext = createContext()


const songs = [
  {
    id: 1,
    title: "aariyathe aariyathe",
    artist: "p. jayachandran",
    url: "/songs/Ariyathe Ariyathe.mp3",
    duration: "3:45"
  },
  {
    id: 2,
    title: "dheema dheema",
    artist: "unknown",
    url: "/songs/Dheema deema.mp3",
    duration: "3:30"
  },
  {
    id: 3,
    title: "enakke enakkaa",
    artist: "unknown",
    url: "/songs/Enakke Enakkaa.mp3",
    duration: "4:10"
  },
  {
    id: 4,
    title: "tum hi ho",
    artist: "arijit singh",
    url: "/songs/Tum Hi Ho.mp3",
    duration: "4:20"
  }
];

export const MusicProvider = ({childern})=>{
      const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setcurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0)
  const [   duration, setDuration] = useState(0)
  const [volume,setVolume]=useState(1)
  const [prevVolume, setPrevVolume] = useState(1)
  const progressPrecentage=duration>0?(currentTime/duration)*100:0

  const [isPlaying, setIsplaying] = useState(false)
  const handlePlaySong = (song, index) => {
    setCurrentTrackIndex(index)
    setcurrentTrack(song)

  }

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`

  }
  const toggleMute = () => {
  if (volume > 0) {
    setPrevVolume(volume)
    setVolume(0)
  } else {
    setVolume(prevVolume)
  }
}

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextindex = (prev + 1) % allSongs.length
      setcurrentTrack(allSongs[nextindex])
      return nextindex
    })
    setIsplaying(false)
  }
  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextindex = prev === 0 ? allSongs.length - 1 : prev - 1
      setcurrentTrack(allSongs[nextindex])
      return nextindex
    })
      setIsplaying(false)
  }

  const play = () => setIsplaying(true)

  const pause = () => setIsplaying(false)
    return <MusicContext.Provider>{childern}</MusicContext.Provider>
}




const useMusic = () => {
  const contextvalue = useContext(MusicContext)

  if (!contextvalue) {
    throw new Error("Must use inside provider of Music Provider")
  }

  return contextvalue
}