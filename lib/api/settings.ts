import { AdminSettings, DashboardStats, MediaItem } from '@/types';
import { mockStore } from '../mock/store';
import { simulateLatency } from './client';

export async function getMedia(): Promise<MediaItem[]> {
  await simulateLatency();
  return mockStore.getMedia();
}

export async function addMedia(item: Omit<MediaItem, 'id' | 'createdAt'>): Promise<MediaItem> {
  await simulateLatency();
  return mockStore.addMedia(item);
}

export async function deleteMedia(id: string): Promise<boolean> {
  await simulateLatency();
  return mockStore.deleteMedia(id);
}

export async function getSettings(): Promise<AdminSettings> {
  await simulateLatency();
  return mockStore.getSettings();
}

export async function updateSettings(settings: Partial<AdminSettings>): Promise<AdminSettings> {
  await simulateLatency();
  return mockStore.updateSettings(settings);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await simulateLatency();
  return mockStore.getDashboardStats();
}
