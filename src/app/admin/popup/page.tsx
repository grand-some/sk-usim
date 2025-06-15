'use client'

import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'

export default function AdminPopupPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">모달 팝업 관리</h1>
      <p>여기서 메인화면의 소송제출 모달 팝업 내용을 수정할 수 있습니다.</p>
      {/* 실제 관리 폼은 추후 구현 */}
    </div>
  )
} 