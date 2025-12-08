'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useState, useCallback, useEffect } from 'react';
import {
  Product,
  Accessory,
  ProductsResponse,
} from '@/types/products';

// Re-export types for backward compatibility
export type { Product, Accessory, ProductsResponse, Color } from '@/types/products';

// Helper function to build query string
const buildProductsQueryString = (params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): string => {
  const queryParts = [
    'populate[0]=cover_image',
    'populate[1]=preview_images',
    'populate[2]=specs',
    'populate[3]=colors',
    'populate[4]=available_accessories.image',
    'populate[5]=specs_image',
  ];

  if (params?.page) {
    queryParts.push(`pagination[page]=${params.page}`);
  }
  if (params?.pageSize) {
    queryParts.push(`pagination[pageSize]=${params.pageSize}`);
  }
  if (params?.category) {
    queryParts.push(`filters[category][$eq]=${params.category}`);
  }

  return queryParts.join('&');
};

// Hook to fetch all products
export const useProducts = (params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await api.get<ProductsResponse>(
        `/products?${buildProductsQueryString(params)}`,
      );
      return response.data;
    },
  });
};

// Hook to fetch product by slug
export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', 'slug', slug],
    queryFn: async () => {
      const queryString = [
        'populate[0]=cover_image',
        'populate[1]=preview_images',
        'populate[2]=specs',
        'populate[3]=colors',
        'populate[4]=available_accessories.image',
        'populate[5]=specs_image',
        `filters[slug][$eq]=${slug}`,
      ].join('&');

      const response = await api.get<ProductsResponse>(
        `/products?${queryString}`,
      );
      return response.data.data[0] || null;
    },
    enabled: !!slug,
  });
};

// Hook to fetch product by ID
export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', 'id', id],
    queryFn: async () => {
      const queryString = [
        'populate[0]=cover_image',
        'populate[1]=preview_images',
        'populate[2]=specs',
        'populate[3]=colors',
        'populate[4]=available_accessories.image',
        'populate[5]=specs_image',
      ].join('&');

      const response = await api.get<{ data: Product }>(
        `/products/${id}?${queryString}`,
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};

// Hook to manage selection state (color and accessories)
export const useProductSelection = (product: Product | null) => {
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || '',
  );
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);

  // Auto-select first color when product changes and colors are available
  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  const toggleAccessory = useCallback((accessoryId: number) => {
    setSelectedAccessories((prev) =>
      prev.includes(accessoryId)
        ? prev.filter((id) => id !== accessoryId)
        : [...prev, accessoryId],
    );
  }, []);

  const resetConfiguration = useCallback(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedAccessories([]);
    }
  }, [product]);

  const getSelectedAccessoriesDetails = useCallback(
    (): Accessory[] => {
      if (!product) return [];

      const allAvailableAccs = new Map(
        product.available_accessories.map((acc) => [acc.id, acc]),
      );

      return selectedAccessories
        .map((accId: number) => allAvailableAccs.get(accId))
        .filter((acc): acc is Accessory => acc !== undefined);
    },
    [product, selectedAccessories],
  );

  const getSelectedColorHex = useCallback((): string | null => {
    if (!product) return null;
    const color = product.colors.find((c) => c.name === selectedColor);
    return color ? color.hex : null;
  }, [product, selectedColor]);

  const getTotalPrice = useCallback((): number => {
    const productPrice = product?.price || 0;

    const allAccessoriesMap = new Map(
      (product?.available_accessories || []).map((acc) => [acc.id, acc]),
    );

    const accessoriesPrice = selectedAccessories.reduce((sum, accId) => {
      const accessory = allAccessoriesMap.get(accId);
      return sum + (accessory?.price || 0);
    }, 0);

    return productPrice + accessoriesPrice;
  }, [product, selectedAccessories]);

  return {
    selectedColor,
    setSelectedColor,
    selectedAccessories,
    toggleAccessory,
    resetConfiguration,
    getSelectedAccessoriesDetails,
    getSelectedColorHex,
    getTotalPrice,
  };
};
