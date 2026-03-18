import { FaTwitter } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function footer() {
  return (
    <footer className="flex w-full flex-col justify-between bg-orange-500 px-6 py-10 text-sm text-white md:flex-row md:px-10">
      <div className="flex flex-col">
        <span className="">주식회사 책장</span>
        <span>서울 강남구 테헤란로 501</span>
        <span>E-mail. parkch8913@naver.com | Tel. 010-6306-8913</span>
      </div>
      <div className="mt-5 mr-5 flex gap-10">
        <FaTwitter className="h-10 w-10 hover:opacity-50" />
        <RiKakaoTalkFill className="h-10 w-10 hover:opacity-50" />
      </div>
    </footer>
  );
}
