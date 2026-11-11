import { BlogPost, MerchItem, MusicRelease, PortfolioItem } from '../types';
import { INITIAL_BLOG_ARTICLES } from '../data/blogData';
import { MERCH_DATA } from '../data/merchData';
import { RELEASES_DATA } from '../data/releasesData';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const BLOG_STORAGE_KEY = 'wacha_cms_blog_articles_v1';
const MERCH_STORAGE_KEY = 'wacha_cms_merch_products_v1';
const RELEASES_STORAGE_KEY = 'wacha_cms_releases_v1';
const PORTFOLIO_STORAGE_KEY = 'wacha_cms_portfolio_v1';

// Blog Articles CMS
export const getStoredBlogArticles = (): BlogPost[] => {
  try {
    const saved = localStorage.getItem(BLOG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored blog articles', e);
  }
  return INITIAL_BLOG_ARTICLES;
};

export const saveStoredBlogArticles = (articles: BlogPost[]): void => {
  try {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving blog articles', e);
  }
};

// Wacha El Tianguis (Merch) CMS
export const getStoredMerchProducts = (): MerchItem[] => {
  try {
    const saved = localStorage.getItem(MERCH_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored merch products', e);
  }
  return MERCH_DATA;
};

export const saveStoredMerchProducts = (products: MerchItem[]): void => {
  try {
    localStorage.setItem(MERCH_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving merch products', e);
  }
};

// Cumbia Lab Music Releases CMS
export const getStoredReleases = (): MusicRelease[] => {
  try {
    const saved = localStorage.getItem(RELEASES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored releases', e);
  }
  return RELEASES_DATA;
};

export const saveStoredReleases = (releases: MusicRelease[]): void => {
  try {
    localStorage.setItem(RELEASES_STORAGE_KEY, JSON.stringify(releases));
  } catch (e) {
    console.error('Error saving releases', e);
  }
};

// Portfolio Collage CMS
export const getStoredPortfolioItems = (): PortfolioItem[] => {
  try {
    const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored portfolio items', e);
  }
  return PORTFOLIO_DATA;
};

export const saveStoredPortfolioItems = (items: PortfolioItem[]): void => {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving portfolio items', e);
  }
};
