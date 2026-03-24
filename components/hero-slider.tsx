'use client';
import Header from './header';
import { HeroSection } from '@/types/hero-section';
import '@/app/swiper-styles.css';
import { useEffect, useRef } from 'react';

interface HeroSliderProps {
  hero: HeroSection | null;
}

const HeroSlider = ({ hero }: HeroSliderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="hero"
      className="w-full flex items-start flex-col h-130 lg:h-[80vh] relative"
    >
      <Header />

      {hero?.video_url && (
        <video
          ref={videoRef}
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
          <h2 className="capitalize font-semibold text-start  text-black mt-10   text-lg md:text-2xl max-w-2xl">
            {hero.heading}
          </h2>
        )}
        {hero?.description && (
          <p className="text-sm text-zinc-800 text-start  mt-2">{hero.description}</p>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;
