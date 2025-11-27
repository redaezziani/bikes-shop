import Footer from '@/components/footer';
import HeaderDetailsPage from '@/components/header-v2';
import ProductImagePreview from '@/components/product-image-priview';
import ProductInfo from '@/components/product-info';
import { IconShoppingCart } from '@tabler/icons-react';
const page = () => {
  return (
    <main className=" flex flex-col min-h-screen   gap-4 justify-start items-center relative">
      <HeaderDetailsPage />
      <section className="w-full px-4 flex mt-20 flex-col gap-2 justify-start items-center">
        <ProductImagePreview
          images={[
            'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_1.png?v=1692045691&width=1080',
            'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_2.png?v=1692045693&width=720',
            'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_3.png?v=1692045693&width=720',
            'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_5.png?v=1692045692&width=720',
          ]}
        />
        <ProductInfo
          title="Along Click Model"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi saepe in aspernatur."
          priceAED={700}
          priceUSD={190.6}
          colors={[
            { name: 'black', hex: '#000000' },
            { name: 'white', hex: '#ffffff' },
            { name: 'red', hex: '#e63946' },
          ]}
        />

        <section className=" flex flex-col mt-15 gap-2 justify-start items-start ">
          <div className="flex flex-col gap-1">
            <h3 className=" text-2xl text-neutral-800 font-semibold">
              Why The Click Stands Above the Rest
            </h3>
            <p className=" text-neutral-600">
              The Click isn’t just a bike — it’s a precision-engineered
              companion built for riders who demand reliability, comfort, and
              modern performance. Every element is designed to react instantly
              to your movement, giving you a smooth, responsive, and controlled
              ride whether you're cruising through the city or pushing through
              tougher terrain. With its lightweight frame and intuitive
              handling, The Click makes every trip feel effortless
            </p>
          </div>
          <img
            className=" w-full mt-5 "
            src={
              'https://cdn.prod.website-files.com/68c29a71c0c8158b3af63ccc/68fad69109b2efd7a9f8bf4c_Untitled%20design%20-%202025-10-24T022937.695.png'
            }
            alt=""
          />
        </section>

        <section className=" flex flex-col mt-10 gap-2 justify-start items-start ">
          <div className="flex flex-col gap-1">
            <h3 className=" text-2xl text-neutral-800 font-semibold">
              Innovation You Can Feel in Every Ride
            </h3>
            <p className=" text-neutral-600">
              Equipped with advanced components, premium materials, and a
              uniquely balanced geometry, The Click delivers unmatched stability
              and power transfer. Its smart design reduces vibration, improves
              speed, and boosts rider confidence. From daily commuting to
              long-distance adventures, The Click is built to perform — and
              built to last.
            </p>
          </div>
          <img
            className="w-full mt-5"
            src={
              'https://cdn.prod.website-files.com/68c29a71c0c8158b3af63ccc/68fad665186c175a3776f023_Untitled%20design%20-%202025-10-24T022851.424.png'
            }
            alt=""
          />
        </section>
        <section className=" w-full  border-t border-b py-2 border-x-0 border-neutral-400/25  flex flex-col gap-4 mt-10 justify-center items-center">
          <h3 className="  font-semibold text-neutral-700 text-2xl">
            Size it up
          </h3>
          <img className=" mt-5" src={'/images/model-click.jpg'} alt="" />
          <div className="grid pb-5 gap-4 mt-5 w-full grid-cols-1 md:grid-cols-2">
            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-neutral-600">A. Max height (with antenna)</p>
                <p className="text-neutral-600">77.3 in</p>
              </div>
              <span className="w-full h-1 bg-neutral-400"></span>
            </div>

            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-neutral-600">
                  B. Width (side mirrors folded)
                </p>
                <p className="text-neutral-600">82 in</p>
              </div>
              <span className="w-full h-1 bg-neutral-400"></span>
            </div>

            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-neutral-600">C. Wheelbase</p>
                <p className="text-neutral-600">121.1 in</p>
              </div>
              <span className="w-full h-1 bg-neutral-400"></span>
            </div>

            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-neutral-600">D. Length</p>
                <p className="text-neutral-600">200.8 in</p>
              </div>
              <span className="w-full h-1 bg-neutral-400"></span>
            </div>

            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-neutral-600">E. Approach angle</p>
                <p className="text-neutral-600">35.8º</p>
              </div>
              <span className="w-full h-1 bg-neutral-400"></span>
            </div>

            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-neutral-600">F. Departure angle</p>
                <p className="text-neutral-600">34.4º</p>
              </div>
              <span className="w-full h-1 bg-neutral-400"></span>
            </div>
          </div>
        </section>
        <section className="w-full  flex mt-15 flex-col gap-2 justify-start items-start">
          <h3 className="text-lg font-medium text-neutral-800">
            Related Accessories
          </h3>
          <p className="text-sm text-neutral-600">
            Upgrade your ride with accessories designed to pair perfectly with
            this product.
          </p>
          <div className=" grid w-full mt-5 grid-cols-2 gap-2">
            <span className=" w-full bg-neutral-100 rounded aspect-square">
              <img
                src={
                  'https://murfelectricbikes.com/cdn/shop/files/7040_Bump_Main_1.png?v=1743531992&width=1080'
                }
                alt="related-products"
              />
            </span>
            <span className=" w-full bg-neutral-100 rounded aspect-square">
              <img
                src={
                  'https://murfelectricbikes.com/cdn/shop/files/081223_KROOZIE_2_1800x1800.png?v=1692045884'
                }
                alt="related-products"
              />
            </span>
            <span className=" w-full bg-neutral-100 rounded aspect-square">
              <img
                src={
                  'https://murfelectricbikes.com/cdn/shop/files/081223_KRYPTONITE_LOCK_EVO_1_1800x1800.png?v=1692046008'
                }
                alt="related-products"
              />
            </span>
          </div>
        </section>
      </section>
      <Footer />
      <section className=" fixed  gap-2 flex justify-center z-30 h-16 shadow-xl  bg-white w-full bottom-0 pt-2 pb-6 px-4">
        <button className=" w-10 h-10 md:w-full gap-2 flex justify-center items-center    ">
          <svg
            className=" fill-neutral-700 stroke-neutral-700 size-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          <p className=" hidden md:inline-block text-neutral-700 capitalize font-semibold text-xs">
            Ask On Whatsapp
          </p>
        </button>
        <button className="border h-10 bg-neutral-400/10 border-neutral-400/45 flex justify-center items-center gap-2 rounded w-full">
          <p className=" text-neutral-700 capitalize font-semibold text-xs">
            Book your Free test ride
          </p>
        </button>
      </section>
    </main>
  );
};

export default page;
