import { Post } from '@/types';
import { mockStore } from '../mock/store';
import { simulateLatency } from './client';

export async function getPosts(status?: 'published' | 'draft' | 'all'): Promise<Post[]> {
  await simulateLatency();
  return mockStore.getPosts(status);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await simulateLatency();
  return mockStore.getPostBySlug(slug) || null;
}

export async function savePost(post: Partial<Post> & { title: string }): Promise<Post> {
  await simulateLatency();
  return mockStore.savePost(post);
}

export async function deletePost(id: string): Promise<boolean> {
  await simulateLatency();
  return mockStore.deletePost(id);
}
