'use client';

import { useState } from 'react';
import Image from 'next/image';
import AccessoryModal from '@/components/accessory-model';
import { Accessory } from '@/types/products';

interface ProductAccessoriesProps {
  accessories: Accessory[];
}

export default function ProductAccessories({
  accessories,
}: ProductAccessoriesProps) {
  const [activeAccessory, setActiveAccessory] = useState<Accessory | null>(
    null
  );

  if (accessories.length === 0) {
    return null;
  }

  return (
    <>
      <section className="w-full flex mt-15 flex-col gap-2 justify-start items-start">
        <h3 className="text-lg font-medium text-zinc-800">
          Related Accessories
        </h3>

        <div className="grid w-full mt-5 grid-cols-2 md:grid-cols-3 gap-2">
          {accessories.slice(0, 3).map((acc) => (
            <div
              key={acc.id}
              className="w-full bg-zinc-100 rounded aspect-square cursor-pointer relative overflow-hidden"
              onClick={() => setActiveAccessory(acc)}
            >
              {acc.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${acc.image.url}`}
                  alt={acc.name || acc.title || 'Related Accessory'}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {activeAccessory && (
        <AccessoryModal
          accessory={activeAccessory}
          onClose={() => setActiveAccessory(null)}
        />
      )}
    </>
  );
}
