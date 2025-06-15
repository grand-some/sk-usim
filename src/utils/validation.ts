export function validateResidentNumber(residentNumber: string): boolean {
  const regex = /^\d{6}-\d{7}$/
  if (!regex.test(residentNumber)) return false

  const [front, back] = residentNumber.split('-')
  const digits = [...front, ...back].map(Number)

  const multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
  let sum = 0

  for (let i = 0; i < 12; i++) {
    sum += digits[i] * multipliers[i]
  }

  const checkDigit = (11 - (sum % 11)) % 10
  return checkDigit === digits[12]
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  const regex = /^01[0-9]-\d{4}-\d{4}$/
  return regex.test(phoneNumber)
}

export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function validateBankAccount(accountNumber: string): boolean {
  const regex = /^\d{10,14}$/
  return regex.test(accountNumber)
}

export function validateFile(file: File, maxSizeMB: number = 10): boolean {
  const maxSize = maxSizeMB * 1024 * 1024 // Convert MB to bytes
  return file.size <= maxSize
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
} 