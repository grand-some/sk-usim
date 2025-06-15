'use client'

import { useState, useEffect } from 'react'

export default function LawsuitPopupManagement() {
  const [editedInfo, setEditedInfo] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/lawsuit-popup')
      .then(res => res.json())
      .then(data => setEditedInfo(data))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/lawsuit-popup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedInfo)
    })
    if (res.ok) {
      alert('소송 제출 팝업 정보가 저장되었습니다.')
    } else {
      alert('저장에 실패했습니다.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">소송 제출 팝업 관리</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {loading ? (
          <div className="text-gray-500">불러오는 중...</div>
        ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <input
                type="text"
                value={editedInfo.title}
                onChange={(e) => setEditedInfo({ ...editedInfo, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용
              </label>
              <textarea
                value={editedInfo.content}
                onChange={(e) => setEditedInfo({ ...editedInfo, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  )
} 