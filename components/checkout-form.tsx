'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  IconMail,
  IconUser,
  IconShoppingCart,
  IconPhone,
  IconMapPin,
  IconNote,
} from '@tabler/icons-react';
import { useOrderStore } from '@/store/order';
import { showToast } from '@/lib/toast';
import { formatPrice } from '@/lib/format-price';

const CheckoutForm = () => {
  const {
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    customerCity,
    customerCountry,
    note,
    agreedToTerms,
    setCustomerInfo,
    setAgreedToTerms,
    getTotalPrice,
    items,
    getCheckoutPayload,
  } = useOrderStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    const fields = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress,
      city: customerCity,
      country: customerCountry,
      note: note,
      [field]: value,
    };

    setCustomerInfo(
      fields.name,
      fields.email,
      fields.phone,
      fields.address,
      fields.city,
      fields.country,
      fields.note
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      showToast.error('Name required', 'Please enter your name');
      return;
    }

    if (!customerEmail.trim()) {
      showToast.error('Email required', 'Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      showToast.error('Invalid email', 'Please enter a valid email address');
      return;
    }

    if (!customerPhone.trim()) {
      showToast.error('Phone required', 'Please enter your phone number');
      return;
    }

    if (!customerAddress.trim()) {
      showToast.error('Address required', 'Please enter your address');
      return;
    }

    if (!customerCity.trim()) {
      showToast.error('City required', 'Please enter your city');
      return;
    }

    if (!customerCountry.trim()) {
      showToast.error('Country required', 'Please enter your country');
      return;
    }

    if (!agreedToTerms) {
      showToast.error('Terms required', 'Please agree to the terms and conditions');
      return;
    }

    if (items.length === 0) {
      showToast.error('No items', 'Please add items to your order');
      return;
    }

    setIsSubmitting(true);

    try {
      const checkoutPayload = getCheckoutPayload();

      // Call your Stripe checkout endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkoutPayload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Checkout failed');
      }

      const result = await response.json();

      if (result.url) {
        showToast.success('Order created!', 'Redirecting to payment...');

        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        showToast.error('Order failed', 'No payment URL received');
      }
    } catch (error) {
      showToast.error(
        'Error',
        error instanceof Error ? error.message : 'Failed to create order',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-xl border border-zinc-200 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-zinc-900">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <IconUser
              size={18}
              className="absolute left-3 top-3.5 text-zinc-400"
            />
            <input
              type="text"
              value={customerName}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <IconMail
              size={18}
              className="absolute left-3 top-3.5 text-zinc-400"
            />
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="john@example.com"
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition"
              required
            />
          </div>
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <IconPhone
              size={18}
              className="absolute left-3 top-3.5 text-zinc-400"
            />
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              placeholder="+971 50 123 4567"
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition"
              required
            />
          </div>
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Address
          </label>
          <div className="relative">
            <IconMapPin
              size={18}
              className="absolute left-3 top-3.5 text-zinc-400"
            />
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              placeholder="Street address"
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition"
              required
            />
          </div>
        </div>

        {/* City and Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={customerCity}
              onChange={(e) => handleFieldChange('city', e.target.value)}
              placeholder="Dubai"
              className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Country
            </label>
            <input
              type="text"
              value={customerCountry}
              onChange={(e) => handleFieldChange('country', e.target.value)}
              placeholder="UAE"
              className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition"
              required
            />
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Order Notes (Optional)
          </label>
          <div className="relative">
            <IconNote
              size={18}
              className="absolute left-3 top-3.5 text-zinc-400"
            />
            <textarea
              value={note}
              onChange={(e) => handleFieldChange('note', e.target.value)}
              placeholder="Any special instructions?"
              rows={3}
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition resize-none"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900"
            required
          />
          <label htmlFor="terms" className="text-sm text-zinc-700">
            I agree to the{' '}
            <a href="/terms-conditions" className="text-zinc-900 underline hover:text-zinc-700">
              terms and conditions
            </a>
          </label>
        </div>

        {/* Order Summary */}
        <div className="mt-6 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
          <div className="flex items-center gap-2 mb-3">
            <IconShoppingCart size={18} className="text-zinc-700" />
            <h3 className="font-semibold text-zinc-800">Order Summary</h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-zinc-600">
              <span>Items:</span>
              <span className="font-medium">{items.length}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-600">
              <span>Subtotal:</span>
              <span className="font-medium">{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="pt-2 border-t border-zinc-300 flex justify-between text-base font-semibold text-zinc-900">
              <span>Total:</span>
              <span className="text-[#6760ff]">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={
            isSubmitting ||
            !customerName.trim() ||
            !customerEmail.trim() ||
            !customerPhone.trim() ||
            !customerAddress.trim() ||
            !customerCity.trim() ||
            !customerCountry.trim() ||
            !agreedToTerms ||
            items.length === 0
          }
          className="w-full mt-6 py-3 bg-[#6760ff] hover:bg-[#5650dd] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <IconShoppingCart size={18} />
              Pay {formatPrice(getTotalPrice())}
            </>
          )}
        </motion.button>

        {items.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 mt-4">
            Add items to your cart to continue
          </p>
        ) : (
          (!customerName.trim() ||
           !customerEmail.trim() ||
           !customerPhone.trim() ||
           !customerAddress.trim() ||
           !customerCity.trim() ||
           !customerCountry.trim() ||
           !agreedToTerms) && (
            <p className="text-center text-sm text-zinc-500 mt-4">
              Please fill in all required fields and agree to terms to continue
            </p>
          )
        )}
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
