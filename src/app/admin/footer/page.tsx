'use client'

import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'

export default function AdminFooterPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">푸터 관리</h1>
      <p>여기서 메인페이지의 푸터 정보를 수정할 수 있습니다.</p>
      {/* 실제 관리 폼은 추후 구현 */}
    </div>
  )
} 