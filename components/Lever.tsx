'use client';

import { useEffect, useRef, useState } from 'react';

export default function Lever() {
  const audioUp = useRef<HTMLAudioElement | null>(null);
  const audioDown = useRef<HTMLAudioElement | null>(null);

  const [position, setPosition] = useState(0);
  const [startY, setStartY] = useState<number | null>(null);
  const dragging = useRef(false);

  // Audio 初期化（クライアント限定）
  useEffect(() => {
    audioUp.current = new Audio('/kigaii.mp3');
    audioDown.current = new Audio('/uun.mp3');
  }, []);

  // グローバルなマウス移動／終了リスナー
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current || startY === null) return;
      const diff = e.clientY - startY;
      const clamped = Math.max(-80, Math.min(80, diff));
      setPosition(clamped);
    };

    const handleMouseUp = () => {
      if (position < -50 && audioUp.current) audioUp.current.play();
      else if (position > 50 && audioDown.current) audioDown.current.play();

      dragging.current = false;
      setStartY(null);
      setTimeout(() => setPosition(0), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position, startY]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(y);
    dragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || startY === null) return;
    const diff = e.touches[0].clientY - startY;
    const clamped = Math.max(-80, Math.min(80, diff));
    setPosition(clamped);
  };

  const handleTouchEnd = () => {
    if (position < -50 && audioUp.current) audioUp.current.play();
    else if (position > 50 && audioDown.current) audioDown.current.play();

    dragging.current = false;
    setStartY(null);
    setTimeout(() => setPosition(0), 100);
  };

  return (
    <div className="w-44 h-72 bg-yellow-700 rounded-b-3xl shadow-inner flex items-center justify-center relative border-4 border-yellow-900 touch-none">
      {/* 固定シャフト */}
      <div className="w-2 h-40 bg-black rounded-full z-0 shadow-inner" />

      {/* 可動バー */}
      <div
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="absolute z-10 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{
          transform: `translateY(${position}px)`,
        }}
      >
        <div className="w-20 h-5 bg-gray-800 rounded-full shadow-lg ring-1 ring-gray-500" />
      </div>
    </div>
  );
}
