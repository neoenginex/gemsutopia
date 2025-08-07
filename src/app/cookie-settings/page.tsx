import Header from '@/components/Header';

export default function CookieSettings() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold">Cookie Settings</h1>
      </div>
    </div>
  );
}