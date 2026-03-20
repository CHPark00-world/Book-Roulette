import Library from '../assets/library.jpg';
import { useNavigate } from 'react-router-dom';

export default function heroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[80vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Library})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">
          나에게 맞는 책, AI가 찾아드려요
        </h1>
        <p className="text-base opacity-80 md:text-lg">
          취향에 맞는 책을 AI와 함께 스무고개로 찾아보세요
        </p>
        <button
          onClick={() => navigate('/chat')}
          className="bg-primary mt-4 cursor-pointer rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-80"
        >
          AI와 함께 책 찾기 →
        </button>
      </div>
    </section>
  );
}
