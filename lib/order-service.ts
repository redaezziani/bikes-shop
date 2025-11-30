import { api } from './api';
import { Order, OrderResponse, OrdersResponse, OrderItemData } from '@/types/order';
import type { OrderItem } from '@/store/order';

export const orderService = {
  // Format order items for Strapi
  formatOrderItems(items: OrderItem[]): OrderItemData[] {
    const formattedItems: OrderItemData[] = [];

    items.forEach((item) => {
      // Add bike item
      formattedItems.push({
        item_type: 'bike' as const,
        product: item.product.id,
        color_name: item.selectedColor.name,
        color_hex: item.selectedColor.hex,
        quantity: item.quantity,
        unit_price: item.product.price,
        subtotal: item.product.price * item.quantity,
      });

      // Add accessory items
      item.selectedAccessories.forEach((accessory) => {
        formattedItems.push({
          item_type: 'accessory' as const,
          accessory: accessory.id,
          quantity: item.quantity,
          unit_price: accessory.price,
          subtotal: accessory.price * item.quantity,
        });
      });
    });

    return formattedItems;
  },

  // Create a new order in Strapi
  async createOrder(orderData: Omit<Order, 'id' | 'documentId' | 'createdAt' | 'updatedAt' | 'publishedAt'>) {
    try {
      // First create the order without items
      const orderPayload = {
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        total_amount: orderData.total_amount,
        currency: orderData.currency,
        status: orderData.status,
      };

      const orderResponse = await api.post<OrderResponse>('/orders', {
        data: orderPayload,
      });

      const createdOrder = orderResponse.data.data;
      const orderId = createdOrder.id;

      // Then create order items and link them to the order
      if ((orderData as any).items && (orderData as any).items.length > 0) {
        const itemsData = this.formatOrderItems((orderData as any).items || []);

        for (const item of itemsData) {
          await api.post('/order-items', {
            data: {
              ...item,
              order: orderId,
            },
          });
        }
      }

      return { success: true, data: createdOrder };
    } catch (error: any) {
      console.error('Order creation error:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.response?.data?.message || 'Failed to create order',
      };
    }
  },

  // Update order status
  async updateOrderStatus(
    documentId: string,
    status: 'pending' | 'paid' | 'failed' | 'shipped',
  ) {
    try {
      const response = await api.put<OrderResponse>(`/orders/${documentId}`, {
        data: { status },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update order',
      };
    }
  },

  // Get order by document ID
  async getOrder(documentId: string) {
    try {
      const response = await api.get<OrderResponse>(`/orders/${documentId}`);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Order not found',
      };
    }
  },

  // Get all orders for a customer
  async getCustomerOrders(email: string) {
    try {
      const response = await api.get<OrdersResponse>(
        `/orders?filters[customer_email][$eq]=${email}`,
      );
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch orders',
      };
    }
  },

  // Update Stripe payment info
  async updateStripeInfo(
    documentId: string,
    stripeSessionId: string,
    stripePaymentIntent: string,
  ) {
    try {
      const response = await api.put<OrderResponse>(`/orders/${documentId}`, {
        data: {
          stripe_session_id: stripeSessionId,
          stripe_payment_intent: stripePaymentIntent,
          status: 'paid',
        },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update payment info',
      };
    }
  },
};
