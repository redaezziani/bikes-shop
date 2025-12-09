'use client';

import Link from 'next/link';
import { useState } from 'react';
import Script from 'next/script';

const Footer = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const footerLinks = [
    {
      label: 'Privacy Policy',
      link: '/privacy-policy',
    },
    {
      label: 'Terms & Conditions',
      link: '/terms-conditions',
    },
    {
      label: 'Warranty',
      link: '/warranty',
    },
    {
      label: 'Shipping & Returns',
      link: '/shipping-returns',
    },
  ];

  return (
    <footer className="  bg-white  border border-t border-zinc-300/26  w-full gap-6 pt-6 pb-20 md:pb-9 flex items-center justify-start flex-col px-4 min-h-96">
      <div className=" flex gap-4 justify-center items-center ">
        <Link
          href="https://www.komoot.com/user/along"
          aria-label="Follow us on Komoot"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className=" w-6 "
            src="https://images.icon-icons.com/3912/PNG/512/komoot_logo_icon_247893.png"
            alt="Komoot"
          />
        </Link>
        <Link
          href="https://www.instagram.com/weridealong"
          aria-label="Follow us on Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className=" w-7  invert  "
            src="https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68c29d91e957b241f6dccb80_instagram-logo.svg"
            alt="Instagram"
          />
        </Link>
        <Link
          href="https://www.youtube.com/@alongcargobikes"
          aria-label="Subscribe to our YouTube channel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className=" w-7  "
            src="https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68df22c37c9a4a25963b9931_black-and-white-youtube-icon.webp"
            alt="YouTube"
          />
        </Link>
        <Link
          href="https://wa.me/971523160662"
          aria-label="Contact us on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="   size-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            aria-hidden="true"
          >
            <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </Link>
        <Link
          href="https://www.linkedin.com/company/alongcargobikes/"
          aria-label="Connect with us on LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className=" w-5 invert "
            src="https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/6902c249d28cd1dbe350572e_linkedin-app-white-icon.webp"
            alt="LinkedIn"
          />
        </Link>
      </div>
      <div className="flex gap-6 justify-center text-zinc-600 font-semibold flex-col md:flex-row text-sm items-center ">
        <button
          onClick={() => setShowContactForm(true)}
          className="text-zinc-600 font-semibold hover:text-zinc-900 transition-colors"
        >
          Contact Us
        </button>
        {footerLinks.map((l, i) => {
          return (
            <Link key={`${l.label}-${i}`} className="" href={l.link}>
              {l.label}
            </Link>
          );
        })}
      </div>
      <Link href={'#'}>
        <img
          className="  w-7"
          alt="app-logo"
          src={
            'https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68faf44efb37ee0db06f7dfe_Conformit%C3%A9_Europ%C3%A9enne_(logo).svg'
          }
        />
      </Link>
      <Link href={'/'}>
        <img
          alt="ctf"
          className=" invert w-22"
          src={
            'https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68c4791a25d9d87f1f5436ce_Untitled%20(1200%20x%20720%20px)%20(7).png'
          }
        />
      </Link>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowContactForm(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-2xl my-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-zinc-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-zinc-900">
                Contact Us
              </h2>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-zinc-500 hover:text-zinc-700 text-2xl leading-none"
                aria-label="Close contact form"
              >
                &times;
              </button>
            </div>
            <div className="relative">
              <iframe
                src="https://serv.weridealong.com/widget/form/aYVTWBZRh8H9lEd0Q491"
                className="w-full border-none"
                id="inline-aYVTWBZRh8H9lEd0Q491"
                style={{ height: '600px' }}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Contact Form Website"
                data-height="1014"
                data-layout-iframe-id="inline-aYVTWBZRh8H9lEd0Q491"
                data-form-id="aYVTWBZRh8H9lEd0Q491"
                title="Contact Form Website"
              />
            </div>
          </div>
          <Script
            src="https://serv.weridealong.com/js/form_embed.js"
            strategy="lazyOnload"
          />
        </div>
      )}
    </footer>
  );
};

export default Footer;
