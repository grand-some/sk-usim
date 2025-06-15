import Image from 'next/image'
import { motion } from 'framer-motion'
import { Case } from '@/types/case'

interface CaseCardProps {
  case: Case
}

export default function CaseCard({ case: caseItem }: CaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-64">
        <Image
          src={caseItem.image}
          alt={caseItem.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-accent-gold text-white text-sm rounded-full mb-2">
            {caseItem.category}
          </span>
          <h3 className="text-xl font-bold text-white mb-1">{caseItem.title}</h3>
          <p className="text-sm text-gray-200">{caseItem.year}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">{caseItem.description}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-bold text-sm text-gray-500">의뢰인</h4>
            <p className="text-gray-700">{caseItem.details.client}</p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm text-gray-500">쟁점</h4>
            <p className="text-gray-700">{caseItem.details.issue}</p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm text-gray-500">접근방법</h4>
            <p className="text-gray-700">{caseItem.details.approach}</p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm text-gray-500">결과</h4>
            <p className="text-gray-700">{caseItem.details.outcome}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 