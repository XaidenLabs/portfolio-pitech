# Portfolio Website PRD: Frontend Page Structure

Product: Personal / agency portfolio with admin panel, invoicing and payment links Scope: Frontend only (Next.js) Prepared for: Pitech

## 1. Overview

This document defines the page structure, features, data shapes and frontend architecture for a Next.js portfolio website. The site has three surfaces:

1. **Public site**: the portfolio that visitors and prospects see.
2. **Admin panel**: a private area where the owner manages content (projects, blog posts, testimonials, services), clients, invoices and payment links.
3. **Client-facing pages**: tokenized public pages where a client opens an invoice, pays it, or follows a payment link. These need no login.

### 1.1 Goals

- Present work and services in a way that converts visitors into enquiries.
- Let the owner publish and edit content without touching code.
- Let the owner create professional invoices and payment links, send them to clients, and track their status.
- Give clients a clean, trustworthy page to view and pay what they owe.

### 1.2 Out of scope

This PRD covers the frontend only. The backend, database, authentication server, payment gateway webhooks, email delivery and file storage are treated as external services. Section 11 defines the API contract the frontend expects so the backend can be built (or mocked) to match.

### 1.3 Assumptions

- Next.js App Router with TypeScript and Tailwind CSS.
- Clients are both Nigerian and international, so the UI supports at least NGN and USD.
- Payments are processed by a third-party gateway (for example Paystack, Flutterwave or Stripe), plus manual bank transfer. The frontend never handles card data; it redirects to or embeds the gateway's hosted checkout.
- Until the backend exists, the frontend runs against a mock data layer (Section 12) that can be swapped for real API calls without changing page code.

## 2. Users and Roles

- **Visitor**: anyone browsing the public site. Can view pages, read posts, and send an enquiry.
- **Client**: a person who receives an invoice or payment link. Accesses only their tokenized invoice or payment page. No account.
- **Admin (owner)**: logs in and manages everything. Single admin at launch; the structure should allow additional roles later.

## 3. Route Map

Next.js route groups keep the three surfaces separate, each with its own layout.

### 3.1 Public routes: group `(public)`

- `/` : Home
- `/about` : About
- `/services` : Services overview
- `/services/[slug]` : Single service detail (optional in v1)
- `/projects` : Project gallery with filters
- `/projects/[slug]` : Case study
- `/blog` : Post listing
- `/blog/[slug]` : Single post
- `/testimonials` : Testimonials (can also be a Home section)
- `/contact` : Contact and enquiry form
- `/request-quote` : Structured project brief form (optional in v1)
- `/privacy`, `/terms` : Legal pages
- `not-found` and `error` pages

### 3.2 Client-facing routes: group `(billing)`

- `/invoice/[token]` : View an invoice
- `/invoice/[token]/pay` : Choose a payment method and pay
- `/pay/[token]` : Payment link page (fixed or open amount)
- `/payment/success` : Payment confirmation
- `/payment/failed` : Payment failed or cancelled, with retry
- `/receipt/[token]` : Receipt for a paid invoice

The token is an unguessable string issued by the backend. Invoice IDs like `INV-0007` are never used in public URLs.

### 3.3 Admin routes: group `(admin)`, prefix `/admin`

- `/admin/login` : Login (outside the protected layout)
- `/admin` : Dashboard
- `/admin/projects` : List
- `/admin/projects/new` : Create
- `/admin/projects/[id]/edit` : Edit
- `/admin/posts` : List
- `/admin/posts/new` : Create
- `/admin/posts/[id]/edit` : Edit
- `/admin/services` : Manage services
- `/admin/testimonials` : Manage testimonials
- `/admin/clients` : Client list
- `/admin/clients/[id]` : Client profile (their invoices, links, notes)
- `/admin/invoices` : Invoice list
- `/admin/invoices/new` : Create invoice
- `/admin/invoices/[id]` : Invoice detail and activity
- `/admin/invoices/[id]/edit` : Edit (drafts only)
- `/admin/payment-links` : Payment link list
- `/admin/payment-links/new` : Create link
- `/admin/payment-links/[id]` : Link detail and payments received
- `/admin/enquiries` : Messages from the contact form
- `/admin/media` : Media library
- `/admin/settings` : Profile, business details, invoice defaults, payment settings, SEO

