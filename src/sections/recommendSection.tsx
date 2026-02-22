export default function recommendSection() {
  return (
    <section
      className="bg-primary py-32 text-white text-center"
      style={{
        clipPath: 'polygon(0 0, 50% 0, 50% 25%, 100% 25%, 100% 100%, 0 100%)',
      }}
    >
      <p className="text-sm mb-4">
        금주의 <strong>추천 도서</strong>를 확인해 보세요.
      </p>
      <h2 className="text-5xl font-bold">추천 책장</h2>
    </section>
  );
}
