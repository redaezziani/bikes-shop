'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconCheck, IconX, IconShoppingBag } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';

export const OrderStatusModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'success' | 'cancelled' | null>(null);

  useEffect(() => {
    const orderStatus = searchParams.get('order');

    if (orderStatus === 'success') {
      setStatus('success');
      setIsOpen(true);
      // Clear cart from localStorage on successful order
      localStorage.removeItem('order-storage');
    } else if (orderStatus === 'cancelled') {
      setStatus('cancelled');
      setIsOpen(true);
      // Clear cart from localStorage on cancelled order
      localStorage.removeItem('order-storage');
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    // Remove query params from URL
    router.push('/');
  };

  if (!status) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {status === 'success' ? (
                <SuccessContent onClose={handleClose} />
              ) : (
                <CancelledContent onClose={handleClose} />
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const SuccessContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      {/* Header with icon */}
      <div className="bg-[#32870f] p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15 }}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 "
        >
          <IconCheck className="w-12 h-12 text-[#32870f]" strokeWidth={3} />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h2>
        <p className="text-white/90 text-lg">Thank you for your purchase</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#32870f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <IconCheck className="w-4 h-4 text-[#32870f]" strokeWidth={3} />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-1">
                Payment Successful
              </h3>
              <p className="text-sm text-zinc-600">
                Your payment has been processed successfully
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#32870f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <IconShoppingBag
                className="w-4 h-4 text-[#32870f]"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-1">
                Order Processing
              </h3>
              <p className="text-sm text-zinc-600">
                We&apos;ll send you an email confirmation with your order
                details
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#32870f]/5 border border-[#32870f]/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-[#32870f] text-center">
            <span className="font-semibold">What&apos;s next?</span> You&apos;ll
            receive tracking information via email once your order ships
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#32870f] hover:bg-[#2a6f0c] text-white font-semibold rounded-lg transition-all duration-200  hover:shadow-xl"
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
};

const CancelledContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      {/* Header with icon */}
      <div className="bg-gradient-to-br from-red-500 to-rose-600 p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15 }}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 "
        >
          <IconX className="w-12 h-12 text-red-600" strokeWidth={3} />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Order Cancelled</h2>
        <p className="text-red-50 text-lg">Payment was not completed</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <IconX className="w-4 h-4 text-red-600" strokeWidth={3} />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-1">
                Payment Not Processed
              </h3>
              <p className="text-sm text-zinc-600">
                Your payment was cancelled and no charges were made
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <IconShoppingBag
                className="w-4 h-4 text-red-600"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-1">
                No Order Created
              </h3>
              <p className="text-sm text-zinc-600">
                Your cart has been cleared. You can start shopping again
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-zinc-700 text-center">
            <span className="font-semibold">Need help?</span> Contact our
            support team if you experienced any issues
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-lg transition-all duration-200  hover:shadow-xl"
        >
          Return to Shopping
        </button>
      </div>
    </>
  );
};
