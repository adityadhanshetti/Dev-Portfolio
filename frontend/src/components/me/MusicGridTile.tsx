import { useState } from "react";

interface Track {
  title: string;
  artist: string;
  genre: string;
  bpm: number;
}

const codingTracks: Track[] = [
  { title: "Solaris Ambient", artist: "Cliff Martinez", genre: "Atmospheric", bpm: 72 },
  { title: "Resonance", artist: "HOME", genre: "Synthwave", bpm: 105 },
  { title: "Blade Runner Blues", artist: "Vangelis", genre: "Cyberpunk Noir", bpm: 60 },
  { title: "Everything in Its Right Place", artist: "Radiohead", genre: "Art Rock", bpm: 124 },
];

export function MusicGridTile() {
  const [activeTrack, setActiveTrack] = useState<Track>(codingTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="col-span-4 md:col-span-3 lg:col-span-6 bg-surface-1 border border-line rounded-md p-6 md:p-8 min-h-[220px] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="eyebrow block">02 // AUDIO RADAR</span>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-1.5 h-1.5 ${
                isPlaying ? "bg-accent" : "bg-text-faint"
              }`}
            />
            <span className="font-mono text-[10px] text-text-muted">
              {isPlaying ? "ACTIVE STREAM" : "STANDBY"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {codingTracks.map((t) => (
            <button
              key={t.title}
              onClick={() => {
                setActiveTrack(t);
                setIsPlaying(true);
              }}
              className={`p-2.5 rounded text-left border transition-all text-xs font-mono cursor-pointer ${
                activeTrack.title === t.title
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-line bg-surface-2 text-text-muted hover:border-line-strong"
              }`}
            >
              <div className="font-semibold truncate">{t.title}</div>
              <div className="text-[10px] text-text-faint truncate">{t.artist}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-line/60 flex items-center justify-between text-text-faint font-mono text-xs">
        <span className="truncate">SELECTED: {activeTrack.title}</span>
        <span className="text-accent">{activeTrack.bpm} BPM</span>
      </div>
    </div>
  );
}

