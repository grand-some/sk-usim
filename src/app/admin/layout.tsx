'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    { href: '/admin', label: '메인 페이지 관리' },
    { href: '/admin/cases', label: '사례 관리' },
    { href: '/admin/practice-areas', label: '업무영역 관리' },
    { href: '/admin/members', label: '구성원 관리' },
    { href: '/admin/youtube', label: '유튜브 관리' },
    { href: '/admin/footer', label: '푸터 관리' },
    { href: '/admin/popup', label: '팝업 관리' },
    { href: '/admin/lawsuit-popup', label: '소송 제출 팝업 관리' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium ${
                    isActive(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              메인 화면으로
            </Link>
          </div>
        </div>
      </nav>
      <main className="py-8">{children}</main>
    </div>
  )
} 