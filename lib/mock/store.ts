import {
  AdminSettings,
  Client,
  DashboardStats,
  Enquiry,
  Invoice,
  MediaItem,
  Payment,
  PaymentLink,
  Post,
  Project,
  Service,
  Testimonial,
} from '@/types';
import {
  initialClients,
  initialEnquiries,
  initialInvoices,
  initialMedia,
  initialPaymentLinks,
  initialPayments,
  initialPosts,
  initialProjects,
  initialServices,
  initialSettings,
  initialTestimonials,
} from './data';
import { computeInvoiceStatus } from '../utils/invoice';

class MockStore {
  private projects: Project[] = [...initialProjects];
  private posts: Post[] = [...initialPosts];
  private services: Service[] = [...initialServices];
  private testimonials: Testimonial[] = [...initialTestimonials];
  private clients: Client[] = [...initialClients];
  private invoices: Invoice[] = [...initialInvoices];
  private paymentLinks: PaymentLink[] = [...initialPaymentLinks];
  private payments: Payment[] = [...initialPayments];
  private enquiries: Enquiry[] = [...initialEnquiries];
  private media: MediaItem[] = [...initialMedia];
  private settings: AdminSettings = { ...initialSettings };
  private initialized = false;

  constructor() {
    this.initFromLocalStorage();
  }

