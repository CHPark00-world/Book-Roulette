import { useEffect, useState } from 'react';

export default function header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex py-4 px-10 fixed top-0 w-full z-10 transition-colors duration-300 [&_a]:cursor-pointer ${scrolled ? 'bg-[#fdf6f0] text-primary [&_a]:hover:opacity-50' : 'bg-transparent text-black [&_a]:hover:text-red-700'}`}
    >
      <h1 className="text-3xl ">책장</h1>
      <nav className="text-sm ml-10 flex gap-16 items-center">
        <a>커뮤니티</a>
        <a>추천 책장</a>
        <a>책장 소식</a>
      </nav>
      <nav className="flex text-sm gap-6 ml-auto items-center">
        <a>로그인</a>
        <a>회원가입</a>
      </nav>
    </header>
  );
}
