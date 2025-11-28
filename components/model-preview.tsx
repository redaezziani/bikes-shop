import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
interface ModelPreviewProps {
  image: string;
  name: string;
  id: string;
}

const ModelPreview = ({ image, name, id }: ModelPreviewProps) => {
  return (
    <div className="flex w-full sticky top-0 bg-white z-40 overflow-hidden px-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={id}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          src={image}
          className="w-full  max-w-md object-contain"
          alt={name}
        />
      </AnimatePresence>
    </div>
  );
};

export default ModelPreview;
