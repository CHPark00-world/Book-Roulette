import { useState,useEffect } from "react";
import supabase from "../lib/supabase";
import useAuthStore from "../store/authStore";

export function useMyPage () {
  const {user} = useAuthStore();
  const [nickName, setNickName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  if (!user) return;

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    if (data) {
      setNickName(data.nickName ?? '');
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

  if (!error) alert('프로필이 업데이트되었습니다!');
  setIsLoading(false);
};

return {
  user,
  nickName,
  setNickName,
  avatarUrl,
  myPosts,
  isLoading,
  handleUpdateProfile,
  };
}