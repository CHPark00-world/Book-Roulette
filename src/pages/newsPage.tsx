import Header from '../component/common/header';
import Library from '../assets/library.jpg';
import { newsData } from '../data/newsData';
import { Link } from 'react-router-dom';

export default function newsPage() {
  return (
    <div>
      <Header />
      <div className="relative mt-16 h-60 w-full overflow-hidden">
        <img
          src={Library}
          className="h-full w-full object-cover"
          alt="도서관 이미지"
        />
        <div className="absolute inset-0 flex flex-col items-end justify-end bg-black/40 px-12 pb-8">
          <p className="mb-1 text-base text-white">
            책장에서 최근 서적 관련 소식을 받아보세요
          </p>
          <h1 className="text-3xl font-bold text-white">책장 소식</h1>
        </div>
      </div>
      <div className="px-15 py-10">
        <h2 className="text-primary text-xl font-bold">
          Weekly <strong>책장 소식</strong>
        </h2>
        <hr className="text-primary my-4" />
        <div className="columns-3 gap-6">
          {newsData.map((news) => (
            <Link to={`/news/${news.id}`} key={news.id}>
              <div className="mb-6 break-inside-avoid">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full object-cover"
                />
                <h3 className="text-primary mt-3">{news.title}</h3>
                <p className="mt-1 text-base text-black/60">
                  {news.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
