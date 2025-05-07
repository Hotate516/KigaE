'use client';
import { useRef, useState } from 'react';

export default function Lever() {
  const audioUp = useRef(new Audio('/kigaii.mp3'));
  const audioDown = useRef(new Audio('/uun.mp3'));

  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || startY === null) return;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = currentY - startY;

    const clamped = Math.max(-80, Math.min(80, diff)); // ★ 上下幅拡大
    setPosition(clamped);
  };

  const handleEnd = () => {
    if (position < -50) {
      audioUp.current.play();
    } else if (position > 50) {
      audioDown.current.play();
    }

    setDragging(false);
    setStartY(null);
    setTimeout(() => setPosition(0), 100);
  };

  return (
    <div className="w-44 h-72 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-b-3xl shadow-2xl flex items-center justify-center relative border-4 border-yellow-900">
      {/* 固定の黒シャフト */}
      <div className="w-2 h-40 bg-black rounded-full z-0 shadow-inner" />

      {/* 横バーだけが上下に動く */}
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
