export interface YouTubeChannel {
  id: string;
  title: string;
  handle: string;
  url: string;
  videoUrl: string;
  videoTitle: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  subscribers?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  soundcloudUrl?: string;
  bandcampUrl?: string;
  webUrl?: string;
}

export interface MusicRelease {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  type?: 'EP' | 'Single' | 'DESCARGA' | 'Album' | string;
  status?: 'Disponible' | 'GRATIS' | 'Próximo Estreno' | 'Próximamente' | string;
  bandcampUrl?: string;
  soundcloudUrl?: string;
  youtubeUrl?: string;
  audioUrl?: string;
  downloadWavUrl?: string;
  downloadMp3Url?: string;
  coverImage: string;
  tracksCount: number;
  duration?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  metrics: string[];
  description: string;
  liveUrl?: string;
  image: string;
  images?: string[];
  tags: string[];
  filterCategories?: string[];
  videoEmbed?: string;
  hasInteractiveDemo?: 'cetes' | 'dro' | 'thumbnails';
  tiktokUrl?: string;
  youtubeUrl?: string;
  featuredBadge?: string;
}

export interface MerchItem {
  id: string;
  name: string;
  priceUsd: number;
  priceMxn: number;
  category: string;
  description: string;
  image: string;
  badge?: string;
  inStock: boolean;
  availableSizes?: string[];
}

export interface CartItem {
  item: MerchItem;
  selectedSize: string;
  quantity: number;
}

export interface QuoteFormData {
  serviceType: 'full-production' | 'ai-video-scripts' | 'audio-mastering' | 'aeo-seo-strategy' | 'brand-hardware';
  scope: 'starter' | 'pro' | 'enterprise';
  aiVoiceClone: boolean;
  soundDesign: boolean;
  retentionScripting: boolean;
  contact: string;
  channelOrProject: string;
  notes: string;
  honeypot: string; // Anti-bot
}

export interface BlogDownloadResource {
  id: string;
  name: string;
  description: string;
  fileName: string;
  fileContent: string;
  fileType: string;
  size: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  category: 'AEO' | 'SEO Técnico' | 'Video SEO' | 'IA Generativa' | 'Algoritmos' | 'Music Business' | string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  image: string;
  stats?: {
    views?: string;
    impact?: string;
  };
  externalSourceUrl?: string;
  isFeatured?: boolean;
  sections?: { heading: string; body: string }[];
  resources?: BlogDownloadResource[];
  fullMarkdown?: string;
  htmlContent?: string;
}

export interface GoogleAnalyticsMetrics {
  activeUsersRealtime: number;
  totalSessions: number;
  totalPageviews: number;
  avgSessionDuration: string;
  bounceRate: string;
  engagementRate: string;
  topPages: { page: string; activeUsers: number; pageviews: number }[];
  trafficSources: { source: string; percentage: number; sessions: number }[];
  lastUpdated: string;
  propertyId: string;
  apiConnected: boolean;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  eventType: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'BOT_HONEYPOT_TRIGGERED' | 'TOKEN_REFRESH' | 'GA4_SYNC' | 'LOGOUT';
  ipAddress: string;
  details: string;
  severity: 'INFO' | 'WARN' | 'DANGER';
}

