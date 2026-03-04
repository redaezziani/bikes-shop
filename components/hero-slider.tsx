'use client';
import Header from './header';
import { HeroSection } from '@/types/hero-section';
import '@/app/swiper-styles.css';

interface HeroSliderProps {
  hero: HeroSection | null;
}

const HeroSlider = ({ hero }: HeroSliderProps) => {
  return (
    <div
      id="hero"
      className="w-full flex items-center flex-col h-130 lg:h-[80vh] relative"
    >
      <Header />
      {hero?.heading && (
        <h2 className="capitalize font-semibold text-center text-black mt-30 lg:mt-20 text-xl md:text-3xl max-w-2xl">
          {hero.heading}
        </h2>
      )}
      {hero?.video_url && (
        <video
          src={hero.video_url}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full mt-5 object-cover"
        />
      )}
      {hero?.description && (
        <p className="text-sm text-center mt-5">
          {hero.description}
        </p>
      )}
    </div>
  );
};

export default HeroSlider;
