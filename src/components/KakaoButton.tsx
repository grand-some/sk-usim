import { motion } from 'framer-motion'

export default function KakaoButton() {
  return (
    <motion.a
      href="https://open.kakao.com/your-channel"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="bg-[#FEE500] rounded-full p-4 shadow-lg flex items-center space-x-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C6.48 3 2 6.48 2 10.5C2 12.81 3.94 14.77 6.5 15.97L5.5 18.5L8.5 16.5C9.5 16.5 10.5 16.5 11.5 16.5C17.02 16.5 21.5 13.02 21.5 9C21.5 4.98 17.02 3 12 3Z"
            fill="#3C1E1E"
          />
        </svg>
        <span className="text-[#3C1E1E] font-medium">상담하기</span>
      </div>
    </motion.a>
  )
} 