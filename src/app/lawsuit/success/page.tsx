'use client'

import ClientLayout from '../../client-layout'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LawsuitSuccessPage() {
  return (
    <ClientLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                소송 신청이 완료되었습니다
              </h1>
              <p className="text-gray-600 mb-8">
                소송 신청이 성공적으로 접수되었습니다. 담당 변호사가 검토 후 연락드리겠습니다.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  다음단계
                </h2>
                <p className="text-left text-gray-600">
                  담당 변호사가 신청서를 검토합니다.<br />
                  검토 완료 후 문자, 카카오톡으로 진행상황을 업데이트 합니다.<br />
                  소송 진행에 필요한 추가 서류의 요청이 있을 수 있습니다.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  문의사항
                </h2>
                <p className="text-gray-600">
                  문의사항이 있으시면 아래 연락처로 연락주세요.
                </p>
                <div className="mt-2 text-gray-600">
                  <p>전화: 02-3491-2600</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-x-4">
              <Link
                href="/"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
              >
                홈으로
              </Link>
              <Link
                href="/lawsuit"
                className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
              >
                다른 소송 신청하기
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </ClientLayout>
  )
} 