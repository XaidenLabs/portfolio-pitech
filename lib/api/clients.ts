import { Client } from '@/types';
import { mockStore } from '../mock/store';
import { simulateLatency } from './client';

export async function getClients(): Promise<Client[]> {
  await simulateLatency();
  return mockStore.getClients();
}

export async function getClientById(id: string): Promise<Client | null> {
  await simulateLatency();
  return mockStore.getClientById(id) || null;
}

export async function saveClient(client: Partial<Client> & { name: string; email: string }): Promise<Client> {
  await simulateLatency();
  return mockStore.saveClient(client);
}
