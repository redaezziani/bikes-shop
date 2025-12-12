'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  IconChevronUp,
  IconBike,
  IconX,
  IconShoppingBag,
  IconMail,
  IconUser,
  IconPhone,
  IconMapPin,
  IconNote,
} from '@tabler/icons-react';
import { useOrderStore } from '@/store/order';
import { showToast } from '@/lib/toast';
import type { Accessory, Product } from '@/types/products';

const OrderSummaryPanel = ({
  currentProduct,
  selectedColorName,
  selectedAccessoryIds,
}: {
  currentProduct: Product;
  selectedColorName: string;
  selectedAccessoryIds: number[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const customerInfo = useOrderStore((state) => state.customerInfo);
  const setCustomerInfo = useOrderStore((state) => state.setCustomerInfo);
  const items = useOrderStore((state) => state.items);
  const agreedToTerms = useOrderStore((state) => state.agreedToTerms);
  const setAgreedToTerms = useOrderStore((state) => state.setAgreedToTerms);
  const getCheckoutPayload = useOrderStore((state) => state.getCheckoutPayload);
  const addItem = useOrderStore((state) => state.addItem);

  // ✅ Compute derived values using useMemo OUTSIDE of Zustand selectors
  const selectedAccessoriesDetails = useMemo(() => {
    if (!currentProduct) return [];
    const allAvailableAccs = new Map(
      currentProduct.available_accessories.map((acc: Accessory) => [
        acc.id,
        acc,
      ]),
    );
    return selectedAccessoryIds
      .map((accId: number) => allAvailableAccs.get(accId))
      .filter((acc): acc is Accessory => acc !== undefined);
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

  return (
    <motion.div
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={summaryVariants}
      transition={{ duration: 0.3 }}
      className={`md:!h-auto md:relative md:shadow-none md:rounded-xl fixed bottom-0 left-0 right-0 z-50 shadow-2xl overflow-hidden md:overflow-visible backdrop-blur-md ${
        isExpanded
          ? 'bg-white md:bg-white'
          : 'bg-white md:bg-zinc-50 md:border md:border-zinc-200'
      }`}
    >
      <div
        className={`flex justify-between border-zinc-400/25 items-center px-4 py-4 md:px-6 md:py-4 transition-colors duration-300 cursor-pointer md:cursor-default ${
          isExpanded
            ? 'bg-white text-zinc-900 border-b border-zinc-200 md:bg-zinc-50'
            : 'bg-white text-zinc-800 border-t md:border-t-0 md:rounded-t-xl md:bg-zinc-50'
        }`}
        onClick={(e) => {
          if (window.innerWidth < 768) {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <IconShoppingBag size={20} className=" text-zinc-900" />
          <h3 className="font-semibold text-sm">
            {isExpanded ? 'Order Configuration' : 'Order Summary'}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-zinc-500">Total</p>
            <span className="text-lg font-bold  text-zinc-900">
              AED {totalPrice.toFixed(2)}
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
        className={`p-6 overflow-y-auto md:!block md:!h-auto ${isExpanded ? 'block' : 'hidden'}`}
      >
        <h2 className="text-xl font-bold mb-6 text-zinc-800">
          Your Configuration
        </h2>

        {/* Product Section */}
        <div className="mb-6 p-4 border border-zinc-200 rounded-lg bg-zinc-50">
          <div className="flex items-center gap-3 mb-4">
            <IconBike size={20} className="text-zinc-700" />
            <h3 className="font-semibold text-zinc-800">Product</h3>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dashed border-zinc-300">
            <span className="font-medium text-sm">{currentProduct.name}</span>
            <span className="font-medium text-lg">
              AED {currentProduct.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-4 py-2">
            <span className="text-sm text-zinc-600">Color:</span>
            <span className="font-medium text-sm capitalize">
              {selectedColorName}
            </span>
            <div
              className="size-5 rounded-md border border-zinc-300"
              style={{ backgroundColor: selectedColorHex || '#cccccc' }}
            />
          </div>
        </div>

        {/* Accessories Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-semibold text-zinc-800">
              Accessories ({selectedAccessoriesDetails.length})
            </h3>
          </div>

          {selectedAccessoriesDetails.length > 0 ? (
            <ul className="space-y-1 mb-4">
              {selectedAccessoriesDetails.map((acc) => (
                <li
                  key={acc.id}
                  className="flex justify-between items-center py-1 px-2 bg-zinc-50 rounded"
                >
                  <span className="font-medium text-zinc-800 text-xs">
                    {acc.title || acc.name}
                  </span>
                  <span className="font-medium text-xs text-zinc-600">
                    AED {acc.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-500 p-3 bg-white rounded-lg border border-dashed text-sm mb-4">
              No accessories selected.
            </p>
          )}
        </div>

        {/* Order Total */}
        <div className="pt-4 border-t border-zinc-300 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-zinc-800">Order Total</h3>
            <span className="text-xl font-bold  text-zinc-900">
              AED {totalPrice.toFixed(2)}
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
                showToast.error(
                  'Email required',
                  'Please enter your email address',
                );
                return;
              }

              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
                showToast.error(
                  'Invalid email',
                  'Please enter a valid email address',
                );
                return;
              }

              if (!agreedToTerms) {
                showToast.error(
                  'Terms required',
                  'Please agree to the terms and conditions',
                );
                return;
              }

              setIsSubmitting(true);

              try {
                // Add current product configuration to store if not already added
                const selectedColor = currentProduct.colors.find(
                  (c) => c.name === selectedColorName,
                );

                if (selectedColor) {
                  addItem(
                    currentProduct,
                    selectedColor,
                    selectedAccessoriesDetails,
                    1,
                  );
                }

                // Get the checkout payload with all items
                const checkoutPayload = getCheckoutPayload();

                console.log('Checkout Payload:', checkoutPayload);

                if (
                  !checkoutPayload.items ||
                  checkoutPayload.items.length === 0
                ) {
                  showToast.error('No items', 'Please add items to your order');
                  setIsSubmitting(false);
                  return;
                }

                if (
                  !checkoutPayload.customerName ||
                  !checkoutPayload.customerEmail
                ) {
                  showToast.error(
                    'Customer info missing',
                    'Please fill in your name and email',
                  );
                  setIsSubmitting(false);
                  return;
                }

                // Call the checkout endpoint
                const checkoutResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/checkout`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(checkoutPayload),
                  },
                );

                if (!checkoutResponse.ok) {
                  throw new Error('Failed to create checkout session');
                }

                const checkoutData = await checkoutResponse.json();

                if (checkoutData.url) {
                  // Redirect to Stripe checkout
                  window.location.href = checkoutData.url;
                } else {
                  showToast.error('Payment error', 'No checkout URL received');
                }
              } catch (error) {
                console.error('Checkout error:', error);
                showToast.error(
                  'Checkout failed',
                  error instanceof Error
                    ? error.message
                    : 'Failed to process checkout',
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            {/* Name Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <IconUser
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo(
                      e.target.value,
                      customerInfo.email,
                      customerInfo.phone,
                      customerInfo.address,
                      customerInfo.city,
                      customerInfo.country,
                      customerInfo.note,
                    )
                  }
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <IconMail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo(
                      customerInfo.name,
                      e.target.value,
                      customerInfo.phone,
                      customerInfo.address,
                      customerInfo.city,
                      customerInfo.country,
                      customerInfo.note,
                    )
                  }
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <IconPhone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo(
                      customerInfo.name,
                      customerInfo.email,
                      e.target.value,
                      customerInfo.address,
                      customerInfo.city,
                      customerInfo.country,
                      customerInfo.note,
                    )
                  }
                  placeholder="+971 50 123 4567"
                  className="w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                />
              </div>
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-2">
                Address (Optional)
              </label>
              <div className="relative">
                <IconMapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo(
                      customerInfo.name,
                      customerInfo.email,
                      customerInfo.phone,
                      e.target.value,
                      customerInfo.city,
                      customerInfo.country,
                      customerInfo.note,
                    )
                  }
                  placeholder="Street address"
                  className="w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                />
              </div>
            </div>

            {/* City and Country */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-2">
                  City (Optional)
                </label>
                <input
                  type="text"
                  value={customerInfo.city}
                  onChange={(e) =>
                    setCustomerInfo(
                      customerInfo.name,
                      customerInfo.email,
                      customerInfo.phone,
                      customerInfo.address,
                      e.target.value,
                      customerInfo.country,
                      customerInfo.note,
                    )
                  }
                  placeholder="Dubai"
                  className="w-full px-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-2">
                  Country (Optional)
                </label>
                <input
                  type="text"
                  value={customerInfo.country}
                  onChange={(e) =>
                    setCustomerInfo(
                      customerInfo.name,
                      customerInfo.email,
                      customerInfo.phone,
                      customerInfo.address,
                      customerInfo.city,
                      e.target.value,
                      customerInfo.note,
                    )
                  }
                  placeholder="UAE"
                  className="w-full px-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                />
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-2">
                Order Notes (Optional)
              </label>
              <div className="relative">
                <IconNote
                  size={18}
                  className="absolute left-3 top-3 text-zinc-500 pointer-events-none"
                />
                <textarea
                  value={customerInfo.note}
                  onChange={(e) =>
                    setCustomerInfo(
                      customerInfo.name,
                      customerInfo.email,
                      customerInfo.phone,
                      customerInfo.address,
                      customerInfo.city,
                      customerInfo.country,
                      e.target.value,
                    )
                  }
                  placeholder="Any special instructions?"
                  rows={3}
                  className="w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm resize-none"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-lg border border-zinc-200">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-5 h-5 text-zinc-900 bg-white border-2 border-zinc-400 rounded cursor-pointer focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 checked:bg-zinc-900 checked:border-zinc-900 accent-zinc-900"
                required
              />
              <label
                htmlFor="terms"
                className="text-xs text-zinc-700 cursor-pointer flex-1"
              >
                I agree to the{' '}
                <a
                  href="/terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 underline hover:text-zinc-700 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  terms and conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={
                isSubmitting ||
                !customerInfo.name.trim() ||
                !customerInfo.email.trim() ||
                !agreedToTerms
              }
              className="w-full mt-4 py-2.5 bg-zinc-950  disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <IconShoppingBag size={16} />
                  Pay AED {totalPrice.toFixed(2)}
                </>
              )}
            </motion.button>

            {(!customerInfo.name.trim() ||
              !customerInfo.email.trim() ||
              !agreedToTerms) && (
              <p className="text-center text-xs text-zinc-500 mt-2">
                Please fill in required fields and agree to terms to continue
              </p>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummaryPanel;
