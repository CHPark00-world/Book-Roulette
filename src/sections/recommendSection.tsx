import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import type { Book } from '../types/book';
import { ArrowRight } from 'lucide-react';

interface Props {
  books: Book[];
}

export default function recommendSection({ books }: Props) {
  const featuredBook = books[2];

  return (
    <main
      className="bg-primary pt-48 pb-32 text-center text-white"
      style={{
        clipPath: 'polygon(0 0, 50% 0, 50% 10%, 100% 10%, 100% 100%, 0 100%)',
      }}
    >
      <div className="">
        <p className="mb-4 animate-[fadeInUp_1.8s_ease_forwards] text-sm">
          금주의 <strong>추천 도서</strong>를 확인해 보세요.
        </p>
        <h2 className="animate-[fadeInUp_1.8s_ease_forwards] text-5xl font-bold">
          추천 책장
        </h2>
        {featuredBook && (
          <div className="flex justify-between px-20 py-16">
            <div className="w-1/2 animate-[fadeInUp_1.8s_ease_forwards]">
              <h2 className="text-primary mb-2 inline-block bg-white px-2 py-2 text-4xl font-bold">
                {featuredBook.title}
              </h2>
              <p className="mt-6 text-lg">{featuredBook.title}</p>
              <p className="text-sm opacity-70"></p>
              <p className="mt-5 px-20 text-start text-sm leading-relaxed">
                {featuredBook.description}
              </p>
            </div>
            <a
              href={featuredBook.link}
              className="flex animate-[fadeInRight_1.8s_ease_forwards] flex-col items-center"
            >
              <img
                src={featuredBook.cover}
                alt={featuredBook.title}
                className="h-64"
              />
              <p className="mt-4 flex items-center gap-2">
                추천 도서 보러 가기 <ArrowRight />
              </p>
            </a>
          </div>
        )}
      </div>
      <div>
        <Swiper
          className="mx-auto h-125 w-full"
          modules={[]}
          slidesPerView={5}
          spaceBetween={20}
          loop
        >
          {books.map((book: any) => (
            <SwiperSlide key={book.isbn} className="flex flex-col pt-10">
              <img
                src={book.cover}
                alt={book.title}
                className="h-80 w-full object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
              <p className="mt-10 truncate text-sm">{book.title}</p>
              <p className="mt-3 truncate text-xs opacity-70">{book.author}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div></div>
      </div>
    </main>
  );
}
