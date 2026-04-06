import { useState,useEffect } from "react";
import supabase from "../lib/supabase";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";


export function useMyPage () {
  const {user, logout} = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const [nickName, setNickName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) return;

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setNickName(data.nickname ?? '');
      setAvatarUrl(data.avatar_url);
    }
  };

  const fetchMyPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setMyPosts(data ?? []);
  };

  fetchProfile();
  fetchMyPosts();
}, [user]);

const handleUpdateProfile = async () => {
  if (!user) return;
  setIsLoading(true);

  const { error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, nickname: nickName, updated_at: new Date().toISOString() });

  if (!error) {
    setUser({...user, nickname: nickName});
    alert('프로필이 업데이트되었습니다!');
  }
  setIsLoading(false);
};

const handleDeleteAccount = async () => {
  if(!user) return;
  const confirm = window.confirm('정말 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.');
  if(!confirm) return;

  const {data: {session}} = await supabase.auth.getSession();
 

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'x-user-token': session?.access_token ?? '',
      },
    }
  );

  console.log('response status: ', response.status);
  const responseData = await response.json();
console.log('response data:', responseData);

  if(response.ok) {
      await supabase.from('post').delete().eq('user_id',user.id);
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.signOut();
      logout();
      navigate('/');
      alert('탈퇴가 완료되었습니다.');
  } else {
    alert('탈퇴 중 오류가 발생했습니다.');
  }
} 

const handleAvatarUpload = async (file:File) => {
  if(!user) return;

  const fileExt = file.name.split('.').pop();
  const filePath = `private/${user.id}.${fileExt}`;

  const {error: uploadError} = await supabase.storage
  .from('avatars')
  .upload(filePath,file, {upsert: true});

  if(uploadError) {
    alert('이미지 업로드 실패');
    return;
  }

  const {data} = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    await supabase
      .from('profiles')
      .upsert({id: user.id, avatar_url: publicUrl, updated_at: new Date().toISOString()});

      setAvatarUrl(publicUrl);
      setUser({...user, avatarUrl: publicUrl});
}

return {
  user,
  nickName,
  setNickName,
  avatarUrl,
  myPosts,
  isLoading,
  handleUpdateProfile,
  handleDeleteAccount,
  handleAvatarUpload,
  };
}