import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import Profile from '../../assets/default_profile.png';
import { Bell, ChevronDown, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  onLoginClick,
  onSignUpClick,
}: Props) {
  const [communityOpen, setCommunityOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/40 md:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 z-30 h-full w-[70vw] max-w-[320px] bg-white transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="bg-[#fdf6f0] px-6 py-6">
          {user ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-300 text-3xl text-gray-400">
                  <img
                    className="rounded-full"
                    src={Profile}
                    alt="기본 프로필 이미지"
                  />
                </div>
                <div className="flex gap-4 text-gray-400">
                  <span>
                    <Bell size={20} />
                  </span>
                  <span>
                    <MoreVertical size={20} />
                  </span>
                </div>
              </div>
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </>
          ) : (
            <div className="flex gap-4 text-sm">
              <button onClick={onLoginClick} className="text-primary font-bold">
                로그인
              </button>
              <span className="text-gray-300">|</span>
              <button onClick={onSignUpClick} className="text-gray-600">
                회원가입
              </button>
            </div>
          )}
        </div>
        <nav className="mt-2">
          <div>
            <button
              onClick={() => setCommunityOpen((v) => !v)}
              className="text-primary flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 font-medium"
            >
              커뮤니티
              <span
                className={`transition-transform duration-200 ${communityOpen ? 'rotate-180' : ''}`}
              >
                <ChevronDown />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${communityOpen ? 'max-h-40' : 'max-h-0'}`}
            >
              <div className="flex flex-col gap-3 bg-gray-50 px-8 py-2 text-sm text-gray-600">
                <Link to="/community?tab=자유 북토크" onClick={onClose}>
                  자유게시판
                </Link>
                <Link to="/community?tab=릴레이 독후감" onClick={onClose}>
                  릴레이 독후감
                </Link>
                <Link to="/community?tab=고유 필사" onClick={onClose}>
                  고유 필사
                </Link>
              </div>
            </div>
          </div>
          <Link
            to="/chat"
            onClick={onClose}
            className="text-primary flex w-full items-center border-b border-gray-100 px-6 py-4 font-medium"
          >
            추천 책장
          </Link>
          <Link
            to="/news"
            onClick={onClose}
            className="text-primary flex w-full items-center border-b border-gray-100 px-6 py-4 font-medium"
          >
            책장 소식
          </Link>
        </nav>
      </div>
      {isOpen && (
        <button
          onClick={onClose}
          className="fixed top-4 z-40 text-2xl text-white md:hidden"
          style={{ left: 'calc(70vw + 16px)' }}
        >
          ✕
        </button>
      )}
    </>
  );
}
