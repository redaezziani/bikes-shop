import React from 'react';

// Mock Footer component
const Footer = () => (
  <footer className="w-full bg-white py-12 px-6 text-center text-sm text-zinc-500 border-t border-zinc-200">
    <p>© 2025 along · Leap Originals FZ-LLC</p>
  </footer>
);

export default function TermsPage() {
  return (
    <main className="flex flex-col w-full bg-white items-center">
      {/* Header */}
      <section className="w-full px-6 md:px-12 py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 ">
            along — <span className="">Terms & Conditions</span>
          </h1>

          <div className="space-y-1 text-sm text-zinc-600">
            <p>
              Leap Originals FZ-LLC · Ras Al Khaimah Free Zone, United Arab
              Emirates
            </p>
            <p>
              <strong className="text-zinc-700">Effective Date:</strong> 1
              November 2025
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="w-full px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-12 text-zinc-700 leading-relaxed">
            {/* Quick Summary */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                Quick Summary
              </h2>
              <div className="space-y-3 text-zinc-700">
                <p>
                  UAE-only sales · Payment by credit card or bank transfer (Cash
                  on Delivery is not available) · Ground-level delivery in 2–3
                  working days with next-day assembly
                </p>
                <p>
                  Change-of-mind returns: 7 days, only if assembly hasn&apos;t taken
                  place and all boxes remain sealed
                </p>
                <p>
                  Warranty covers manufacturing defects per the Warranty Policy
                  · Governed by UAE law, Ras Al Khaimah courts
                </p>
              </div>
              <p className="text-sm text-zinc-600 mt-4">
                Please read these Terms together with our Shipping & Returns
                Policy and Warranty Policy.
              </p>
            </div>

            {/* 1. Interpretation */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                1. Interpretation
              </h2>
              <div className="space-y-2 text-zinc-700">
                <p>
                  <strong className="text-zinc-900">Products</strong> means
                  bicycles and accessories offered for sale by along.
                </p>
                <p>
                  <strong className="text-zinc-900">Services</strong> means
                  assembly and safety briefing arranged by along or its
                  authorized service partners.
                </p>
                <p>
                  <strong className="text-zinc-900">Website</strong> means
                  weridealong.com.
                </p>
                <p>
                  <strong className="text-zinc-900">we, us, our</strong> means
                  Leap Originals FZ-LLC.
                </p>
                <p>
                  <strong className="text-zinc-900">you, your</strong> means the
                  purchaser of Products or Services.
                </p>
              </div>
            </div>

            {/* 2. Application */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                2. Application of these Terms
              </h2>
              <p className="text-zinc-700">
                These Terms apply to all sales of Products and Services via the
                Website or otherwise. Together with your order and our order
                confirmation (the Contract), they form the entire agreement and
                supersede all prior statements.
              </p>
            </div>

            {/* 3. Placing an Order */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                3. Placing an Order
              </h2>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    Products and prices are an invitation to treat, not an
                    offer.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    Clicking Place Order creates an offer to purchase.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    We may reject orders for errors, unavailability, or failed
                    payments.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    A Contract forms when we send your order confirmation.
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Price & Payment */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                4. Price & Payment
              </h2>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Prices shown are in AED.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>UAE shipping is included in the price.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Payment is by credit card or bank transfer only.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Cash on Delivery is not available.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>We may correct pricing or information errors.</span>
                </li>
              </ul>
            </div>

            {/* 5. Risk & Ownership */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                5. Risk & Ownership
              </h2>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Ownership passes when payment is received.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Risk passes on delivery to your address.</span>
                </li>
              </ul>
            </div>

            {/* 6. Delivery */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">6. Delivery</h2>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Territory: UAE only.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    Method: Ground-level delivery (no stairs or elevators).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Timeline: 2–3 working days.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>A recipient must be present to sign.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    Address changes allowed up to 2 days before delivery.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Failed deliveries incur a redelivery fee.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Carrier delays are not grounds for cancellation.</span>
                </li>
              </ul>
            </div>

            {/* 7. Assembly & Safety Briefing */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                7. Assembly & Safety Briefing
              </h2>
              <p className="text-zinc-700">
                Assembly is arranged for the next day after delivery (subject to
                availability). If you postpone assembly, the return window does
                not extend.
              </p>
            </div>

            {/* 8. Damage in Transit */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                8. Damage in Transit
              </h2>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>If the box is visibly damaged, refuse delivery.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Contact support immediately if possible.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Report within 48 hours with photos/videos.</span>
                </li>
              </ul>
            </div>

            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                9. Cancellations (Before Dispatch)
              </h2>
              <p className="text-zinc-700">
                You may cancel only before the order is dispatched. After
                dispatch, it becomes a return under our policy.
              </p>
            </div>

            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                10. Returns & Exchanges
              </h2>
              <p className="text-zinc-700 ">
                Returns accepted only if assembly has not taken place and all
                boxes remain sealed.
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Window: 7 days from delivery.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>You pay shipping for change-of-mind returns.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Contact us first for return authorization.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    Refunds take up to 14 working days after inspection.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Refunds issued to the original payment method.</span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    No returns if packaging is opened or product used.
                  </span>
                </li>
              </ul>
            </div>

            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                11. Warranty
              </h2>
              <p className="text-zinc-700">
                Warranty covers manufacturing defects as described in our
                Warranty Policy (frame 3 years; other parts 18 months;
                exclusions apply).
              </p>
            </div>

            {/* 12. Liability */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                12. Liability
              </h2>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>
                    No liability for indirect or consequential losses.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className=" font-bold">•</span>
                  <span>Maximum liability is the purchase price.</span>
                </li>
              </ul>
            </div>

            {/* 13. Force Majeure */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                13. Force Majeure
              </h2>
              <p className="text-zinc-700">
                We are not liable for delays caused by events outside our
                control.
              </p>
            </div>

            {/* 14. Promotions */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                14. Promotions
              </h2>
              <p className="text-zinc-700">
                Promotions are subject to availability and their own terms.
              </p>
            </div>

            {/* 15. Data & Privacy */}
            <div className="">
              <h2 className="text-2xl font-bold text-zinc-900 ">
                15. Data & Privacy
              </h2>
              <p className="text-zinc-700">
                We process personal data in accordance with our Privacy Policy.
              </p>
            </div>

            {/* Contact */}
            <div className="text-center pt-8 mt-8 border-t border-zinc-200">
              <p className="text-zinc-600">
                © 2025 along · Leap Originals FZ-LLC
              </p>
              <p className="text-zinc-600 mt-2">
                Contact:{' '}
                <a
                  className=" hover:text-blue-700 underline"
                  href="mailto:hey@weridealong.com"
                >
                  hey@weridealong.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
