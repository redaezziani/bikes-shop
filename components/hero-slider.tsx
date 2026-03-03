'use client';
import Header from './header';
import { SectionOne } from '@/types/section-one';
import '@/app/swiper-styles.css';
import ModelsDesktopSlider from './models-desktop-slider';
import ModelsMobileSlider from './models-mobile-slider';

interface HeroSliderProps {
  slides: SectionOne[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  if (slides.length === 0) {
    return (
      <div
        id="hero"
        className="w-full flex items-center flex-col h-170 lg:h-screen relative bg-zinc-400"
      >
        <Header />
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-white text-xl">No slides available</div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="hero"
      className="w-full flex items-center flex-col h-130 lg:h-[80vh] relative"
    >
      <Header />
      <ModelsDesktopSlider slides={slides} />
      <ModelsMobileSlider slides={slides} />
    </div>
  );
};

export default HeroSlider;
