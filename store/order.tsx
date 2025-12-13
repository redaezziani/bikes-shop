import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Color, Accessory } from './products';
import type { OrderItem } from '@/types/order';

export type { OrderItem } from '@/types/order';


interface OrderState {
  items: OrderItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerCountry: string;
  note: string;
  agreedToTerms: boolean;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    note: string;
  };


  addItem: (
    product: Product,
    color: Color,
    accessories: Accessory[],
    quantity?: number,
  ) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateColor: (productId: number, color: Color) => void;
  updateAccessories: (productId: number, accessories: Accessory[]) => void;
  setCustomerInfo: (
    name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    note?: string
  ) => void;
  setAgreedToTerms: (agreed: boolean) => void;
  clearOrder: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCheckoutPayload: () => {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    customerCity: string;
    customerCountry: string;
    note?: string;
    agreedToTerms: boolean;
    items: Array<{
      item_type: string;
      product?: { id: number; name: string; documentId: string };
      accessory?: { id: number; name?: string; documentId?: string };
      quantity: number;
      unit_price: number;
      color_name?: string;
      color_hex?: string;
    }>;
  };
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      items: [],
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      customerCity: '',
      customerCountry: '',
      note: '',
      agreedToTerms: false,
      customerInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        note: '',
      },

      addItem: (product, color, accessories, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id,
          );

          const newItem = {
            product,
            quantity,
            selectedColor: color,
            selectedAccessories: accessories,
          };

          return {
            items:
              existingIndex > -1
                ? state.items.map((item, i) =>
                    i === existingIndex
                      ? { ...item, quantity: item.quantity + quantity }
                      : item,
                  )
                : [...state.items, newItem],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        }));
      },

      updateColor: (productId, color) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, selectedColor: color }
              : item,
          ),
        }));
      },

      updateAccessories: (productId, accessories) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, selectedAccessories: accessories }
              : item,
          ),
        }));
      },

      setCustomerInfo: (name, email, phone, address, city, country, note = '') => {
        set({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          customerAddress: address,
          customerCity: city,
          customerCountry: country,
          note: note,
          customerInfo: { name, email, phone, address, city, country, note },
        });
      },

      setAgreedToTerms: (agreed) => {
        set({ agreedToTerms: agreed });
      },

      clearOrder: () => {
        set({
          items: [],
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          customerAddress: '',
          customerCity: '',
          customerCountry: '',
          note: '',
          agreedToTerms: false,
          customerInfo: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            country: '',
            note: '',
          },
        });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const productPrice = item.product.price * item.quantity;
          const accessoriesPrice =
            item.selectedAccessories.reduce((sum, acc) => sum + acc.price, 0) *
            item.quantity;
          return total + productPrice + accessoriesPrice;
        }, 0);
      },

      getCheckoutPayload: () => {
        const state = get();
        const backendItems: Array<{
          item_type: string;
          product?: { id: number; name: string; documentId: string };
          accessory?: { id: number; name?: string; documentId?: string };
          quantity: number;
          unit_price: number;
          color_name?: string;
          color_hex?: string;
        }> = [];

        state.items.forEach((item) => {
          backendItems.push({
            item_type: 'bike',
            product: {
              id: item.product.id,
              name: item.product.name,
              documentId: item.product.documentId,
            },
            quantity: item.quantity,
            unit_price: item.product.price,
            color_name: item.selectedColor.name,
            color_hex: item.selectedColor.hex,
          });

          item.selectedAccessories.forEach((accessory) => {
            backendItems.push({
              item_type: 'accessory',
              accessory: {
                id: accessory.id,
                name: accessory.name,
                documentId: accessory.documentId,
              },
              quantity: item.quantity,
              unit_price: accessory.price,
            });
          });
        });

        // Return payload with required fields
        // Note: Form validation ensures these fields are not empty before calling this function
        return {
          customerName: state.customerName as string,
          customerEmail: state.customerEmail as string,
          customerPhone: state.customerPhone as string,
          customerAddress: state.customerAddress as string,
          customerCity: state.customerCity as string,
          customerCountry: state.customerCountry as string,
          note: state.note || undefined,
          agreedToTerms: state.agreedToTerms,
          items: backendItems,
        };
      },
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({
        items: state.items,
        customerName: state.customerName,
        customerEmail: state.customerEmail,
        customerPhone: state.customerPhone,
        customerAddress: state.customerAddress,
        customerCity: state.customerCity,
        customerCountry: state.customerCountry,
        note: state.note,
        agreedToTerms: state.agreedToTerms,
      }),
    },
  ),
);
