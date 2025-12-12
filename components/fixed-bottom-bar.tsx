'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const FixedBottomBar = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isBookingOpen]);

  return (
    <>
      <section className="fixed gap-2 flex justify-center z-40 h-16 shadow-xl bg-white w-full bottom-0 pt-2 pb-6 px-4">
        <Link
          href="https://wa.me/971523160662"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 md:w-full border-zinc-400/45 sm:border sm:rounded gap-2 flex justify-center items-center"
          aria-label="chat with us via WhatsAp"
        >
          <svg
            className="fill-[#32870f] stroke-[#32870f] size-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            aria-hidden="true"
          >
            <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          <p className="hidden capitalize md:inline-block text-[#32870f]  font-semibold text-xs">
            chat with us via WhatsAp
          </p>
        </Link>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="border h-10 border-zinc-400/45 flex justify-center items-center gap-2 rounded w-full hover:bg-zinc-50 transition-colors"
          aria-label="Schedule Your Free Test Ride "
        >
          <p className="text-zinc-700 capitalize font-semibold text-xs">
            Schedule Your Free Test Ride
          </p>
        </button>
      </section>

      {isBookingOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsBookingOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-2xl my-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-zinc-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-zinc-900">
                Book Your Free Test Ride
              </h2>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-zinc-500 hover:text-zinc-700 text-2xl leading-none"
                aria-label="Close booking modal"
              >
                &times;
              </button>
            </div>
            <div className="relative">
              <iframe
                src="https://serv.weridealong.com/widget/booking/wef0aZg0sfgL02L9LBGO"
                className="w-full border-none"
                scrolling="yes"
                id="wef0aZg0sfgL02L9LBGO_1765285350500"
                style={{ height: '600px' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FixedBottomBar;
