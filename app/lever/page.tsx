'use client';
import Lever from '@/components/Lever';
import Link from 'next/link';

export default function LeverPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-8">音声をオンにしてお楽しみください。</h1>
      <h1 className="text-4xl font-bold mb-8">レバーを動かして！</h1>
      <Lever />
      <Link href="/">
        <button className="mt-10 px-6 py-3 bg-gray-400 text-white rounded-lg">
          ホームに戻る
        </button>
      </Link>
    </main>
  );
}
