import { simulateLatency } from './client';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

const DEMO_USER: AdminUser = {
  id: 'usr-admin-01',
  name: 'Pitech Admin',
  email: 'admin@pitech.dev',
  role: 'admin',
};

export async function login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  await simulateLatency(300);

  // In mock/development mode, demo credentials or simple non-empty credentials allow login
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('pitech_admin_session', JSON.stringify(DEMO_USER));
    document.cookie = 'pitech_admin_session=true; path=/; max-age=86400; SameSite=Lax';
  }

  return { success: true, user: DEMO_USER };
}

export async function logout(): Promise<void> {
  await simulateLatency(150);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('pitech_admin_session');
    document.cookie = 'pitech_admin_session=; path=/; max-age=0; SameSite=Lax';
  }
}

export function getCurrentUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('pitech_admin_session');
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return null;
}
