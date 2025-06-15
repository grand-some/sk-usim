'use client'

import ClientLayout from '../client-layout'
import { motion } from 'framer-motion'

export default function LawsuitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-8"
            >
              {/* 삭제: <h1 className="text-3xl font-bold text-center text-gray-900">소송 신청</h1> */}
              {/* 삭제: <p className="text-center text-gray-600 mt-2">소송 신청을 위한 정보를 입력해주세요.</p> */}
            </motion.div>
            {children}
          </div>
        </div>
      </motion.div>
    </ClientLayout>
  )
} 