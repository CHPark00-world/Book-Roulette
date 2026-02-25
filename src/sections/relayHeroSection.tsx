import { Link } from 'react-router-dom';
import book from '../assets/book.jpg';
import { ROUTES } from '../constants/routes';

export default function relayHeroSection() {
  return (
    <section
      className="flex h-120 w-full flex-col bg-cover bg-center px-10 py-15"
      style={{ backgroundImage: `url(${book})`, backgroundAttachment: 'fixed' }}
    >
      <div className="flex flex-1 flex-col gap-2 py-4">
        <h2 className="text-textColor text-xl font-bold">책장 커뮤니티</h2>
        <h1 className="py-4 text-4xl text-[#ffffff]">
          릴레이 <strong>독후감</strong>
          <br /> 게시판 <strong>오픈!</strong>
        </h1>
        <p className="text-textColor py-4">
          다독러들과 함께 인상깊은 책의 구절에 대해
          <br /> 릴레이로 자유롭게 기록해 보세요.
        </p>
      </div>
      <div className="">
        <Link
          to={ROUTES.COMMUNITY}
          className="bg-primary border border-transparent px-2.5 py-4 text-white hover:border-white hover:bg-[#23527c]"
        >
          릴레이 독후감 쓰기
        </Link>
      </div>
    </section>
  );
}
