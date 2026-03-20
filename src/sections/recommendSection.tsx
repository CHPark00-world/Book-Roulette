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
        <h2 className="animate-[fadeInUp_1.8s_ease_forwards] text-3xl font-bold md:text-5xl">
          추천 책장
        </h2>
        {featuredBook && (
          <div className="flex flex-col items-center justify-between gap-8 px-6 py-16 md:flex-row md:px-20">
            <a
              href={featuredBook.link}
              className="order-1 flex animate-[fadeInRight_1.8s_ease_forwards] flex-col items-center md:order-2"
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
            <div className="order-2 w-full animate-[fadeInUp_1.8s_ease_forwards] md:order-1 md:w-1/2">
              <h2 className="text-primary mb-2 inline-block bg-white px-2 py-2 text-4xl font-bold">
                {featuredBook.title}
              </h2>
              <p className="mt-6 text-lg">{featuredBook.title}</p>
              <p className="text-sm opacity-70"></p>
              <p className="mt-5 px-10 text-start text-sm leading-relaxed">
                {featuredBook.description}
              </p>
            </div>
          </div>
        )}
      </div>
      <div>
        <Swiper
          className="mx-auto w-full"
          modules={[]}
          slidesPerView={2}
          spaceBetween={20}
          loop={books.length > 5}
          breakpoints={{
            768: { slidesPerView: 5 },
          }}
        >
          {books.map((book: any) => (
            <SwiperSlide key={book.isbn} className="flex h-auto flex-col pt-10">
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer flex-col items-center overflow-hidden"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-60 w-full object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <p className="mt-2 text-sm">{book.title}</p>
                <p className="mt-1 w-full truncate text-center text-xs opacity-70">
                  {book.author}
                </p>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div></div>
      </div>
    </main>
  );
}
