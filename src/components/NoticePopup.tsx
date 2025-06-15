'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function NoticePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenNotice = localStorage.getItem('hasSeenNotice')
    if (!hasSeenNotice) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('hasSeenNotice', 'true')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">SK 유심 유출 소송 안내</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              SK 유심 유출 사고 피해자분들을 위한 소송 제기 서비스를 시작했습니다.
              <br />
              피해자분들의 권리 회복을 위해 최선을 다하겠습니다.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.open('/lawsuit', '_blank', 'width=800,height=1000')}
                className="block w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors text-center"
              >
                소송 제기하기
              </button>
              <button
                onClick={handleClose}
                className="block w-full bg-gray-100 text-gray-600 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                나중에 하기
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 