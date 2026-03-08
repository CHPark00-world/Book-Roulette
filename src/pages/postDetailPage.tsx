import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';
import Header from '../component/common/header';
import Footer from '../component/common/footer';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return null;

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: '#faf7f2' }}
    >
      <Header />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
        <h1 className="mb-2 text-2xl font-bold" style={{ color: '#e0633c' }}>
          {post.title}
        </h1>
        <div
          className="mb-6 flex gap-3 border-b border-stone-200 pb-4 text-xs"
          style={{ color: '#b0a8a0' }}
        >
          <span>{post.category}</span>
          <span>{post.created_at.slice(0, 10)}</span>
        </div>
        <p
          className="mb-8 text-sm leading-relaxed"
          style={{ color: '#3d3530' }}
        >
          {post.content}
        </p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt="게시글 이미지"
            className="mb-8 w-full rounded"
          />
        )}
        <div className="mb-8 flex gap-4 text-xs" style={{ color: '#b0a8a0' }}>
          <span>♡ {post.likes}</span>
          <span>💬 0</span>
        </div>
        <button
          onClick={() => navigate('/community')}
          className="cursor-pointer rounded border px-5 py-2 text-sm"
          style={{ borderColor: '#e0633c', color: '#e0633c' }}
        >
          목록
        </button>
      </div>
      <Footer />
    </div>
  );
}
