import BookIcon from '../assets/bookIcon.png';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function recommendFeatureSection() {
  return (
    <section className="flex flex-col items-center py-20 text-center">
      <div className="flex w-full justify-between px-60">
        <div className="flex flex-col items-center gap-10">
          <img className="h-16 w-16" src={BookIcon} alt="책 사진" />
          <h3 className="text-primary animate-[fadeInUp_1.8s_ease_forwards]">
            AI와 함께 나만의 책을 찾아보세요
          </h3>
          <h1 className="animate-[fadeInUp_1.8s_ease_forwards] text-5xl font-bold">
            AI 책 추천
          </h1>
          <Link
            className="text-primary hover:bg-primary border px-4 py-3 transition-all duration-300 hover:text-white"
            to={ROUTES.COMMUNITY}
          >
            AI 추천받기
          </Link>
        </div>
        <div className="flex flex-col items-center gap-10">
          <img src={BookIcon} className="h-16 w-16" alt="책 사진" />
          <h3 className="text-primary animate-[fadeInUp_1.8s_ease_forwards]">
            필터로 나에게 딱 맞는 책을 발견하세요
          </h3>
          <h1 className="animate-[fadeInUp_1.8s_ease_forwards] text-5xl font-bold">
            랜덤 책 추천
          </h1>
          <Link
            className="text-primary hover:bg-primary border px-4 py-3 transition-all duration-300 hover:text-white"
            to={ROUTES.COMMUNITY}
          >
            필터 책 추천받기
          </Link>
        </div>
      </div>
      <div>{/* 여기는 이미지리스트가 올 자리 */}</div>
    </section>
  );
}
