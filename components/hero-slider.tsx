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
      <h2 className="capitalize font-semibold text-center text-black  mt-20 lg:mt-32 text-2xl mb-10 lg:mb-16 max-w-2xl">
        the area where it’s written electric vehicles we can try by adding
        Family Cargo Bikes For Dubai
      </h2>
      <ModelsDesktopSlider slides={slides} />
      <ModelsMobileSlider slides={slides} />
    </div>
  );
};

export default HeroSlider;
