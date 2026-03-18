import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import type { Book } from '../types/book';

interface Props {
  books: Book[];
}

export default function bottomBanner({ books }: Props) {
  const book1 = books[12];
  const book2 = books[15];

  return (
    <section className="relative h-auto w-full overflow-hidden bg-[#1a1a3e] py-16 md:h-100 md:py-0">
      <div className="relative left-6 text-white md:absolute md:top-1/2 md:left-12 md:-translate-y-1/2">
        <h1 className="text-4xl leading-tight font-bold">
          <span className="font-extrabold text-white">다독러와</span> 함께
          <br />
          <span className="font-extrabold text-white">독서토론</span> 하세요!
        </h1>
        <p className="mt-7 text-sm text-gray-300">
          책장 커뮤니티에서 함께 소통해요
        </p>
      </div>

      <div className="relative mt-8 flex flex-col items-center md:absolute md:top-1/2 md:right-32 md:mt-0 md:-translate-y-1/3">
        <div className="relative h-87 w-87.5 rounded-full bg-white">
          <img
            src={book1?.cover}
            alt="첫 번째 책 이미지"
            className="absolute top-8 left-8 h-44 w-32 -rotate-12 object-cover shadow-xl"
          />

          <img
            src={book2?.cover}
            alt="두 번째 책 이미지"
            className="absolute top-4 right-8 h-48 w-36 rotate-6 object-cover shadow-xl"
          />
          <Link
            to={ROUTES.COMMUNITY}
            className="absolute bottom-12 left-1/2 flex h-12 w-12 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#1a1a3e] text-white"
          >
            →
          </Link>
        </div>
      </div>
    </section>
  );
}
