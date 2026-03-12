import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { dummyReviews } from '../constants/dummyReviews';

export default function relayReviewSection() {
  return (
    <section className="flex flex-col gap-20 bg-[#fdf6f0] py-20">
      <div className="mx-auto flex flex-col items-center gap-10">
        <h3 className="text-primary">
          인상깊은 책의 구절에 대한 <strong>감상</strong>을 간단하게{' '}
          <strong>기록</strong>해 보세요
        </h3>
        <h1 className="text-5xl font-bold">릴레이 독후감</h1>
        <Link
          className="text-primary hover:bg-primary border px-5 py-3 transition-all duration-300 hover:text-white"
          to={`${ROUTES.COMMUNITY}?tab=릴레이 독후감`}
        >
          릴레이 독후감 쓰러가기
        </Link>
      </div>
      <div className="flex w-full justify-between px-30">
        {dummyReviews.map((review) => (
          <Link
            to={ROUTES.COMMUNITY}
            className="flex w-64 flex-col items-center bg-white px-4 py-5"
            key={review.id}
          >
            <p className="text-primary">{review.content}</p>
            <img className="pt-10" src={review.cover} alt={review.bookTitle} />
            <p className="pt-5 text-[#777777]">{review.bookTitle}</p>
            <p className="text-[#777777]">w. {review.author}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
