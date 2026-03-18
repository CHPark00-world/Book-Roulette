import { useEffect, useState } from 'react';
import CommunityDropdown from '../navigation/communityDropdown';
import LoginModal from '../modals/loginModal';
import SignUpTermsModal from '../modals/signUpTermsModal';
import useAuthStore from '../../store/authStore';
import UserModal from '../modals/userModal';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import MobileDrawer from '../navigation/mobileDrawer';

export default function header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        className={`fixed top-0 z-10 flex w-full items-center px-10 py-4 transition-colors duration-300 [&_a]:cursor-pointer ${scrolled ? 'text-primary bg-[#fdf6f0] [&_a]:hover:opacity-50' : 'bg-transparent text-black [&_a]:hover:text-red-700'}`}
      >
        <button
          className="text-2xl md:hidden"
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
        <div className="flex flex-1 justify-center md:ml-0 md:flex-none md:justify-start">
          <h1 className="cursor-pointer text-3xl">
            <Link to="/">책장</Link>
          </h1>
        </div>
        <div className="md:hidden">
          <button className="text-2xl">
            <Search />
          </button>
        </div>
        <nav className="ml-10 hidden items-center gap-16 text-sm md:flex">
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
        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex">
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
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLoginClick={() => {
          setDrawerOpen(false);
          setLogin(true);
        }}
        onSignUpClick={() => {
          setDrawerOpen(false);
          setSignUp(true);
        }}
      />
      {login && <LoginModal onClose={() => setLogin(false)} />}
      {signUp && <SignUpTermsModal onClose={() => setSignUp(false)} />}
      {userMenu && <UserModal onClose={() => setUserMenu(false)} />}
    </>
  );
}
