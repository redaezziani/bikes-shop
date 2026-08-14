'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  IconChevronUp,
  IconX,
  IconShoppingBag,
  IconMail,
  IconUser,
  IconPhone,
  IconMapPin,
  IconNote,
  IconLock,
} from '@tabler/icons-react';
import { useOrderStore } from '@/store/order';
import { showToast } from '@/lib/toast';
import { formatPrice } from '@/lib/format-price';
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

  const isColorOutOfStock = useMemo(() => {
    if (!currentProduct) return false;
    const color = currentProduct.colors.find(
      (c) => c.name === selectedColorName,
    );
    return color ? color.quantity !== undefined && color.quantity < 1 : false;
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
      className={`md:h-auto! md:relative md:shadow-none md:rounded-xl fixed bottom-0 left-0 right-0 z-50 shadow-2xl overflow-hidden md:overflow-visible backdrop-blur-md flex flex-col ${
        isExpanded
          ? 'bg-white md:bg-white'
          : 'bg-white  md:border md:border-zinc-200'
      }`}
      style={isExpanded ? { maxHeight: '100vh' } : undefined}
    >
      <div
        className={`flex justify-between border-zinc-400/25 items-center px-4 py-4 md:px-6 md:py-4 transition-colors duration-300 cursor-pointer md:cursor-default ${
          isExpanded
            ? 'bg-white text-zinc-900 border-b border-zinc-200 '
            : 'bg-white text-zinc-800 border-t md:border-t-0 md:rounded-t-xl '
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
              {formatPrice(totalPrice)}
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
        className={`p-6 overflow-y-auto md:!block md:!h-auto flex-1 overscroll-contain ${
          isExpanded ? 'block' : 'hidden'
        }`}
      >
        <h2 className="text-xl font-bold mb-6 text-zinc-800">Your Order</h2>

        {/* Product Section */}
        <div className="mb-6 p-4 border border-zinc-200 rounded-lg bg-zinc-50">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-semibold text-zinc-800">Model</h3>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dashed border-zinc-300">
            <span className="font-medium text-sm">{currentProduct.name}</span>
            <span className="font-medium text-lg">
              {formatPrice(currentProduct.price)}
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
            {isColorOutOfStock && (
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
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
                    {formatPrice(acc.price)}
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
              {formatPrice(totalPrice)}
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

              if (!customerInfo.phone.trim()) {
                showToast.error(
                  'Phone required',
                  'Please enter your phone number',
                );
                return;
              }

              if (!customerInfo.address.trim()) {
                showToast.error(
                  'Address required',
                  'Please enter your delivery address',
                );
                return;
              }

              if (!customerInfo.city.trim()) {
                showToast.error('City required', 'Please enter your city');
                return;
              }

              if (!customerInfo.country.trim()) {
                showToast.error(
                  'Country required',
                  'Please enter your country',
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
                // Validate product data
                if (!currentProduct?.documentId) {
                  showToast.error(
                    'Invalid product',
                    'Product information is incomplete',
                  );
                  setIsSubmitting(false);
                  return;
                }

                // Add current product configuration to store if not already added
                const selectedColor = currentProduct.colors.find(
                  (c) => c.name === selectedColorName,
                );

                if (!selectedColor) {
                  showToast.error(
                    'Color not found',
                    'Please select a valid color',
                  );
                  setIsSubmitting(false);
                  return;
                }

                // Check if selected color is in stock
                if (
                  selectedColor.quantity !== undefined &&
                  selectedColor.quantity < 1
                ) {
                  showToast.error(
                    'Out of stock',
                    `The ${selectedColor.name} color is currently out of stock`,
                  );
                  setIsSubmitting(false);
                  return;
                }

                // Validate accessories have required data
                const invalidAccessories = selectedAccessoriesDetails.filter(
                  (acc) => !acc.id || !acc.price,
                );
                if (invalidAccessories.length > 0) {
                  showToast.error(
                    'Invalid accessories',
                    'Some accessories are missing required information',
                  );
                  setIsSubmitting(false);
                  return;
                }

                addItem(
                  currentProduct,
                  selectedColor,
                  selectedAccessoriesDetails,
                  1,
                );

                // Get the checkout payload with all items
                const checkoutPayload = getCheckoutPayload();

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

                // Validate API URL is configured
                if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
                  showToast.error(
                    'Configuration error',
                    'Payment system is not properly configured',
                  );
                  setIsSubmitting(false);
                  return;
                }

                // Call the checkout endpoint with timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

                try {
                  const checkoutResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/checkout`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(checkoutPayload),
                      signal: controller.signal,
                    },
                  );

                  clearTimeout(timeoutId);

                  if (!checkoutResponse.ok) {
                    const errorData = await checkoutResponse
                      .json()
                      .catch(() => null);
                    const errorMessage =
                      errorData?.error ||
                      errorData?.message ||
                      `Server error (${checkoutResponse.status})`;
                    throw new Error(errorMessage);
                  }

                  const checkoutData = await checkoutResponse.json();

                  if (!checkoutData || typeof checkoutData !== 'object') {
                    throw new Error('Invalid response from server');
                  }

                  if (checkoutData.url) {
                    // Redirect to Stripe checkout
                    window.location.href = checkoutData.url;
                  } else {
                    showToast.error(
                      'Payment error',
                      'No checkout URL received from server',
                    );
                  }
                } catch (fetchError) {
                  clearTimeout(timeoutId);

                  if (fetchError instanceof Error) {
                    if (fetchError.name === 'AbortError') {
                      throw new Error(
                        'Request timed out. Please check your connection and try again.',
                      );
                    }
                    throw fetchError;
                  }
                  throw new Error('Network error occurred');
                }
              } catch (error) {
                let errorTitle = 'Checkout failed';
                let errorMessage = 'Failed to process checkout';

                if (error instanceof Error) {
                  errorMessage = error.message;

                  // Provide user-friendly messages for common errors
                  if (error.message.includes('Failed to fetch')) {
                    errorTitle = 'Connection error';
                    errorMessage =
                      'Unable to connect to server. Please check your internet connection.';
                  } else if (error.message.includes('NetworkError')) {
                    errorTitle = 'Network error';
                    errorMessage = 'Network issue detected. Please try again.';
                  } else if (error.message.includes('timeout')) {
                    errorTitle = 'Request timeout';
                    errorMessage =
                      'The request took too long. Please try again.';
                  }
                }

                showToast.error(errorTitle, errorMessage);
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
                Phone Number
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
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                />
              </div>
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-2">
                Address
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
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                />
              </div>
            </div>

            {/* City and Country */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-2">
                  City
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
                  required
                  className="w-full px-3 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-400 transition text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-2">
                  Country
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
                  required
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
                !customerInfo.phone.trim() ||
                !customerInfo.address.trim() ||
                !customerInfo.city.trim() ||
                !customerInfo.country.trim() ||
                !agreedToTerms ||
                isColorOutOfStock
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
                  Pay {formatPrice(totalPrice)}
                </>
              )}
            </motion.button>

            <div className="flex flex-col items-center gap-1.5 mt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                <IconLock size={14} className="text-zinc-500" />
                <span>Secure credit card payment &mdash; powered by Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 48 32"
                  className="h-6 w-auto"
                  aria-label="Visa"
                  role="img"
                >
                  <rect width="48" height="32" rx="4" fill="#1A1F71" />
                  <path
                    fill="#fff"
                    d="M20.6 21.2h-2.9l1.8-10.4h2.9zm11.8-10.2c-.6-.2-1.5-.5-2.6-.5-2.9 0-4.9 1.5-4.9 3.6 0 1.6 1.5 2.5 2.7 3s1.6 1 1.6 1.5c0 .8-1 1.2-1.9 1.2-1.3 0-2-.2-3-.6l-.4-.2-.5 2.7c.7.3 2 .6 3.3.6 3.1 0 5.1-1.5 5.1-3.7 0-1.2-.8-2.2-2.5-3-1.1-.5-1.7-.9-1.7-1.4 0-.5.6-1 1.8-1 1 0 1.8.2 2.3.5l.3.1zm7.4-.2h-2.2c-.7 0-1.2.2-1.5.9l-4.3 9.5h3.1s.5-1.3.6-1.6h3.8c.1.4.4 1.6.4 1.6h2.8zm-3.6 6.7c.2-.6 1.2-3.1 1.2-3.1 0 0 .2-.6.4-1.1l.2 1s.6 2.6.7 3.2zm-17.7-6.7-2.9 7.1-.3-1.5c-.5-1.7-2.1-3.6-3.9-4.5l2.6 9.3h3.1l4.6-10.4z"
                  />
                  <path
                    fill="#F9A51A"
                    d="M11.6 10.8H6.9l-.1.3c3.7.9 6.1 3.1 7.1 5.8l-1-5.2c-.2-.7-.7-.9-1.3-.9"
                  />
                </svg>
                <svg
                  viewBox="0 0 48 32"
                  className="h-6 w-auto"
                  aria-label="Mastercard"
                  role="img"
                >
                  <rect width="48" height="32" rx="4" fill="#fff" />
                  <circle cx="19" cy="16" r="9" fill="#EB001B" />
                  <circle cx="29" cy="16" r="9" fill="#F79E1B" />
                  <path
                    fill="#FF5F00"
                    d="M24 9.5a9 9 0 0 0 0 13 9 9 0 0 0 0-13z"
                  />
                </svg>
              </div>
              <p className="text-center text-[11px] text-zinc-500 max-w-xs">
                Card payments are processed securely by Stripe. We never
                store or have access to your card details.
              </p>
            </div>

            {isColorOutOfStock ? (
              <p className="text-center text-xs text-red-600 font-semibold mt-2 bg-red-50 py-2 px-3 rounded">
                The selected color is out of stock. Please choose another color.
              </p>
            ) : (
              (!customerInfo.name.trim() ||
                !customerInfo.email.trim() ||
                !customerInfo.phone.trim() ||
                !customerInfo.address.trim() ||
                !customerInfo.city.trim() ||
                !customerInfo.country.trim() ||
                !agreedToTerms) && (
                <p className="text-center text-xs text-zinc-500 mt-2">
                  Please fill in required fields and agree to terms to continue
                </p>
              )
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummaryPanel;
