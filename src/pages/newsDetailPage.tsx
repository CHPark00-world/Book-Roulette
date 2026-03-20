import { useParams } from 'react-router-dom';
import { newsData } from '../data/newsData';
import Header from '../component/common/header';
import Footer from '../component/common/footer';
import newspaper from '../assets/newspaper.png';

export default function newsDetailPage() {
  const { id } = useParams();
  const news = newsData.find((n) => n.id === Number(id));

  return (
    <div>
      <Header />
      <div className="mt-16 flex flex-col items-center py-10">
        <p className="text-primary text-sm">책장 소식</p>
        <hr className="text-primary my-7 w-50" />
        <h1 className="py-10 text-3xl font-bold opacity-70">{news?.title}</h1>
      </div>
      <img src={news?.image} className="h-150 w-full object-cover" />
      <div className="px-20 py-10">
        <p className="mt-25 leading-8 whitespace-pre-wrap">{news?.content}</p>
      </div>
      <div className="flex items-end justify-between px-20 pt-20">
        <div className="relative h-96 w-1/2 overflow-hidden">
          <div className="absolute -bottom-64 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-[#1a1a5e]" />
          <img
            src={newspaper}
            alt="신문"
            className="absolute bottom-0 left-1/2 z-10 h-80 w-auto -translate-x-1/2 object-cover"
          />
        </div>
        <div className="w-1/2 pb-20">
          <h2 className="mb-8 text-4xl font-bold">
            책장 <span className="text-primary">소식</span>
            <br />
            <span className="text-primary">구독</span> 하기
          </h2>
          <div className="mb-4">
            <p className="text-primary mb-2 text-sm">Phone •</p>
            <div className="flex items-center gap-2">
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                }
                className="border-primary w-20 border-b py-1 text-center focus:outline-none"
              />
              <span>-</span>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                }
                className="border-primary w-24 border-b py-1 text-center focus:outline-none"
              />
              <span>-</span>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                onChange={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                }
                className="border-primary w-24 border-b py-1 text-center focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <p className="text-primary mb-2 text-sm">E-mail •</p>
            <input className="border-primary w-2/3 border-b py-1 focus:outline-none" />
          </div>
          <button className="border-primary text-primary hover:bg-primary cursor-pointer border px-6 py-2 transition hover:text-white">
            구독하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
