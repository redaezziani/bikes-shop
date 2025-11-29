import { Product, Color, Accessory } from './products';

export interface OrderItem {
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedAccessories: Accessory[];
}

export interface Order {
  id?: number;
  documentId?: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  currency: string;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  status: 'pending' | 'paid' | 'failed' | 'shipped';
  items: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface OrderItemData {
  item_type: 'bike' | 'accessory';
  product?: number;
  accessory?: number;
  color_name?: string;
  color_hex?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderCreatePayload {
  customer_name: string;
  customer_email: string;
  total_amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'shipped';
  items: OrderItemData[];
}

export interface OrderResponse {
  data: Order;
  meta?: any;
}

export interface OrdersResponse {
  data: Order[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
