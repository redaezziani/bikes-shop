import Header from '@/components/header';
import ProductsSlider from '@/components/products-slider';

export default function Home() {
  return (
    <main className=" flex flex-col   bg-white gap-4 justify-start items-center relative">
      <span className=" w-full h-144  relative bg-neutral-400">
        <Header />
        <div className=" h-full px-4 absolute top-0 w-full flex justify-center items-center">
          <div className="flex  relative z-10 justify-center items-center text-center flex-col w-full gap-2">
            <h1 className="text-3xl font-bold">Ride Smarter. Live Better.</h1>
            {/* <p className="text-neutral-200">
              Discover our premium electric bicycles designed
            </p> */}

            <div className="flex w-full gap-2">
              <button className=" bg-blue-600 w-full text-white rounded px-3 py-2.5 capitalize font-bold text-sm">
                order now
              </button>
              <button className=" bg-white w-full text-neutral-800 rounded px-3 py-2.5 capitalize font-bold text-sm">
                learn more
              </button>
            </div>
          </div>

          <img
            src="https://gocycle.com/wp-content/uploads/2022/01/intro4_mob.jpg"
            alt=""
            className="h-full absolute object-cover"
          />
        </div>
      </span>
      <section aria-label="products-slider" className="bg-white  w-full">
        <ProductsSlider />
      </section>
    </main>
  );
}
