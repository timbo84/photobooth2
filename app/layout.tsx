import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Footer from '../components/footer'
import Nav from '../components/nav'

export const metadata: Metadata = {
  title: 'photobooth',
  description: 'Capture and share moments with ease using photobooth.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Nav />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