  private initFromLocalStorage() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('pitech_mock_store');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.projects = parsed.projects || this.projects;
        this.posts = parsed.posts || this.posts;
        this.services = parsed.services || this.services;
        this.testimonials = parsed.testimonials || this.testimonials;
        this.clients = parsed.clients || this.clients;
        this.invoices = parsed.invoices || this.invoices;
        this.paymentLinks = parsed.paymentLinks || this.paymentLinks;
        this.payments = parsed.payments || this.payments;
        this.enquiries = parsed.enquiries || this.enquiries;
        this.media = parsed.media || this.media;
        this.settings = parsed.settings || this.settings;
      }
      this.initialized = true;
    } catch {
      // Fallback to initial seeds
    }
  }

  private persist() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        'pitech_mock_store',
        JSON.stringify({
          projects: this.projects,
          posts: this.posts,
          services: this.services,
          testimonials: this.testimonials,
          clients: this.clients,
          invoices: this.invoices,
          paymentLinks: this.paymentLinks,
          payments: this.payments,
          enquiries: this.enquiries,
          media: this.media,
          settings: this.settings,
        })
      );
    } catch {
      // ignore
    }
  }

  // --- Projects ---
  getProjects(status?: 'published' | 'draft' | 'all'): Project[] {
    this.initFromLocalStorage();
    if (!status || status === 'published') {
      return this.projects.filter((p) => p.status === 'published');
    }
    if (status === 'draft') {
      return this.projects.filter((p) => p.status === 'draft');
    }
    return [...this.projects];
  }

  getProjectBySlug(slug: string): Project | undefined {
    this.initFromLocalStorage();
    return this.projects.find((p) => p.slug === slug);
  }

  getProjectById(id: string): Project | undefined {
    this.initFromLocalStorage();
    return this.projects.find((p) => p.id === id);
  }

  saveProject(project: Partial<Project> & { title: string }): Project {
    this.initFromLocalStorage();
    const existingIndex = this.projects.findIndex((p) => p.id === project.id);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updated: Project = {
        ...this.projects[existingIndex],
        ...project,
        updatedAt: now,
      };
      this.projects[existingIndex] = updated;
      this.persist();
      return updated;
    } else {
      const newProject: Project = {
        ...project,
        id: project.id || `proj-${Date.now()}`,
        slug: project.slug || project.title.toLowerCase().replace(/\s+/g, '-'),
        title: project.title,
        summary: project.summary || '',
        category: project.category || 'web app',
        tags: project.tags || [],
        coverImage:
          project.coverImage ||
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        gallery: project.gallery || [],
        featured: !!project.featured,
        status: project.status || 'published',
        createdAt: now,
        updatedAt: now,
      };
      this.projects.unshift(newProject);
      this.persist();
      return newProject;
    }
  }

  deleteProject(id: string): boolean {
    this.initFromLocalStorage();
    const before = this.projects.length;
    this.projects = this.projects.filter((p) => p.id !== id);
    this.persist();
    return this.projects.length < before;
  }

  // --- Posts ---
  getPosts(status?: 'published' | 'draft' | 'all'): Post[] {
    this.initFromLocalStorage();
    if (!status || status === 'published') {
      return this.posts.filter((p) => p.status === 'published');
    }
    return [...this.posts];
  }

  getPostBySlug(slug: string): Post | undefined {
    this.initFromLocalStorage();
    return this.posts.find((p) => p.slug === slug);
  }

  savePost(post: Partial<Post> & { title: string }): Post {
    this.initFromLocalStorage();
    const existingIndex = this.posts.findIndex((p) => p.id === post.id);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updated: Post = {
        ...this.posts[existingIndex],
        ...post,
        updatedAt: now,
      };
      this.posts[existingIndex] = updated;
      this.persist();
      return updated;
    } else {
      const newPost: Post = {
        ...post,
        id: post.id || `post-${Date.now()}`,
        slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-'),
        title: post.title,
        excerpt: post.excerpt || '',
        body: post.body || '',
        tags: post.tags || [],
        readingMinutes: post.readingMinutes || 4,
        status: post.status || 'published',
        publishedAt: post.status === 'published' ? now : undefined,
        createdAt: now,
        updatedAt: now,
      };
      this.posts.unshift(newPost);
      this.persist();
      return newPost;
    }
  }

  deletePost(id: string): boolean {
    this.initFromLocalStorage();
    const before = this.posts.length;
    this.posts = this.posts.filter((p) => p.id !== id);
    this.persist();
    return this.posts.length < before;
  }

  // --- Services & Testimonials ---
  getServices(onlyVisible = true): Service[] {
    this.initFromLocalStorage();
    return this.services
      .filter((s) => !onlyVisible || s.visible)
      .sort((a, b) => a.order - b.order);
  }

  saveService(service: Partial<Service> & { name: string }): Service {
    this.initFromLocalStorage();
    const idx = this.services.findIndex((s) => s.id === service.id);
    if (idx >= 0) {
      this.services[idx] = { ...this.services[idx], ...service };
      this.persist();
      return this.services[idx];
    } else {
      const newService: Service = {
        ...service,
        id: service.id || `serv-${Date.now()}`,
        slug: service.slug || service.name.toLowerCase().replace(/\s+/g, '-'),
        name: service.name,
        summary: service.summary || '',
        description: service.description || '',
        deliverables: service.deliverables || [],
        order: this.services.length + 1,
        visible: true,
      };
      this.services.push(newService);
      this.persist();
      return newService;
    }
  }

  deleteService(id: string): boolean {
    this.initFromLocalStorage();
    this.services = this.services.filter((s) => s.id !== id);
    this.persist();
    return true;
  }

  getTestimonials(onlyVisible = true): Testimonial[] {
    this.initFromLocalStorage();
    return this.testimonials
      .filter((t) => !onlyVisible || t.visible)
      .sort((a, b) => a.order - b.order);
  }

  saveTestimonial(testimonial: Partial<Testimonial> & { name: string; quote: string }): Testimonial {
    this.initFromLocalStorage();
    const idx = this.testimonials.findIndex((t) => t.id === testimonial.id);
    if (idx >= 0) {
      this.testimonials[idx] = { ...this.testimonials[idx], ...testimonial };
      this.persist();
      return this.testimonials[idx];
    } else {
      const newTest: Testimonial = {
        ...testimonial,
        id: testimonial.id || `test-${Date.now()}`,
        name: testimonial.name,
        quote: testimonial.quote,
        visible: true,
        order: this.testimonials.length + 1,
      };
      this.testimonials.push(newTest);
      this.persist();
      return newTest;
    }
  }

  deleteTestimonial(id: string): boolean {
    this.initFromLocalStorage();
    this.testimonials = this.testimonials.filter((t) => t.id !== id);
    this.persist();
    return true;
  }

  // --- Clients ---
  getClients(): Client[] {
    this.initFromLocalStorage();
    return [...this.clients];
  }

  getClientById(id: string): Client | undefined {
    this.initFromLocalStorage();
    return this.clients.find((c) => c.id === id);
  }

  saveClient(client: Partial<Client> & { name: string; email: string }): Client {
    this.initFromLocalStorage();
    const idx = this.clients.findIndex((c) => c.id === client.id);
    if (idx >= 0) {
      this.clients[idx] = { ...this.clients[idx], ...client };
      this.persist();
      return this.clients[idx];
    } else {
      const newClient: Client = {
        ...client,
        id: client.id || `cli-${Date.now()}`,
        name: client.name,
        email: client.email,
        defaultCurrency: client.defaultCurrency || 'USD',
        createdAt: new Date().toISOString(),
      };
      this.clients.unshift(newClient);
      this.persist();
      return newClient;
    }
  }

  // --- Invoices ---
  getInvoices(): Invoice[] {
    this.initFromLocalStorage();
    return this.invoices.map((inv) => ({
      ...inv,
      status: computeInvoiceStatus(inv.status, inv.dueDate, inv.balance, inv.amountPaid),
    }));
  }

  getInvoiceById(id: string): Invoice | undefined {
    this.initFromLocalStorage();
    const inv = this.invoices.find((i) => i.id === id);
    if (!inv) return undefined;
    return {
      ...inv,
      status: computeInvoiceStatus(inv.status, inv.dueDate, inv.balance, inv.amountPaid),
    };
  }

  getInvoiceByToken(token: string): Invoice | undefined {
    this.initFromLocalStorage();
    const inv = this.invoices.find((i) => i.token === token);
    if (!inv) return undefined;

    // Mark as viewed if sent
    if (inv.status === 'sent') {
      inv.status = 'viewed';
      inv.viewedAt = new Date().toISOString();
      this.persist();
    }

    return {
      ...inv,
      status: computeInvoiceStatus(inv.status, inv.dueDate, inv.balance, inv.amountPaid),
    };
  }

  saveInvoice(invoice: Partial<Invoice> & { clientId: string; items: Invoice['items'] }): Invoice {
    this.initFromLocalStorage();
    const now = new Date().toISOString();
    const existingIdx = this.invoices.findIndex((i) => i.id === invoice.id);

    if (existingIdx >= 0) {
      const updated: Invoice = {
        ...this.invoices[existingIdx],
        ...invoice,
        updatedAt: now,
      };
      this.invoices[existingIdx] = updated;
      this.persist();
      return updated;
    } else {
      const randToken = `inv_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        number: invoice.number || `INV-2026-${String(this.invoices.length + 101).padStart(3, '0')}`,
        token: invoice.token || randToken,
        currency: invoice.currency || 'USD',
        issueDate: invoice.issueDate || now.split('T')[0],
        dueDate: invoice.dueDate || now.split('T')[0],
        subtotal: invoice.subtotal || 0,
        total: invoice.total || 0,
        amountPaid: 0,
        balance: invoice.total || 0,
        showBankDetails: invoice.showBankDetails ?? true,
        allowPartialPayment: invoice.allowPartialPayment ?? true,
        status: invoice.status || 'draft',
        createdAt: now,
        updatedAt: now,
        ...invoice,
      };
      this.invoices.unshift(newInvoice);
      this.persist();
      return newInvoice;
    }
  }

  recordInvoicePayment(params: {
    invoiceId: string;
    amount: number;
    method: 'gateway' | 'bank_transfer' | 'cash' | 'other';
    reference: string;
    payerName?: string;
    payerEmail?: string;
    proofUrl?: string;
  }): { invoice: Invoice; payment: Payment } {
    this.initFromLocalStorage();
    const inv = this.invoices.find((i) => i.id === params.invoiceId);
    if (!inv) throw new Error('Invoice not found');

    const payment: Payment = {
      id: `pay-${Date.now()}`,
      invoiceId: inv.id,
      amount: params.amount,
      currency: inv.currency,
      method: params.method,
      reference: params.reference,
      payerName: params.payerName,
      payerEmail: params.payerEmail,
      status: 'successful',
      paidAt: new Date().toISOString(),
      proofUrl: params.proofUrl,
    };
    this.payments.unshift(payment);

    inv.amountPaid = Number(((inv.amountPaid || 0) + params.amount).toFixed(2));
    inv.balance = Number(Math.max(0, inv.total - inv.amountPaid).toFixed(2));
    if (inv.balance === 0) {
      inv.status = 'paid';
      inv.paidAt = new Date().toISOString();
    } else {
      inv.status = 'partially_paid';
    }
    inv.updatedAt = new Date().toISOString();

    this.persist();
    return { invoice: inv, payment };
  }

  // --- Payment Links ---
  getPaymentLinks(): PaymentLink[] {
    this.initFromLocalStorage();
    return [...this.paymentLinks];
  }

  getPaymentLinkByToken(token: string): PaymentLink | undefined {
    this.initFromLocalStorage();
    return this.paymentLinks.find((p) => p.token === token);
  }

  savePaymentLink(link: Partial<PaymentLink> & { title: string; currency: PaymentLink['currency'] }): PaymentLink {
    this.initFromLocalStorage();
    const existingIdx = this.paymentLinks.findIndex((p) => p.id === link.id);
    const now = new Date().toISOString();

    if (existingIdx >= 0) {
      const updated = { ...this.paymentLinks[existingIdx], ...link };
      this.paymentLinks[existingIdx] = updated;
      this.persist();
      return updated;
    } else {
      const newLink: PaymentLink = {
        ...link,
        id: link.id || `pl-${Date.now()}`,
        token: link.token || `pay_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`,
        title: link.title,
        amountType: link.amountType || 'fixed',
        amount: link.amount,
        currency: link.currency,
        reusable: link.reusable ?? true,
        collect: link.collect || { name: true, email: true, phone: false },
        active: link.active ?? true,
        status: 'active',
        timesUsed: 0,
        totalCollected: 0,
        createdAt: now,
      };
      this.paymentLinks.unshift(newLink);
      this.persist();
      return newLink;
    }
  }

  recordPaymentLinkPayment(params: {
    paymentLinkId: string;
    amount: number;
    reference: string;
    payerName?: string;
    payerEmail?: string;
  }): Payment {
    this.initFromLocalStorage();
    const link = this.paymentLinks.find((l) => l.id === params.paymentLinkId);
    if (!link) throw new Error('Payment link not found');

    const payment: Payment = {
      id: `pay-${Date.now()}`,
      paymentLinkId: link.id,
      amount: params.amount,
      currency: link.currency,
      method: 'gateway',
      reference: params.reference,
      payerName: params.payerName,
      payerEmail: params.payerEmail,
      status: 'successful',
      paidAt: new Date().toISOString(),
    };

    this.payments.unshift(payment);
    link.timesUsed += 1;
    link.totalCollected = Number((link.totalCollected + params.amount).toFixed(2));
    if (!link.reusable) {
      link.status = 'paid';
      link.active = false;
    }

    this.persist();
    return payment;
  }

  // --- Payments & Receipts ---
  getPayments(): Payment[] {
    this.initFromLocalStorage();
    return [...this.payments];
  }

  getPaymentByReference(reference: string): Payment | undefined {
    this.initFromLocalStorage();
    return this.payments.find((p) => p.reference === reference);
  }

  // --- Enquiries ---
  getEnquiries(): Enquiry[] {
    this.initFromLocalStorage();
    return [...this.enquiries];
  }

  submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'read' | 'createdAt'>): Enquiry {
    this.initFromLocalStorage();
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      status: 'new',
      read: false,
      createdAt: new Date().toISOString(),
      ...enquiry,
    };
    this.enquiries.unshift(newEnquiry);
    this.persist();
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: Enquiry['status'], read = true): Enquiry | undefined {
    this.initFromLocalStorage();
    const enq = this.enquiries.find((e) => e.id === id);
    if (!enq) return undefined;
    enq.status = status;
    enq.read = read;
    this.persist();
    return enq;
  }

  // --- Media ---
  getMedia(): MediaItem[] {
    this.initFromLocalStorage();
    return [...this.media];
  }

  addMedia(mediaItem: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem {
    this.initFromLocalStorage();
    const item: MediaItem = {
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...mediaItem,
    };
    this.media.unshift(item);
    this.persist();
    return item;
  }

  deleteMedia(id: string): boolean {
    this.initFromLocalStorage();
    this.media = this.media.filter((m) => m.id !== id);
    this.persist();
    return true;
  }

  // --- Settings ---
  getSettings(): AdminSettings {
    this.initFromLocalStorage();
    return { ...this.settings };
  }

  updateSettings(settings: Partial<AdminSettings>): AdminSettings {
    this.initFromLocalStorage();
    this.settings = { ...this.settings, ...settings };
    this.persist();
    return this.settings;
  }

  // --- Dashboard Stats ---
  getDashboardStats(): DashboardStats {
    this.initFromLocalStorage();

    const activeInvoices = this.getInvoices();

    let totalInvoicedNGN = 0;
    let totalInvoicedUSD = 0;
    let totalPaidNGN = 0;
    let totalPaidUSD = 0;
    let outstandingNGN = 0;
    let outstandingUSD = 0;
    let overdueCount = 0;

    activeInvoices.forEach((inv) => {
      if (inv.currency === 'NGN') {
        totalInvoicedNGN += inv.total;
        totalPaidNGN += inv.amountPaid;
        outstandingNGN += inv.balance;
      } else {
        totalInvoicedUSD += inv.total;
        totalPaidUSD += inv.amountPaid;
        outstandingUSD += inv.balance;
      }

      if (inv.status === 'overdue') {
        overdueCount += 1;
      }
    });

    return {
      totalInvoicedMonth: {
        NGN: totalInvoicedNGN,
        USD: totalInvoicedUSD,
      },
      totalPaidMonth: {
        NGN: totalPaidNGN,
        USD: totalPaidUSD,
      },
      totalOutstanding: {
        NGN: outstandingNGN,
        USD: outstandingUSD,
      },
      overdueCount,
      revenueByMonth: [
        { month: 'Oct', NGN: 2500000, USD: 4200 },
        { month: 'Nov', NGN: 3800000, USD: 5800 },
        { month: 'Dec', NGN: 4200000, USD: 7100 },
        { month: 'Jan', NGN: 5100000, USD: 8900 },
        { month: 'Feb', NGN: totalPaidNGN || 4837500, USD: totalPaidUSD || 3500 },
      ],
    };
  }
}

export const mockStore = new MockStore();
