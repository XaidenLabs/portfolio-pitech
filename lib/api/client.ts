export const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS !== 'false'; // defaults to true unless explicitly disabled

export async function simulateLatency(ms = 150): Promise<void> {
  if (typeof window !== 'undefined') {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
