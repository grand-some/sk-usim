'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const HERO_MESSAGES = [
  {
    main: [
      '“사건이 아니라',
      '사람을 변호합니다.”'
    ],
    sub: '전직 판사 출신 변호사와 전문팀의 맞춤형 전략 결과로 증명하는 법무법인 로아.'
  },
  {
    main: [
      '“무너졌다고',
      '끝은 아닙니다.”'
    ],
    sub: '회생, 형사, 민사, 기업까지 다시 시작할 수 있는 길을 함께 찾습니다 . LAW_A'
  },
  {
    main: [
      '“AI와 전문성이 만났을 때,',
      '법은 더 정확해집니다.”'
    ],
    sub: '정교한 시스템 + 전직 판사의 통찰력 새로운 법률 서비스를 만드는 로펌, LAW_A'
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let fadeOutTimeout: NodeJS.Timeout;
    let nextTimeout: NodeJS.Timeout;
    setShow(true);
    fadeOutTimeout = setTimeout(() => setShow(false), 5000); // 5초 후 페이드아웃
    nextTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % HERO_MESSAGES.length);
      setShow(true);
    }, 6000); // 1초 페이드아웃 후 다음 메시지
    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(nextTimeout);
    };
  }, [index]);

  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/background.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl text-white">
          <AnimatePresence mode="wait">
            {show && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[4.5rem]">
                  {HERO_MESSAGES[index].main[0]}<br />{HERO_MESSAGES[index].main[1]}
                </h1>
                <p className="text-base md:text-xl text-gray-200 mb-8 font-normal">
                  {HERO_MESSAGES[index].sub}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
} 