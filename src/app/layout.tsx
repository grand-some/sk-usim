import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AdminProvider } from '@/context/AdminContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '법무법인 - 전문성과 신뢰로 최상의 법률 서비스를 제공합니다',
  description: '고객의 권리와 이익을 최우선으로 생각하는 전문 변호사들이 함께합니다. 민사, 형사, 행정, 기업법무 등 다양한 분야에서 최상의 법률 서비스를 제공합니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen w-full bg-white font-sans antialiased">
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  )
} 