export interface PersonalInfo {
  name: string
  residentNumber: string
  phoneNumber: string
  email?: string
  address: {
    postcode: string
    address: string
    detailAddress: string
  }
}

export interface GuardianInfo {
  name: string
  residentNumber: string
}

export interface LawsuitForm {
  isAlteulPhone: boolean
  isAdult: boolean
  personalInfo: PersonalInfo
  guardianInfo?: GuardianInfo[]
  bankInfo: {
    bankName: string
    accountNumber: string
    accountHolder: string
  }
  documents: {
    idCard?: File
    sktCertificate?: File
    familyCertificate?: File
  }
  agreements: {
    privacyPolicy: boolean
    lawsuitAgreement: boolean
    guardianAgreement?: boolean
    noOtherAgreement: boolean
    sealAgreement: boolean
  }
} 