'use client'

import { useState, useEffect } from 'react'
import ClientLayout from './client-layout'
import Hero from '@/components/Hero'
import Members from '@/components/Members'
import PracticeAreas from '@/components/PracticeAreas'
import Cases from '@/components/Cases'
import YouTubeSection from '@/components/YouTubeSection'
import NoticePopup from '@/components/NoticePopup'
import { youtubeChannel } from '@/data/youtube'
import Navigation from '@/components/Navigation'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const router = useRouter()
  const [lawsuitPopupInfo, setLawsuitPopupInfo] = useState({ title: '', content: '' })
  const [mainPageContent, setMainPageContent] = useState({
    heroTitle: '', heroSubtitle: '', heroDescription: '',
    casesTitle: '', casesSubtitle: '',
    practiceAreasTitle: '', practiceAreasSubtitle: '',
    membersTitle: '', membersSubtitle: '',
    youtubeTitle: '', youtubeSubtitle: ''
  })

  useEffect(() => {
    // 오늘 하루 열지 않기 체크 여부 확인
    const today = new Date().toISOString().slice(0, 10)
    const dontShowDate = localStorage.getItem('lawsuitPopupDontShowDate')
    if (dontShowDate === today) {
      setShowPopup(false)
    } else {
      setShowPopup(true)
    }
    // 팝업 내용 불러오기
    fetch('/api/lawsuit-popup')
      .then(res => res.json())
      .then(data => setLawsuitPopupInfo(data))
  }, [])

  const handleClose = () => {
    setShowPopup(false)
    if (dontShowToday) {
      const today = new Date().toISOString().slice(0, 10)
      localStorage.setItem('lawsuitPopupDontShowDate', today)
    }
  }

  const handleSubmit = () => {
    router.push('/lawsuit')
    setShowPopup(false)
  }

  const handleGuide = () => {
    router.push('/lawsuit/guide')
    setShowPopup(false)
  }

  return (
    <ClientLayout>
      <Navigation />
      <main>
        <Hero />
        <section id="cases">
          <Cases
            title={mainPageContent.casesTitle}
            subtitle={mainPageContent.casesSubtitle}
          />
        </section>
        <section id="practice-areas">
          <PracticeAreas
            title={mainPageContent.practiceAreasTitle}
            subtitle={mainPageContent.practiceAreasSubtitle}
          />
        </section>
        <section id="members">
          <Members
            title={mainPageContent.membersTitle}
            subtitle={mainPageContent.membersSubtitle}
          />
        </section>
        <section id="youtube">
          <YouTubeSection
            title={mainPageContent.youtubeTitle}
            subtitle={mainPageContent.youtubeSubtitle}
          />
        </section>
        <NoticePopup />

        {/* 소송제출 팝업창 */}
        {showPopup && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <div className="bg-white py-4 px-8 rounded-lg max-w-2xl w-full mx-4 mb-6 relative shadow-lg pointer-events-auto border border-gray-200">
              {/* X 버튼 */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{lawsuitPopupInfo.title}</h2>
              <p className="text-gray-600 mb-6">
                {lawsuitPopupInfo.content}
                
              </p>
              <div className="flex justify-end gap-4 mb-4">
                <button
                  onClick={handleGuide}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  소송안내
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  소송진행하기
                </button>
              </div>
              {/* 오늘 하루 열지 않기 체크박스 */}
              <div className="flex items-center mt-2">
                <input
                  id="dontShowToday"
                  type="checkbox"
                  checked={dontShowToday}
                  onChange={e => setDontShowToday(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="dontShowToday" className="ml-2 text-sm text-gray-600 cursor-pointer">
                  오늘 하루 열지 않기
                </label>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </main>
    </ClientLayout>
  )
} 