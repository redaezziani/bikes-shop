'use client';
import { useState } from 'react';
import {
  IconX,
  IconChevronRight,
  IconWorld,
  IconUser,
} from '@tabler/icons-react';

const Header = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: 'Vehicles', hasSubmenu: true },
    { label: 'Energy', hasSubmenu: true },
    { label: 'Charging', hasSubmenu: true },
    { label: 'Discover', hasSubmenu: true },
    { label: 'Shop', hasSubmenu: false },
    { label: 'Support', hasSubmenu: false },
  ];

  return (
    <>
      <header className="w-full absolute px-4 py-3 flex justify-between items-center gap-4 z-50">
        <svg
          className="w-24"
          viewBox="0 0 342 35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7M308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7"
          ></path>
        </svg>
        <button
          onClick={() => setOpen(true)}
          className="py-1.5 px-4 bg-white/10 text-white font-bold capitalize text-sm rounded backdrop-blur-sm"
        >
          menu
        </button>
      </header>

      <div
        className={`fixed inset-0 bg-white z-50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button onClick={() => setOpen(false)} className="p-2">
              <IconX className="text-neutral-500" size={18} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button className="w-full flex items-center justify-between py-4 text-left border-b border-gray-200">
                    <span className="text-neutral-800 font-medium">
                      {item.label}
                    </span>
                    {item.hasSubmenu && (
                      <IconChevronRight
                        className=" text-neutral-500"
                        size={20}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
