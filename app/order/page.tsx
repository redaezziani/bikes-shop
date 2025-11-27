import HeaderDetailsPage from '@/components/header-v2';
import ModelSelector from '@/components/select-model';
import Link from 'next/link';
const page = () => {
  return (
    <main className=" flex flex-col min-h-screen   gap-4 justify-start items-center relative">
      <HeaderDetailsPage />
      <section className="w-full max-w-7xl flex mt-20 flex-col gap-2 justify-start items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 py-10">
          <div className="flex  flex-col justify-center items-center gap-6">
            <img
              src="https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_5.png?v=1692045692&width=720"
              className="w-full max-w-md object-contain"
              alt="Model Z Bike"
            />

            <div className="flex px-4  flex-col gap-1 justify-center items-center text-center">
              <h2 className="text-xl font-semibold text-neutral-900">
                Model Z
              </h2>
              <p className="text-neutral-600 capitalize text-sm">
                A sleek, lightweight electric bike built .
                <Link className=" underline  underline-offset-4" href={'/'}>
                  more info
                </Link>
              </p>
            </div>

            <div className=" px-4  flex gap-5 justify-between  w-full ">
              <span className="flex flex-col text-center gap-1">
                <h4 className="text-neutral-800 font-semibold text-sm">
                  Speed
                </h4>
                <p className="text-neutral-600 capitalize font-medium text-sm">
                  45 km/h fast
                </p>
              </span>

              <span className="flex flex-col text-center gap-1">
                <h4 className="text-neutral-800 font-semibold text-sm">
                  Range
                </h4>
                <p className="text-neutral-600 capitalize font-medium text-sm">
                  60–80 km
                </p>
              </span>

              <span className="flex flex-col text-center gap-1">
                <h4 className="text-neutral-800 font-semibold text-sm">
                  Battery
                </h4>
                <p className="text-neutral-600 capitalize font-medium text-sm">
                  48V 14Ah
                </p>
              </span>
            </div>
            <span className=" w-full bg-neutral-400/35 h-px" />
            <ModelSelector />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
