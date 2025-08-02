"use client";

import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  className?: string;
  gridSize?: number;
  fadeFactor?: number;
}

export function BackgroundGrid({ 
  className, 
  gridSize = 50,
  fadeFactor = 0.5 
}: BackgroundGridProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full opacity-20",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, ${fadeFactor * 0.1}) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, ${fadeFactor * 0.1}) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    />
  );
}

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 w-full h-full", className)}>
      {/* Animated beams */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${200 + Math.random() * 300}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `fadeInOut ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}