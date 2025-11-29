'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  IconChevronUp,
  IconBike,
  IconX,
  IconShoppingBag,
  IconMail,
  IconUser,
} from '@tabler/icons-react';
import { useOrderStore } from '@/store/order';
import { showToast } from '@/lib/toast';
import { orderService } from '@/lib/order-service';
import type { Accessory } from '@/types/products';

const OrderSummaryPanel = ({
  currentProduct,
  selectedColorName,
  selectedAccessoryIds,
}: {
  currentProduct: any;
  selectedColorName: string;
  selectedAccessoryIds: number[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { customerInfo, setCustomerInfo, items, getTotalPrice: getStoreTotalPrice } = useOrderStore();

  // ✅ Compute derived values using useMemo OUTSIDE of Zustand selectors
  const selectedAccessoriesDetails = useMemo(() => {
    if (!currentProduct) return [];
    const allAvailableAccs = new Map(
      currentProduct.available_accessories.map((acc: Accessory) => [acc.id, acc]),
    );
    return selectedAccessoryIds
      .map((accId: number) => allAvailableAccs.get(accId))
      .filter((acc): acc is Accessory => acc !== undefined);
  }, [currentProduct, selectedAccessoryIds]);

  const selectedColorHex = useMemo(() => {
    if (!currentProduct) return null;
    const color = currentProduct.colors.find(
      (c: any) => c.name === selectedColorName,
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
      (c: any) => c.name === selectedColorName,
    );

    if (selectedColor) {
      addItem(currentProduct, selectedColor, selectedAccessoriesDetails, 1);
      showToast.success(`${currentProduct.name} added to cart!`,
        `Color: ${selectedColorName} | Accessories: ${selectedAccessoriesDetails.length}`
      );
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
          : 'bg-white md:right-8 md:bottom-8 md:rounded-xl md:w-96'
      }`}
    >
      <div
        className={`flex justify-between border-neutral-400/25 items-center px-4 py-4 md:px-6 md:py-4 transition-colors duration-300 cursor-pointer ${
          isExpanded
            ? 'bg-white text-neutral-900 border-b border-neutral-200'
            : 'bg-white text-neutral-800 border-t md:border-t-0 md:rounded-t-xl'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <IconShoppingBag size={20} className="text-[#6760ff]" />
          <div className="flex flex-col gap-0.5">
            <h3 className="font-semibold text-sm">
              {isExpanded ? 'Order Configuration' : 'Order Summary'}
            </h3>
            <p className="text-xs text-neutral-500">{selectedAccessoriesDetails.length} accessories</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-neutral-500">Total</p>
            <span className="text-lg font-bold text-[#6760ff]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
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
        style={{ height: isExpanded ? 'calc(100vh - 80px)' : '0' }}
      >
        <h2 className="text-xl font-bold mb-6 text-neutral-800">
          Your Configuration
        </h2>

        {/* Product Section */}
        <div className="mb-6 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
          <div className="flex items-center gap-3 mb-4">
            <IconBike size={20} className="text-neutral-700" />
            <h3 className="font-semibold text-neutral-800">Product</h3>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dashed border-neutral-300">
            <span className="font-medium text-sm">{currentProduct.name}</span>
            <span className="font-medium text-lg">${currentProduct.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-4 py-2">
            <span className="text-sm text-neutral-600">Color:</span>
            <span className="font-medium text-sm capitalize">{selectedColorName}</span>
            <div
              className="size-5 rounded-md border border-neutral-300"
              style={{ backgroundColor: selectedColorHex || '#cccccc' }}
            />
          </div>
        </div>

        {/* Accessories Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-semibold text-neutral-800">
              Accessories ({selectedAccessoriesDetails.length})
            </h3>
          </div>

          {selectedAccessoriesDetails.length > 0 ? (
            <ul className="space-y-1 mb-4">
              {selectedAccessoriesDetails.map((acc) => (
                <li
                  key={acc.id}
                  className="flex justify-between items-center py-1 px-2 bg-neutral-50 rounded"
                >
                  <span className="font-medium text-neutral-800 text-xs">
                    {acc.title || acc.name}
                  </span>
                  <span className="font-medium text-xs text-neutral-600">
                    ${acc.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500 p-3 bg-white rounded-lg border border-dashed text-sm mb-4">
              No accessories selected.
            </p>
          )}
        </div>

        {/* Order Total */}
        <div className="pt-4 border-t border-neutral-300 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-neutral-800">Order Total</h3>
            <span className="text-xl font-bold text-[#6760ff]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!customerInfo.name.trim()) {
                showToast.error('Name required', 'Please enter your name');
                return;
              }

              if (!customerInfo.email.trim()) {
                showToast.error('Email required', 'Please enter your email address');
                return;
              }

              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
                showToast.error('Invalid email', 'Please enter a valid email address');
                return;
              }

              if (items.length === 0) {
                showToast.error('No items', 'Please add items to your order');
                return;
              }

              setIsSubmitting(true);

              try {
                const orderData = {
                  customer_name: customerInfo.name,
                  customer_email: customerInfo.email,
                  total_amount: getStoreTotalPrice(),
                  currency: 'usd' as const,
                  status: 'pending' as const,
                  items: items,
                };

                const result = await orderService.createOrder(orderData);

                if (result.success) {
                  showToast.success('Order created!', 'Redirecting to payment...');
                  // TODO: Redirect to Stripe payment
                } else {
                  showToast.error('Order failed', result.error);
                }
              } catch (error) {
                showToast.error('Error', 'Failed to create order');
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            {/* Name Input */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <IconUser
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                />
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(e.target.value, customerInfo.email)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-400 transition text-sm"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <IconMail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                />
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(customerInfo.name, e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-400 transition text-sm"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full mt-4 py-2.5 bg-[#6760ff] hover:bg-[#5650dd] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <IconShoppingBag size={16} />
                  Pay ${totalPrice.toFixed(2)}
                </>
              )}
            </motion.button>

            {items.length === 0 && (
              <p className="text-center text-xs text-neutral-500 mt-2">
                Add items to your cart to continue
              </p>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummaryPanel;
