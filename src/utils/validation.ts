export const validateLoginForm = (
  email: string,
  password: string,
): string | null => {
  if (!email) return '이메일을 입력해주세요.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return '올바른 이메일 형식이 아닙니다.';
  if (!password) return '비밀번호를 입력해주세요.';
  return null;
};
