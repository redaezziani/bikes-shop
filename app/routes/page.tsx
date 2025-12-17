import HeaderDetailsPage from '@/components/header-v2';
import Footer from '@/components/footer';
import Breadcrumbs from '@/components/breadcrumbs';

export default function RoutesPage() {
  return (
    <>
      <HeaderDetailsPage />
      <main className="flex flex-col w-full bg-white items-center">
        <section className="w-full px-6 md:px-12 py-10 bg-white">
          <div className="max-w-4xl">
            <Breadcrumbs className="py-8" />
            <div>
              <h1 className="text-3xl md:text-6xl font-bold text-zinc-900 mb-2">
                Bike Routes
              </h1>
              <p className="text-md md:text-2xl text-zinc-600 leading-relaxed">
                Explore our curated bike routes and trails
              </p>
            </div>
          </div>
        </section>

        <section className="w-full px-6 md:px-12 py-16 bg-white">
          <div className="max-w-6xl mx-auto space-y-12">

            {/* Second Map - Komoot Collection */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6">
                Featured Routes
              </h2>
              <div className="border border-zinc-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.komoot.com/collection/3992640/embed"
                  width="100%"
                  height="600"
                  className="border-0"
                  style={{ overflow: 'hidden' }}
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
