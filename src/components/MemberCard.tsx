import Image from 'next/image'
import { motion } from 'framer-motion'
import { Member } from '@/types/member'

interface MemberCardProps {
  member: Member
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-80">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold mb-2">{member.name}</h3>
        <p className="text-accent-gold font-medium mb-4">{member.position}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2">전문분야</h4>
            <div className="flex flex-wrap gap-2">
              {member.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">학력</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {member.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">경력</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {member.career.map((career, index) => (
                <li key={index}>{career}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">수상</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {member.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 