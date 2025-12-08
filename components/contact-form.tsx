'use client';

import React, { useState } from 'react';
import { submitContactForm } from '@/app/actions/contact';

interface ContactFormProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function ContactForm({
  title = 'Get in Touch',
  description = "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  className = '',
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Basic validation
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your name' });
      setIsSubmitting(false);
      return;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter a message' });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: "Thank you for contacting us! We'll get back to you soon.",
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="#contact-us"
      className={`bg-white rounded-lg border border-zinc-200 p-8 md:p-12 ${className}`}
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 mb-3">
          {title}
        </h2>
        <p className="text-base md:text-lg text-zinc-600">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-900 mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition disabled:bg-zinc-50 disabled:cursor-not-allowed"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-900 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition disabled:bg-zinc-50 disabled:cursor-not-allowed"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-zinc-900 mb-2"
          >
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition disabled:bg-zinc-50 disabled:cursor-not-allowed"
            placeholder="+971 50 123 4567"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-900 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={5}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition resize-none disabled:bg-zinc-50 disabled:cursor-not-allowed"
            placeholder="How can we help you?"
          />
        </div>

        {submitStatus.type && (
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-zinc-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-zinc-800 transition disabled:bg-zinc-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
