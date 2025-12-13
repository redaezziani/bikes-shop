'use client';

import { useState } from 'react';
import AccessoryModal from '@/components/accessory-model';
import ProductImagePreview from '@/components/product-image-priview';
import ProductInfo from '@/components/product-info';
import { Accessory, Product } from '@/types/products';
import Image from 'next/image';

interface ProductPageClientProps {
  product: Product;
  allImages: string[];
}

export default function ProductPageClient({
  product,
  allImages,
}: ProductPageClientProps) {
  const [activeAccessory, setActiveAccessory] = useState<Accessory | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductImagePreview
          images={allImages}
          current={currentImageIndex}
          setCurrent={setCurrentImageIndex}
        />
        <ProductInfo
          title={product.name}
          description={product.short_description}
          priceAED={product.price}
          priceUSD={product.price * 0.27}
          colors={product.colors}
          documentId={product.documentId}
          images={allImages}
          current={currentImageIndex}
          setCurrent={setCurrentImageIndex}
        />
      </div>

      {product.available_accessories.length > 0 && (
        <section className="w-full flex mt-15 flex-col gap-2 justify-start items-start">
          <h3 className="text-lg font-medium text-zinc-800">
            Related Accessories
          </h3>

          <div className="grid w-full mt-5 grid-cols-2 md:grid-cols-3 gap-2">
            {product.available_accessories.slice(0, 3).map((acc) => (
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
      )}

      {activeAccessory && (
        <AccessoryModal
          accessory={activeAccessory}
          onClose={() => setActiveAccessory(null)}
        />
      )}
    </>
  );
}
