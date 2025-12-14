'use client';

import { useState, useEffect, useRef } from 'react';
import { IconBrandHipchat } from '@tabler/icons-react';
import { useRouter, usePathname } from 'next/navigation';

const AnimatedQuestions = ({ onClick }: { onClick?: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  const questions = [
    'Need help choosing a bike?',
    'Have questions about pricing?',
    'Want to schedule a test ride?',
    'Looking for bike accessories?',
    'Need maintenance advice?',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showInput) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [questions.length, showInput]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowInput(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      if (pathname === '/support') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`/support?q=${encodeURIComponent(searchInput)}`);
      } else {
        router.push(`/support?q=${encodeURIComponent(searchInput)}`);
      }
      setShowInput(false);
      setSearchInput('');
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowInput(false);
      setSearchInput('');
    }, 200);
  };

  if (showInput) {
    return (
      <form onSubmit={handleSearch} className="w-full h-5 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onBlur={handleBlur}
          placeholder="Type your question..."
          className="w-full h-full text-xs text-center text-zinc-700 font-semibold bg-transparent outline-none placeholder:text-zinc-400"
        />
      </form>
    );
  }

  return (
    <div className="relative h-5 w-full overflow-hidden cursor-pointer" onClick={handleClick}>
      {questions.map((question, index) => (
        <p
          key={index}
          className={`absolute w-full text-zinc-700 capitalize font-semibold text-xs text-center transition-all duration-500 ${
            index === currentIndex
              ? 'translate-y-0 opacity-100'
              : index ===
                (currentIndex - 1 + questions.length) % questions.length
              ? '-translate-y-full opacity-0'
              : 'translate-y-full opacity-0'
          }`}
        >
          {question}
        </p>
      ))}
    </div>
  );
};

const FixedBottomChatBot = () => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load the script once when component mounts
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.setAttribute(
        'data-resources-url',
        'https://widgets.leadconnectorhq.com/chat-widget/loader.js',
      );
      script.setAttribute('data-widget-id', '68ff41606126074c4d25b2b1');
      script.async = true;

      script.onload = () => {
        scriptLoadedRef.current = true;

        // Hide the default chat widget bubble button
        setTimeout(() => {
          const style = document.createElement('style');
          style.id = 'hide-chat-bubble';
          style.innerHTML = `
            #lc_text-widget--btn,
            .lc_text-widget--bubble {
              display: none !important;
            }
          `;
          document.head.appendChild(style);
        }, 500);
      };

      document.body.appendChild(script);
    }
  }, []);

  const handleChatClick = () => {
    // Trigger the chat widget button click
    const chatButton = document.querySelector('#lc_text-widget--btn, .lc_text-widget--bubble') as HTMLButtonElement;

    if (chatButton) {
      chatButton.click();
    } else {
      // If button not found yet, try again after a short delay
      setTimeout(() => {
        const retryButton = document.querySelector('#lc_text-widget--btn, .lc_text-widget--bubble') as HTMLButtonElement;
        if (retryButton) {
          retryButton.click();
        }
      }, 500);
    }
  };

  return (
    <>
      <section className="fixed gap-2 flex justify-center z-40 md:z-50 h-16 shadow-xl bg-white w-full bottom-0 pt-2 pb-6 px-4">
        <button
          onClick={handleChatClick}
          className="w-10 h-10 md:w-full border-zinc-400/45 sm:border sm:rounded gap-2 flex justify-center items-center hover:bg-zinc-50 transition-colors"
          aria-label="Open chat"
        >
          <IconBrandHipchat className="size-6 text-zinc-700" />
          <p className="hidden capitalize md:inline-block text-zinc-700 font-semibold text-xs">
            Chat with us
          </p>
        </button>
        <div className="border h-10 border-zinc-400/45 flex justify-center items-center gap-2 rounded w-full hover:bg-zinc-50 transition-colors overflow-hidden">
          <AnimatedQuestions />
        </div>
      </section>
    </>
  );
};

export default FixedBottomChatBot;
