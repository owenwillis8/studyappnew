
import { useState } from "react";

export default function VolumeSlider({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: (v: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md shadow-lg border border-white/10">
      <span className="text-white text-sm">🔊</span>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        className="
          w-32 h-2 rounded-lg appearance-none cursor-pointer
          bg-gradient-to-r from-purple-500 to-blue-500
        "
      />

      {}
      {isDragging && (
        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]" />
      )}
    </div>
  );
}
