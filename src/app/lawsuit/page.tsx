'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LawsuitPage() {
  const router = useRouter()
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [isAlteulPhone, setIsAlteulPhone] = useState<boolean | null>(null)
  const [isAdult, setIsAdult] = useState<boolean | null>(null)
  const [isSktUser, setIsSktUser] = useState<'Y' | 'N' | null>(null)
  const [userType, setUserType] = useState<'개인' | '사업자' | null>(null)
  const [simReplaced, setSimReplaced] = useState<'Y' | 'N' | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSktUser && userType && simReplaced && isAdult !== null) {
      router.push(`/lawsuit/form?isSktUser=${isSktUser}&userType=${userType}&simReplaced=${simReplaced}&isAdult=${isAdult}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step Indicator */}
      <div className="flex justify-center mb-8">
        <ol className="flex w-full max-w-2xl items-center text-sm font-medium text-gray-500">
          <li className="flex-1 flex flex-col items-center text-red-600 font-bold">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-600 bg-red-100">1</div>
            <span className="mt-2">기본정보</span>
          </li>
          <li className="flex-0 w-8 h-0.5 bg-gray-300 mx-2 self-center"></li>
          <li className="flex-1 flex flex-col items-center text-gray-400">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white">2</div>
            <span className="mt-2">서류첨부</span>
          </li>
          <li className="flex-0 w-8 h-0.5 bg-gray-300 mx-2 self-center"></li>
          <li className="flex-1 flex flex-col items-center text-gray-400">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white">3</div>
            <span className="mt-2">본인인증</span>
          </li>
          <li className="flex-0 w-8 h-0.5 bg-gray-300 mx-2 self-center"></li>
          <li className="flex-1 flex flex-col items-center text-gray-400">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white">4</div>
            <span className="mt-2">완료</span>
          </li>
        </ol>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <form method="POST" action="" id="sktForm" className="content mb-10">
          {/* SKT 통신사 여부 섹션 */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <div className="options-container mb-4">
              <div className="option-label font-semibold mb-2 text-xl text-gray-900 flex items-center">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">1</span>
                현재 SKT 통신사를 사용하고 계신가요?
              </div>
              <p className="text-gray-600 text-sm mb-4 ml-11">2025. 4. 20. 기준으로 SKT를 사용하고 계셔야 합니다.</p>
              <div className="options flex gap-4">
                <div
                  className={`option border rounded-lg p-4 cursor-pointer flex-1 ${isSktUser === 'Y' ? 'selected bg-red-100 border-red-500' : 'bg-white border-gray-300'}`}
                  onClick={() => setIsSktUser('Y')}
                >
                  <div className="option-title font-bold mb-1">예, 유지하고 있어요!</div>
                  <div className="option-desc text-gray-600 mb-2">사고 이후에도 계속 SKT폰을 사용하고 있어요!</div>
                  <input type="radio" name="is_skt_user" value="Y" style={{ display: 'none' }} checked={isSktUser === 'Y'} readOnly />
                </div>
                <div
                  className={`option border rounded-lg p-4 cursor-pointer flex-1 ${isSktUser === 'N' ? 'selected bg-red-100 border-red-500' : 'bg-white border-gray-300'}`}
                  onClick={() => setIsSktUser('N')}
                >
                  <div className="option-title font-bold mb-1">아니오, 통신사를 변경했어요!</div>
                  <div className="option-desc text-gray-600 mb-2">사고 이후 KT, LG로 통신사를 변경하였어요!</div>
                  <input type="radio" name="is_skt_user" value="N" style={{ display: 'none' }} checked={isSktUser === 'N'} readOnly />
                </div>
              </div>
            </div>
          </div>
          {/* 가입자 유형 선택 */}
          <div className="input-group mb-8 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <label className="input-label block mb-4 text-xl font-semibold text-gray-900 flex items-center">
              <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">2</span>
              법인 휴대폰이신가요
              <span className="required text-red-500 ml-1">*</span>
              </label>
            <div className="buttons-group flex gap-4">
              <button
                type="button"
                className={`option-button px-6 py-3 rounded-lg border font-medium text-lg transition-colors ${userType === '개인' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setUserType('개인')}
              >
                개인폰입니다.
              </button>
              <button
                type="button"
                className={`option-button px-6 py-3 rounded-lg border font-medium text-lg transition-colors ${userType === '사업자' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setUserType('사업자')}
              >
                법인폰입니다.
              </button>
            </div>
            <input type="hidden" name="user_type" id="user_type" value={userType || ''} />
          </div>
          {/* 유심 교체 여부 */}
          <div className="input-group mb-8 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <label className="input-label block mb-4 text-xl font-semibold text-gray-900 flex items-center">
              <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">3</span>
              유심을 교체 하셨나요?
              <span className="required text-red-500 ml-1">*</span>
              </label>
            <div className="buttons-group flex gap-4">
              <button
                type="button"
                className={`option-button px-6 py-3 rounded-lg border font-medium text-lg transition-colors ${simReplaced === 'Y' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setSimReplaced('Y')}
              >
                네,<br />교체했어요
              </button>
              <button
                type="button"
                className={`option-button px-6 py-3 rounded-lg border font-medium text-lg transition-colors ${simReplaced === 'N' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setSimReplaced('N')}
              >
                아니오,<br />교체하지 않았어요.
              </button>
            </div>
            <input type="hidden" name="sim_replaced" id="sim_replaced" value={simReplaced || ''} />
          </div>
        </form>
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* 성인 여부 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
              <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">4</span>
              성인이신가요?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                isAdult === true ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-200'
              }`}>
                <input
                  type="radio"
                  name="isAdult"
                  checked={isAdult === true}
                  onChange={() => setIsAdult(true)}
                  className="w-5 h-5 text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700">예, 성인입니다.</span>
              </label>
              <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                isAdult === false ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-200'
              }`}>
                <input
                  type="radio"
                  name="isAdult"
                  checked={isAdult === false}
                  onChange={() => setIsAdult(false)}
                  className="w-5 h-5 text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700">아니오, 미성년자입니다.</span>
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              type="submit"
              disabled={!isSktUser || !userType || !simReplaced || isAdult === null}
              className="w-full bg-red-600 text-white py-4 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
            >
              다음 단계로
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
} 