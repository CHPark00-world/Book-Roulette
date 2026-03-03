import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
}

export default function loginModal({ onClose }: ModalProps) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[30%] left-[50%] mx-auto my-20 inline-block w-92.5 translate-x-[-50%] translate-y-[-50%]"
      >
        <form className="rounded bg-white px-6 py-4">
          <X onClick={onClose} className="ml-auto block cursor-pointer" />
          <h2 className="flex justify-center pb-5 text-3xl font-bold">
            로그인
          </h2>
          <div className="flex flex-col">
            <input
              type="email"
              className="rounded border border-black/20 px-4 py-2 focus:outline-none"
              placeholder="이메일"
            />
            <input
              type="password"
              className="rounded border border-black/20 px-4 py-2 focus:outline-none"
              placeholder="비밀번호"
            />
          </div>
          <div className="flex items-center gap-2 py-4">
            <input
              className="h-5 w-5 cursor-pointer"
              type="checkbox"
              id="login"
            />
            <label className="cursor-pointer" htmlFor="login">
              로그인상태유지
            </label>
          </div>

          <button className="border-primary text-primary hover:bg-primary w-full cursor-pointer rounded border py-2 text-center hover:text-white">
            로그인
          </button>
          <div className="flex justify-between py-3">
            <p className="hover:text-primary cursor-pointer hover:underline">
              회원가입
            </p>
            <p className="hover:text-primary cursor-pointer hover:underline">
              아이디 · 비밀번호 찾기
            </p>
          </div>
          <p className="hover:text-primary cursor-pointer text-right hover:underline">
            소셜 로그인
          </p>
        </form>
      </div>
    </div>
  );
}
