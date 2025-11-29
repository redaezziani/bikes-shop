'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconMail, IconUser, IconShoppingCart } from '@tabler/icons-react';
import { useOrderStore } from '@/store/order';
import { showToast } from '@/lib/toast';
import { orderService } from '@/lib/order-service';

const CheckoutForm = () => {
  const { customerInfo, setCustomerInfo, getTotalPrice, items } = useOrderStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo(e.target.value, customerInfo.email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo(customerInfo.name, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        total_amount: getTotalPrice(),
        currency: 'usd',
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-xl border border-neutral-200 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-neutral-900">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <IconUser
              size={18}
              className="absolute left-3 top-3.5 text-neutral-400"
            />
            <input
              type="text"
              value={customerInfo.name}
              onChange={handleNameChange}
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 transition"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <IconMail
              size={18}
              className="absolute left-3 top-3.5 text-neutral-400"
            />
            <input
              type="email"
              value={customerInfo.email}
              onChange={handleEmailChange}
              placeholder="john@example.com"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 transition"
              required
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <IconShoppingCart size={18} className="text-neutral-700" />
            <h3 className="font-semibold text-neutral-800">Order Summary</h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Items:</span>
              <span className="font-medium">{items.length}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Subtotal:</span>
              <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-neutral-300 flex justify-between text-base font-semibold text-neutral-900">
              <span>Total:</span>
              <span className="text-[#6760ff]">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="w-full mt-6 py-3 bg-[#6760ff] hover:bg-[#5650dd] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <IconShoppingCart size={18} />
              Pay ${getTotalPrice().toFixed(2)}
            </>
          )}
        </motion.button>

        {items.length === 0 && (
          <p className="text-center text-sm text-neutral-500 mt-4">
            Add items to your cart to continue
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default CheckoutForm;
