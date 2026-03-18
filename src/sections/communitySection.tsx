import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function communitySection() {
  return (
    <section className="flex h-80 flex-col items-center justify-center bg-white text-center">
      <div className="animate-[fadeInUp_1.8s_ease_forwards] py-4">
        <h2 className="text-primary py-3 text-2xl md:text-4xl">
          Shared Reading and Discussion
        </h2>
        <p className="py-4 text-[#505050]">
          책장에서 함께 읽고 함께 나누는 독후활동,
          <br />
          책장과 함께 독서의 매력과 인사이트를 발견해 보세요
        </p>
      </div>
      <div className="animate-[fadeInUp_1.8s_ease_forwards]">
        <Link
          to={ROUTES.COMMUNITY}
          className="border-primary text-primary hover:bg-primary rounded border px-8 py-3 transition-colors duration-300 hover:text-white"
        >
          커뮤니티 바로가기
        </Link>
      </div>
    </section>
  );
}
