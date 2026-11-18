import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Pitech | Technical Product Designer & Systems Architect',
  description:
    'Crafting high-impact digital products, scalable design systems, and robust multi-currency billing platforms from 0 to 1.',
  keywords: [
    'Next.js 16',
    'React 19',
    'Technical Product Designer',
    'Systems Architect',
    'TypeScript',
    'Fintech',
    'Invoicing Engine',
    'Design Systems',
    'Nigeria',
    'Remote Engineering',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ height: '100%' }}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        style={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-sans)',
          backgroundColor: 'var(--bg)',
          color: 'var(--text-main)',
          transition: 'background-color 150ms ease, color 150ms ease',
        }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
