import Library from '../assets/library.jpg';

export default function heroSection() {
  return (
    <section
      className="h-[80vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Library})` }}
    ></section>
  );
}
