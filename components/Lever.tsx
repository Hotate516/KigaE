'use client';

import { useRef, useState, useEffect } from 'react';

export default function Lever() {
  const audioUp = useRef<HTMLAudioElement | null>(null);
  const audioDown = useRef<HTMLAudioElement | null>(null);

  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);

  // クライアントでのみ Audio を初期化
  useEffect(() => {
    audioUp.current = new Audio('/kigaii.mp3');
    audioDown.current = new Audio('/uun.mp3');
  }, []);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || startY === null) return;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = currentY - startY;
    const clamped = Math.max(-80, Math.min(80, diff));
    setPosition(clamped);
  };

  const handleEnd = () => {
    if (position < -50 && audioUp.current) {
      audioUp.current.play();
    } else if (position > 50 && audioDown.current) {
      audioDown.current.play();
    }

    setDragging(false);
    setStartY(null);
    setTimeout(() => setPosition(0), 100);
  };

  return (
    <div className="w-44 h-72 bg-yellow-700 rounded-b-3xl shadow-inner flex items-center justify-center relative border-4 border-yellow-900">
      <div className="w-2 h-40 bg-black rounded-full z-0 shadow-inner" />

      <div
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        onMouseLeave={handleEnd}
        className="absolute z-10 left-1/2 -translate-x-1/2"
        style={{
          transform: `translateY(${position}px)`,
        }}
      >
        <div className="w-20 h-5 bg-gray-800 rounded-full shadow-lg ring-1 ring-gray-500" />
      </div>
    </div>
  );
}