## 4. Public Site: Page Specifications

### 4.1 Home (`/`)

Sections, top to bottom:

1. **Navbar**: logo, links (Work, Services, About, Blog, Contact), theme toggle, primary CTA ("Start a project").
2. **Hero**: headline stating what you build and for whom, one supporting line, two CTAs (View work, Contact me).
3. **Trust strip**: logos of clients or industries served (logistics, real estate, fintech, hospitality, healthcare, education).
4. **Featured projects**: 3 to 6 project cards pulled from projects marked "featured".
5. **Services**: short cards linking to `/services`.
6. **Process**: 4 to 5 steps (Discovery, Design, Build, Launch, Support).
7. **Tech stack**: icon grid.
8. **Testimonials**: carousel or grid.
9. **Latest posts**: 3 most recent published posts.
10. **Final CTA**: short pitch with contact and quote buttons.
11. **Footer**: nav links, social links, contact details, legal links.

### 4.2 About (`/about`)

Photo, short story, skills, brands operated (for example the agency and any sub-brand), timeline or milestones, and a CTA. Optional downloadable CV link.

### 4.3 Services (`/services`)

One card or section per service with a description, what is included, typical deliverables and a "Request quote" button. Content is managed from admin.

### 4.4 Projects (`/projects`)

- Grid of project cards (cover image, title, short description, tags).
- Filters by category (web app, mobile app, branding, e-commerce) and by industry.
- Search by title.
- Pagination or "load more".

### 4.5 Case study (`/projects/[slug]`)

Title, client, year, role, stack tags, live link and repo link (optional), hero image, sections for Problem, Solution, Results, image gallery, testimonial (optional), previous and next project links, and a CTA.

### 4.6 Blog (`/blog` and `/blog/[slug]`)

Listing with category and tag filters and search. Single post with cover image, reading time, rich content, author box, share buttons, related posts and a CTA. Posts have draft and published states; only published posts appear publicly.

### 4.7 Contact (`/contact`)

Form fields: name, email, phone (optional), service interested in, budget range, message. Client-side validation, loading and success and error states, a honeypot field and optional captcha for spam protection. Alongside the form: email, phone, WhatsApp link, location, social links.

### 4.8 Request Quote (`/request-quote`, optional v1)

Multi-step form: project type, features needed, timeline, budget, references, contact details. Submits to the same enquiries inbox with a "quote" type.

## 5. Client-Facing Billing Pages

These pages use a minimal layout (logo, content, small footer) with no main navigation, so the client stays focused on the invoice.

### 5.1 Invoice view (`/invoice/[token]`)

Shows: business logo and details, invoice number, issue and due dates, bill-to details, line items (description, quantity, unit price, amount), subtotal, discount, tax, total, amount paid, balance due, notes and terms, and bank transfer details if enabled.

Actions: **Pay now** (if balance is greater than zero and invoice is not void), **Download PDF**, **Print**.

Status banner states: Draft (never shown publicly), Sent, Viewed, Partially paid, Paid, Overdue, Void. A paid invoice shows a clear "Paid" state and a link to the receipt.

### 5.2 Pay invoice (`/invoice/[token]/pay`)

- Summary of amount due.
- Payment method choices: card or online (gateway checkout), bank transfer (shows account details and a "I have paid" confirmation with optional proof upload), and optionally other methods the owner enables.
- Partial payment input where the owner allows it.
- On choosing gateway payment, the frontend asks the backend for a checkout session and redirects to the hosted checkout, which returns to `/payment/success` or `/payment/failed`.

### 5.3 Payment link (`/pay/[token]`)

A standalone page for a payment link created without a full invoice, for example a deposit or a one-off service.

- Title, description and amount (fixed) or an amount input (open, with optional minimum).
- Payer name and email fields.
- Pay button leading to gateway checkout.
- Handles states: active, expired, already paid (single-use), disabled.

### 5.4 Result pages

`/payment/success` shows confirmation, reference, amount, and a receipt link. `/payment/failed` shows the reason (when available) and a retry button. Both read a reference from the query string and confirm the real status from the backend rather than trusting the URL.

### 5.5 Receipt (`/receipt/[token]`)

Printable receipt with payment date, method, reference, amount and invoice reference. Download PDF and print actions.

## 6. Admin Panel: Page Specifications

### 6.1 Shared layout

