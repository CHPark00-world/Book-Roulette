import { useState, useRef } from 'react';
import profile from '../assets/default_profile.png';

export const useSignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passworConfirmError, setPasswordConfirmError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(profile);

  const handleSignUp = () => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!pattern.test(email)) {
      setEmailError('이메일을 정확히 입력하세요');
      setEmailValid(false);
      setPasswordError('');
      return;
    } else {
      setEmailError('');
      setEmailValid(true);
    }

    if (!password) {
      setPasswordError('비밀번호를 입력하세요.');
      return;
    } else {
      setPasswordError('');
    }
    if (!passwordPattern.test(password)) {
      setPasswordError('최소 8글자 이상, 대문자, 숫자, 특수문자 포함필수');
      setPasswordValid(false);
      return;
    }
    setPasswordError('');
    setPasswordValid(true);

    if (!passwordConfirm) {
      setPasswordConfirmError('비밀번호를 한번 더 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
      setPasswordConfirmValid(false);
      return;
    }
    setPasswordConfirmError('');
    setPasswordConfirmValid(true);

    if (!name) {
      setNameError('이름을(를) 입력하세요');
      return;
    }
    setNameError('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(profile);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    nameError,
    setNameError,
    emailValid,
    setEmailValid,
    passwordValid,
    setPasswordValid,
    passwordConfirmValid,
    setPasswordConfirmValid,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    passwordConfirm,
    setPasswordConfirm,
    passworConfirmError,
    setPasswordConfirmError,
    handleSignUp,
    fileInputRef,
    handleImageChange,
    profileImage,
    handleImageDelete,
  };
};
