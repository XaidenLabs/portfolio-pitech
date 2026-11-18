'use client';

import React from 'react';
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer';

export function Footer() {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <HalftoneWordmarkFooter
        wordmark="pitech"
        label="Pitech Digital"
        meta="©2026 · Lagos / London / Remote Worldwide"
        preset="night"
        palette={{
          background: "#141416",
          ink: "#FAF7F0",
          warm: "#FF9E00",
        }}
        columns={[
          {
            title: "Navigation",
            links: [
              { label: "Home", href: "/" },
              { label: "Works", href: "/projects" },
              { label: "About Me", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Testimonials", href: "/testimonials" },
              { label: "Articles & Insights", href: "/blog" },
            ],
          },
          {
            title: "Billing & Demos",
            links: [
              { label: "Invoice (USD Demo)", href: "/invoice/inv_live_demo_vanguard_02" },
              { label: "Invoice (NGN Demo)", href: "/invoice/inv_live_demo_apex_01" },
              { label: "Payment Link Demo", href: "/pay/pay_demo_deposit_500" },
              { label: "Open Payment Link", href: "/pay/pay_demo_open_consulting" },
              { label: "Client Portal", href: "/client-login" },
              { label: "Admin Portal", href: "/admin-login" },
            ],
          },
          {
            title: "Connect",
            links: [
              { label: "hello@pitech.dev", href: "mailto:hello@pitech.dev" },
              { label: "+234 801 234 5678", href: "tel:+2348012345678" },
              { label: "GitHub", href: "https://github.com" },
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "WhatsApp Direct", href: "https://wa.me/2348012345678" },
            ],
          },
        ]}
        height="560px"
        backToTop={true}
        dotGap={6}
        radius={85}
        crop={0.2}
        grain={0.4}
      />
    </div>
  );
}

export default Footer;