- Collapsible sidebar with sections: Dashboard, Content (Projects, Posts, Services, Testimonials, Media), Clients, Billing (Invoices, Payment Links), Enquiries, Settings.
- Top bar: global search, notifications, theme toggle, user menu with logout.
- Breadcrumbs and a consistent page header (title, primary action button).
- Responsive: sidebar becomes a drawer on mobile; tables switch to cards on small screens.

### 6.2 Login (`/admin/login`)

Email and password, show/hide password, error messages, "forgot password" link, and a redirect to the originally requested admin page after login. Optional two-factor code step.

### 6.3 Dashboard (`/admin`)

- Stat cards: total invoiced this month, amount paid, outstanding, overdue count.
- Revenue chart by month.
- Recent invoices and recent payments.
- Overdue invoices needing attention.
- New enquiries.
- Quick actions: New invoice, New payment link, New post, New project.

### 6.4 Projects

- **List**: table with cover thumbnail, title, category, status (draft or published), featured toggle, updated date, actions. Search, filters, sort, bulk delete and bulk publish.
- **Create and edit form**: title, slug (auto-generated, editable), short description, client name, year, role, category, industry, tech tags, live URL, repo URL, cover image, gallery images (drag to reorder), rich-text sections (Problem, Solution, Results), linked testimonial, featured flag, SEO title and description, status. Live preview and a save-as-draft action.

### 6.5 Posts

Same list pattern as projects. The editor is a rich-text or Markdown editor with: title, slug, excerpt, cover image, category, tags, body, SEO fields, status (draft, scheduled, published), publish date. Autosave of drafts and a preview button.

### 6.6 Services and Testimonials

- **Services**: name, slug, icon, summary, full description, deliverables list, starting price (optional), order, visibility toggle.
- **Testimonials**: client name, role and company, photo, quote, rating, linked project, visibility toggle, order.

### 6.7 Media library

Grid of uploaded images and files, drag-and-drop upload with progress, search, alt text editing, copy URL, delete (with warning if the file is in use). The same picker component opens as a modal inside the project and post forms.

### 6.8 Clients

- **List**: name, company, email, total invoiced, total paid, outstanding.
- **Profile**: contact details, billing address, default currency, notes, tabs for Invoices, Payment Links and Activity. Actions: New invoice for this client.

### 6.9 Invoices

- **List**: invoice number, client, issue date, due date, total, balance, status badge. Filters by status, client, date range and currency. Search. Bulk actions (mark as sent, export CSV).
- **Create and edit form**: see Section 7.
- **Detail page**: full invoice preview, status timeline (created, sent, viewed, paid), payment history, and the action buttons described in Section 7.4.

### 6.10 Payment links

- **List**: title, amount, currency, type (fixed or open), status, times used, total collected, expiry, copy-link button.
- **Create form**: see Section 8.
- **Detail page**: the link and QR code, settings summary, list of payments received, and actions (copy, share, disable, duplicate, edit).

### 6.11 Enquiries

Inbox of contact and quote submissions with read and unread state, status (new, replied, converted, archived), full message view, reply-by-email shortcut, and a "Create client and invoice from this enquiry" action.

### 6.12 Settings

- **Profile and brand**: name, logo, contact details, social links.
- **Business and billing details**: legal name, address, tax number, bank account details for transfers, default currency.
- **Invoice defaults**: number prefix and format, default due period (for example 7 days), default tax rate, default notes and terms, footer text, logo placement.
- **Payment settings**: enabled methods (gateway, bank transfer), allow partial payments, currencies accepted.
- **Notifications**: which events send an email or in-app alert (invoice viewed, payment received, new enquiry).
- **SEO and site**: site title, default meta description, social share image.
- **Security**: change password, two-factor toggle, active sessions.

## 7. Invoice Module

### 7.1 Invoice form

**Header**: client (select existing or create inline), invoice number (auto, editable), currency, issue date, due date, reference or PO number.

**Line items**: repeating rows with description, quantity, unit price and a computed line total. Add, remove and reorder rows. An item picker pulls from saved services or items.

**Totals**: subtotal, discount (percentage or fixed), tax (percentage, label configurable), shipping or extra fee (optional), total. All calculations happen live in the form and are re-verified by the backend on save.

