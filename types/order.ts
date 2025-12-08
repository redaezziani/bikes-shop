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
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_country?: string;
  note?: string;
  agreed_to_terms: boolean;
  total_amount: number;
  currency: string;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'shipped';
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
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_country?: string;
  note?: string;
  agreed_to_terms: boolean;
  total_amount: number;
  currency: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'shipped';
  items: OrderItemData[];
}

export interface OrderResponse {
  data: Order;
  meta?: Record<string, unknown>;
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
