'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Case {
  id: number
  title: string
  description: string
  image: string
}

interface PracticeArea {
  id: number
  title: string
  description: string
  icon: string
}

interface Member {
  id: number
  name: string
  position: string
  image: string
  description: string
}

interface YouTubeVideo {
  id: number
  title: string
  thumbnail: string
  url: string
}

interface FooterInfo {
  addresses: string[];
  phone: string;
  email: string;
  copyright: string;
}

interface MainPageContent {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  casesTitle: string
  casesSubtitle: string
  practiceAreasTitle: string
  practiceAreasSubtitle: string
  membersTitle: string
  membersSubtitle: string
  youtubeTitle: string
  youtubeSubtitle: string
}

interface PopupInfo {
  isActive: boolean;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

interface LawsuitPopupInfo {
  title: string;
  content: string;
}

interface AdminContextType {
  cases: Case[]
  setCases: (cases: Case[]) => void
  practiceAreas: PracticeArea[]
  setPracticeAreas: (areas: PracticeArea[]) => void
  members: Member[]
  setMembers: (members: Member[]) => void
  videos: YouTubeVideo[]
  setVideos: (videos: YouTubeVideo[]) => void
  footerInfo: FooterInfo
  setFooterInfo: (info: FooterInfo) => void
  mainPageContent: MainPageContent
  setMainPageContent: (content: MainPageContent) => void
  popupInfo: PopupInfo
  setPopupInfo: (info: PopupInfo) => void
  lawsuitPopupInfo: LawsuitPopupInfo
  setLawsuitPopupInfo: (info: LawsuitPopupInfo) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<Case[]>([])
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [footerInfo, setFooterInfo] = useState<FooterInfo>({
    addresses: ['', '', ''],
    phone: '',
    email: '',
    copyright: ''
  })
  const [mainPageContent, setMainPageContent] = useState<MainPageContent>({
    heroTitle: '법무법인 로아',
    heroSubtitle: '전문성과 신뢰를 바탕으로',
    heroDescription: '고객의 권익을 최우선으로 생각하는 법률 서비스를 제공합니다.',
    casesTitle: '주요 사례',
    casesSubtitle: '성공적으로 해결한 주요 사례들을 소개합니다.',
    practiceAreasTitle: '업무 영역',
    practiceAreasSubtitle: '전문적인 법률 서비스를 제공합니다.',
    membersTitle: '전문 변호사',
    membersSubtitle: '풍부한 경험과 전문성을 갖춘 변호사들을 소개합니다.',
    youtubeTitle: '법무법인 유튜브',
    youtubeSubtitle: '법률 정보와 소식을 영상으로 만나보세요.'
  })
  const [popupInfo, setPopupInfo] = useState<PopupInfo>({
    isActive: false,
    title: '',
    content: '',
    startDate: '',
    endDate: ''
  })
  const [lawsuitPopupInfo, setLawsuitPopupInfo] = useState<LawsuitPopupInfo>({
    title: '소송 제출 안내',
    content: '소송 제출을 원하시나요? 소송 제출 페이지로 이동하시겠습니까?'
  })

  return (
    <AdminContext.Provider
      value={{
        cases,
        setCases,
        practiceAreas,
        setPracticeAreas,
        members,
        setMembers,
        videos,
        setVideos,
        footerInfo,
        setFooterInfo,
        mainPageContent,
        setMainPageContent,
        popupInfo,
        setPopupInfo,
        lawsuitPopupInfo,
        setLawsuitPopupInfo
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
} 