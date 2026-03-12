import Header from '../component/common/header';
import Footer from '../component/common/footer';
import { useMyPage } from '../hooks/useMyPage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function myPage() {
  const [activeTab, setActiveTab] = useState('정보 수정');
  const navigate = useNavigate();
  const {
    user,
    nickName,
    setNickName,
    avatarUrl,
    myPosts,
    isLoading,
    handleUpdateProfile,
  } = useMyPage();

  if (!user) return null;

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: '#faf7f2' }}
    >
      <Header />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
        <h1 className="mb-8 text-2xl font-bold" style={{ color: '#3d3530' }}>
          마이페이지
        </h1>
        <div className="mb-8 flex gap-6 border-b border-stone-200">
          {['정보 수정', '내 글 조회', '회원 탈퇴'].map((tab) => (
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

        {/* 정보 수정 */}
        {activeTab === '정보 수정' && (
          <div className="rounded-lg border border-stone-200 p-6">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="프로필"
                className="mb-4 h-20 w-20 rounded-full object-cover"
              />
            )}
            <div className="mb-4">
              <label
                className="mb-1 block text-xs"
                style={{ color: '#b0a8a0' }}
              >
                이메일
              </label>
              <p className="text-sm" style={{ color: '#3d3530' }}>
                {user.email}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="mb-1 block text-xs"
                style={{ color: '#b0a8a0' }}
              >
                닉네임
              </label>
              <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#e0d8d0' }}
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              disabled={isLoading}
              className="cursor-pointer rounded border px-5 py-2 text-sm"
              style={{ borderColor: '#e0633c', color: '#e0633c' }}
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
          </div>
        )}

        {/* 내 글 조회 */}
        {activeTab === '내 글 조회' && (
          <div>
            {myPosts.length === 0 ? (
              <p className="text-sm" style={{ color: '#b0a8a0' }}>
                작성한 글이 없어요.
              </p>
            ) : (
              myPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/community/${post.id}`)}
                  className="flex cursor-pointer items-center justify-between border-b border-stone-200 py-4 hover:opacity-70"
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: '#e0633c' }}
                  >
                    {post.title}
                  </p>
                  <span className="text-xs" style={{ color: '#b0a8a0' }}>
                    {post.created_at.slice(0, 10)}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* 회원 탈퇴 */}
        {activeTab === '회원 탈퇴' && (
          <div className="rounded-lg border border-stone-200 p-6">
            <p className="mb-4 text-sm" style={{ color: '#3d3530' }}>
              탈퇴 시 모든 데이터가 삭제되며 복구할 수 없어요.
            </p>
            <button
              className="cursor-pointer rounded border px-5 py-2 text-sm"
              style={{ borderColor: '#b0a8a0', color: '#b0a8a0' }}
            >
              회원 탈퇴
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
