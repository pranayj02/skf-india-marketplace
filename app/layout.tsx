import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'SKF India — Industrial B2B Marketplace',
  description: 'Premium bearings, seals, and industrial components for India\'s heavy industries. Request RFQ bulk pricing instantly.',
  keywords: 'SKF India, bearings, industrial components, B2B marketplace, RFQ, deep groove ball bearing',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-[#1a2535] font-sans antialiased">{children}</body>
    </html>
  )
}
