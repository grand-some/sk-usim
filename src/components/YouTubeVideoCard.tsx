'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { YouTubeVideo } from '@/types/youtube'

interface YouTubeVideoCardProps {
  video: YouTubeVideo
  isFeatured?: boolean
}

export default function YouTubeVideoCard({ video, isFeatured = false }: YouTubeVideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative bg-white rounded-lg shadow-lg overflow-hidden ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`relative ${isFeatured ? 'h-96' : 'h-48'}`}>
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-2 text-white text-sm mb-2">
            <span>{video.duration}</span>
            <span>•</span>
            <span>{video.views} 조회수</span>
          </div>
          <h3 className={`font-bold text-white ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
            {video.title}
          </h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600">{video.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{video.publishedAt}</span>
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            유튜브에서 보기
          </a>
        </div>
      </div>
    </motion.div>
  )
} 