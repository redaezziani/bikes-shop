import React from 'react';

const Footer = () => {
  const footerLinks = [];
  return (
    <footer className="   bg-neutral-950 text-white w-full gap-4 py-6 flex items-center justify-start flex-col px-4 min-h-96">
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
    </footer>
  );
};

export default Footer;
