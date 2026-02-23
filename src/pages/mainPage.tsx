import Header from '../components/header';
import HeroSection from '../sections/heroSection';
import CommunitySection from '../sections/communitySection';
import RecommendSection from '../sections/recommendSection';
import RelayHeroSection from '../sections/relayHeroSection';

export default function mainPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <CommunitySection />
      <RecommendSection />
      <RelayHeroSection />
    </>
  );
}
