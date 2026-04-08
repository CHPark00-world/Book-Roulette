import { useBookDetail } from '../hooks/useBookDetail';
import Header from '../component/common/header';
import Footer from '../component/common/footer';
import { useParams } from 'react-router-dom';
import { useReadingRecord } from '../hooks/useReadingRecord';

export default function BookDetailPage() {
  const { book } = useBookDetail();
  const { isbn } = useParams();
  const { status, updateStatus } = useReadingRecord(isbn ?? '');

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: '#faf7f2' }}
    >
      <Header />

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-8 pt-50 pb-16">
        <div className="flex">
          <img className="h-60 w-60" src={book?.cover} />
          <div className="ml-10 flex flex-col gap-2">
            <p>{book?.author}</p>
            <h1>{book?.title}</h1>
            <div className="flex gap-4">
              <p>{book?.publisher}</p>
              <p>{book?.pubDate}</p>
              <p>평점 {book?.customerReviewRank}</p>
            </div>
            <div className="flex gap-4">
              <p>{book?.priceSales}원</p>
              <p>{book?.priceStandard}원</p>
            </div>
            <button
              onClick={() => window.open(book?.link, '_blank')}
              className="border-primary text-primary hover:bg-primary mt-4 w-fit cursor-pointer rounded-full border-2 bg-transparent px-6 py-3 text-sm font-medium transition-colors hover:text-white"
            >
              ↗ 알라딘에서 구매
            </button>
            <div className="mt-4 flex gap-2">
              {['읽고 싶어요', '읽는 중', '다 읽었어요'].map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    updateStatus(s, {
                      title: book?.title ?? '',
                      author: book?.author ?? '',
                      cover: book?.cover ?? '',
                    })
                  }
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm ${status === s ? 'bg-primary text-white' : 'hover:border-primary hover:text-primary border border-stone-300 text-stone-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col border-t py-10">
          <h2>책 소개</h2>
          <p>{book?.description}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
