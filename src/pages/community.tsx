import Header from '../component/common/header';
import Library from '../assets/library.jpg';
import { useState, useEffect } from 'react';
import { BookOpen, Search } from 'lucide-react';
import Footer from '../component/common/footer';
import supabase from '../lib/supabase';
import WriteModal from '../component/modals/writeModal';
import useAuthStore from '../store/authStore';
import { useLocation, useNavigate } from 'react-router-dom';

export default function community() {
  const [activeTab, setActiveTab] = useState('자유 북토크');
  const [posts, setPosts] = useState<any[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const location = useLocation();

  const fetchPosts = async () => {
    let query = supabase
      .from('posts')
      .select('*, likes(count), comments(count)')
      .eq('category', activeTab)
      .order('created_at', { ascending: false });

    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }
    const { data } = await query;
    setPosts(data ?? []);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, [activeTab, location]);

  return (
    <div className="flex flex-col" style={{ backgroundColor: '#faf7f2' }}>
      <Header />
      <div className="relative mt-16 h-60 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={Library}
          alt="도서관 이미지"
        />
        <div className="absolute inset-0 flex flex-col items-end justify-end bg-black/40 px-12 pb-8">
          <p className="mb-1 text-sm text-white">다독러들과 함께 소통해요!</p>
          <h1 className="text-3xl font-bold text-white">책장 커뮤니티</h1>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-10 border-stone-200 px-4">
        {['자유 북토크', '릴레이 독후감', '고유 필사'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative cursor-pointer pb-3 text-sm font-medium"
            style={{ color: activeTab === tab ? '#e0633c' : '#b0a8a0' }}
          >
            {tab}
            {activeTab === tab && (
              <span
                className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
                style={{ backgroundColor: '#e0633c' }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-15 py-10 text-center">
        <BookOpen className="text-primary h-15 w-15" />
        <h2 className="mb-3 text-2xl font-bold" style={{ color: '#3d3530' }}>
          {activeTab}
        </h2>

        <p
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ color: '#8c7b72' }}
        >
          {
            '자유 북토크에서 책과 관련된 주제에 대해 자유롭게 소통하는 공간 입니다. \n다독러들과 다양한 책과 독서 경험에 관한 이야기를 나누어 보세요.'
          }
        </p>
      </div>
      <div className="mx-auto w-full max-w-3xl flex-1 px-4">
        {posts.length === 0 ? (
          <p className="py-16 text-center text-sm" style={{ color: '#b0a8a0' }}>
            게시글이 없어요.
          </p>
        ) : (
          posts.map((post) => (
            <div
              onClick={() => navigate(`/community/${post.id}`)}
              key={post.id}
              className="flex cursor-pointer items-center justify-between border-b border-stone-200 py-5 hover:opacity-70"
            >
              <div>
                <p
                  className="mb-1 text-sm font-medium"
                  style={{ color: '#e0633c' }}
                >
                  {post.title}
                </p>
                <div
                  className="flex gap-3 text-xs"
                  style={{ color: '#b0a8a0' }}
                >
                  <span>{post.created_at.slice(0, 10)}</span>
                  <span>♡ {post.likes[0]?.count ?? 0}</span>
                </div>
              </div>
              <span className="text-xs" style={{ color: '#b0a8a0' }}>
                💬 {post.comments[0]?.count ?? 0}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="relative mx-auto mt-6 flex w-full max-w-3xl items-center justify-center px-4 pb-16">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchPosts()}
          className="w-80 rounded border px-3 py-2 text-sm outline-none"
          style={{
            borderColor: 'var(--color-primary)',
            backgroundColor: '#fff',
            color: '#3d3530',
          }}
        />
        <button
          onClick={fetchPosts}
          className="cursor-pointer p-2"
          style={{ color: '#e0633c' }}
        >
          <Search />
        </button>
        <button
          onClick={() => {
            if (!user) {
              alert('로그인이 필요한 서비스입니다.');
              return;
            }
            setIsModal(true);
          }}
          className="absolute right-4 cursor-pointer rounded border px-5 py-2 text-sm"
          style={{ borderColor: '#e0633c', color: '#e0633c' }}
        >
          글쓰기
        </button>
      </div>
      {isModal && (
        <WriteModal
          activeTab={activeTab}
          onClose={() => setIsModal(false)}
          onSuccess={(newPost) => setPosts((prev) => [newPost, ...prev])}
        />
      )}
      <Footer />
    </div>
  );
}
