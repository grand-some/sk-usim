'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80 // 네비게이션 바의 높이
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img src="/logo.png" alt="로고" className="h-8 w-8 mr-2" />
            <Link href="/" className="text-2xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors duration-300">
              법무법인 로아
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('cases')} className="text-gray-600 hover:text-gray-800 transition-colors duration-300">주요사례</button>
            <button onClick={() => scrollToSection('practice-areas')} className="text-gray-600 hover:text-gray-800 transition-colors duration-300">업무영역</button>
            <button onClick={() => scrollToSection('members')} className="text-gray-600 hover:text-gray-800 transition-colors duration-300">구성원</button>
            <button onClick={() => scrollToSection('youtube')} className="text-gray-600 hover:text-gray-800 transition-colors duration-300">유튜브</button>
            <button onClick={() => scrollToSection('contact-section')} className="text-gray-600 hover:text-gray-800 transition-colors duration-300">문의하기</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            <button onClick={() => scrollToSection('cases')} className="block w-full text-left text-gray-600 hover:text-gray-800 transition-colors duration-300">주요사례</button>
            <button onClick={() => scrollToSection('practice-areas')} className="block w-full text-left text-gray-600 hover:text-gray-800 transition-colors duration-300">업무영역</button>
            <button onClick={() => scrollToSection('members')} className="block w-full text-left text-gray-600 hover:text-gray-800 transition-colors duration-300">구성원</button>
            <button onClick={() => scrollToSection('youtube')} className="block w-full text-left text-gray-600 hover:text-gray-800 transition-colors duration-300">유튜브</button>
            <button onClick={() => scrollToSection('contact-section')} className="block text-gray-600 hover:text-gray-800 transition-colors duration-300">문의하기</button>
          </div>
        </motion.div>
      </div>
    </nav>
  )
} 