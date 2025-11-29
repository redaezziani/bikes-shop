import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Color, Accessory } from './products';
import type { OrderItem, Order } from '@/types/order';

export type { OrderItem } from '@/types/order';

interface OrderState {
  items: OrderItem[];
  customerInfo: {
    name: string;
    email: string;
  };

  // Actions
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
  setCustomerInfo: (name: string, email: string) => void;
  clearOrder: () => void;

  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItem: (productId: number) => OrderItem | undefined;
  getOrderData: () => Order;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      items: [],
      customerInfo: {
        name: '',
        email: '',
      },

      addItem: (product, color, accessories, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id,
          );

          if (existingItemIndex > -1) {
            // Update existing item
            const newItems = [...state.items];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + quantity,
              selectedColor: color,
              selectedAccessories: accessories,
            };
            return { items: newItems };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity,
                  selectedColor: color,
                  selectedAccessories: accessories,
                },
              ],
            };
          }
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

      clearOrder: () => {
        set({ items: [] });
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

      getItem: (productId) => {
        return get().items.find((item) => item.product.id === productId);
      },

      setCustomerInfo: (name, email) => {
        set({ customerInfo: { name, email } });
      },

      getOrderData: () => {
        const state = get();
        return {
          customer_name: state.customerInfo.name,
          customer_email: state.customerInfo.email,
          total_amount: state.getTotalPrice(),
          currency: 'usd',
          status: 'pending' as const,
          items: state.items,
        };
      },
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({ items: state.items, customerInfo: state.customerInfo }),
    },
  ),
);
