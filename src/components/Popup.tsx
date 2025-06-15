'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/context/AdminContext'

export default function Popup() {
  const { popupInfo } = useAdmin()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (popupInfo.isActive) {
      const now = new Date()
      const startDate = new Date(popupInfo.startDate)
      const endDate = new Date(popupInfo.endDate)
      
      if (now >= startDate && now <= endDate) {
        const hasSeenPopup = localStorage.getItem('hasSeenPopup')
        if (!hasSeenPopup) {
          setIsVisible(true)
        }
      }
    }
  }, [popupInfo])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('hasSeenPopup', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold mb-4">{popupInfo.title}</h2>
        <div className="text-gray-600 whitespace-pre-line">
          {popupInfo.content}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
} 