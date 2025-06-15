'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LawsuitVerifyPage() {
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [phoneSuccess, setPhoneSuccess] = useState('')
  const [codeError, setCodeError] = useState('')
  const [codeSuccess, setCodeSuccess] = useState('')
  const router = useRouter()

  const handleSendVerification = () => {
    if (!/^01[016789][0-9]{7,8}$/.test(phone)) {
      setPhoneError('올바른 휴대전화 번호를 입력해주세요.')
      setPhoneSuccess('')
      return
    }
    setPhoneError('')
    setPhoneSuccess('인증번호가 전송되었습니다.')
    setIsCodeSent(true)
  }

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      setCodeError('6자리 인증번호를 입력해주세요.')
      setCodeSuccess('')
      return
    }
    setCodeError('')
    setCodeSuccess('인증이 완료되었습니다.')
    router.push('/lawsuit/success')
    // 인증 성공 시 다음 단계로 이동 등 추가 로직 가능
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold section-title text-gray-900 mb-2">본인인증을 해주세요.</h1>
          <p className="text-sm md:text-base section-subtitle text-gray-600">입력한 정보는 소송 진행에만 사용돼요.</p>
        </div>
        <div className="space-y-8">
          <div className="form-group">
            <div className="form-label flex items-center mb-2">
              <span className="font-medium text-gray-700">휴대전화 번호</span>
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex gap-2">
              <input
                type="tel"
                className="input-field block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                id="phone_number"
                name="phone_number"
                placeholder="휴대전화 번호를 입력해주세요."
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={11}
              />
              <button
                type="button"
                className="button px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                id="sendVerificationBtn"
                onClick={handleSendVerification}
              >
                인증요청
              </button>
            </div>
            {phoneError && <div className="error-message text-sm text-red-600 mt-2">{phoneError}</div>}
            {phoneSuccess && <div className="success-message text-sm text-green-600 mt-2">{phoneSuccess}</div>}
          </div>

          {isCodeSent && (
            <div className="form-group">
              <div className="form-label flex items-center mb-2">
                <span className="font-medium text-gray-700">인증번호</span>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input-field block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  id="verification_code"
                  name="verification_code"
                  placeholder="인증번호를 입력해주세요."
                  maxLength={6}
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                />
                <button
                  type="button"
                  className="button px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  id="verifyCodeBtn"
                  onClick={handleVerifyCode}
                >
                  인증
                </button>
              </div>
              {codeError && <div className="error-message text-sm text-red-600 mt-2">{codeError}</div>}
              {codeSuccess && <div className="success-message text-sm text-green-600 mt-2">{codeSuccess}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 