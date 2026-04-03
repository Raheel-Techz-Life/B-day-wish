import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  weight: ['400', '500', '600'],
  variable: '--font-sans'
});
const lora = Lora({ 
  subsets: ["latin"], 
  weight: ['400', '500'],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'KrishiNetra - AI-Powered Agricultural Assistant',
  description: 'Voice-driven agricultural intelligence platform powered by Bhumi Bai AI assistant',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${lora.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
