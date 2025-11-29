'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  IconChevronUp,
  IconBike,
  IconPalette,
  IconX,
  IconShoppingBag,
} from '@tabler/icons-react';
import { useProductsStore } from '@/store/products';
import { useOrderStore } from '@/store/order';

const OrderSummaryPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ Use stable selectors - get primitive values and objects from store
  const currentProduct = useProductsStore((state) => state.selectedProduct);
  const selectedColorName = useProductsStore((state) => state.selectedColor);
  const selectedAccessoryIds = useProductsStore(
    (state) => state.selectedAccessories,
  );

  // ✅ Compute derived values using useMemo OUTSIDE of Zustand selectors
  const selectedAccessoriesDetails = useMemo(() => {
    if (!currentProduct) return [];
    const allAvailableAccs = new Map(
      currentProduct.available_accessories.map((acc) => [acc.id, acc]),
    );
    return selectedAccessoryIds
      .map((accId: number) => allAvailableAccs.get(accId))
      .filter((acc): acc is any => acc !== undefined);
  }, [currentProduct, selectedAccessoryIds]);

  const selectedColorHex = useMemo(() => {
    if (!currentProduct) return null;
    const color = currentProduct.colors.find(
      (c) => c.name === selectedColorName,
    );
    return color ? color.hex : null;
  }, [currentProduct, selectedColorName]);

  const totalPrice = useMemo(() => {
    if (!currentProduct) return 0;
    const productPrice = currentProduct.price;
    const accessoriesPrice = selectedAccessoriesDetails.reduce(
      (sum, acc) => sum + acc.price,
      0,
    );
    return productPrice + accessoriesPrice;
  }, [currentProduct, selectedAccessoriesDetails]);

  const addItem = useOrderStore((state) => state.addItem);

  if (!currentProduct) return null;

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

  const handleAddToCart = () => {
    const selectedColor = currentProduct.colors.find(
      (c) => c.name === selectedColorName,
    );

    if (selectedColor) {
      addItem(currentProduct, selectedColor, selectedAccessoriesDetails, 1);
      // Optional: Show success message or redirect
      alert('Product added to cart!');
    }
  };

  return (
    <motion.div
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={summaryVariants}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-0 left-0 right-0 z-50 shadow-2xl overflow-hidden backdrop-blur-md ${
        isExpanded
          ? 'bg-white'
          : ' md:left-auto bg-white md:right-8 md:bottom-0 '
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
          <IconShoppingBag size={20} />
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
        <div className="mb-8 p-4 border border-neutral-700 rounded-lg bg-neutral-50">
          <div className="flex items-center gap-3 mb-4">
            <IconBike size={20} className="text-neutral-700" />
            <h3 className=" font-semibold text-neutral-800">Product</h3>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dashed border-neutral-400/45">
            <span className="font-medium text-sm">{currentProduct.name}</span>
            <span className=" font-medium text-lg">
              ${currentProduct.price}
            </span>
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
            <h3 className="text-sm font-semibold text-neutral-800">
              Accessories ({selectedAccessoriesDetails.length})
            </h3>
          </div>

          {selectedAccessoriesDetails.length > 0 ? (
            <ul className="space-y-1">
              {selectedAccessoriesDetails.map((acc) => (
                <li
                  key={acc.id}
                  className="flex justify-between items-center  py-1 "
                >
                  <span className="font-medium text-neutral-800 text-xs">
                    {acc.title || acc.name}
                  </span>
                  <span className=" font-medium text-xs text-neutral-600">
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

        <div className="pt-6 border-t border-neutral-400/45">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-neutral-800">Order Total</h3>
            <span className="text-xl font-semibold text-neutral-600">
              ${totalPrice}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full capitalize py-2.5 flex justify-center items-center gap-2  bg-[#6760ff]  text-white font-semibold rounded-lg hover:bg-[#5650dd] transition"
          >
            <p className=" text-sm">Pay With Strip</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummaryPanel;
