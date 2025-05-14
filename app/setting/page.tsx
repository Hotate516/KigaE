'use client';

import { useVoice } from '@/contexts/VoiceContext';
import { useRouter } from 'next/navigation';

export default function SettingPage() {
  const { voice, setVoice } = useVoice();
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">音声の設定</h1>

      <div className="flex gap-6 mb-10">
        <button
          onClick={() => setVoice('male')}
          className={`px-6 py-3 rounded-lg ${
            voice === 'male' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          男性ボイス
        </button>

        <button
          onClick={() => setVoice('female')}
          className={`px-6 py-3 rounded-lg ${
            voice === 'female' ? 'bg-pink-600 text-white' : 'bg-gray-300'
          }`}
        >
          女性ボイス
        </button>
      </div>

      {/* ホームに戻るボタン */}
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-150"
      >
        ホームに戻る
      </button>
    </main>
  );
}
