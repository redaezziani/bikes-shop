import { create } from 'zustand';
import { api } from '@/lib/api';

// Strapi API Types
export interface Product {
  id: number;
  documentId: string;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover_image: CoverImage;
  preview_images: PreviewImage[];
  specs: Specs;
  colors: Color[];
  available_accessories: Accessory[];
}

export interface CoverImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImageFormats {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface PreviewImage extends CoverImage {}

export interface Specs {
  id: number;
  speed: string;
  range: string;
  battery: string;
}

export interface Color {
  id: number;
  name: string;
  hex: string;
}

export interface Accessory {
  id: number;
  documentId?: string;
  name?: string;
  title?: string;
  description: string;
  price: number;
  image?: CoverImage;
  url?: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  selectedColor: string;
  selectedAccessories: number[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;

  // Actions
  fetchProducts: (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
  }) => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  setColor: (colorName: string) => void;
  toggleAccessory: (accessoryId: number) => void;
  resetConfiguration: () => void;
  clearError: () => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  selectedProduct: null,
  selectedColor: '',
  selectedAccessories: [],
  isLoading: false,
  error: null,
  pagination: null,

  fetchProducts: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      // Build query string manually for complex nested populate
      const queryParts = [
        'populate[0]=cover_image',
        'populate[1]=preview_images',
        'populate[2]=specs',
        'populate[3]=colors',
        'populate[4]=available_accessories.image',
      ];

      if (params.page) {
        queryParts.push(`pagination[page]=${params.page}`);
      }
      if (params.pageSize) {
        queryParts.push(`pagination[pageSize]=${params.pageSize}`);
      }
      if (params.category) {
        queryParts.push(`filters[category][$eq]=${params.category}`);
      }

      const queryString = queryParts.join('&');
      const response = await api.get<ProductsResponse>(
        `/products?${queryString}`,
      );

      const products = response.data.data;
      const firstProduct = products[0] || null;

      set({
        products,
        pagination: response.data.meta.pagination,
        // ✅ Auto-select first product if none is selected
        selectedProduct: get().selectedProduct || firstProduct,
        selectedColor:
          get().selectedColor || firstProduct?.colors[0]?.name || '',
        selectedAccessories:
          get().selectedAccessories.length > 0 ? get().selectedAccessories : [],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch products',
        isLoading: false,
      });
    }
  },

  fetchProductBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      const queryString = [
        'populate[0]=cover_image',
        'populate[1]=preview_images',
        'populate[2]=specs',
        'populate[3]=colors',
        'populate[4]=available_accessories.image',
        `filters[slug][$eq]=${slug}`,
      ].join('&');

      const response = await api.get<ProductsResponse>(
        `/products?${queryString}`,
      );

      if (response.data.data.length > 0) {
        const product = response.data.data[0];
        set({
          selectedProduct: product,
          selectedColor: product.colors[0]?.name || '',
          selectedAccessories: [],
          isLoading: false,
        });
      } else {
        set({
          error: 'Product not found',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch product',
        isLoading: false,
      });
    }
  },

  fetchProductById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const queryString = [
        'populate[0]=cover_image',
        'populate[1]=preview_images',
        'populate[2]=specs',
        'populate[3]=colors',
        'populate[4]=available_accessories.image',
      ].join('&');

      const response = await api.get<{ data: Product }>(
        `/products/${id}?${queryString}`,
      );

      const product = response.data.data;
      set({
        selectedProduct: product,
        selectedColor: product.colors[0]?.name || '',
        selectedAccessories: [],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch product',
        isLoading: false,
      });
    }
  },

  setSelectedProduct: (product) => {
    set({
      selectedProduct: product,
      selectedColor: product?.colors[0]?.name || '',
      selectedAccessories: [],
    });
  },

  setColor: (colorName: string) => {
    set({ selectedColor: colorName });
  },

  toggleAccessory: (accessoryId: number) => {
    set((state) => {
      const isSelected = state.selectedAccessories.includes(accessoryId);
      return {
        selectedAccessories: isSelected
          ? state.selectedAccessories.filter((id) => id !== accessoryId)
          : [...state.selectedAccessories, accessoryId],
      };
    });
  },

  resetConfiguration: () => {
    const { selectedProduct } = get();
    if (selectedProduct) {
      set({
        selectedColor: selectedProduct.colors[0]?.name || '',
        selectedAccessories: [],
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Optional: Keep these selectors for convenience, but use inline selectors in components
// to avoid the Next.js server component caching issue
export const getCurrentProduct = (state: ProductsState) =>
  state.selectedProduct;

export const getAvailableColors = (state: ProductsState) => {
  return state.selectedProduct?.colors || [];
};

export const getAvailableAccessories = (state: ProductsState) => {
  return state.selectedProduct?.available_accessories || [];
};

export const getSelectedAccessoriesDetails = (
  state: ProductsState,
): Accessory[] => {
  const product = state.selectedProduct;
  if (!product) return [];

  const allAvailableAccs = new Map(
    product.available_accessories.map((acc) => [acc.id, acc]),
  );

  return state.selectedAccessories
    .map((accId: number) => allAvailableAccs.get(accId))
    .filter((acc): acc is Accessory => acc !== undefined);
};

export const getSelectedColorHex = (state: ProductsState): string | null => {
  const product = state.selectedProduct;
  if (!product) return null;
  const color = product.colors.find((c) => c.name === state.selectedColor);
  return color ? color.hex : null;
};

export const getTotalPrice = (state: ProductsState) => {
  const product = state.selectedProduct;
  const productPrice = product?.price || 0;

  const allAccessoriesMap = new Map(
    (product?.available_accessories || []).map((acc) => [acc.id, acc]),
  );

  const accessoriesPrice = state.selectedAccessories.reduce((sum, accId) => {
    const accessory = allAccessoriesMap.get(accId);
    return sum + (accessory?.price || 0);
  }, 0);

  return productPrice + accessoriesPrice;
};
