// components/order-summary-panel.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconChevronUp,
  IconShoppingCart,
  IconBike,
  IconPalette,
  IconTool,
  IconX,
} from '@tabler/icons-react';
import {
  useBikeStore,
  getCurrentModel,
  getTotalPrice,
  Accessory,
} from '@/store/bike-store';

const OrderSummaryPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentModel = useBikeStore(getCurrentModel);
  const selectedColorName = useBikeStore((state) => state.selectedColor);
  const totalPrice = useBikeStore(getTotalPrice);
  const selectedAccessoryIds = useBikeStore(
    (state) => state.selectedAccessories,
  );

  const selectedAccessoriesDetails: Accessory[] = React.useMemo(() => {
    if (!currentModel) return [];
    const allAvailableAccs = new Map(
      currentModel.availableAccessories.map((acc) => [acc.id, acc]),
    );
    return selectedAccessoryIds
      .map((accId: string) => allAvailableAccs.get(accId))
      .filter((acc): acc is Accessory => acc !== undefined);
  }, [currentModel, selectedAccessoryIds]);

  const selectedColorHex = React.useMemo(() => {
    if (!currentModel) return null;
    const color = currentModel.colors.find((c) => c.name === selectedColorName);
    return color ? color.hex : null;
  }, [currentModel, selectedColorName]);

  if (!currentModel) return null;

  const summaryVariants = {
    collapsed: {
      height: '64px',
      y: 0,
    },
    expanded: {
      height: '100vh',
      y: 0,
    },
  };

  return (
    <motion.div
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={summaryVariants}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-0 left-0 right-0 z-50 shadow-2xl overflow-hidden backdrop-blur-md ${
        isExpanded
          ? 'bg-white/95'
          : 'bg-neutral-900/95 md:left-auto md:right-8 md:bottom-0 md:w-80 md:rounded-xl'
      }`}
    >
      <div
        className={`flex justify-between border-t border-neutral-400/25 items-center px-4 py-4 md:px-6 md:py-4 transition-colors duration-300 cursor-pointer ${
          isExpanded
            ? 'bg-white text-neutral-900 border-b border-neutral-200'
            : ' bg-white text-neutral-800 md:rounded-t-xl'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <IconShoppingCart size={20} />
          <h3 className="font-semibold text-sm">
            {isExpanded ? 'Order Summary' : 'Total Price'}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className=" text-sm text-neutral-600 font-medium">
            ${totalPrice}
          </span>
          <motion.button whileTap={{ scale: 0.95 }}>
            {isExpanded ? (
              <IconX size={20} className="text-neutral-800" />
            ) : (
              <IconChevronUp size={20} className="text-neutral-800" />
            )}
          </motion.button>
        </div>
      </div>

      <div
        className={`p-6 overflow-y-auto ${isExpanded ? 'block' : 'hidden'}`}
        style={{ height: isExpanded ? 'calc(100vh - 64px)' : '0' }}
      >
        <h2 className="text-xl font-bold mb-8 text-neutral-800">
          Your Current Configuration
        </h2>

        {/* Model Section */}
        <div className="mb-8 p-4 border rounded-lg bg-neutral-50">
          <div className="flex items-center gap-3 mb-4">
            <IconBike size={20} className="text-neutral-700" />
            <h3 className=" font-semibold text-neutral-800">Bike Model</h3>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-neutral-200">
            <span className="font-medium text-sm">{currentModel.title}</span>
            <span className="font-bold text-lg">${currentModel.price}</span>
          </div>
          <div className="flex items-center gap-4 py-2">
            <IconPalette size={18} className="text-neutral-600" />
            <span className="text-sm text-neutral-600">Color:</span>
            <span className="font-medium text-sm capitalize">
              {selectedColorName}
            </span>
            <div
              className="size-5 rounded-md border border-neutral-300"
              style={{ backgroundColor: selectedColorHex || '#cccccc' }}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <IconTool size={20} className="text-neutral-700" />
            <h3 className="text-xl font-semibold text-neutral-900">
              Accessories ({selectedAccessoriesDetails.length})
            </h3>
          </div>

          {selectedAccessoriesDetails.length > 0 ? (
            <ul className="space-y-3">
              {selectedAccessoriesDetails.map((acc) => (
                <li
                  key={acc.id}
                  className="flex justify-between items-center p-3 rounded-lg border border-neutral-200"
                >
                  <span className="font-medium text-sm">{acc.title}</span>
                  <span className="font-semibold text-neutral-800">
                    ${acc.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500 p-3 bg-white rounded-lg border border-dashed text-sm">
              No accessories selected.
            </p>
          )}
        </div>

        <div className="pt-6 border-t-2 border-neutral-900">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-neutral-900">Order Total</h3>
            <span className="text-3xl font-extrabold text-green-600">
              ${totalPrice}
            </span>
          </div>
          <button className="mt-6 w-full py-3 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-neutral-800 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummaryPanel;
