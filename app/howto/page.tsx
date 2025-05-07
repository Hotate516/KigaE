'use client';

export default function HowToPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">遊び方</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center">
        レバーを上に引くと「気がいい！」、下に引くと「うーん...」の音が鳴ります。<br />
        スタート画面からゲームを始めてください。
      </p>
    </main>
  );
}
