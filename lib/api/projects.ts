import { Project } from '@/types';
import { mockStore } from '../mock/store';
import { simulateLatency } from './client';

export async function getProjects(status?: 'published' | 'draft' | 'all'): Promise<Project[]> {
  await simulateLatency();
  return mockStore.getProjects(status);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  await simulateLatency();
  const proj = mockStore.getProjectBySlug(slug);
  return proj || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  await simulateLatency();
  const proj = mockStore.getProjectById(id);
  return proj || null;
}

export async function saveProject(project: Partial<Project> & { title: string }): Promise<Project> {
  await simulateLatency();
  return mockStore.saveProject(project);
}

export async function deleteProject(id: string): Promise<boolean> {
  await simulateLatency();
  return mockStore.deleteProject(id);
}
