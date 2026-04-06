import Header from '../component/common/header';
import Footer from '../component/common/footer';
import { useBookFilter } from '../hooks/useBookFilter';
import { CATEGORIES, SORT_OPTIONS } from '../constants/bookCategories';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookFilterPage() {
  const {
    books,
    isLoading,
    categoryId,
    setCategoryId,
    sort,
    setSort,
    handleFetch,
    minRating,
    setMinRating,
    startYear,
    setStartYear,
    endYear,
    setEndYear,
  } = useBookFilter();
  const navigate = useNavigate();

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: '#faf7f2' }}
    >
      <Header />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold" style={{ color: '#3d3530' }}>
          책 추천 필터
        </h2>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* 왼쪽 필터 사이드바 */}
          <div className="w-full shrink-0 md:w-48">
            <div className="mb-6">
              <p
                className="mb-2 text-sm font-medium"
                style={{ color: '#3d3530' }}
              >
                카테고리
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoryId(cat.id);
                      handleFetch(1, cat.id);
                    }}
                    className="shrink-0 cursor-pointer rounded-full border px-4 py-1 text-left text-sm"
                    style={{
                      borderColor:
                        categoryId === cat.id ? '#e0633c' : '#e0d8d0',
                      color: categoryId === cat.id ? '#e0633c' : '#b0a8a0',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p
                className="mb-2 text-sm font-medium"
                style={{ color: '#3d3530' }}
              >
                정렬
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSort(option.value)}
                    className="shrink-0 cursor-pointer rounded-full border px-4 py-1 text-left text-sm"
                    style={{
                      borderColor:
                        sort === option.value ? '#e0633c' : '#e0d8d0',
                      color: sort === option.value ? '#e0633c' : '#b0a8a0',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            {sort === 'CustomerRating' && (
              <div className="mb-6">
                <p
                  className="mb-2 text-sm font-medium"
                  style={{ color: '#3d3530' }}
                >
                  최소 평점
                </p>
                <div className="flex flex-col gap-2">
                  {[9, 8, 7, 6].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className="cursor-pointer rounded-full border px-4 py-1 text-left text-sm"
                      style={{
                        borderColor:
                          minRating === rating ? '#e0633c' : '#e0d8d0',
                        color: minRating === rating ? '#e0633c' : '#b0a8a0',
                      }}
                    >
                      {rating}점 이상
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 출시년도 상세필터 */}
            {sort === 'PublishYear' && (
              <div className="mb-6">
                <p
                  className="mb-2 text-sm font-medium"
                  style={{ color: '#3d3530' }}
                >
                  출시년도
                </p>
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="text-xs" style={{ color: '#b0a8a0' }}>
                      시작년도
                    </label>
                    <input
                      type="number"
                      value={startYear}
                      onChange={(e) => setStartYear(Number(e.target.value))}
                      className="w-full rounded border px-3 py-1 text-sm outline-none"
                      style={{ borderColor: '#e0d8d0' }}
                      min={2000}
                      max={2026}
                    />
                  </div>
                  <div>
                    <label className="text-xs" style={{ color: '#b0a8a0' }}>
                      끝년도
                    </label>
                    <input
                      type="number"
                      value={endYear}
                      onChange={(e) => setEndYear(Number(e.target.value))}
                      className="w-full rounded border px-3 py-1 text-sm outline-none"
                      style={{ borderColor: '#e0d8d0' }}
                      min={2000}
                      max={2026}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => handleFetch()}
              className="w-full cursor-pointer rounded border px-6 py-2 text-sm"
              style={{ borderColor: '#e0633c', color: '#e0633c' }}
            >
              책 찾기
            </button>
          </div>

          {/* 오른쪽 책 목록 */}
          <div className="flex-1">
            {isLoading ? (
              <p className="text-sm" style={{ color: '#b0a8a0' }}>
                불러오는 중...
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {books?.map((book) => (
                  <div key={book.isbn} className="flex flex-col">
                    <div className="mb-2 overflow-hidden rounded shadow">
                      <img
                        onClick={() => navigate(`/book_detail/${book.isbn}`)}
                        src={book.cover}
                        alt={book.title}
                        className="w-full cursor-pointer object-contain"
                        style={{ aspectRatio: '3/4' }}
                      />
                    </div>
                    <p
                      className="line-clamp-2 text-xs font-medium"
                      style={{ color: '#3d3530' }}
                    >
                      {book.title}
                    </p>
                    <p className="text-xs" style={{ color: '#b0a8a0' }}>
                      {book.author}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
