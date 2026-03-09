import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import useAuthStore from "../store/authStore";

export function usePostDetail () {
   const [post, setPost] = useState<any>(null);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [comments, setComments] = useState<any[]>([]);
    const [commentInput, setCommentInput] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useAuthStore();

    useEffect(() => {
        const fetchPost = async () => {
          const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();
          setPost(data);
    
          const { count } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', id);
          setLikesCount(count ?? 0);
        };
    
        const fetchLiked = async () => {
          if (!user) return;
          const { data } = await supabase
            .from('likes')
            .select('id')
            .eq('post_id', id)
            .eq('user_id', user.id)
            .maybeSingle();
          setLiked(!!data);
        };
    
        const fetchComments = async () => {
          const { data } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id)
            .order('created_at', { ascending: true });
          setComments(data ?? []);
        };
    
        fetchPost();
        fetchLiked();
        fetchComments();
      }, [id, user]);
    
      const handleDeletePost = async () => {
        if (!confirm('게시글을 삭제할까요?')) return;
        await supabase.from('posts').delete().eq('id', id);
        navigate('/community');
      };
    
      const handleLike = async () => {
        if (!user) {
          alert('로그인이 필요한 서비스입니다.');
          return;
        }
    
        if (liked) {
          await supabase
            .from('likes')
            .delete()
            .eq('post_id', id)
            .eq('user_id', user.id);
          setLiked(false);
          setLikesCount((prev) => prev - 1);
        } else {
          await supabase.from('likes').insert({ post_id: id, user_id: user.id });
          setLiked(true);
          setLikesCount((prev) => prev + 1);
        }
      };
    
      const handleComment = async () => {
        if (!user) {
          alert('로그인이 필요한 서비스입니다.');
          return;
        }
        if (!commentInput.trim()) return;
    
        const { data, error } = await supabase
          .from('comments')
          .insert({ post_id: id, user_id: user.id, content: commentInput })
          .select()
          .single();
    
        if (!error && data) {
          setComments((prev) => [...prev, data]);
          setCommentInput('');
        }
      };
    
      const handleDeleteComment = async (commentId: string) => {
        if (!confirm('댓글을 삭제할까요?')) return;
        await supabase.from('comments').delete().eq('id', commentId);
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      };
    
     return {
      post,user,liked,likesCount,comments,commentInput,setCommentInput,handleLike,handleDeletePost,handleComment,handleDeleteComment, navigate,
     }  
}