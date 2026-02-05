'use client';
import { useState } from 'react';
import { IconX, IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import { useProducts } from '@/store/products';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null);

  const { data, isError, isLoading } = useProducts({ pageSize: 10 });
  const products = data?.data || [];

  const learnItems = [
    { name: 'Along Care', description: 'Learn about our free home service, 3-year warranty, and network of certified service partners.', href: '/care' },
    { name: 'Guides & Stories', description: 'Explore tips, safety advice, and stories from along riders.', href: '/guides' },
    { name: 'Support', description: 'Find answers to your questions or contact us.', href: '/support' },
    { name: 'About along', description: 'Learn about us here.', href: '/about' },
  ];

  const toggleSubmenu = (index: number) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);

  return (
    <>
      <header className="w-[95%]  rounded-lg mt-2 mx-auto absolute px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex justify-between items-center gap-4 z-50">
        <Link href="/" className=" cursor-pointer" aria-label="Go to homepage">
          <svg
            className="w-26  lg:w-28 text-white fill-white"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 100 45"
            aria-hidden="true"
          >
            <g>
              <path d="M97.37,10.74c-.13-1.2-2.55-.93-3.49-.87-1.69.12-1.85.28-1.72,2.05-3.98-4.2-10.41-2.93-13.35,1.8-1.81,2.91-2.15,7.05-.94,10.25,2.17,5.71,9.96,8.09,14.29,3.29-.14,1.4.04,2.78-.79,4.01-1.55,2.28-5.21,2.61-7.43,1.21-.59-.37-1.02-.99-1.7-1.22-2.58.5-6.48.36-3.31,3.8,3.73,4.04,12.34,4.37,16.05.19,1.87-2.11,2.31-4.94,2.43-7.67.25-5.54-.17-11.29-.04-16.85ZM86.98,24.96c-6.03-.41-6.01-9.86-.35-10.57,7.78-.98,7.52,11.06.35,10.57Z" />
              <path d="M22.42,9.89c-.63-.1-2.79-.09-3.41.02-.17.03-.57.2-.65.38l-.09,1.51c-4.04-4.16-10.92-2.62-13.96,1.95-2.96,4.47-2.37,11.79,2.16,15.03,3.52,2.52,8.88,2.68,11.74-.87.17.51-.17,1.81.54,2.02.31.09,4.02.06,4.25-.04.12-.05.23-.21.32-.32l.04-18.95c-.08-.4-.56-.66-.94-.72ZM13.98,25.59c-7.83.92-8.01-10.42-1.48-11.2,7.24-.87,7.64,10.48,1.48,11.2Z" />
              <path d="M54.96,20.81c.36-6.65-4.48-11.93-11.27-11.4-4.97.39-8.91,4.24-9.3,9.23-1.21,15.32,19.85,15.78,20.58,2.17ZM43.94,14.39c7.51-.86,7.58,11.9.22,11.21-6.05-.56-5.92-10.56-.22-11.21Z" />
              <path d="M75.03,16.08c-.47-5.81-6.5-8.37-11.36-5.62l-1.55,1.33c.19-.5.09-1.42-.39-1.71-.48-.29-3.22-.28-3.88-.19-.46.06-.82.24-.94.72l.04,18.96c.09.12.22.23.35.29.38.16,3.7.18,4.25.1.66-.09.66-.76.7-1.34.25-3.29-.29-6.96,0-10.24.43-5.05,6.95-5.28,7.51-1.11.48,3.59-.31,8.06.03,11.73.05.52.13.88.7.96.44.06,4.06.04,4.29-.07.66-.31.26-1.41.25-1.91-.08-3.83.31-8.15,0-11.89Z" />
              <path d="M27.16,29.95c.57.11,3.6.09,4.21,0,.52-.08.73-.43.72-.94l-.02-25.94c-.07-.48-.19-.75-.7-.83-.51-.08-3.92-.09-4.31.02-.25.07-.49.4-.48.67v26.33c.08.32.24.64.58.71Z" />
            </g>
            <g>
              <path d="M27.59,38.83c.27,0,.5.07.69.2.19.13.34.31.43.54h1.28c-.12-.57-.39-1.02-.81-1.35-.42-.33-.94-.5-1.57-.5-.48,0-.91.11-1.28.32-.37.21-.65.51-.85.9-.2.39-.3.82-.3,1.32s.1.93.3,1.32c.2.39.48.68.85.9.37.21.79.32,1.28.32.63,0,1.16-.17,1.57-.5.42-.34.68-.79.81-1.35h-1.28c-.09.23-.24.4-.43.54-.19.13-.43.2-.69.2-.35,0-.64-.13-.85-.38-.22-.26-.32-.6-.32-1.03s.11-.78.32-1.04c.22-.26.5-.39.85-.39Z" />
              <path d="M32.22,37.8l-1.83,4.95h1.27l.31-.91h1.87l.31.91h1.28l-1.83-4.95h-1.39ZM32.29,40.92l.63-1.83.62,1.83h-1.25Z" />
              <path d="M40.11,42.75l-1.18-1.96c.38-.09.67-.27.87-.52.2-.25.3-.56.3-.92,0-.31-.07-.58-.2-.81-.14-.24-.34-.42-.61-.56-.27-.14-.61-.2-1-.2h-2.06v4.98h1.21v-1.88h.27l1.08,1.88h1.33ZM38.17,40.04h-.75v-1.26h.75c.23,0,.41.06.53.17.12.11.17.27.17.47s-.06.36-.17.47c-.11.11-.29.16-.53.16Z" />
              <path d="M45.7,41.14v-1.19h-2.53v.87h1.52c-.09.29-.24.52-.46.67-.22.16-.47.24-.75.24-.45,0-.79-.13-1.03-.38-.24-.25-.36-.62-.36-1.09,0-.44.12-.78.35-1.04.23-.26.54-.38.92-.38.24,0,.45.05.63.16.17.11.3.25.39.43h1.28c-.1-.52-.35-.93-.75-1.24-.4-.31-.92-.46-1.54-.46-.5,0-.93.11-1.31.32-.37.21-.66.51-.87.9-.2.39-.31.82-.31,1.32s.1.93.31,1.32c.2.39.49.68.87.9.38.21.81.32,1.32.32.41,0,.78-.08,1.1-.23.32-.16.59-.36.79-.61.21-.25.36-.52.45-.81Z" />
              <path d="M51.27,38.93c-.22-.39-.52-.69-.91-.91-.38-.22-.81-.33-1.28-.33s-.89.11-1.27.33c-.38.22-.69.52-.91.91-.22.39-.33.83-.33,1.31s.11.93.33,1.32c.22.39.53.69.91.91.38.22.81.33,1.27.33s.89-.11,1.27-.33c.38-.22.69-.52.91-.91.22-.39.33-.83.33-1.32s-.11-.93-.33-1.31ZM50.02,41.28c-.23.26-.55.39-.94.39s-.71-.13-.94-.39c-.23-.26-.35-.61-.35-1.04s.12-.79.35-1.05c.23-.26.55-.38.94-.38s.71.13.94.39c.23.26.35.61.35,1.04s-.12.78-.35,1.04Z" />
              <path d="M57.38,40.18c.26-.06.47-.19.63-.39.16-.2.24-.45.24-.75,0-.41-.14-.72-.42-.94s-.67-.33-1.18-.33h-2.26v4.98h2.32c.53,0,.94-.12,1.22-.36.28-.24.43-.57.43-1,0-.29-.09-.55-.26-.77-.18-.22-.41-.37-.72-.44ZM55.59,38.73h.78c.43,0,.64.18.64.54s-.21.54-.63.54h-.79v-1.07ZM56.45,41.77h-.86v-1.12h.85c.22,0,.38.05.5.15.12.1.18.24.18.42,0,.37-.22.55-.67.55Z" />
              <rect x="59.43" y="37.77" width="1.2" height="4.98" />
              <polygon points="61.9 37.77 61.9 42.75 63.11 42.75 63.11 40.51 64.8 42.75 66.26 42.75 64.25 40.2 66.26 37.77 64.81 37.77 63.11 39.96 63.11 37.77 61.9 37.77" />
              <polygon points="70.16 38.72 70.16 37.77 67.06 37.77 67.06 42.75 70.16 42.75 70.16 41.78 68.27 41.78 68.27 40.68 69.95 40.68 69.95 39.77 68.27 39.77 68.27 38.72 70.16 38.72" />
              <path d="M74.06,40.1c-.2-.11-.46-.21-.78-.32-.22-.08-.39-.15-.51-.2-.12-.05-.21-.12-.29-.2-.08-.08-.12-.18-.12-.3,0-.15.04-.26.13-.33.09-.08.2-.11.34-.11.16,0,.29.05.39.14.1.1.16.23.18.39h1.3c-.04-.46-.23-.82-.55-1.09s-.77-.39-1.32-.39c-.34,0-.65.06-.91.17-.27.12-.47.28-.62.5-.15.22-.23.47-.23.77,0,.32.07.58.21.78.14.2.31.35.51.45.2.1.46.21.77.31.22.08.39.14.51.19.12.05.22.12.31.21.08.08.12.19.12.32,0,.14-.04.25-.13.34-.09.08-.21.13-.37.13-.18,0-.33-.05-.44-.16-.12-.11-.18-.26-.2-.44h-1.28c.03.49.23.87.59,1.14.36.27.82.41,1.38.41.37,0,.69-.07.95-.2.26-.13.46-.31.59-.53s.2-.46.2-.73c0-.32-.07-.59-.22-.79-.15-.2-.32-.36-.52-.46Z" />
            </g>
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="relative">
            <button
              onClick={() => {
                setModelsDropdownOpen(!modelsDropdownOpen);
                setLearnDropdownOpen(false);
              }}
              className="text-white font-bold text-lg hover:text-zinc-200 transition-colors flex items-center gap-1"
              aria-label="View bike models"
              aria-expanded={modelsDropdownOpen}
              aria-haspopup="true"
            >
              Models
              <IconChevronDown
                size={20}
                className={`transition-transform ${
                  modelsDropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {modelsDropdownOpen && (
              <div className="absolute top-full -ml-44 -left-1/2 mt-2 bg-white rounded-lg shadow-lg min-w-[340px] py-2 z-50">
                {products.length > 0 ? (
                  products.filter(p => p?.slug && p?.name).map((p) => {
                    const imageUrl = p?.preview_images?.[0]?.url || p?.cover_image?.url;
                    return (
                      <Link
                        key={p.id}
                        href={`/models/${p.slug}`}
                        onClick={() => setModelsDropdownOpen(false)}
                        className="flex gap-3 cursor-pointer items-center px-4 py-3 hover:bg-zinc-50 transition-colors"
                      >
                        {imageUrl && (
                          <div className="w-14 h-14 rounded overflow-hidden shrink-0 bg-gray-100">
                            <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-zinc-800 text-lg">
                            {p.name}
                          </h3>
                          <p className="text-base text-zinc-500">
                            Explore and Learn
                          </p>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="px-4 py-3 text-zinc-600 text-lg">
                    No models available
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setLearnDropdownOpen(!learnDropdownOpen);
                setModelsDropdownOpen(false);
              }}
              className="text-white font-bold text-lg hover:text-zinc-200 transition-colors flex items-center gap-1"
              aria-label="Learn menu"
              aria-expanded={learnDropdownOpen}
              aria-haspopup="true"
            >
              Learn
              <IconChevronDown
                size={20}
                className={`transition-transform ${
                  learnDropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {learnDropdownOpen && (
              <div className="absolute top-full -ml-44 -left-1/2 mt-2 bg-white rounded-lg shadow-lg min-w-[340px] py-2 z-50">
                {learnItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => setLearnDropdownOpen(false)}
                    className="flex gap-3 cursor-pointer items-center px-4 py-3 hover:bg-zinc-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-zinc-800 text-lg">
                        {item.name}
                      </h3>
                      <p className="text-base text-zinc-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/order"
            className="text-white cursor-pointer font-bold text-lg hover:text-zinc-200 transition-colors"
          >
            Order
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden py-2 px-3 sm:px-4 backdrop-blur-lg bg-white/10 w-20 flex justify-center items-center rounded-lg cursor-pointer  text-white font-bold capitalize text-sm  transition-colors"
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          Menu
        </button>
      </header>

      <div
        className={`fixed inset-0 bg-white z-50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setOpen(false)}
              className="p-2"
              aria-label="Close navigation menu"
            >
              <IconX className="text-zinc-500" size={18} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6">
            <ul>
              <li>
                <button
                  onClick={() => toggleSubmenu(1)}
                  className="w-full flex items-center justify-between py-4 text-left border-b border-gray-200"
                  aria-label="Models menu"
                  aria-expanded={expandedMenu === 1}
                >
                  <span className="text-zinc-800 font-medium uppercase text-sm">
                    Models
                  </span>
                  <IconChevronDown
                    className={`text-zinc-500 transition-transform ${
                      expandedMenu === 1 ? 'rotate-180' : ''
                    }`}
                    size={20}
                    aria-hidden="true"
                  />
                </button>

                {expandedMenu === 1 && (
                  <div className="py-4 space-y-4">
                    {products.filter(p => p?.slug && p?.name).map((p) => {
                      const imageUrl = p?.preview_images?.[0]?.url || p?.cover_image?.url;
                      return (
                        <Link
                          href={`/models/${p.slug}`}
                          key={p.id}
                          onClick={() => setOpen(false)}
                          className="flex gap-4 items-start"
                        >
                          {imageUrl && (
                            <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-gray-100">
                              <img
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium text-zinc-800">
                              {p.name}
                            </h3>
                            <p className="text-sm text-zinc-500 mt-1">
                              Explore and Learn
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={() => toggleSubmenu(0)}
                  className="w-full flex items-center justify-between py-4 text-left border-b border-gray-200"
                  aria-label="Learn menu"
                  aria-expanded={expandedMenu === 0}
                >
                  <span className="text-zinc-800 font-medium uppercase text-sm">
                    Learn
                  </span>
                  <IconChevronDown
                    className={`text-zinc-500 transition-transform ${
                      expandedMenu === 0 ? 'rotate-180' : ''
                    }`}
                    size={20}
                    aria-hidden="true"
                  />
                </button>

                {expandedMenu === 0 && (
                  <div className="py-4 space-y-2">
                    {learnItems.map((item, index) => (
                      <Link
                        href={item.href}
                        key={index}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={() => setOpen(false)}
                        className="flex gap-4 items-start px-2 py-2 hover:bg-zinc-50 rounded transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-zinc-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-zinc-500 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              <li>
                <Link
                  href="/order"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-left border-b border-gray-200"
                >
                  <span className="text-zinc-800 font-medium uppercase text-sm">
                    Order
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