**Other fields**: notes to client, terms and conditions, bank transfer details toggle, allow partial payment toggle, deposit or milestone schedule (optional v2).

**Behaviour**: save as draft, live preview panel beside the form, validation (client required, at least one item, due date not before issue date, positive amounts).

### 7.2 Statuses

- **Draft**: editable, not visible to the client.
- **Sent**: delivered to the client, link active.
- **Viewed**: client opened the invoice.
- **Partially paid**: some payments recorded, balance remaining.
- **Paid**: balance is zero.
- **Overdue**: past due date with balance remaining (derived).
- **Void**: cancelled; payment disabled and the page shows the voided state.

Only drafts are freely editable. Editing a sent invoice shows a warning and creates a revision note.

### 7.3 Sending

The "Send" action opens a modal with recipient email(s), subject, message body (templated, editable), toggle to attach the PDF, and toggle to include the pay link. It also offers **Copy link**, **Share via WhatsApp** (a prefilled `wa.me` link) and **Download PDF** so the owner can send it outside email too. Resend and reminder actions use the same modal with reminder templates.

### 7.4 Actions on invoice detail

Send or resend, send reminder, record manual payment (amount, date, method, reference, optional proof), duplicate, download PDF, print, mark as void, delete (drafts only), copy public link, create receipt.

### 7.5 PDF generation

The invoice and receipt layouts are built as printable React components. PDF output is produced either by a backend endpoint (preferred for consistency) or by a client-side library as a fallback. The print stylesheet must produce a clean A4 page.

## 8. Payment Links Module

### 8.1 Create form

- Title and description shown to the payer.
- Amount type: **fixed** or **open** (payer enters amount, optional minimum and maximum).
- Currency.
- Optional link to a client and an invoice (to settle an existing invoice).
- Usage: single-use or reusable, optional maximum number of payments.
- Expiry date (optional).
- Fields to collect from the payer: name, email, phone (toggle each).
- Redirect URL after payment (optional).
- Active toggle.

### 8.2 Output

On creation, show the generated URL with copy button, QR code, a WhatsApp share button and an email share modal.

### 8.3 Statuses

Active, Paid (single-use completed), Expired, Disabled.

## 9. Data Models (TypeScript, frontend types)

```ts
type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR';
type PublishStatus = 'draft' | 'scheduled' | 'published';

interface Project {
  id: string; slug: string; title: string; summary: string;
  clientName?: string; year?: number; role?: string;
  category: string; industry?: string; tags: string[];
  coverImage: string; gallery: string[];
  problem?: string; solution?: string; results?: string;
  liveUrl?: string; repoUrl?: string;
  testimonialId?: string; featured: boolean;
  seo?: { title?: string; description?: string };
  status: PublishStatus; createdAt: string; updatedAt: string;
}

interface Post {
  id: string; slug: string; title: string; excerpt: string;
  coverImage?: string; body: string; category?: string; tags: string[];
  readingMinutes: number; seo?: { title?: string; description?: string };
  status: PublishStatus; publishedAt?: string; createdAt: string; updatedAt: string;
}

interface Service {
  id: string; slug: string; name: string; icon?: string; summary: string;
  description: string; deliverables: string[]; startingPrice?: number;
  order: number; visible: boolean;
}

interface Testimonial {
  id: string; name: string; role?: string; company?: string; photo?: string;
  quote: string; rating?: number; projectId?: string; visible: boolean; order: number;
}

interface Client {
  id: string; name: string; company?: string; email: string; phone?: string;
  address?: string; defaultCurrency: Currency; notes?: string; createdAt: string;
}

interface InvoiceItem {
  id: string; description: string; quantity: number; unitPrice: number;
}

type InvoiceStatus =
  'draft' | 'sent' | 'viewed' | 'partially_paid' | 'paid' | 'overdue' | 'void';

interface Invoice {
  id: string; number: string; token: string; clientId: string;
  currency: Currency; issueDate: string; dueDate: string; reference?: string;
  items: InvoiceItem[];
  discount?: { type: 'percent' | 'fixed'; value: number };
  tax?: { label: string; rate: number };
  subtotal: number; total: number; amountPaid: number; balance: number;
  notes?: string; terms?: string;
  showBankDetails: boolean; allowPartialPayment: boolean;
  status: InvoiceStatus; sentAt?: string; viewedAt?: string; paidAt?: string;
  createdAt: string; updatedAt: string;
}

interface Payment {
  id: string; invoiceId?: string; paymentLinkId?: string;
  amount: number; currency: Currency;
  method: 'gateway' | 'bank_transfer' | 'cash' | 'other';
  reference: string; payerName?: string; payerEmail?: string;
  status: 'pending' | 'successful' | 'failed'; paidAt?: string; proofUrl?: string;
}

interface PaymentLink {
  id: string; token: string; title: string; description?: string;
  amountType: 'fixed' | 'open'; amount?: number; minAmount?: number; maxAmount?: number;
  currency: Currency; clientId?: string; invoiceId?: string;
  reusable: boolean; maxPayments?: number; expiresAt?: string;
  collect: { name: boolean; email: boolean; phone: boolean };
  redirectUrl?: string; active: boolean;
  status: 'active' | 'paid' | 'expired' | 'disabled';
  timesUsed: number; totalCollected: number; createdAt: string;
}

interface Enquiry {
  id: string; type: 'contact' | 'quote'; name: string; email: string; phone?: string;
  service?: string; budget?: string; message: string;
  status: 'new' | 'replied' | 'converted' | 'archived'; read: boolean; createdAt: string;
}
```

