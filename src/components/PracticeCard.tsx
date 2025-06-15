import Image from 'next/image'
import { motion } from 'framer-motion'
import { PracticeArea } from '@/types/practice'
import {
  BuildingOfficeIcon,
  ScaleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const iconMap = {
  'building-office': BuildingOfficeIcon,
  'scale': ScaleIcon,
  'shield-check': ShieldCheckIcon,
  'document-text': DocumentTextIcon,
  'home': HomeIcon,
  'light-bulb': LightBulbIcon
}

interface PracticeCardProps {
  practice: PracticeArea
}

export default function PracticeCard({ practice }: PracticeCardProps) {
  const Icon = iconMap[practice.icon as keyof typeof iconMap]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={practice.image}
          alt={practice.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <Icon className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">{practice.title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">{practice.description}</p>
        <ul className="space-y-2">
          {practice.details.map((detail, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg
                className="w-4 h-4 mr-2 text-accent-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
} 