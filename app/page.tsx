'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // 共通スタイルを定義（再利用しやすく）
  const buttonBase = `
    px-6 py-3 text-white rounded-lg mb-4
    transition-all duration-150
    shadow-md hover:shadow-lg
    active:scale-95
  `;

  return (
    <main className="
      min-h-screen 
      flex flex-col items-center justify-center 
      bg-gray-100 
      overflow-hidden 
      touch-none
    ">
      <h1 className="text-5xl font-bold mb-10">気がいい</h1>

      {/* スタートボタン */}
      <button
        onClick={() => router.push('/lever')}
        className={`${buttonBase} bg-blue-500 hover:bg-blue-600`}
      >
        スタート
      </button>

      {/* 設定ボタン */}
      <button
        onClick={() => router.push('/setting')}
        className={`${buttonBase} bg-gray-500 hover:bg-gray-600`}
      >
        設定
      </button>

      {/* 遊び方ボタン */}
      <button
        onClick={() => router.push('/howto')}
        className={`${buttonBase} bg-green-500 hover:bg-green-600`}
      >
        遊び方
      </button>
    </main>
  );
}
