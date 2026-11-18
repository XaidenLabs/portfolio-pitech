import { Payment, PaymentLink } from '@/types';
import { mockStore } from '../mock/store';
import { simulateLatency } from './client';

export async function getPaymentLinks(): Promise<PaymentLink[]> {
  await simulateLatency();
  return mockStore.getPaymentLinks();
}

export async function getPaymentLinkByToken(token: string): Promise<PaymentLink | null> {
  await simulateLatency();
  return mockStore.getPaymentLinkByToken(token) || null;
}

export async function savePaymentLink(
  link: Partial<PaymentLink> & { title: string; currency: PaymentLink['currency'] }
): Promise<PaymentLink> {
  await simulateLatency();
  return mockStore.savePaymentLink(link);
}

export async function recordPaymentLinkPayment(params: {
  paymentLinkId: string;
  amount: number;
  reference: string;
  payerName?: string;
  payerEmail?: string;
}): Promise<Payment> {
  await simulateLatency();
  return mockStore.recordPaymentLinkPayment(params);
}

export async function getPayments(): Promise<Payment[]> {
  await simulateLatency();
  return mockStore.getPayments();
}
