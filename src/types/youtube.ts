export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoId: string;
  publishedAt: string;
  duration: string;
  views: string;
}

export interface YouTubeChannel {
  name: string;
  description: string;
  subscriberCount: string;
  videoCount: string;
  channelUrl: string;
  featuredVideo: YouTubeVideo;
  recentVideos: YouTubeVideo[];
} 