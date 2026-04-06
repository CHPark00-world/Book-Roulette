import { Bell } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import supabase from '../../lib/supabase';
import defaultProfile from '../../assets/default_profile.png';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
}

export default function UserModal({ onClose }: ModalProps) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    onClose();
  };

  return (
    <div
      onMouseDown={(e) => {
        if (e.button === 0) onClose();
      }}
      className="fixed inset-0 z-50"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute top-14 right-10 w-80 rounded bg-white shadow-lg"
      >
        <div className="flex flex-col items-center px-6 pt-6 pb-4">
          <Bell className="ml-auto cursor-pointer opacity-50" />
          <img
            src={user?.avatarUrl || defaultProfile}
            alt="프로필 이미지"
            className="h-20 w-20 rounded-full"
          />
          <p className="mt-4 font-bold">{user?.nickname || user?.name}</p>
        </div>
        <div className="flex border-t border-black/10">
          <button
            onClick={() => {
              navigate('/mypage');
              onClose();
            }}
            className="w-1/2 cursor-pointer py-4 hover:bg-black/5"
          >
            마이페이지
          </button>
          <button
            onClick={handleLogout}
            className="w-1/2 cursor-pointer border-l border-black/10 py-4 hover:bg-black/5"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
