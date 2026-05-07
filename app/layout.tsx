import type { Metadata } from 'next';
// Use next/font/google in production. Falls back to system font if Google Fonts
// is unreachable (e.g. in restricted CI/build environments).
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });
import './globals.css';

export const metadata: Metadata = {
  title: 'Team Request Hub',
  description: 'Sales team support request management for Cloud Adoption, Technical, and Marketing teams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
