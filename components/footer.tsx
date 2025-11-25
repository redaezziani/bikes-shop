import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const footerLinks = [
    {
      label: 'Contact Us',
      link: '/contact-us',
    },
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
      link: '/along-warranty-policy',
    },
    {
      label: 'Shipping & Returns',
      link: '/shipping-returns-policy',
    },
  ];

  return (
    <footer className="   bg-neutral-950 text-white w-full gap-6 pt-6 pb-20 flex items-center justify-start flex-col px-4 min-h-96">
      <span className=" p-[0.5px] bg-white w-3/4" />
      <div className=" flex gap-4 justify-center items-center ">
        <img
          className=" w-7  "
          src="https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68c29d91e957b241f6dccb80_instagram-logo.svg"
          alt=""
        />
        <img
          className=" w-7 invert "
          src="https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68df22c37c9a4a25963b9931_black-and-white-youtube-icon.webp"
          alt=""
        />
        <img
          className=" w-7 invert "
          src="https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68df22c46f6856d122d30db2_brand_strava_icon_158683.png"
          alt=""
        />
        <img
          className=" w-5  "
          src="https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/6902c249d28cd1dbe350572e_linkedin-app-white-icon.webp"
          alt=""
        />
      </div>
      <div className="flex gap-6 justify-center flex-col text-sm items-center ">
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
          className=" invert w-7"
          src={
            'https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68faf44efb37ee0db06f7dfe_Conformit%C3%A9_Europ%C3%A9enne_(logo).svg'
          }
        />
      </Link>
      <Link href={'/'}>
        <img
          className=" w-22"
          src={
            'https://cdn.prod.website-files.com/68c299a1ec39f7800f96ca9a/68c4791a25d9d87f1f5436ce_Untitled%20(1200%20x%20720%20px)%20(7).png'
          }
        />
      </Link>
    </footer>
  );
};

export default Footer;
