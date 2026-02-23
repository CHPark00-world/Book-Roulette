export default function recommendSection() {
  return (
    <main
      className="bg-primary py-32 text-center text-white"
      style={{
        clipPath: 'polygon(0 0, 50% 0, 50% 25%, 100% 25%, 100% 100%, 0 100%)',
      }}
    >
      <div>
        <p className="mb-4 text-sm">
          금주의 <strong>추천 도서</strong>를 확인해 보세요.
        </p>
        <h2 className="text-5xl font-bold">추천 책장</h2>
        <div>{/* 이곳은 추천책 한권이 올 곳 */}</div>
      </div>
      <div>{/* 이곳은 추천책 리스트가 올 곳 */}</div>
    </main>
  );
}
