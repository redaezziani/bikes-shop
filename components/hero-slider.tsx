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
      className="w-full flex items-start flex-col h-130 lg:h-[80vh] relative"
    >
      <Header />

      {hero?.video_url && (
        <video
          src={hero.video_url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full  object-cover "
        />
      )}
      <div className="px-4">
        {hero?.heading && (
          <h2 className="capitalize font-semibold text-start  text-red-600 mt-10   text-lg md:text-2xl max-w-2xl">
            {hero.heading}
          </h2>
        )}
        {hero?.description && (
          <p className="text-sm text-start  mt-2">{hero.description}</p>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;
