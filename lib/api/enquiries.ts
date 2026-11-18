import { Enquiry } from '@/types';
import { mockStore } from '../mock/store';
import { simulateLatency } from './client';

export async function getEnquiries(): Promise<Enquiry[]> {
  await simulateLatency();
  return mockStore.getEnquiries();
}

export async function submitEnquiry(
  enquiry: Omit<Enquiry, 'id' | 'status' | 'read' | 'createdAt'>
): Promise<Enquiry> {
  await simulateLatency();
  return mockStore.submitEnquiry(enquiry);
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry['status'],
  read = true
): Promise<Enquiry | null> {
  await simulateLatency();
  return mockStore.updateEnquiryStatus(id, status, read) || null;
}
