'use client'

import { useAdmin } from '@/context/AdminContext'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CasesProps {
  title: string
  subtitle: string
}

export default function Cases({ title, subtitle }: CasesProps) {
  const { cases } = useAdmin()

  return (
    <section id="cases" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((case_) => (
            <motion.div
              key={case_.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: case_.id * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={case_.image}
                  alt={case_.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{case_.title}</h3>
                  <span className="text-sm text-gray-500">{case_.year}년</span>
                </div>
                <p className="text-gray-600 mb-2">{case_.category}</p>
                <p className="text-gray-600 mb-4">{case_.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-semibold">결과: {case_.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 