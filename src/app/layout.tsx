import type { Metadata } from 'next';
import { Inter, VT323 } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import '@fortawesome/fontawesome-svg-core/styles.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const pixel = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
});

export const metadata: Metadata = {
  title: 'Jestr',
  description: 'Launch Solana tolens on Twitter',
};

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${pixel.variable} antialiased font-sans bg-jestr-background text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
