import { useBookDetail } from '../hooks/useBookDetail';
import Header from '../component/common/header';
import Footer from '../component/common/footer';

export default function BookDetailPage() {
  const { book } = useBookDetail();

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
              className="bg-primary mt-4 w-fit cursor-pointer rounded-2xl border px-6 py-3 text-white"
            >
              알라딘에서 구매
            </button>
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
