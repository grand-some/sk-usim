'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Navigation = dynamic(() => import('@/components/Navigation'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
} 