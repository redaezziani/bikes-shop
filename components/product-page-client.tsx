'use client';

import { useState } from 'react';
import ProductImagePreview from '@/components/product-image-priview';
import ProductInfo from '@/components/product-info';
import { Product } from '@/types/products';

interface ProductPageClientProps {
  product: Product;
  allImages: string[];
}

export default function ProductPageClient({
  product,
  allImages,
}: ProductPageClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
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
  );
}
