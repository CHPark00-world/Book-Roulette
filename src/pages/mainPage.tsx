import Header from '../components/header';
import HeroSection from '../sections/heroSection';
import CommunitySection from '../sections/communitySection';
import RecommendSection from '../sections/recommendSection';
import RelayHeroSection from '../sections/relayHeroSection';
import RecommendFeatureSection from '../sections/recommendFeatureSection';
import RelayReviewSection from '../sections/relayReviewSection';
import BottomBanner from '../sections/bottomBanner';
import Footer from '../sections/footer';
import { useEffect, useState } from 'react';
import { searchBooks } from '../api/aladinApi';
import type { Book } from '../types/book';

export default function mainPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    searchBooks('역사').then((items) => {
      setBooks(items);
    });
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <CommunitySection />
      <RecommendSection books={books} />
      <RelayHeroSection />
      <RecommendFeatureSection />
      <RelayReviewSection />
      <BottomBanner books={books} />
      <Footer />
    </>
  );
}
