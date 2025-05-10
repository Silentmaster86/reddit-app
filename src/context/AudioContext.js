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
  name: "Radio ZET",
  url: "https://zet090-01.cdn.eurozet.pl:8443/zet.aac",
  logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/Radio_ZET_logo.svg",
},
{
  name: "Polskie Radio Trójka",
  url: "https://stream3.polskieradio.pl/program3",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Logo_Tr%C3%B3jka_Polskie_Radio.svg/512px-Logo_Tr%C3%B3jka_Polskie_Radio.svg.png",
},
{
  name: "Radio Eska",
  url: "https://stream3.eskago.pl/1_eska_mp3",
  logo: "https://i.ibb.co/hKXc5cD/eska.png",
},
{
  name: "Radio 357",
  url: "https://stream.rcs.pl/357",
  logo: "https://radio357.pl/favicon/android-chrome-192x192.png",
},
{
  name: "Radio Nowy Świat",
  url: "https://stream.rcs.pl/rns",
  logo: "https://radionowyswiat.pl/assets/img/logo.png",
},

  
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
