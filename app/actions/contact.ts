'use server';

import { contactService, ContactFormData } from '@/lib/contact-service';

export async function submitContactForm(formData: ContactFormData) {
  try {
    const result = await contactService.submitContact(formData);
    return result;
  } catch (error) {
    console.error('Server action error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
