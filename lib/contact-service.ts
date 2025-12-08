import { api } from './api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactSubmission {
  id: number;
  documentId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ContactResponse {
  data: ContactSubmission;
  meta: object;
}

export const contactService = {
  // Submit contact form to Strapi
  async submitContact(formData: ContactFormData) {
    try {
      const response = await api.post<ContactResponse>('/contact-submissions', {
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
        },
      });

      return { success: true, data: response.data.data };
    } catch (error) {
      const apiError = error as {
        response?: { data?: { error?: { message?: string }; message?: string } };
      };
      console.error('Contact form submission error:', apiError.response?.data);
      return {
        success: false,
        error:
          apiError.response?.data?.error?.message ||
          apiError.response?.data?.message ||
          'Failed to submit contact form',
      };
    }
  },
};
