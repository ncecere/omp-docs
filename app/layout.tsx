import type { Metadata, Viewport } from 'next';
import { Provider } from '@/components/provider';
import { siteUrl } from '@/lib/site';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s · Open MCP Portal docs',
    default: 'Open MCP Portal docs',
  },
  description:
    'Documentation for Open MCP Portal, the self-hosted portal to your company\'s MCP servers: connecting AI clients, registering servers, building gateways, administering access and running it.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  // Open Graph card (public/og.png, the logo's og-card.png, copied by scripts/sync-logo.mjs). Titles and descriptions come
  // from each page's own <title> and description.
  openGraph: {
    type: 'website',
    siteName: 'Open MCP Portal docs',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: "Open MCP Portal: one governed portal to your company's MCP tools",
      },
    ],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d12' },
  ],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
