import { Camera, Check, Eye, X } from 'lucide-react';
import { useSignUpForm } from '../../hooks/useSignUpForm';
import { useState, useEffect, useRef } from 'react';
import ProfileDropdown from '../navigation/profileDropdown';
import profile from '../../assets/default_profile.png';

interface ModalProps {
  onClose: () => void;
}

export default function signUpFormModal({ onClose }: ModalProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    emailError,
    passwordError,
    nameError,
    emailValid,
    passwordValid,
    passwordConfirmValid,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    passwordConfirm,
    setPasswordConfirm,
    passworConfirmError,
    handleSignUp,
    fileInputRef,
    profileImage,
    handleImageChange,
    handleImageDelete,
  } = useSignUpForm();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div onMouseDown={onClose} className="fixed inset-0 z-50 bg-black/50">
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="fixed top-[30%] left-[50%] mx-auto my-20 inline-block w-92.5 translate-x-[-50%] translate-y-[-50%]"
      >
        <form className="flex flex-col rounded bg-white px-6 pt-8 pb-6">
          <X
            onClick={onClose}
            className="ml-auto block cursor-pointer opacity-40"
          />
          <h2 className="mb-4 text-center text-2xl font-bold">회원가입</h2>
          <div className="flex justify-center py-4">
            <div ref={dropdownRef} className="relative">
              <img src={profileImage} className="h-20 w-20 rounded-full" />
              <Camera
                onClick={() => setShowDropdown(!showDropdown)}
                className="absolute right-0 bottom-0 cursor-pointer rounded-full border border-black/20 bg-white p-1 opacity-50"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {showDropdown && (
                <ProfileDropdown
                  onEdit={() => fileInputRef.current?.click()}
                  onDelete={handleImageDelete}
                  isDefault={profileImage === profile}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className={`relative border border-b-0 ${emailError ? 'border-red-500' : 'border-black/20'}`}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 focus:outline-none"
                placeholder="이메일"
              />
              {emailError && (
                <p className="px-4 pb-2 text-sm text-red-500">{emailError}</p>
              )}
              {emailValid && (
                <Check className="absolute top-3 right-3 text-blue-500" />
              )}
            </div>
            <div className="border border-black/20">
              <div
                className={`relative border border-t-0 ${passwordError ? 'border-red-500' : 'border-black/20'}`}
              >
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 focus:outline-none"
                  placeholder="비밀번호"
                />
                {passwordValid ? (
                  <Check className="absolute top-3 right-3 text-blue-500" />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 cursor-pointer text-black/30"
                  />
                )}

                {passwordError && (
                  <p className="px-4 py-2 text-sm text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>
              <div
                className={`relative border-t border-black/20 ${passworConfirmError ? 'border border-red-500' : ''}`}
              >
                <input
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type={showPasswordConfirm ? 'text' : 'password'}
                  className="w-full px-4 py-3 focus:outline-none"
                  placeholder="비밀번호 확인"
                />
                {passwordConfirmValid ? (
                  <Check className="absolute top-3 right-3 text-blue-500" />
                ) : (
                  <Eye
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute top-3 right-3 cursor-pointer text-black/30"
                  />
                )}

                {passworConfirmError && (
                  <p className="px-4 pb-2 text-sm text-red-500">
                    {passworConfirmError}
                  </p>
                )}
              </div>
            </div>
            <small className="py-2 text-center text-xs text-black/50">
              8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요.
            </small>
          </div>
          <div className="mt-6">
            <h3 className="py-2">이름</h3>
            <div
              className={`border ${nameError ? 'border-red-500' : 'border-black/20'}`}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 focus:outline-none"
                placeholder="이름을(를) 입력하세요"
              />
              {nameError && (
                <p className="px-4 pb-2 text-sm text-red-500">{nameError}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignUp}
            className="bg-primary mt-6 h-12 shrink-0 cursor-pointer text-white"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
