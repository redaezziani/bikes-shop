'use client';

import { motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import { Accessory } from '@/store/products';

interface AccessoryModalProps {
  accessory: Accessory | null;
  onClose: () => void;
}

const AccessoryModal: React.FC<AccessoryModalProps> = ({
  accessory,
  onClose,
}) => {
  if (!accessory) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 px-4 flex justify-center items-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-zinc-200"
        >
          <IconX size={20} />
        </button>

        {accessory.image && (
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${accessory.image.url}`}
            alt={accessory.title || accessory.name || 'Accessory'}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <h3 className="text-xl font-semibold text-zinc-900 mb-2">
          {accessory.title || accessory.name}
        </h3>
        <p className="text-sm text-zinc-700 mb-4">{accessory.description}</p>
        <p className="text-lg font-bold text-zinc-800">${accessory.price}</p>

        {accessory.url && (
          <a
            href={accessory.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block w-full text-center py-2 bg-[#6760ff] text-white rounded-lg hover:bg-[#5650dd] transition"
          >
            Learn More
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AccessoryModal;
