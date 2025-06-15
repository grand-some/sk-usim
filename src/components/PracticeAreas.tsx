'use client'

import { useAdmin } from '@/context/AdminContext'

interface PracticeAreasProps {
  title: string
  subtitle: string
}

export default function PracticeAreas({ title, subtitle }: PracticeAreasProps) {
  const { practiceAreas } = useAdmin()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area) => (
            <div
              key={area.id}
              className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
              <p className="text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 