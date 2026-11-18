export type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR';

export type PublishStatus = 'draft' | 'scheduled' | 'published';

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  clientName?: string;
  year?: number;
  role?: string;
  category: string;
  industry?: string;
  tags: string[];
  coverImage: string;
  gallery: string[];
  problem?: string;
  solution?: string;
  results?: string;
  liveUrl?: string;
  repoUrl?: string;
  testimonialId?: string;
  featured: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  body: string;
  category?: string;
  tags: string[];
  readingMinutes: number;
  seo?: {
    title?: string;
    description?: string;
  };
  status: PublishStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  icon?: string;
  summary: string;
  description: string;
  deliverables: string[];
  startingPrice?: number;
  order: number;
  visible: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  quote: string;
  rating?: number;
  projectId?: string;
  visible: boolean;
  order: number;
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  address?: string;
  defaultCurrency: Currency;
  notes?: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'void';

export interface Invoice {
  id: string;
  number: string;
  token: string;
  clientId: string;
  currency: Currency;
  issueDate: string;
  dueDate: string;
  reference?: string;
  items: InvoiceItem[];
  discount?: {
    type: 'percent' | 'fixed';
    value: number;
  };
  tax?: {
    label: string;
    rate: number;
  };
  subtotal: number;
  total: number;
  amountPaid: number;
  balance: number;
  notes?: string;
  terms?: string;
  showBankDetails: boolean;
  allowPartialPayment: boolean;
  status: InvoiceStatus;
  sentAt?: string;
  viewedAt?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  invoiceId?: string;
  paymentLinkId?: string;
  amount: number;
  currency: Currency;
  method: 'gateway' | 'bank_transfer' | 'cash' | 'other';
  reference: string;
  payerName?: string;
  payerEmail?: string;
  status: 'pending' | 'successful' | 'failed';
  paidAt?: string;
  proofUrl?: string;
}

export interface PaymentLink {
  id: string;
  token: string;
  title: string;
  description?: string;
  amountType: 'fixed' | 'open';
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  currency: Currency;
  clientId?: string;
  invoiceId?: string;
  reusable: boolean;
  maxPayments?: number;
  expiresAt?: string;
  collect: {
    name: boolean;
    email: boolean;
    phone: boolean;
  };
  redirectUrl?: string;
  active: boolean;
  status: 'active' | 'paid' | 'expired' | 'disabled';
  timesUsed: number;
  totalCollected: number;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  type: 'contact' | 'quote';
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'new' | 'replied' | 'converted' | 'archived';
  read: boolean;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  altText?: string;
  createdAt: string;
}

export interface AdminSettings {
  profile: {
    name: string;
    role: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    bio: string;
    avatar: string;
  };
  business: {
    legalName: string;
    tagline: string;
    address: string;
    taxNumber: string;
    defaultCurrency: Currency;
    bankName: string;
    accountNumber: string;
    accountName: string;
    sortCode?: string;
    routingNumber?: string;
    swiftBic?: string;
  };
  invoiceDefaults: {
    prefix: string;
    nextNumber: number;
    duePeriodDays: number;
    taxRate: number;
    taxLabel: string;
    defaultNotes: string;
    defaultTerms: string;
  };
  payments: {
    enableGateway: boolean;
    enableBankTransfer: boolean;
    allowPartialPayment: boolean;
    supportedCurrencies: Currency[];
  };
}

export interface DashboardStats {
  totalInvoicedMonth: {
    NGN: number;
    USD: number;
  };
  totalPaidMonth: {
    NGN: number;
    USD: number;
  };
  totalOutstanding: {
    NGN: number;
    USD: number;
  };
  overdueCount: number;
  revenueByMonth: {
    month: string;
    NGN: number;
    USD: number;
  }[];
}
