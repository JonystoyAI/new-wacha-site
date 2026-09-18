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
  type: 'EP' | 'Single' | 'Album';
  status: 'Disponible' | 'Próximo Estreno' | 'Próximamente';
  bandcampUrl?: string;
  soundcloudUrl?: string;
  youtubeUrl?: string;
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
  videoEmbed?: string;
  hasInteractiveDemo?: 'cetes' | 'dro' | 'thumbnails';
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
