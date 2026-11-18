import { Service, Testimonial } from '@/types';
import { mockStore } from '../mock/store';
import { simulateLatency } from './client';

export async function getServices(onlyVisible = true): Promise<Service[]> {
  await simulateLatency();
  return mockStore.getServices(onlyVisible);
}

export async function saveService(service: Partial<Service> & { name: string }): Promise<Service> {
  await simulateLatency();
  return mockStore.saveService(service);
}

export async function deleteService(id: string): Promise<boolean> {
  await simulateLatency();
  return mockStore.deleteService(id);
}

export async function getTestimonials(onlyVisible = true): Promise<Testimonial[]> {
  await simulateLatency();
  return mockStore.getTestimonials(onlyVisible);
}

export async function saveTestimonial(
  testimonial: Partial<Testimonial> & { name: string; quote: string }
): Promise<Testimonial> {
  await simulateLatency();
  return mockStore.saveTestimonial(testimonial);
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  await simulateLatency();
  return mockStore.deleteTestimonial(id);
}
