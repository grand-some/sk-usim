'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LawsuitForm } from '@/types/lawsuit'
import Script from 'next/script'
import { submitLawsuitApplication } from '@/services/lawsuit'
import {
  validateResidentNumber,
  validatePhoneNumber,
  validateEmail,
  validateBankAccount,
  validateFile,
  validateFileType,
} from '@/utils/validation'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'

declare global {
  interface Window {
    daum: any
  }
}

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
const MAX_FILE_SIZE_MB = 10

// 은행 리스트
const BANKS = [
  '국민은행', '신한은행', '우리은행', '하나은행', '농협은행', '기업은행', '새마을금고', '우체국', '신협',
  'SC제일은행', '한국씨티은행', '대구은행', '전북광주은행', '부산경남은행',
  '케이뱅크', '카카오뱅크', '토스뱅크', 'HSBC', '산업은행', '수협은행', '저축은행'
]

export default function LawsuitFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAlteulPhone = searchParams.get('isAlteulPhone') === 'true'
  const isAdult = searchParams.get('isAdult') === 'true'
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isAgreementExpanded, setIsAgreementExpanded] = useState(false)

  const [formData, setFormData] = useState<LawsuitForm>({
    isAlteulPhone,
    isAdult,
    personalInfo: {
      name: '',
      residentNumber: '',
      phoneNumber: '',
      email: '',
      address: {
        postcode: '',
        address: '',
        detailAddress: '',
      },
    },
    guardianInfo: !isAdult ? [{ name: '', residentNumber: '' }] : undefined,
    bankInfo: {
      bankName: '',
      accountNumber: '',
      accountHolder: '',
    },
    documents: {},
    agreements: {
      privacyPolicy: false,
      lawsuitAgreement: false,
      guardianAgreement: !isAdult ? false : undefined,
      noOtherAgreement: false,
      sealAgreement: false,
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [showBankSheet, setShowBankSheet] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [phoneSuccess, setPhoneSuccess] = useState('')
  const [codeError, setCodeError] = useState('')
  const [codeSuccess, setCodeSuccess] = useState('')

  useEffect(() => {
    if (isAlteulPhone === null || isAdult === null) {
      router.push('/lawsuit')
    }
  }, [isAlteulPhone, isAdult, router])

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // 주민등록번호 유효성 검사
    const residentNumber = formData.personalInfo.residentNumber
    const [firstPart, secondPart] = residentNumber.split('-')
    
    if (!firstPart || !secondPart || firstPart.length !== 6 || secondPart.length !== 7) {
      errors.residentNumber = '주민등록번호를 올바르게 입력해주세요 (앞 6자리-뒤 7자리)'
    } else {
      // 앞 6자리 검증 (생년월일)
      const year = parseInt(firstPart.substring(0, 2))
      const month = parseInt(firstPart.substring(2, 4))
      const day = parseInt(firstPart.substring(4, 6))
      
      if (month < 1 || month > 12 || day < 1 || day > 31) {
        errors.residentNumber = '올바른 생년월일을 입력해주세요'
      }
      
      // 뒤 7자리 검증 (첫 번째 숫자는 성별 식별자)
      const genderDigit = parseInt(secondPart.charAt(0))
      if (genderDigit < 1 || genderDigit > 4) {
        errors.residentNumber = '올바른 주민등록번호를 입력해주세요'
      }
    }

    // 소송위임자 정보 검증
    if (!formData.personalInfo.name) {
      errors.name = '성명을 입력해주세요.'
    }

    if (!validatePhoneNumber(formData.personalInfo.phoneNumber)) {
      errors.phoneNumber = '올바른 전화번호를 입력해주세요.'
    }

    if (formData.personalInfo.email && !validateEmail(formData.personalInfo.email)) {
      errors.email = '올바른 이메일 주소를 입력해주세요.'
    }

    if (!formData.personalInfo.address.postcode) {
      errors.address = '주소를 입력해주세요.'
    }

    // 법정대리인 정보 검증
    if (!isAdult && !formData.guardianInfo?.length) {
      errors.guardianInfo = '법정대리인을 입력해주세요.'
    }

    // 은행 계좌 정보 검증
    if (!formData.bankInfo.bankName) {
      errors.bankName = '은행을 선택해주세요.'
    }

    if (!validateBankAccount(formData.bankInfo.accountNumber)) {
      errors.accountNumber = '올바른 계좌번호를 입력해주세요.'
    }

    if (!formData.bankInfo.accountHolder) {
      errors.accountHolder = '예금주 이름을 입력해주세요.'
    }

    // 서류 검증
    if (!formData.documents.idCard) {
      errors.idCard = '신분증을 업로드해주세요.'
    } else if (!validateFile(formData.documents.idCard, MAX_FILE_SIZE_MB)) {
      errors.idCard = `파일 크기는 ${MAX_FILE_SIZE_MB}MB 이하여야 합니다.`
    } else if (!validateFileType(formData.documents.idCard, ALLOWED_FILE_TYPES)) {
      errors.idCard = 'JPG, PNG, PDF 파일만 업로드 가능합니다.'
    }

    if (!formData.documents.sktCertificate) {
      errors.sktCertificate = 'SKT 가입내역증명을 업로드해주세요.'
    } else if (!validateFile(formData.documents.sktCertificate, MAX_FILE_SIZE_MB)) {
      errors.sktCertificate = `파일 크기는 ${MAX_FILE_SIZE_MB}MB 이하여야 합니다.`
    } else if (!validateFileType(formData.documents.sktCertificate, ALLOWED_FILE_TYPES)) {
      errors.sktCertificate = 'JPG, PNG, PDF 파일만 업로드 가능합니다.'
    }

    if (!isAdult && !formData.documents.familyCertificate) {
      errors.familyCertificate = '가족관계증명서를 업로드해주세요.'
    } else if (!isAdult && formData.documents.familyCertificate) {
      if (!validateFile(formData.documents.familyCertificate, MAX_FILE_SIZE_MB)) {
        errors.familyCertificate = `파일 크기는 ${MAX_FILE_SIZE_MB}MB 이하여야 합니다.`
      } else if (!validateFileType(formData.documents.familyCertificate, ALLOWED_FILE_TYPES)) {
        errors.familyCertificate = 'JPG, PNG, PDF 파일만 업로드 가능합니다.'
      }
    }

    // 동의사항 검증
    if (!formData.agreements.lawsuitAgreement) {
      errors.lawsuitAgreement = '소송 위임에 동의해주세요.'
    }

    if (!isAdult && !formData.agreements.guardianAgreement) {
      errors.guardianAgreement = '법정대리인으로서 소송 위임에 동의해주세요.'
    }

    if (!formData.agreements.noOtherAgreement) {
      errors.noOtherAgreement = '법무법인 외 별도 협의 금지에 동의해주세요.'
    }

    if (!formData.agreements.sealAgreement) {
      errors.sealAgreement = '인장날인 위임에 동의해주세요.'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 실제 API 호출이 구현되기 전까지는 임시로 성공 처리
      // await submitLawsuitApplication(formData)
      console.log('Form submitted:', formData)
      router.push('/lawsuit/success')
    } catch (err) {
      setError('소송 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      console.error('Error submitting lawsuit application:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddressSearch = () => {
    if (!isScriptLoaded) {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setFormData({
          ...formData,
          personalInfo: {
            ...formData.personalInfo,
            address: {
              postcode: data.zonecode,
              address: data.address,
              detailAddress: formData.personalInfo.address.detailAddress,
            },
          },
        })
      },
    }).open()
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    setShowVerification(true)
  }

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
    // 인증 성공 시 추가 로직 가능
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          뒤로 가기
        </button>
        <h1 className="text-2xl font-bold text-gray-900">소송 신청</h1>
        <div className="w-24"></div> {/* 오른쪽 여백을 위한 빈 div */}
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center mb-8">
        <ol className="flex w-full max-w-2xl items-center text-sm font-medium text-gray-500">
          <li className={`flex-1 flex flex-col items-center ${!showVerification ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${!showVerification ? 'border-red-600 bg-red-100' : 'border-gray-300 bg-white'}`}>1</div>
            <span className="mt-2">기본정보</span>
          </li>
          <li className="flex-0 w-8 h-0.5 bg-gray-300 mx-2 self-center"></li>
          <li className={`flex-1 flex flex-col items-center ${!showVerification ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${!showVerification ? 'border-red-600 bg-red-100' : 'border-gray-300 bg-white'}`}>2</div>
            <span className="mt-2">서류첨부</span>
          </li>
          <li className="flex-0 w-8 h-0.5 bg-gray-300 mx-2 self-center"></li>
          <li className={`flex-1 flex flex-col items-center ${showVerification ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${showVerification ? 'border-red-600 bg-red-100' : 'border-gray-300 bg-white'}`}>3</div>
            <span className="mt-2">본인인증</span>
          </li>
          <li className="flex-0 w-8 h-0.5 bg-gray-300 mx-2 self-center"></li>
          <li className="flex-1 flex flex-col items-center text-gray-400">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white">4</div>
            <span className="mt-2">완료</span>
          </li>
        </ol>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />
      {isLoading && <LoadingSpinner />}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {!showVerification ? (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* 개인정보 수집 및 이용 동의 섹션 */}
            <div className="space-y-4 bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">1</span>
                개인정보 수집 및 이용 동의
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <p className="text-gray-700 mb-4 font-medium">소송 진행을 위해 다음과 같은 개인정보를 수집합니다:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                  <li>성명, 주민등록번호</li>
                  <li>연락처 정보 (전화번호, 이메일)</li>
                  <li>주소</li>
                  <li>은행 계좌 정보</li>
                  <li>신분증 및 기타 증명서류</li>
                </ul>
                <p className="text-gray-600 mt-4 text-sm">수집된 정보는 소송 진행, 계약 체결, 소송 진행 상황 안내, 승소금 지급 등에 사용됩니다.</p>
              </div>
              <label className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                <span className="text-gray-700">개인정보 수집 및 이용에 동의합니다.</span>
              </label>
            </div>

          {/* 소송위임자 정보 */}
          <div className="space-y-8">
            {/* 개인정보 */}
            <div className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">개인정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, name: e.target.value },
                      })
                    }
                    className={`block w-full px-4 py-2.5 rounded-lg border ${
                      validationErrors.name ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                  />
                  {validationErrors.name && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주민등록번호 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        id="ssn1"
                        name="ssn1"
                        maxLength={6}
                        value={formData.personalInfo.residentNumber.split('-')[0] || ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '')
                          setFormData({
                            ...formData,
                            personalInfo: {
                              ...formData.personalInfo,
                              residentNumber: value + (formData.personalInfo.residentNumber.split('-')[1] ? `-${formData.personalInfo.residentNumber.split('-')[1]}` : ''),
                            },
                          })
                          if (value.length === 6) {
                            document.getElementById('ssn2')?.focus()
                          }
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        id="ssn2"
                        name="ssn2"
                        maxLength={7}
                        value={formData.personalInfo.residentNumber.split('-')[1] || ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '')
                          setFormData({
                            ...formData,
                            personalInfo: {
                              ...formData.personalInfo,
                              residentNumber: (formData.personalInfo.residentNumber.split('-')[0] || '') + (value ? `-${value}` : ''),
                            },
                          })
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  {validationErrors.residentNumber && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.residentNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.personalInfo.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      let formattedValue = value
                      if (value.length > 3 && value.length <= 7) {
                        formattedValue = value.replace(/(\d{3})(\d{0,4})/, '$1-$2')
                      } else if (value.length > 7) {
                        formattedValue = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3')
                      }
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phoneNumber: formattedValue },
                      })
                    }}
                    maxLength={13}
                    className={`block w-full px-4 py-2.5 rounded-lg border ${
                      validationErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                  />
                  <p className="mt-2 text-sm text-gray-500">하이픈(-)이 자동으로 입력됩니다</p>
                  {validationErrors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.phoneNumber}</p>
                  )}
                </div>

                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 주소
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: {
                          ...formData.personalInfo,
                          email: e.target.value,
                        },
                      })
                    }
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                  <p className="mt-2 text-sm text-gray-500">소송 진행 상황을 이메일로 받아보실 수 있습니다</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={formData.personalInfo.address.postcode}
                      readOnly
                      placeholder="우편번호"
                      className="block w-1/3 px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className="whitespace-nowrap px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      주소 검색
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.address.address}
                    readOnly
                    placeholder="기본주소"
                    className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                  <p className="mt-2 text-sm text-gray-500">주소 검색 버튼을 클릭하여 주소를 입력해주세요</p>
                  {validationErrors.address && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.address}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label htmlFor="addressDetail" className="block text-sm font-medium text-gray-700 mb-2">
                    상세주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="addressDetail"
                    name="addressDetail"
                    value={formData.personalInfo.address.detailAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: {
                          ...formData.personalInfo,
                          address: {
                            ...formData.personalInfo.address,
                            detailAddress: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="상세주소"
                    required
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                  <p className="mt-2 text-sm text-gray-500">건물명, 동/호수 등을 입력해주세요</p>
                </div>
              </div>
            </div>

            {/* 법정대리인 정보 (미성년자인 경우) */}
            {!isAdult && (
              <div className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">법정대리인 정보</h3>
                <div className="space-y-8">
                  {/* 법정대리인 1 */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900">법정대리인 1 <span className="text-red-500">*</span></h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          성명 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                            value={formData.guardianInfo?.[0]?.name || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              guardianInfo: [
                                  { name: e.target.value, residentNumber: formData.guardianInfo?.[0]?.residentNumber || '' },
                                  formData.guardianInfo?.[1] ? { name: formData.guardianInfo[1].name, residentNumber: formData.guardianInfo[1].residentNumber } : undefined,
                                ].filter(Boolean) as { name: string; residentNumber: string }[],
                            })
                          }
                          className={`block w-full px-4 py-2.5 rounded-lg border ${
                            validationErrors.guardianName ? 'border-red-500' : 'border-gray-300'
                          } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                        />
                        {validationErrors.guardianName && (
                          <p className="mt-2 text-sm text-red-600">{validationErrors.guardianName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          주민등록번호 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            required
                            maxLength={6}
                              value={formData.guardianInfo?.[0]?.residentNumber?.split('-')[0] || ''}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '')
                                const secondPart = formData.guardianInfo?.[0]?.residentNumber?.split('-')[1] || ''
                              setFormData({
                                ...formData,
                                guardianInfo: [
                                    { name: formData.guardianInfo?.[0]?.name || '', residentNumber: value + (secondPart ? `-${secondPart}` : '') },
                                    formData.guardianInfo?.[1] ? { name: formData.guardianInfo[1].name, residentNumber: formData.guardianInfo[1].residentNumber } : undefined,
                                  ].filter(Boolean) as { name: string; residentNumber: string }[],
                              })
                            }}
                            className={`block w-28 px-4 py-2.5 rounded-lg border ${
                              validationErrors.guardianResidentNumber ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                          />
                          <span className="text-gray-500 text-lg">-</span>
                          <input
                            type="text"
                            required
                            maxLength={7}
                              value={formData.guardianInfo?.[0]?.residentNumber?.split('-')[1] || ''}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '')
                                const firstPart = formData.guardianInfo?.[0]?.residentNumber?.split('-')[0] || ''
                              setFormData({
                                ...formData,
                                guardianInfo: [
                                    { name: formData.guardianInfo?.[0]?.name || '', residentNumber: (firstPart ? firstPart : '') + (value ? `-${value}` : '') },
                                    formData.guardianInfo?.[1] ? { name: formData.guardianInfo[1].name, residentNumber: formData.guardianInfo[1].residentNumber } : undefined,
                                  ].filter(Boolean) as { name: string; residentNumber: string }[],
                              })
                            }}
                            className={`block w-32 px-4 py-2.5 rounded-lg border ${
                              validationErrors.guardianResidentNumber ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                          />
                        </div>
                        {validationErrors.guardianResidentNumber && (
                          <p className="mt-2 text-sm text-red-600">{validationErrors.guardianResidentNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 법정대리인 2 (선택) */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900">법정대리인 2</h4>
                      <button
                        type="button"
                        onClick={() => {
                            if (formData.guardianInfo?.[1]) {
                            setFormData({
                              ...formData,
                                guardianInfo: [
                                  { name: formData.guardianInfo?.[0]?.name || '', residentNumber: formData.guardianInfo?.[0]?.residentNumber || '' },
                                ],
                            })
                          } else {
                            setFormData({
                              ...formData,
                              guardianInfo: [
                                  { name: formData.guardianInfo?.[0]?.name || '', residentNumber: formData.guardianInfo?.[0]?.residentNumber || '' },
                                { name: '', residentNumber: '' },
                              ],
                            })
                          }
                        }}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                          {formData.guardianInfo?.[1] ? '삭제' : '추가'}
                      </button>
                    </div>
                      {formData.guardianInfo?.[1] && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            성명
                          </label>
                          <input
                            type="text"
                              value={formData.guardianInfo?.[1]?.name || ''}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                guardianInfo: [
                                    { name: formData.guardianInfo?.[0]?.name || '', residentNumber: formData.guardianInfo?.[0]?.residentNumber || '' },
                                    { name: e.target.value, residentNumber: formData.guardianInfo?.[1]?.residentNumber || '' },
                                ],
                              })
                            }
                            className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            주민등록번호
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              maxLength={6}
                                value={formData.guardianInfo?.[1]?.residentNumber?.split('-')[0] || ''}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '')
                                  const secondPart2 = formData.guardianInfo?.[1]?.residentNumber?.split('-')[1] || ''
                                setFormData({
                                  ...formData,
                                  guardianInfo: [
                                      { name: formData.guardianInfo?.[0]?.name || '', residentNumber: formData.guardianInfo?.[0]?.residentNumber || '' },
                                      { name: formData.guardianInfo?.[1]?.name || '', residentNumber: value + (secondPart2 ? `-${secondPart2}` : '') },
                                  ],
                                })
                              }}
                              className="block w-28 px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                            />
                            <span className="text-gray-500 text-lg">-</span>
                            <input
                              type="text"
                              maxLength={7}
                                value={formData.guardianInfo?.[1]?.residentNumber?.split('-')[1] || ''}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '')
                                  const firstPart2 = formData.guardianInfo?.[1]?.residentNumber?.split('-')[0] || ''
                                setFormData({
                                  ...formData,
                                  guardianInfo: [
                                      { name: formData.guardianInfo?.[0]?.name || '', residentNumber: formData.guardianInfo?.[0]?.residentNumber || '' },
                                      { name: formData.guardianInfo?.[1]?.name || '', residentNumber: (firstPart2 ? firstPart2 : '') + (value ? `-${value}` : '') },
                                  ],
                                })
                              }}
                              className="block w-32 px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 약정 내용 */}
            <div className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">약정 내용</h3>
                <button
                  type="button"
                    onClick={() => setIsAgreementExpanded(!isAgreementExpanded)}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                    {isAgreementExpanded ? '접기' : '자세히 보기'}
                  <svg
                      className={`ml-2 h-5 w-5 transform transition-transform ${isAgreementExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

                {isAgreementExpanded && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="prose prose-sm max-w-none">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">제1조 (목적)</h4>
                      <p className="text-gray-600 mb-4">
                        본 약정은 법무법인과 의뢰인 간의 소송 위임에 관한 권리와 의무를 규정함을 목적으로 합니다.
                      </p>

                      <h4 className="text-lg font-medium text-gray-900 mb-4">제2조 (위임 범위)</h4>
                      <p className="text-gray-600 mb-4">
                        1. 법무법인은 의뢰인의 소송을 대리하여 법원에 제출할 서류의 작성, 법원 출석, 소송 진행에 관한 모든 행위를 수행합니다.<br />
                        2. 법무법인은 의뢰인의 이익을 최우선으로 하여 성실하게 소송을 수행합니다.
                      </p>

                      <h4 className="text-lg font-medium text-gray-900 mb-4">제3조 (비용 및 수수료)</h4>
                      <p className="text-gray-600 mb-4">
                        1. 의뢰인은 소송 진행에 필요한 비용을 법무법인에 지급합니다.<br />
                        2. 수수료는 별도로 정한 요율표에 따라 산정됩니다.
                      </p>

                      <h4 className="text-lg font-medium text-gray-900 mb-4">제4조 (비밀유지)</h4>
                      <p className="text-gray-600 mb-4">
                        법무법인은 의뢰인의 비밀을 엄격히 지키며, 의뢰인의 동의 없이 제3자에게 공개하지 않습니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 은행 계좌 정보 */}
            <div className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">은행 계좌정보</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    은행명 <span className="text-red-500">*</span>
                  </label>
                    <button
                      type="button"
                      className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm text-left"
                      onClick={() => setShowBankSheet(true)}
                    >
                      {formData.bankInfo.bankName || <span className="text-gray-400">은행을 선택해주세요</span>}
                    </button>
                    {showBankSheet && (
                      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-30">
                        <div className="bg-white rounded-t-2xl p-6 w-full max-w-lg">
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-lg font-bold">은행 선택</div>
                            <button onClick={() => setShowBankSheet(false)}>
                              <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {BANKS.map(bank => (
                              <button
                                key={bank}
                                className={`flex flex-col items-center py-2 px-2 rounded-lg border ${formData.bankInfo.bankName === bank ? 'bg-red-100 border-red-500' : 'bg-white border-gray-200 hover:bg-gray-100'}`}
                                onClick={() => {
                                  setFormData({ ...formData, bankInfo: { ...formData.bankInfo, bankName: bank } })
                                  setShowBankSheet(false)
                                }}
                              >
                                <img src={`/images/${bank}.png`} alt={bank} className="w-10 h-10 mb-2 object-contain" />
                                <span className="text-sm">{bank}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    계좌번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bankInfo.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankInfo: { ...formData.bankInfo, accountNumber: e.target.value },
                      })
                    }
                    className={`block w-full px-4 py-2.5 rounded-lg border ${
                      validationErrors.accountNumber ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                  />
                  {validationErrors.accountNumber && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.accountNumber}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      예금주 이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                      value={formData.bankInfo.accountHolder || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankInfo: { ...formData.bankInfo, accountHolder: e.target.value },
                      })
                    }
                    className={`block w-full px-4 py-2.5 rounded-lg border ${
                      validationErrors.accountHolder ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                      placeholder="예금주 이름을 입력하세요"
                  />
                  {validationErrors.accountHolder && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.accountHolder}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 서류 첨부 */}
            <div className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">서류 첨부</h3>
              <div className="grid grid-cols-1 gap-6">
                  {/* 신분증 섹션 - 외곽선 추가 */}
                  <div className="p-4 border border-gray-300 rounded-lg mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    신분증
                  </label>
                  <input
                    type="file"
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        documents: {
                          ...formData.documents,
                          idCard: e.target.files?.[0],
                        },
                      })
                    }
                    className={`block w-full px-4 py-2.5 rounded-lg border ${
                      validationErrors.idCard ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                  />
                  {validationErrors.idCard && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.idCard}</p>
                  )}
                </div>
                  {/* SKT 가입내역증명 커스텀 섹션 - 외곽선 추가 및 텍스트 변경 */}
                  <div className="space-y-4 p-4 border border-gray-300 rounded-lg mb-4">
                <div>
                      <p className="text-sm section-subtitle text-gray-600 mb-2">이용계약 등록사항 증명서</p>
                    </div>
                    <div className="form-group mb-2">
                      <span className="text-red-500 cursor-pointer text-sm font-medium" id="openHelpModal">❗ 발급 방법이 궁금하신가요?</span>
                    </div>
                    <div className="form-group mb-2">
                      <div className="form-label flex items-center mb-2">
                        <span className="font-medium text-gray-700">업로드 (이용계약 등록사항 증명서)</span>
                        <span className="text-red-500 ml-1">*</span>
                      </div>
                      <div className="upload-area flex items-center justify-center mb-2 cursor-pointer" onClick={() => document.getElementById('sktCertificateUpload')?.click()} style={{ minHeight: '56px', border: '1px dashed #d1d5db', borderRadius: '0.5rem' }}>
                        <div className="upload-icon flex flex-col items-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                          <span className="text-xs text-gray-400 mt-1">클릭하여 파일 선택</span>
                        </div>
                      </div>
                  <input
                    type="file"
                        id="sktCertificateUpload"
                    required
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        documents: {
                          ...formData.documents,
                          sktCertificate: e.target.files?.[0],
                        },
                      })
                    }
                  />
                      {/* 파일명 표시 */}
                      {formData.documents.sktCertificate && (
                        <div className="file-list mt-2 text-sm text-gray-700">{formData.documents.sktCertificate.name}</div>
                      )}
                  {validationErrors.sktCertificate && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.sktCertificate}</p>
                  )}
                    </div>
                    <div className="form-group mt-4">
                      <div className="form-label mb-2">
                        <span className="font-medium text-gray-700">이용계약 등록사항 증명서 예시</span>
                      </div>
                      <div className="example-image-container flex justify-center">
                        <img src="/images/skt_6_modal2.png" alt="이용계약 등록사항 증명서 예시" className="example-image rounded-lg border border-gray-200 shadow-sm max-w-xs cursor-pointer" id="openExampleModal" />
                      </div>
                    </div>
                </div>
                {!isAdult && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      가족관계증명서
                    </label>
                    <input
                      type="file"
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          documents: {
                            ...formData.documents,
                            familyCertificate: e.target.files?.[0],
                          },
                        })
                      }
                      className={`block w-full px-4 py-2.5 rounded-lg border ${
                        validationErrors.familyCertificate ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                    />
                    {validationErrors.familyCertificate && (
                      <p className="mt-2 text-sm text-red-600">{validationErrors.familyCertificate}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* 동의 사항 */}
          <div className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-4">동의 사항</h3>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    checked={formData.agreements.lawsuitAgreement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreements: { ...formData.agreements, lawsuitAgreement: e.target.checked },
                      })
                    }
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    소송 위임에 동의합니다 <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              {!isAdult && (
                <>
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center h-5">
                      <input
                        id="guardianAgreement"
                        type="checkbox"
                        required
                        checked={formData.agreements.guardianAgreement}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            agreements: { ...formData.agreements, guardianAgreement: e.target.checked },
                          })
                        }
                        className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="guardianAgreement" className="font-medium text-gray-700">
                        법정대리인으로서 소송 위임에 동의합니다 <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center h-5">
                  <input
                    id="noOtherAgreement"
                    type="checkbox"
                    required
                    checked={formData.agreements.noOtherAgreement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreements: { ...formData.agreements, noOtherAgreement: e.target.checked },
                      })
                    }
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="noOtherAgreement" className="font-medium text-gray-700">
                    법무법인 외 별도 협의 금지에 동의합니다 <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center h-5">
                  <input
                    id="sealAgreement"
                    type="checkbox"
                    required
                    checked={formData.agreements.sealAgreement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreements: { ...formData.agreements, sealAgreement: e.target.checked },
                      })
                    }
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="sealAgreement" className="font-medium text-gray-700">
                    인장날인 위임에 동의합니다 <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              뒤로가기
            </button>
            <button
                type="button"
              disabled={isLoading}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
                onClick={handleNextStep}
            >
                다음단계
            </button>
          </div>
        </form>
        ) : (
          // 본인인증 섹션만 보여줌
          <div className="mt-0 bg-white rounded-lg shadow-lg p-4 sm:p-8">
            <div className="mb-8 text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold section-title text-gray-900 mb-2 leading-snug">본인인증을 해주세요.</h1>
              <p className="text-xs sm:text-sm md:text-base section-subtitle text-gray-600">입력한 정보는 소송 진행에만 사용돼요.</p>
            </div>
            <div className="space-y-8">
              <div className="form-group">
                <div className="form-label flex items-center mb-2">
                  <span className="font-medium text-gray-700 text-sm sm:text-base">휴대전화 번호</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="tel"
                    className="input-field block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-base sm:text-base"
                    id="phone_number"
                    name="phone_number"
                    placeholder="휴대전화 번호를 입력해주세요."
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={11}
                  />
                  <button
                    type="button"
                    className="button w-full sm:w-auto px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-base sm:text-base"
                    id="sendVerificationBtn"
                    onClick={handleSendVerification}
                  >
                    인증요청
                  </button>
                </div>
                {phoneError && <div className="error-message text-xs sm:text-sm text-red-600 mt-2">{phoneError}</div>}
                {phoneSuccess && <div className="success-message text-xs sm:text-sm text-green-600 mt-2">{phoneSuccess}</div>}
              </div>
              {isCodeSent && (
                <div className="form-group">
                  <div className="form-label flex items-center mb-2">
                    <span className="font-medium text-gray-700 text-sm sm:text-base">인증번호</span>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      className="input-field block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-base sm:text-base"
                      id="verification_code"
                      name="verification_code"
                      placeholder="인증번호를 입력해주세요."
                      maxLength={6}
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                    <button
                      type="button"
                      className="button w-full sm:w-auto px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-base sm:text-base"
                      id="verifyCodeBtn"
                      onClick={handleVerifyCode}
                    >
                      인증
                    </button>
                  </div>
                  {codeError && <div className="error-message text-xs sm:text-sm text-red-600 mt-2">{codeError}</div>}
                  {codeSuccess && <div className="success-message text-xs sm:text-sm text-green-600 mt-2">{codeSuccess}</div>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 