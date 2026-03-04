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
  // if (slides.length === 0) {
  //   return (
  //     <div
  //       id="hero"
  //       className="w-full flex items-center flex-col h-170 lg:h-screen relative bg-zinc-400"
  //     >
  //       <Header />
  //       <div className="h-full w-full flex items-center justify-center">
  //         <div className="text-white text-xl">No slides available</div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      id="hero"
      className="w-full flex items-center flex-col h-130 lg:h-[80vh] relative"
    >
      <Header />
      <h2 className="capitalize font-semibold text-center text-black  mt-30 lg:mt-20 text-xl md:text-3xl  max-w-2xl">
        Timeless Designs, Made for Today
      </h2>
      <video
        src="https://res.cloudinary.com/dy8aarg0n/video/upload/v1772555365/WhatsApp_Video_2026-03-03_at_3.01.03_PM_nssfvw.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full mt-5 object-cover"
      />
      <p className=" text-sm text-center mt-5 ">
        We build front-loader cargo bikes for a shared view and a richer sensory
        experience. Inspired by Long John and Bakfiets heritage, we design
        modern family bikes for life in Dubai and the UAE.
      </p>
    </div>
  );
};

export default HeroSlider;
