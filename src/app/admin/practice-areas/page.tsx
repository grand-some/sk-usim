'use client'

import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'

export default function AdminPracticeAreasPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">업무영역 관리</h1>
      <p>여기서 업무영역을 추가, 수정, 삭제할 수 있습니다.</p>
      {/* 실제 관리 폼/목록은 추후 구현 */}
    </div>
  )
} 