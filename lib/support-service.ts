import { SupportPageResponse } from '@/types/support';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Dummy data for support page
const DUMMY_SUPPORT_DATA: SupportPageResponse = {
  data: {
    id: 1,
    documentId: 'support-page-1',
    title: 'Help & Support',
    description: 'Find answers to common questions about our bikes, orders, shipping, and more.',
    categories: [
      {
        id: 1,
        name: 'Orders & Payment',
        description: 'Everything about placing orders and payment methods',
        faqs: [
          {
            id: 1,
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.',
          },
          {
            id: 2,
            question: 'Can I modify or cancel my order?',
            answer: 'You can modify or cancel your order within 24 hours of placing it. After that, the order enters our fulfillment process and cannot be changed. Please contact our support team immediately if you need to make changes.',
          },
          {
            id: 3,
            question: 'Do you offer installment payment plans?',
            answer: 'Yes, we offer flexible payment plans through our partners. You can split your payment into 3, 6, or 12 monthly installments with zero interest. This option is available at checkout.',
          },
        ],
      },
      {
        id: 2,
        name: 'Shipping & Delivery',
        description: 'Information about shipping options and delivery times',
        faqs: [
          {
            id: 4,
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 5-7 business days within the UAE. Express shipping is available and takes 2-3 business days. International shipping times vary by location, typically 10-15 business days.',
          },
          {
            id: 5,
            question: 'Do you offer free shipping?',
            answer: 'Yes! We offer free standard shipping on all orders over AED 500 within the UAE. For orders under AED 500, a flat shipping fee of AED 50 applies.',
          },
          {
            id: 6,
            question: 'Can I track my order?',
            answer: 'Absolutely! Once your order ships, you will receive a tracking number via email. You can use this number to track your package in real-time on our website or the courier\'s website.',
          },
        ],
      },
      {
        id: 3,
        name: 'Product Information',
        description: 'Learn more about our bikes and specifications',
        faqs: [
          {
            id: 7,
            question: 'What sizes are available?',
            answer: 'Our bikes are available in multiple sizes: Small (for riders 5\'2"-5\'6"), Medium (5\'6"-5\'10"), Large (5\'10"-6\'1"), and X-Large (6\'1"+). Each product page includes a detailed size guide to help you choose the perfect fit.',
          },
          {
            id: 8,
            question: 'Do your bikes come assembled?',
            answer: 'Bikes arrive 85% pre-assembled. You will need to attach the front wheel, handlebars, pedals, and seat. We include all necessary tools and detailed instructions. Professional assembly service is also available for an additional fee.',
          },
          {
            id: 9,
            question: 'What warranty do you offer?',
            answer: 'All our bikes come with a comprehensive 2-year warranty covering the frame and a 1-year warranty on components. This covers manufacturing defects and workmanship issues. Wear and tear items are not covered.',
          },
        ],
      },
      {
        id: 4,
        name: 'Returns & Warranty',
        description: 'Our return policy and warranty information',
        faqs: [
          {
            id: 10,
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy. If you\'re not completely satisfied with your purchase, you can return it within 30 days for a full refund. The bike must be in like-new condition with all original packaging and accessories.',
          },
          {
            id: 11,
            question: 'How do I make a warranty claim?',
            answer: 'To make a warranty claim, contact our support team with your order number and photos of the issue. Our team will review your claim within 48 hours and provide instructions for repair or replacement.',
          },
          {
            id: 12,
            question: 'Do you offer exchanges?',
            answer: 'Yes, we offer exchanges for different sizes or models within 30 days of purchase. Simply contact our support team to arrange an exchange. The bike must be in like-new condition.',
          },
        ],
      },
      {
        id: 5,
        name: 'Maintenance & Care',
        description: 'Tips for keeping your bike in top condition',
        faqs: [
          {
            id: 13,
            question: 'How often should I service my bike?',
            answer: 'We recommend a basic tune-up every 6 months or after 500 km of riding, whichever comes first. This includes checking brakes, gears, tire pressure, and chain lubrication. Heavy riders or those in harsh conditions may need more frequent service.',
          },
          {
            id: 14,
            question: 'Do you offer maintenance services?',
            answer: 'Yes, we have authorized service centers across the UAE. You can book a service appointment through our website or contact our support team. We offer basic tune-ups, comprehensive services, and custom upgrades.',
          },
          {
            id: 15,
            question: 'Where can I find replacement parts?',
            answer: 'Replacement parts are available through our website or authorized dealers. Common wear items like brake pads, chains, and tires are always in stock. For specialized components, please contact our support team.',
          },
        ],
      },
    ],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
  },
  meta: {},
};

// Server-side fetch function with Next.js caching
export async function getSupportData(): Promise<SupportPageResponse> {
  // Return dummy data for now
  return Promise.resolve(DUMMY_SUPPORT_DATA);

  /* Uncomment this when you want to fetch from Strapi
  const url = `${STRAPI_API_URL}/support-page`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_KEY}`,
    },
    // Cache for 1 minute, revalidate in background
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch support data: ${response.statusText}`);
  }

  return response.json();
  */
}
