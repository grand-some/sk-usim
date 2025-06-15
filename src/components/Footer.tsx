'use client'

import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'

export default function Footer() {
  const { footerInfo } = useAdmin()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 주소 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">주소</h3>
            <div className="space-y-2">
              {footerInfo.addresses.map((address, index) => (
                <p key={index} className="text-gray-300">{address}</p>
              ))}
            </div>
          </div>

          {/* 연락처 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <p className="text-gray-300 mb-2">Tel: {footerInfo.phone}</p>
            <p className="text-gray-300">Email: {footerInfo.email}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{footerInfo.copyright}</p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                관리자 페이지
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 