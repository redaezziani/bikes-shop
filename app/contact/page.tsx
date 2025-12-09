// app/contact/page.tsx
import Script from 'next/script';

export default function ContactPage() {
  return (
    <>
      <div className="w-full min-h-screen">
        <iframe
          src="https://serv.weridealong.com/widget/form/aYVTWBZRh8H9lEd0Q491"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '3px',
          }}
          id="inline-aYVTWBZRh8H9lEd0Q491"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Contact Form Website"
          data-height="1014"
          data-layout-iframe-id="inline-aYVTWBZRh8H9lEd0Q491"
          data-form-id="aYVTWBZRh8H9lEd0Q491"
          title="Contact Form Website"
        />
      </div>

      <Script
        src="https://serv.weridealong.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
