import Header from '@/components/header';
import HeroSlider from '@/components/hero-slider';
import ProductsSlider from '@/components/products-slider';
import { IconBike, IconMessageFilled } from '@tabler/icons-react';

export default function Home() {
  return (
    <main className=" flex flex-col   bg-white gap-4 justify-start items-center relative">
      <HeroSlider />
      <section aria-label="products-slider" className="bg-white  w-full">
        <ProductsSlider />
      </section>
      <section className=" fixed gap-2 flex justify-between z-30 h-14 shadow-xl rounded-t-lg bg-white w-full bottom-0 p-2 px-4">
        <button className=" w-10 flex justify-center items-center  border bg-neutral-400/20 border-neutral-400/45 rounded">
          <IconMessageFilled className="text-neutral-500" size={20} />
        </button>
        <span className="border bg-neutral-400/20 border-neutral-400/45 flex justify-center items-center gap-1 rounded w-full">
          <IconBike className="text-neutral-600" size={20} />
          <p className=" text-neutral-500 text-xs">Take a Bike Now</p>
        </span>
      </section>
    </main>
  );
}
