'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

export default function LawsuitGuide() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    usimCount: '1'
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.')
  }

  const handleLawsuitSubmit = () => {
    router.push('/lawsuit')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SKT USIM 정보유출 피해자 집단소송
          </h1>
          <p className="text-xl text-gray-600">
            전문 법률 지원을 통해 피해 보상을 받을 수 있는 기회
          </p>
        </div>

        {/* Issue Description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            SKT USIM 정보유출 사건 개요
          </h2>
          <p className="text-gray-600 mb-4">
            SK텔레콤의 USIM 정보유출 사건은 수많은 고객들의 개인정보가 유출된 심각한 사건입니다. 
            이는 단순한 개인정보 유출을 넘어 개인의 프라이버시와 안전을 위협하는 중대한 문제입니다.
          </p>
          <p className="text-gray-600">
            저희 법무법인은 이러한 피해자들의 권리를 보호하고 적절한 보상을 받을 수 있도록 
            전문적인 법률 지원을 제공하고 있습니다.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            자주 묻는 질문
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1. 향후 패소한 경우 소송의뢰인에게 책임이 있나요?
              </h3>
              <p className="text-gray-600">
                패소한 경우에도 의뢰인에게 일체의 금원을 청구하지 않습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2. 예상 승소금액은 얼마인가요?
              </h3>
              <p className="text-gray-600">
                유사한 사안들에서 판례는 10만 원 내지 30만 원 정도의 배상액을 인정한 바 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3. 알뜰폰 이용자도 참여할 수 있나요?
              </h3>
              <p className="text-gray-600">
                SKT 알뜰폰 이용자라면 참여할 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                4. 미성년자도 참여할 수 있나요?
              </h3>
              <p className="text-gray-600">
                미성년자는 법정대리인인 부모님의 동의하에 참여할 수 있습니다. 소송참여하기를 누르면 미성년자를 위한 진행이 별도로 진행 중입니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                5. 외국에 거주하고 있어도 소송에 참여할 수 있나요?
              </h3>
              <p className="text-gray-600">
                네, 가능합니다. 온라인으로 모든 절차 진행이 가능하며, 서류는 우편 또는 전자문서로 제출하실 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                6. SKT에서 여러 개의 유심(회선)을 사용 중일 때에는 어떻게 해야 하나요?
              </h3>
              <p className="text-gray-600">
                여러 개의 유심(회선)을 사용하더라도 이용자가 동일하다면 한 번만 청구할 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                7. 소송 중간에 참여를 취소할 수 있나요?
              </h3>
              <p className="text-gray-600">
                소장이 접수된 이후에는 참여를 취소할 수 없고, 저희 법무법인과 별도로 SKT와 합의하시면 안됩니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                8. 배상금은 언제, 어떻게 받을 수 있나요?
              </h3>
              <p className="text-gray-600">
                소송 확정 후 약 1-2개월 내에 등록하신 계좌로 배상금이 입금됩니다. 배상금에서 성공보수(20%)를 공제하고 지급됩니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                9. 소송 진행 상황은 어떻게 확인할 수 있나요?
              </h3>
              <p className="text-gray-600">
                주요 소송 진행 사항은 저희 법무법인 홈페이지 또는 네이버 카페를 통해 공지됩니다. 물론, 개별적으로 사건번호를 통해서도 확인이 가능합니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                10. 해킹 피해를 직접적으로 입증하기 어려운데 소송에 참여할 수 있나요?
              </h3>
              <p className="text-gray-600">
                네, 가능합니다. 개인정보 유출 자체만으로도 정신적 손해배상 청구의 근거가 됩니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                11. 이미 SK텔레콤이 유심을 교체해줬는데도 소송에 참여할 수 있나요?
              </h3>
              <p className="text-gray-600">
                네, 가능합니다. SK텔레콤의 유심 교체는 피해 예방을 위한 조치에 불과하여 이미 발생한 피해에 대한 법적 책임은 여전히 존재합니다. 유심 교체와 별개로 손해배상을 청구할 권리가 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Lawsuit Submit Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleLawsuitSubmit}
            className="px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            소송진행하기
          </button>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            무료 상담 신청
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                연락처
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="usimCount" className="block text-sm font-medium text-gray-700 mb-1">
                사용 중인 USIM 개수
              </label>
              <select
                id="usimCount"
                value={formData.usimCount}
                onChange={(e) => setFormData({ ...formData, usimCount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="1">1개</option>
                <option value="2">2개</option>
                <option value="3">3개</option>
                <option value="4">4개 이상</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              무료 상담 신청하기
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
} 