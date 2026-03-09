import Header from '../component/common/header';
import Footer from '../component/common/footer';
import { usePostDetail } from '../hooks/usePostDetail';

export default function PostDetailPage() {
  const {
    post,
    user,
    liked,
    likesCount,
    comments,
    commentInput,
    setCommentInput,
    handleLike,
    handleDeletePost,
    handleComment,
    handleDeleteComment,
    navigate,
  } = usePostDetail();

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
          {user?.id === post.user_id && (
            <button
              onClick={handleDeletePost}
              className="cursor-pointer text-xs"
              style={{ color: '#b0a8a0' }}
            >
              삭제
            </button>
          )}
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
          <button
            onClick={handleLike}
            className="cursor-pointer"
            style={{ color: liked ? '#e0633c' : '#b0a8a0' }}
          >
            {liked ? '♥' : '♡'} {likesCount}
          </button>
          <span>💬 {comments.length}</span>
        </div>
        <div className="mb-6 border-t border-stone-200 pt-6">
          {comments.length === 0 ? (
            <p className="text-xs" style={{ color: '#b0a8a0' }}>
              첫 댓글을 남겨보세요!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="mb-4 border-b border-stone-100 pb-4"
              >
                <p className="mb-1 text-sm" style={{ color: '#3d3530' }}>
                  {comment.content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#b0a8a0' }}>
                    {comment.created_at.slice(0, 10)}
                  </span>
                  {user?.id === comment.user_id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="cursor-pointer text-xs"
                      style={{ color: '#b0a8a0' }}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mb-8 flex gap-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            className="flex-1 rounded border px-3 py-2 text-sm outline-none"
            style={{ borderColor: '#e0d8d0' }}
          />
          <button
            onClick={handleComment}
            className="cursor-pointer rounded border px-4 py-2 text-sm"
            style={{ borderColor: '#e0633c', color: '#e0633c' }}
          >
            등록
          </button>
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
