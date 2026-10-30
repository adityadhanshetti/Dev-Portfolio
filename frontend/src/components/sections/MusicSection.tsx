import { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  bpm: number;
  mood: string;
  cover: string;
}

const canopyTracks: Track[] = [
  {
    id: "01",
    title: "Canopy Mist Ambient",
    artist: "Solaris Sanctuary",
    genre: "Organic Drone",
    duration: "4:32",
    bpm: 64,
    mood: "Deep Focus",
    cover: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Resonance ofbasalt",
    artist: "Komorebi Lab",
    genre: "Synthwave Botanical",
    duration: "3:48",
    bpm: 104,
    mood: "Flow State",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Sub-Canopy Frequencies",
    artist: "Vangelis Echoes",
    genre: "Cyber-Organic Noir",
    duration: "5:12",
    bpm: 78,
    mood: "Architecting",
    cover: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Bioluminescent Rain",
    artist: "Tycho Drift",
    genre: "Downtempo Flora",
    duration: "4:15",
    bpm: 92,
    mood: "Night Coding",
    cover: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=600&auto=format&fit=crop",
  },
];

/**
 * MusicSection — Dedicated sonic sanctuary for the landing page.
 * Features an interactive player, live visualizer waveforms,
 * rotating biome vinyl, and focus frequency tracks.
 */
export function MusicSection() {
  const [currentTrack, setCurrentTrack] = useState<Track>(canopyTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Section id="music" chapter="05" eyebrow="05 // SONIC DECK" className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <span className="font-mono text-label text-[#ed4a1c] uppercase tracking-widest block mb-3">
            05 // SONIC DECK
          </span>
          <h2
            className="font-display font-black tracking-tighter uppercase text-[#05080c]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Soundscapes I Build To
          </h2>
        </div>
        <p className="text-[#5b5b5b] max-w-md font-body leading-relaxed text-sm">
          Music shapes neural rhythm. These selected frequencies maintain high
          flow state during deep algorithmic design and systems development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive Player Deck */}
        <div className="lg:col-span-7 rounded-2xl border border-black/8 bg-white shadow-xs p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-line">
              <div className="flex items-center gap-3">
                <span
                  className={`w-1.5 h-1.5 ${
                    isPlaying ? "bg-accent" : "bg-text-faint"
                  }`}
                />
                <span className="font-mono text-label text-accent uppercase tracking-wider">
                  {isPlaying ? "PLAYING STREAM" : "DECK READY"}
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-faint">
                {currentTrack.bpm} BPM // {currentTrack.mood}
              </span>
            </div>

            {/* Now Playing Details */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
              {/* Album art with rotating vinyl animation */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-accent/40 shadow-lg shrink-0">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover select-none ${
                    isPlaying ? "animate-[spin_10s_linear_infinite]" : ""
                  }`}
                />
                <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-bg border-2 border-accent" />
              </div>

              <div className="text-center sm:text-left flex-1">
                <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-1">
                  CURRENT SELECTION
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-text">
                  {currentTrack.title}
                </h3>
                <p className="text-text-muted text-sm mt-1">
                  {currentTrack.artist} ·{" "}
                  <span className="text-text-faint font-mono">{currentTrack.genre}</span>
                </p>

                {/* Simulated Audio Waveform Visualizer */}
                <div className="flex items-end justify-center sm:justify-start gap-1 h-8 mt-5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1 bg-accent/70 transition-all duration-300"
                      style={{
                        height: isPlaying
                          ? `${Math.max(15, Math.sin(i * 0.7 + progress) * 100)}%`
                          : "18%",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Player Controls */}
          <div className="mt-8 pt-6 border-t border-line">
            {/* Progress line */}
            <div className="flex items-center justify-between font-mono text-[10px] text-text-faint mb-2">
              <span>01:14</span>
              <span>{currentTrack.duration}</span>
            </div>
            <div className="h-1 w-full bg-surface-2 overflow-hidden cursor-pointer">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="font-mono text-label text-text-faint">
                HI-RES FLAC · 48KHZ / 24-BIT
              </span>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2 font-mono text-label bg-accent text-accent-ink font-semibold hover:bg-accent/90 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isPlaying ? "❚❚ PAUSE" : "▶ PLAY STREAM"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interactive Playlist Deck */}
        <div className="lg:col-span-5 rounded-2xl border border-black/8 bg-white shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-line">
              <span className="font-mono text-label text-text-faint">
                CURATED BIOME ARCHIVE
              </span>
              <span className="font-mono text-[10px] text-accent">
                {canopyTracks.length} PRESETS
              </span>
            </div>

            <div className="space-y-2 mt-4">
              {canopyTracks.map((track) => {
                const isSelected = currentTrack.id === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      setCurrentTrack(track);
                      setIsPlaying(true);
                    }}
                    className={`w-full p-3.5 rounded-lg text-left transition-all flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? "bg-accent/10 border-accent/60 text-text"
                        : "bg-surface-1/60 border-line hover:border-line-strong text-text-muted hover:text-text"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-text-faint w-5">
                        {track.id}
                      </span>
                      <div>
                        <div className="font-display text-sm font-medium">
                          {track.title}
                        </div>
                        <div className="text-[11px] text-text-faint">
                          {track.artist}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono text-[11px]">
                      <span className={isSelected ? "text-accent" : "text-text-faint"}>
                        {track.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-line text-center">
            <span className="font-mono text-[11px] text-text-faint">
              Direct Spotify & Lossless Stems available in /me Control Room
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

