'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 주요사례 관리 */}
        <Link href="/admin/cases" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">주요사례 관리</h2>
            <p className="text-gray-600">메인페이지의 주요사례 섹션을 수정합니다.</p>
          </div>
        </Link>
        {/* 업무영역 관리 */}
        <Link href="/admin/practice-areas" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">업무영역 관리</h2>
            <p className="text-gray-600">메인페이지의 업무영역 섹션을 수정합니다.</p>
          </div>
        </Link>
        {/* 구성원 관리 */}
        <Link href="/admin/members" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">구성원 관리</h2>
            <p className="text-gray-600">메인페이지의 구성원 섹션을 수정합니다.</p>
          </div>
        </Link>
        {/* 유튜브 관리 */}
        <Link href="/admin/youtube" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">유튜브 관리</h2>
            <p className="text-gray-600">메인페이지의 유튜브 섹션을 수정합니다.</p>
          </div>
        </Link>
        {/* 모달 팝업 관리 */}
        <Link href="/admin/popup" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">모달 팝업 관리</h2>
            <p className="text-gray-600">메인화면의 소송제출 모달 팝업을 수정합니다.</p>
          </div>
        </Link>
        {/* 푸터 관리 */}
        <Link href="/admin/footer" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">푸터 관리</h2>
            <p className="text-gray-600">메인페이지의 푸터 정보를 수정합니다.</p>
          </div>
        </Link>
      </div>
    </div>
  )
} 