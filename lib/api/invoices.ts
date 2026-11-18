import { Invoice, Payment } from '@/types';
import { mockStore } from '../mock/store';
import { simulateLatency } from './client';

export async function getInvoices(): Promise<Invoice[]> {
  await simulateLatency();
  return mockStore.getInvoices();
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  await simulateLatency();
  return mockStore.getInvoiceById(id) || null;
}

export async function getInvoiceByToken(token: string): Promise<Invoice | null> {
  await simulateLatency();
  return mockStore.getInvoiceByToken(token) || null;
}

export async function saveInvoice(
  invoice: Partial<Invoice> & { clientId: string; items: Invoice['items'] }
): Promise<Invoice> {
  await simulateLatency();
  return mockStore.saveInvoice(invoice);
}

export async function recordInvoicePayment(params: {
  invoiceId: string;
  amount: number;
  method: 'gateway' | 'bank_transfer' | 'cash' | 'other';
  reference: string;
  payerName?: string;
  payerEmail?: string;
  proofUrl?: string;
}): Promise<{ invoice: Invoice; payment: Payment }> {
  await simulateLatency();
  return mockStore.recordInvoicePayment(params);
}
