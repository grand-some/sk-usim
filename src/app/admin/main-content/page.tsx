'use client'

import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'

export default function MainContentManagement() {
  const { mainPageContent, setMainPageContent } = useAdmin()
  const [editedContent, setEditedContent] = useState(mainPageContent)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMainPageContent(editedContent)
    alert('메인 페이지 문구가 수정되었습니다.')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">메인 페이지 문구 관리</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 히어로 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">히어로 섹션</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메인 타이틀
              </label>
              <input
                type="text"
                value={editedContent.heroTitle}
                onChange={(e) => setEditedContent({ ...editedContent, heroTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                서브 타이틀
              </label>
              <input
                type="text"
                value={editedContent.heroSubtitle}
                onChange={(e) => setEditedContent({ ...editedContent, heroSubtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                value={editedContent.heroDescription}
                onChange={(e) => setEditedContent({ ...editedContent, heroDescription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* 주요 사례 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">주요 사례 섹션</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                타이틀
              </label>
              <input
                type="text"
                value={editedContent.casesTitle}
                onChange={(e) => setEditedContent({ ...editedContent, casesTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                서브 타이틀
              </label>
              <input
                type="text"
                value={editedContent.casesSubtitle}
                onChange={(e) => setEditedContent({ ...editedContent, casesSubtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 업무 영역 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">업무 영역 섹션</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                타이틀
              </label>
              <input
                type="text"
                value={editedContent.practiceAreasTitle}
                onChange={(e) => setEditedContent({ ...editedContent, practiceAreasTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                서브 타이틀
              </label>
              <input
                type="text"
                value={editedContent.practiceAreasSubtitle}
                onChange={(e) => setEditedContent({ ...editedContent, practiceAreasSubtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 전문 변호사 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">전문 변호사 섹션</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                타이틀
              </label>
              <input
                type="text"
                value={editedContent.membersTitle}
                onChange={(e) => setEditedContent({ ...editedContent, membersTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                서브 타이틀
              </label>
              <input
                type="text"
                value={editedContent.membersSubtitle}
                onChange={(e) => setEditedContent({ ...editedContent, membersSubtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 유튜브 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">유튜브 섹션</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                타이틀
              </label>
              <input
                type="text"
                value={editedContent.youtubeTitle}
                onChange={(e) => setEditedContent({ ...editedContent, youtubeTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                서브 타이틀
              </label>
              <input
                type="text"
                value={editedContent.youtubeSubtitle}
                onChange={(e) => setEditedContent({ ...editedContent, youtubeSubtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  )
} 