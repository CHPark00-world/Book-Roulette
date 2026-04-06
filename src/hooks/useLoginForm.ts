import { useState } from 'react';
import { validateLoginForm } from '../utils/validation';
import supabase from '../lib/supabase';
import useAuthStore from '../store/authStore';


export const useLoginForm = (onClose: () => void) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);


  const handleLogin = async () => {

    const error = validateLoginForm(email, password);

    if (error) {
      alert(error);
      return;
    }
    const { data, error: supabaseError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    
    if (supabaseError || !data.user) {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    const {data: profile} = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', data.user.id)
    .maybeSingle();

    setUser({
      id: data.user.id,
      email: data.user.email ?? '',
      name: data.user.user_metadata.name ?? '',
      nickname: profile?.nickname ?? '',
    })
    
    onClose();
  };
  return { email, setEmail, password, setPassword, handleLogin };
};
