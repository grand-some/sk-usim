'use client'

import { useAdmin } from '@/context/AdminContext'

interface YouTubeSectionProps {
  title: string
  subtitle: string
}

export default function YouTubeSection({ title, subtitle }: YouTubeSectionProps) {
  const { videos } = useAdmin()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 