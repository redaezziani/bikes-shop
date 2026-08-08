'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Script from 'next/script';
import { IconChevronUp, IconX, IconMessageCircle } from '@tabler/icons-react';
import { formatPrice } from '@/lib/format-price';
import type { UsedModel } from '@/types/used-models';

const UsedModelContactPanel = ({
  currentModel,
}: {
  currentModel: UsedModel;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const summaryVariants = {
    collapsed: {
      height: '64px',
      y: 0,
    },
    expanded: {
      height: 'auto',
      y: 0,
    },
  };

  return (
    <>
      <motion.div
        initial="collapsed"
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={summaryVariants}
        transition={{ duration: 0.3 }}
        className={`md:h-auto! md:relative md:shadow-none md:rounded-xl fixed bottom-0 left-0 right-0 z-40 shadow-2xl overflow-hidden md:overflow-visible backdrop-blur-md flex flex-col ${
          isExpanded
            ? 'bg-white md:bg-white'
            : 'bg-white  md:border md:border-zinc-200'
        }`}
      >
        <div
          className={`flex justify-between border-zinc-400/25 items-center px-4 py-4 md:px-6 md:py-4 transition-colors duration-300 cursor-pointer md:cursor-default ${
            isExpanded
              ? 'bg-white text-zinc-900 border-b border-zinc-200 '
              : 'bg-white text-zinc-800 border-t md:border-t-0 md:rounded-t-xl '
          }`}
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <div className="flex items-center gap-3">
            <IconMessageCircle size={20} className=" text-zinc-900" />
            <h3 className="font-semibold text-sm">{currentModel.name}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-zinc-500">Price</p>
              <span className="text-lg font-bold  text-zinc-900">
                {formatPrice(currentModel.price)}
              </span>
            </div>
            <motion.button whileTap={{ scale: 0.95 }} className="md:hidden">
              {isExpanded ? (
                <IconX size={20} className="text-zinc-800" />
              ) : (
                <IconChevronUp size={20} className="text-zinc-800" />
              )}
            </motion.button>
          </div>
        </div>

        <div
          className={`p-6 md:!block flex-1 ${isExpanded ? 'block' : 'hidden'}`}
        >
          {currentModel.description && (
            <p className="text-sm text-zinc-600 mb-4">
              {currentModel.description}
            </p>
          )}
          <button
            onClick={() => setShowContactForm(true)}
            className="w-full py-2.5 bg-zinc-950 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <IconMessageCircle size={16} />
            Contact us about this bike
          </button>
        </div>
      </motion.div>

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
            <p className="px-4 pt-4 text-sm text-zinc-600">
              Interested in the <strong>{currentModel.name}</strong> (
              {formatPrice(currentModel.price)})? Send us a message below and
              we&apos;ll get back to you.
            </p>
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
    </>
  );
};

export default UsedModelContactPanel;