## 10. Frontend Architecture

### 10.1 Folder structure

```
src/
  app/
    (public)/            # layout.tsx with navbar and footer
      page.tsx
      about/ services/ projects/ blog/ contact/ request-quote/
    (billing)/           # minimal layout
      invoice/[token]/ pay/[token]/ payment/ receipt/[token]/
    (admin)/admin/       # layout.tsx with sidebar and auth guard
      page.tsx projects/ posts/ services/ testimonials/
      clients/ invoices/ payment-links/ enquiries/ media/ settings/
    admin/login/         # outside the protected layout
    sitemap.ts robots.ts not-found.tsx
  components/
    ui/                  # Button, Input, Modal, Table, Badge, Tabs, Toast
    public/              # Hero, ProjectCard, ServiceCard, PostCard, etc.
    admin/               # Sidebar, DataTable, StatCard, Editors, MediaPicker
    billing/             # InvoiceDocument, InvoiceForm, PaymentMethodPicker
  lib/
    api/                 # one file per resource (projects.ts, invoices.ts, ...)
    mock/                # mock data and mock handlers
    utils/               # formatCurrency, formatDate, calcTotals
    validation/          # Zod schemas
  hooks/
  types/
  config/                # site config, nav, constants
```

### 10.2 Rendering strategy

- Public pages: server components with static generation and revalidation (ISR) for projects and posts; dynamic metadata per page.
- Billing pages: dynamic and never cached, since status must be current.
- Admin: client-heavy interactive pages inside a protected layout; data loaded client-side with caching.

### 10.3 Data layer

All data access goes through `lib/api/*`. Each function has the same signature whether it reads mock data or calls the real backend, controlled by an environment variable such as `NEXT_PUBLIC_USE_MOCKS`. This lets the entire UI be built and demonstrated before the backend exists.

Suggested libraries: TanStack Query for admin data fetching and caching, React Hook Form with Zod for forms and validation, a table helper such as TanStack Table, a rich-text editor such as Tiptap, and Recharts for dashboard charts.

### 10.4 Auth and route protection (frontend)

- The admin layout checks for a valid session and redirects to `/admin/login` when absent. Add a route-level check in the Next.js proxy (named `middleware` in older Next.js versions) for `/admin/*`.
- The session is stored in an httpOnly cookie issued by the backend. The frontend never stores tokens in localStorage.
- Important: frontend guards only improve the user experience. Real security, including every admin action and invoice calculation, must be enforced by the backend.

### 10.5 Shared UI behaviour

Loading skeletons, empty states with a call to action, inline form errors, toast notifications, confirmation modals for destructive actions, unsaved-changes warnings, and consistent error pages.

### 10.6 Currency and dates

A single `formatCurrency(amount, currency)` utility using `Intl.NumberFormat`, and a date utility configured for the owner's timezone. Amounts are handled in the smallest unit or as fixed-precision numbers to avoid floating-point errors.

## 11. Expected Backend API Contract

The frontend assumes REST endpoints like the following. Names can change, but the shapes should match Section 9.

**Auth**

- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`

**Public content**

- `GET /projects`, `GET /projects/:slug`
- `GET /posts`, `GET /posts/:slug`
- `GET /services`, `GET /testimonials`
- `POST /enquiries`

**Admin content** (authenticated)

- CRUD on `/admin/projects`, `/admin/posts`, `/admin/services`, `/admin/testimonials`
- `POST /admin/media`, `GET /admin/media`, `DELETE /admin/media/:id`
- `GET /admin/enquiries`, `PATCH /admin/enquiries/:id`
- `GET /admin/dashboard/stats`

**Clients and billing** (authenticated)

- CRUD on `/admin/clients`
- CRUD on `/admin/invoices`, plus `POST /admin/invoices/:id/send`, `/remind`, `/void`, `/payments` (manual payment), `GET /admin/invoices/:id/pdf`
- CRUD on `/admin/payment-links`, plus `PATCH /admin/payment-links/:id/status`
- `GET /admin/payments`

**Client-facing** (token-based, no login)

- `GET /public/invoices/:token` (also marks as viewed)
- `POST /public/invoices/:token/checkout` returns a checkout URL
- `POST /public/invoices/:token/transfer-notice` for manual transfer confirmation
- `GET /public/payment-links/:token`
- `POST /public/payment-links/:token/checkout` returns a checkout URL
- `GET /public/payments/:reference` to confirm status after redirect
- `GET /public/receipts/:token`

Payment confirmation relies on the backend receiving gateway webhooks; the frontend only displays the confirmed status.

## 12. Mock Strategy (frontend-only phase)

- Seed files in `lib/mock/` for projects, posts, clients, invoices, payment links and payments, including examples of every status.
- Mock handlers simulate latency and occasional errors so loading and error states get designed properly.
- Mock checkout returns a fake success page URL so the full invoice-to-paid flow can be demonstrated end to end.
- Mock auth accepts a single demo account and sets a session cookie, clearly flagged as development only.

## 13. Non-Functional Requirements

- **SEO**: per-page metadata, Open Graph images, sitemap, robots, structured data (Person or Organization, Article, CreativeWork), clean slugs. Billing and admin pages are `noindex`.
- **Performance**: image optimisation with `next/image`, lazy loading below the fold, target Lighthouse 90+ on public pages, limited client JS on public routes.
- **Accessibility**: semantic HTML, keyboard navigation, visible focus states, sufficient contrast, labelled form fields, WCAG 2.1 AA as the target.
- **Responsiveness**: mobile-first; public pages and billing pages must work well on small phones since clients often open links from WhatsApp.
- **Security (frontend)**: input sanitisation for rich text, no secrets in client bundles, only public keys exposed, CSRF-aware requests, rate-limit awareness on forms, no card data ever touching the site.
- **Theming**: light and dark mode, design tokens in Tailwind config, brand colors configurable in one place.
- **Analytics**: optional page view and event tracking (contact submit, invoice view, pay click).

## 14. Build Phases

**Phase 1: Foundation** Design tokens, base UI components, public layout, mock data layer, folder structure, route skeletons for all three surfaces.

**Phase 2: Public site** Home, About, Services, Projects and case study, Contact, Blog, SEO setup.

**Phase 3: Admin core** Login and guard, admin layout, dashboard shell, projects, posts, services, testimonials, media, enquiries.

**Phase 4: Billing** Clients, invoice form and list and detail, invoice document component and PDF, client invoice page, payment links, pay pages, success and failure pages, receipts, manual payment recording.

**Phase 5: Settings and polish** Settings pages, email-send modals, notifications, empty states, accessibility pass, performance pass.

**Phase 6: Backend integration** Turn off mocks, connect endpoints, test the full payment flow in the gateway's sandbox, then go live.

## 15. Open Questions

1. Is the portfolio personal, agency-branded, or both (for example a switcher or separate sections)?
2. Which payment gateway (or gateways) will be used for NGN and for international clients?
3. Should invoices support recurring billing, deposits or milestone schedules in v1?
4. Will the blog use a rich-text editor or Markdown?
5. Is a client portal (login to see all their invoices) wanted later, or are tokenized links enough?
6. Which languages does the site need? English only at launch?
7. Which backend will be used (Laravel, Node.js, or a hosted service)? This affects how auth cookies and webhooks are handled.
