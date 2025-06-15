import { YouTubeChannel } from '@/types/youtube';

export const youtubeChannel: YouTubeChannel = {
  name: '법무법인 유튜브',
  description: '법률 상담과 법률 정보를 쉽고 재미있게 전달하는 법무법인의 공식 유튜브 채널입니다.',
  subscriberCount: '10,000+',
  videoCount: '100+',
  channelUrl: 'https://www.youtube.com/@lawfirm',
  featuredVideo: {
    id: '1',
    title: '법률 상담, 이렇게 받으세요!',
    description: '효과적인 법률 상담을 받는 방법과 준비사항에 대해 알아봅니다.',
    thumbnailUrl: '/images/youtube/featured.jpg',
    videoId: 'VIDEO_ID_1',
    publishedAt: '2024-01-15',
    duration: '15:30',
    views: '5,000+'
  },
  recentVideos: [
    {
      id: '2',
      title: '상속세 절세 전략',
      description: '효과적인 상속세 절세 방법과 주의사항을 설명합니다.',
      thumbnailUrl: '/images/youtube/video1.jpg',
      videoId: 'VIDEO_ID_2',
      publishedAt: '2024-01-10',
      duration: '12:45',
      views: '3,200+'
    },
    {
      id: '3',
      title: '이혼 소송 진행 과정',
      description: '이혼 소송의 전체적인 진행 과정과 주요 고려사항을 설명합니다.',
      thumbnailUrl: '/images/youtube/video2.jpg',
      videoId: 'VIDEO_ID_3',
      publishedAt: '2024-01-05',
      duration: '18:20',
      views: '4,100+'
    },
    {
      id: '4',
      title: '부동산 계약 시 주의사항',
      description: '부동산 계약 시 반드시 확인해야 할 중요 사항들을 알려드립니다.',
      thumbnailUrl: '/images/youtube/video3.jpg',
      videoId: 'VIDEO_ID_4',
      publishedAt: '2024-01-01',
      duration: '14:15',
      views: '2,800+'
    }
  ]
}; 