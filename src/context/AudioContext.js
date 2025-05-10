// src/context/AudioContext.js
import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const stations = [
  {
    name: "Capital Dance",
    url: "https://media-ice.musicradio.com/CapitalDance",
    logo: "https://kuasark.com/files/stations-logos/capital-dance.png",
  },
  {
    name: "Capital FM",
    url: "https://media-ice.musicradio.com/CapitalMP3",
    logo: "https://seeklogo.com/images/C/capital-fm-logo-B71E94AD3E-seeklogo.com.png",
  },
  {
    name: "Heart UK",
    url: "https://media-ice.musicradio.com/HeartUK",
    logo: "https://p1mediagroup.com/wp-content/uploads/2016/11/Heart259x259.png",
  },
  {
    name: "RADIOx 90s",
    url: "https://media-ice.musicradio.com/RadioX90s",
    logo: "https://radiotoday.co.uk/wp-content/uploads/2025/02/radiox90s.jpg",
  },
{
  name: "RMF FM",
  url: "https://195.150.20.244/rmf_fm",
  logo: "https://i.ibb.co/PWRKNLz/rmf-logo.png",
},
{
  name: "Radio Eska",
  url: "https://ic1.smcdn.pl/2330-1.mp3",
  logo: "https://streamurl.link/images/broadcasts/701188e.webp",
},
  {
  name: "RMF MAXX",
  url: "http://195.150.20.7/rmf_maxxx",
  logo: "https://streamurl.link/images/broadcasts/a977cab.webp",
},
  {
    name: "KISS FM",
    url: "https://edge-bauerall-01-gos2.sharp-stream.com/kissnational.aac",
    logo: "https://media.bauerradio.com/image/upload/c_crop,g_custom/v1730224745/brand_manager/stations/gu7xhzpsjio7ga82trp2.png",
  },
  {
    name: "BBC Radio 1",
    url: "https://a.files.bbci.co.uk/ms6/live/3441A116-B12E-4D2F-ACA8-C1984642FA4B/audio/simulcast/dash/nonuk/pc_hd_abr_v2/cfs/bbc_radio_one.mpd",
    logo: "https://i.pinimg.com/736x/e9/2f/91/e92f916125a9f0d9494e4590349852ce.jpg",
  },
  {
    name: "PRL",
    url: "https://stream.rcs.revma.com/prfmwmwy768uv",
    logo: "https://media.info/l/f/7/771.1428765955.png",
  },
  {
    name: "Radio Bielsko",
    url: "https://stream.rcs.revma.com/062uq3z3kwzuv",
    logo: "https://www.radiobielsko.pl/player/assets/image/rb.png",
  }
];

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio(stations[0].url));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentStation, setCurrentStation] = useState(stations[0]);

  // ✅ Sync play/pause state with audio element
  useEffect(() => {
    const audio = audioRef.current;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // ✅ Set initial volume & auto-play on click
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const autoPlayHandler = () => {
      if (!isPlaying) {
        audio.play().catch(console.warn);
      }
      window.removeEventListener("click", autoPlayHandler);
    };

    window.addEventListener("click", autoPlayHandler);
    return () => window.removeEventListener("click", autoPlayHandler);
  }, [isPlaying, volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (err) {
      console.warn("Playback error:", err);
    }
  };

  const changeStation = (station) => {
    const audio = audioRef.current;
    audio.pause();
    audio.src = station.url;
    setCurrentStation(station);
    audio.load();
    audio.play().catch(console.warn);
  };

    const [isMuted, setIsMuted] = useState(false);
    
    
  const toggleMute = () => {
    const audio = audioRef.current;
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
  };

  const setAudioVolume = (v) => {
    const audio = audioRef.current;
    audio.volume = v;
    setVolume(v);
  };

  return (
    <AudioContext.Provider
      value={{
        stations,
        currentStation,
        isPlaying,
        volume,
        togglePlay,
        changeStation,
        toggleMute,
        setVolume: setAudioVolume,
        isMuted,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
