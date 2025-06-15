'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface MenuItem {
  id: string
  label: string
  path: string
  order: number
}

export default function NavigationAdmin() {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', label: '소개', path: '/about', order: 1 },
    { id: '2', label: '업무영역', path: '/practice', order: 2 },
    { id: '3', label: '주요사례', path: '/cases', order: 3 },
    { id: '4', label: '구성원', path: '/members', order: 4 },
    { id: '5', label: '문의하기', path: '/contact', order: 5 },
  ])
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? editingItem : item
      ))
      setEditingItem(null)
    }
  }

  const handleCancel = () => {
    setEditingItem(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">내비게이션 메뉴 관리</h1>
          
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                {editingItem?.id === item.id ? (
                  <form onSubmit={handleSave} className="flex-1 flex gap-4">
                    <input
                      type="text"
                      name="label"
                      value={editingItem.label}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="메뉴 이름"
                    />
                    <input
                      type="text"
                      name="path"
                      value={editingItem.path}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="경로"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.path}</p>
                    </div>
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      수정
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 