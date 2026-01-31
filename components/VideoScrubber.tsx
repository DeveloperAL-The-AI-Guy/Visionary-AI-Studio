import React, { useState, useRef, useCallback } from 'react';
import { Play, Activity } from 'lucide-react';
import { VideoSample } from '../types';

interface VideoScrubberProps {
  data: VideoSample;
}

const VideoScrubber: React.FC<VideoScrubberProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrubPercent, setScrubPercent] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      // Clamp between 0 and 100
      const percent = Math.min(Math.max((x / width) * 100, 0), 100);
      setScrubPercent(percent);
    }
  }, []);

  // Calculate visual feedback based on scrub percentage
  // We simulate a frame "hue" shift similar to the original design
  const hue = Math.floor((scrubPercent / 100) * 360);
  const frameNumber = Math.floor((scrubPercent / 100) * 240); // Simulate 240 frames

  return (
    <div className="bg-glass border border-glassBorder backdrop-blur-md rounded-2xl p-4 transition-all duration-300 hover:border-white/40 group">
      
      {/* Scrubber Area */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setScrubPercent(0);
        }}
        className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-crosshair"
      >
        {/* Placeholder for actual video - using a gradient pattern here */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/600/400?grayscale')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-300 mix-blend-luminosity" />
        
        {/* Scrub Interaction Layer */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-colors duration-100"
          style={{
            backgroundColor: isHovering ? `hsla(${hue}, 50%, 20%, 0.8)` : 'rgba(31, 41, 55, 0.4)'
          }}
        >
          {isHovering ? (
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-white mb-1">
                {String(frameNumber).padStart(3, '0')}
              </div>
              <div className="text-xs font-mono text-white/70 tracking-widest">
                SCRUBBING
              </div>
            </div>
          ) : (
             <div className="flex flex-col items-center text-white/30">
                <Play className="w-8 h-8 mb-2" />
                <span className="text-xs tracking-widest font-mono">HOVER TO SCRUB</span>
             </div>
          )}
        </div>

        {/* Timeline Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
           <div 
             className="h-full bg-blue-500 transition-all duration-75 ease-linear"
             style={{ width: `${scrubPercent}%`, opacity: isHovering ? 1 : 0 }}
           />
        </div>
      </div>

      {/* Meta Data */}
      <div className="flex justify-between items-end mt-5 px-1">
        <div>
          <h3 className="text-sm font-bold tracking-widest text-white uppercase mb-1">{data.title}</h3>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Activity size={12} />
            <span>{data.engine}</span>
          </div>
        </div>
        <div className="text-xs font-mono text-white/30 border border-white/10 px-2 py-1 rounded">
          {data.duration}
        </div>
      </div>
    </div>
  );
};

export default VideoScrubber;