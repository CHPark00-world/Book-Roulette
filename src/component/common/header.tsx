import { useEffect, useState } from 'react';

export default function header() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);

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
      className={`fixed top-0 z-10 flex w-full px-10 py-4 transition-colors duration-300 [&_a]:cursor-pointer ${scrolled ? 'text-primary bg-[#fdf6f0] [&_a]:hover:opacity-50' : 'bg-transparent text-black [&_a]:hover:text-red-700'}`}
    >
      <h1 className="text-3xl">책장</h1>
      <nav className="ml-10 flex items-center gap-16 text-sm">
        <div
          className="relative flex flex-col after:absolute after:top-full after:left-0 after:h-2 after:w-full after:content-['']"
          onMouseEnter={() => setModal(true)}
          onMouseLeave={() => setModal(false)}
        >
          <a className="block">커뮤니티</a>
          {modal && (
            <ul className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg [&_a]:hover:text-white [&_a]:hover:opacity-100">
              <li>
                <a className="text-primary hover:bg-primary block px-4 py-3">
                  자유 북토크
                </a>
              </li>
              <li>
                <a className="text-primary hover:bg-primary block px-4 py-3">
                  릴레이 독후감
                </a>
              </li>
              <li>
                <a className="text-primary hover:bg-primary block px-4 py-3">
                  책 추천 서비스
                </a>
              </li>
            </ul>
          )}
        </div>

        <a>추천 책장</a>
        <a>책장 소식</a>
      </nav>
      <nav className="ml-auto flex items-center gap-6 text-sm">
        <a>로그인</a>
        <a>회원가입</a>
      </nav>
    </header>
  );
}
