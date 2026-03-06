import { useEffect, useState } from 'react';
import CommunityDropdown from '../navigation/communityDropdown';
import LoginModal from '../modals/loginModal';
import SignUpTermsModal from '../modals/signUpTermsModal';
import useAuthStore from '../../store/authStore';
import UserModal from '../modals/userModal';
import { Link } from 'react-router-dom';

export default function header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const user = useAuthStore((state) => state.user);

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

  useEffect(() => {
    if (login) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [login]);

  useEffect(() => {
    if (signUp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [signUp]);

  return (
    <>
      <header
        className={`fixed top-0 z-10 flex w-full px-10 py-4 transition-colors duration-300 [&_a]:cursor-pointer ${scrolled ? 'text-primary bg-[#fdf6f0] [&_a]:hover:opacity-50' : 'bg-transparent text-black [&_a]:hover:text-red-700'}`}
      >
        <h1 className="cursor-pointer text-3xl">
          <Link to="/">책장</Link>
        </h1>
        <nav className="ml-10 flex items-center gap-16 text-sm">
          <div
            className="relative flex flex-col after:absolute after:top-full after:left-0 after:h-2 after:w-full after:content-['']"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <a className="block">커뮤니티</a>
            <CommunityDropdown isOpen={isOpen} />
          </div>

          <a>추천 책장</a>
          <a>책장 소식</a>
        </nav>
        <nav className="ml-auto flex items-center gap-6 text-sm">
          {user ? (
            <a onClick={() => setUserMenu(true)} className="pr-10 font-bold">
              {user.name}님
            </a>
          ) : (
            <>
              <a onClick={() => setLogin(true)}>로그인</a>
              <a onClick={() => setSignUp(true)}>회원가입</a>
            </>
          )}
        </nav>
      </header>
      {login && <LoginModal onClose={() => setLogin(false)} />}
      {signUp && <SignUpTermsModal onClose={() => setSignUp(false)} />}
      {userMenu && <UserModal onClose={() => setUserMenu(false)} />}
    </>
  );
}
