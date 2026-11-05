import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BlogPost, BlogDownloadResource } from '../types';
import { loadBlogArticles } from '../data/blogData';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { ArticleShareModal } from './ArticleShareModal';
import { 
  Search, 
  Tag as TagIcon, 
  X, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Check, 
  Terminal, 
  Filter, 
  Eye, 
  TrendingUp,
  RefreshCw,
  BookOpen,
  Download,
  Layers,
  FileCode,
  FileText,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Square,
  Maximize2,
  Minimize2,
  Type,
  Headphones
} from 'lucide-react';

interface ArticleHtmlRendererProps {
  html: string;
  fontSizeClass?: string;
  className?: string;
}

export const ArticleHtmlRenderer: React.FC<ArticleHtmlRendererProps> = ({ 
  html, 
  fontSizeClass = '', 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const preElements = container.querySelectorAll('pre');

    preElements.forEach((pre) => {
      if (pre.getAttribute('data-code-enhanced') === 'true') return;
      pre.setAttribute('data-code-enhanced', 'true');

      const codeEl = pre.querySelector('code');
      const className = codeEl?.className || '';
      let lang = 'CÓDIGO';
      if (className.includes('javascript') || className.includes('js')) {
        lang = 'JAVASCRIPT';
      } else if (className.includes('css')) {
        lang = 'CSS';
      } else if (className.includes('json')) {
        lang = 'JSON-LD / SCHEMA';
      } else if (className.includes('html')) {
        lang = 'HTML5';
      }

      // Create high-contrast control bar
      const topBar = document.createElement('div');
      topBar.className = 'flex items-center justify-between px-3.5 py-2 bg-black text-[#D4FF00] border-2 border-black dark:border-zinc-700 border-b-0 font-jetbrains text-xs font-bold';

      const langInfo = document.createElement('div');
      langInfo.className = 'flex items-center gap-2';
      langInfo.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full bg-[#00E599] inline-block animate-pulse"></span>
        <span class="text-white text-[11px] font-mono tracking-wider">[ ${lang} ]</span>
      `;
      topBar.appendChild(langInfo);

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'px-3 py-1 bg-white text-black hover:bg-[#D4FF00] hover:text-black border border-black font-jetbrains text-xs font-bold transition-all duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer';
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <span>COPIAR</span>
      `;

      copyBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const codeText = codeEl ? (codeEl.textContent || codeEl.innerText) : (pre.textContent || pre.innerText);
        if (!codeText) return;

        navigator.clipboard.writeText(codeText.trim()).then(() => {
          copyBtn.className = 'px-3 py-1 bg-[#00E599] text-black border border-black font-jetbrains text-xs font-bold transition-all duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer';
          copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>COPIADO ✔</span>
          `;
          setTimeout(() => {
            copyBtn.className = 'px-3 py-1 bg-white text-black hover:bg-[#D4FF00] hover:text-black border border-black font-jetbrains text-xs font-bold transition-all duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer';
            copyBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>COPIAR</span>
            `;
          }, 2500);
        }).catch(err => {
          console.error('Failed to copy code: ', err);
        });
      };

      topBar.appendChild(copyBtn);

      const wrapper = document.createElement('div');
      wrapper.className = 'my-5 brutal-shadow-black';
      
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(topBar);
      wrapper.appendChild(pre);

      pre.className = 'bg-[#0d1117] text-[#e6edf3] border-2 border-black dark:border-zinc-700 p-4 font-jetbrains text-xs overflow-x-auto leading-relaxed selection:bg-[#D4FF00] selection:text-black m-0';
    });
  }, [html]);

  return (
    <div 
      ref={containerRef}
      className={`article-html-body prose prose-invert max-w-none space-y-4 ${fontSizeClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Helper to extract clean narrative text for speech synthesis
function extractCleanTextForSpeech(article: BlogPost): string {
  const chunks: string[] = [];
  chunks.push(article.title);
  if (article.excerpt) {
    chunks.push(article.excerpt);
  }
  if (article.keyTakeaways && article.keyTakeaways.length > 0) {
    chunks.push('Conclusiones clave: ' + article.keyTakeaways.join('. '));
  }
  if (article.htmlContent) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(article.htmlContent, 'text/html');
      doc.querySelectorAll('pre, code, script, style, svg').forEach(el => el.remove());
      const paragraphs = Array.from(doc.querySelectorAll('p, h2, h3, h4, li'))
        .map(el => (el.textContent || '').trim())
        .filter(t => t.length > 15);
      if (paragraphs.length > 0) {
        chunks.push(...paragraphs);
      } else {
        const text = doc.body.textContent || '';
        chunks.push(text.replace(/\s+/g, ' ').trim());
      }
    } catch {
      if (article.content) chunks.push(...article.content);
    }
  } else if (article.content) {
    chunks.push(...article.content);
    if (article.sections) {
      article.sections.forEach(s => chunks.push(s.heading + ': ' + s.body));
    }
  }
  return chunks.join('. ');
}

interface BlogFeedProps {
  initialArticleId?: string | null;
  initialReadingMode?: boolean;
}

export const BlogFeed: React.FC<BlogFeedProps> = ({
  initialArticleId = null,
  initialReadingMode = false
}) => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [sortBy, setSortBy] = useState<'recent' | 'views'>('recent');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [shareArticle, setShareArticle] = useState<BlogPost | null>(null);
  const [readerTab, setReaderTab] = useState<'reading' | 'html'>('reading');
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadedResourceId, setDownloadedResourceId] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('/data/articles.json');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Reader Mode (Modo Lectura Centrado y Tipografía Optimizada)
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false);
  const [readerFontSize, setReaderFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [readerTheme, setReaderTheme] = useState<'neutral' | 'sepia' | 'dark'>('neutral');

  // Speech Synthesis (Modo Escucha en Voz Alta)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speakingArticleId, setSpeakingArticleId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop TTS cleanly
  const handleStopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingArticleId(null);
    activeUtteranceRef.current = null;
  };

  // Toggle TTS play/pause/start
  const handleToggleSpeech = (article: BlogPost, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Tu navegador no cuenta con soporte nativo de síntesis de voz (Web Speech API).');
      return;
    }

    const synth = window.speechSynthesis;

    // If currently speaking this same article, toggle pause/resume
    if (isSpeaking && speakingArticleId === article.id) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
      return;
    }

    // Cancel any previous speech
    handleStopSpeech();

    const cleanText = extractCleanTextForSpeech(article);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = speechRate;

    // Pick Spanish voice if available
    const voices = synth.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') || v.lang.toLowerCase().includes('spanish') || v.lang.includes('es_'));
    if (esVoice) {
      utterance.voice = esVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setSpeakingArticleId(article.id);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingArticleId(null);
      activeUtteranceRef.current = null;
    };

    utterance.onerror = (err) => {
      console.warn('Speech error or cancelled:', err);
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingArticleId(null);
      activeUtteranceRef.current = null;
    };

    activeUtteranceRef.current = utterance;
    synth.speak(utterance);
  };

  // Change Speech Rate on the fly
  const handleSpeechRateChange = (rate: number) => {
    setSpeechRate(rate);
    if (isSpeaking && activeArticle) {
      handleStopSpeech();
      setTimeout(() => {
        handleToggleSpeech(activeArticle);
      }, 80);
    }
  };

  // Clean close of article reader modal
  const handleCloseReader = () => {
    setActiveArticle(null);
    setIsReadingMode(false);
    handleStopSpeech();
  };

  // Open article in Standard Reader or directly in Reading Mode
  const handleOpenReader = (article: BlogPost, readingMode = false, startListening = false) => {
    setActiveArticle(article);
    setReaderTab('reading');
    setCopiedHtml(false);
    setIsReadingMode(readingMode);
    if (startListening) {
      setTimeout(() => {
        handleToggleSpeech(article);
      }, 150);
    }
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleDownloadResource = (resource: BlogDownloadResource) => {
    try {
      const blob = new Blob([resource.fileContent], { type: resource.fileType || 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadedResourceId(resource.id);
      setTimeout(() => {
        setDownloadedResourceId(null);
      }, 2500);
    } catch (err) {
      console.error('Error downloading resource:', err);
    }
  };

  // Load articles on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await loadBlogArticles();
        if (isMounted) {
          setArticles(data);
          setDataSource('/data/articles.json');
          if (initialArticleId) {
            const found = data.find(a => a.id === initialArticleId || a.slug === initialArticleId);
            if (found) {
              setActiveArticle(found);
              setIsReadingMode(initialReadingMode);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching blog articles:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Deep linking: Detect article slug from URL hash (e.g. from sitemap or shared links)
  useEffect(() => {
    if (articles.length === 0) return;

    const checkHashForArticle = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#blog-')) {
        const targetSlug = hash.replace('#blog-', '');
        const found = articles.find(a => a.slug === targetSlug || a.id === targetSlug);
        if (found) {
          setActiveArticle(found);
          const blogEl = document.getElementById('blog');
          if (blogEl) {
            blogEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    checkHashForArticle();
    window.addEventListener('hashchange', checkHashForArticle);
    return () => window.removeEventListener('hashchange', checkHashForArticle);
  }, [articles]);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        if (activeArticle) {
          setActiveArticle(null);
        } else if (searchQuery || selectedTag) {
          setSearchQuery('');
          setSelectedTag(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle, searchQuery, selectedTag]);

  // Extract all unique tags dynamically and sort by frequency
  const allTagsWithCount = useMemo(() => {
    const map = new Map<string, number>();
    articles.forEach(art => {
      art.tags.forEach(t => {
        map.set(t, (map.get(t) || 0) + 1);
      });
    });
    return Array.from(map.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [articles]);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach(a => cats.add(a.category));
    return ['TODAS', ...Array.from(cats)];
  }, [articles]);

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    return articles
      .filter(art => {
        // Tag filter
        if (selectedTag && !art.tags.includes(selectedTag)) {
          return false;
        }
        // Category filter
        if (selectedCategory !== 'TODAS' && art.category !== selectedCategory) {
          return false;
        }
        // Search query filter (matches title, excerpt, content, tags, author)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = art.title.toLowerCase().includes(query);
          const matchExcerpt = art.excerpt.toLowerCase().includes(query);
          const matchTags = art.tags.some(t => t.toLowerCase().includes(query));
          const matchCategory = art.category.toLowerCase().includes(query);
          const matchContent = art.content.some(c => c.toLowerCase().includes(query));
          const matchAuthor = art.author.name.toLowerCase().includes(query);
          return matchTitle || matchExcerpt || matchTags || matchCategory || matchContent || matchAuthor;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'views') {
          const viewsA = parseFloat(a.stats?.views?.replace(/[^0-9.]/g, '') || '0');
          const viewsB = parseFloat(b.stats?.views?.replace(/[^0-9.]/g, '') || '0');
          return viewsB - viewsA;
        }
        // Recent first (default)
        return 0;
      });
  }, [articles, selectedTag, selectedCategory, searchQuery, sortBy]);

  // Handle share modal and quick copy
  const handleShare = (article: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setShareArticle(article);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSelectedCategory('TODAS');
  };

  const activeFiltersCount = (selectedTag ? 1 : 0) + (selectedCategory !== 'TODAS' ? 1 : 0) + (searchQuery.trim() ? 1 : 0);

  return (
    <section id="blog" className="py-16 sm:py-24 border-b-2 border-black dark:border-zinc-800 bg-[#FAF9F5] dark:bg-[#121411] relative">
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f241d_1px,transparent_1px),linear-gradient(to_bottom,#1f241d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Live Telemetry */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-jetbrains mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B8006E] dark:bg-[#D4FF00] animate-pulse"></span>
              <span className="text-[#B8006E] dark:text-[#D4FF00] font-bold tracking-wider">[06] RADAR AEO & RESEARCH // INTELIGENCIA ORGÁNICA</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <span className="text-[11px] px-2 py-0.5 bg-white dark:bg-black border border-black dark:border-zinc-800 text-black dark:text-zinc-300 font-bold">
                FUENTE: {dataSource}
              </span>
              <span className="text-[#B8006E] dark:text-[#D4FF00] font-bold text-[11px] hidden sm:inline">
                {articles.length} ARTÍCULOS INDEXADOS
              </span>
            </div>
          </div>

          <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-black dark:text-white mb-3 leading-none">
            ARTÍCULOS TÉCNICOS, <span className="text-[#B8006E] dark:text-[#D4FF00]">EXPERIMENTOS AEO</span> & MOTOR DE CONTENIDOS
          </h2>
          <p className="text-zinc-700 dark:text-zinc-400 font-space-grotesk text-sm sm:text-base max-w-3xl">
            Ingeniería de contenidos, optimización para motores de respuesta de IA (Gemini, ChatGPT, Perplexity), algoritmos de video de alta retención y arquitectura web libre de clichés.
          </p>
        </div>

        {/* Search & Tag Filter Console */}
        <div className="bg-white dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 p-4 sm:p-6 mb-8 brutal-shadow-black space-y-5">
          
          {/* Top Row: Search Input + Sorting */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input Box */}
            <div className="md:col-span-8 relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#B8006E] dark:text-[#D4FF00] absolute left-3.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por concepto, tecnología o palabra clave (Presiona '/' para buscar)..."
                  className="w-full bg-zinc-50 dark:bg-black border-2 border-black dark:border-zinc-800 text-black dark:text-white pl-10 pr-24 py-3 font-jetbrains text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-[#B8006E] dark:focus:border-[#D4FF00] transition-colors font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-12 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white p-1"
                    title="Limpiar búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <span className="absolute right-3 hidden sm:inline-block px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-900 border border-zinc-400 dark:border-zinc-700 text-[10px] font-jetbrains text-zinc-700 dark:text-zinc-400 font-bold">
                  /
                </span>
              </div>
            </div>

            {/* Sort Toggle */}
            <div className="md:col-span-4 flex items-center justify-between sm:justify-end gap-2">
              <span className="text-xs font-jetbrains text-zinc-700 dark:text-zinc-400 flex items-center gap-1.5 font-bold">
                <Filter className="w-3.5 h-3.5 text-[#B8006E] dark:text-[#D4FF00]" /> ORDENAR:
              </span>
              <div className="flex bg-white dark:bg-black border-2 border-black dark:border-zinc-800 p-0.5">
                <button
                  onClick={() => setSortBy('recent')}
                  className={`px-3 py-1.5 text-xs font-jetbrains font-bold transition-all duration-150 active:scale-95 ${
                    sortBy === 'recent'
                      ? 'bg-black text-[#D4FF00] dark:bg-[#D4FF00] dark:text-black'
                      : 'text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  RECIENTES
                </button>
                <button
                  onClick={() => setSortBy('views')}
                  className={`px-3 py-1.5 text-xs font-jetbrains font-bold transition-all duration-150 active:scale-95 ${
                    sortBy === 'views'
                      ? 'bg-black text-[#D4FF00] dark:bg-[#D4FF00] dark:text-black'
                      : 'text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  MÁS LEÍDOS
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-200 dark:border-zinc-900">
            <span className="text-xs font-jetbrains text-zinc-700 dark:text-zinc-500 mr-2 flex items-center gap-1 font-bold">
              CATEGORÍA:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-jetbrains font-bold uppercase transition-all duration-150 hover:-translate-y-1 active:scale-95 border-2 cursor-pointer ${
                    isActive
                      ? 'bg-black text-[#D4FF00] border-black scale-[1.02]'
                      : 'bg-white text-black border-black hover:bg-[#D4FF00] hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Interactive Tag Chips Bar */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-jetbrains text-zinc-700 dark:text-zinc-400 flex items-center gap-1.5 font-bold">
                <TagIcon className="w-3.5 h-3.5 text-[#D9008F] dark:text-[#D4FF00]" /> FILTRAR POR ETIQUETAS ({allTagsWithCount.length}):
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-jetbrains text-[#FF4400] hover:underline flex items-center gap-1 transition-all duration-150 active:scale-95 font-bold"
                >
                  <X className="w-3.5 h-3.5" /> LIMPIAR FILTROS ({activeFiltersCount})
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-2.5 py-1 text-xs font-jetbrains uppercase transition-all duration-150 hover:-translate-y-0.5 active:scale-95 border-2 font-bold cursor-pointer ${
                  selectedTag === null
                    ? 'bg-black text-[#D4FF00] border-black brutal-shadow-black'
                    : 'bg-white text-black border-black hover:bg-[#D4FF00] hover:text-black'
                }`}
              >
                #TODAS ({articles.length})
              </button>
              {allTagsWithCount.map(({ tag, count }) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                    className={`px-2.5 py-1 text-xs font-jetbrains transition-all duration-150 hover:-translate-y-0.5 active:scale-95 border-2 flex items-center gap-1.5 font-bold cursor-pointer ${
                      isActive
                        ? 'bg-black text-[#D4FF00] border-black brutal-shadow-black'
                        : 'bg-white text-black border-black hover:bg-[#D4FF00] hover:text-black'
                    }`}
                  >
                    <span>#{tag}</span>
                    <span className={`text-[10px] px-1 py-0.2 rounded-xs border ${
                      isActive ? 'bg-[#D4FF00] text-black border-black font-bold' : 'bg-zinc-100 text-black border-black font-bold'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Search / Tag summary notification */}
          <div className="flex items-center justify-between text-xs font-jetbrains text-zinc-500 pt-2 border-t border-zinc-900">
            <div>
              Mostrando <span className="text-[#D4FF00] font-bold">{filteredArticles.length}</span> de <span className="text-white font-bold">{articles.length}</span> artículos
              {selectedTag && <span> • Etiqueta: <strong className="text-white">#{selectedTag}</strong></span>}
              {selectedCategory !== 'TODAS' && <span> • Categoría: <strong className="text-white">{selectedCategory}</strong></span>}
              {searchQuery && <span> • Búsqueda: &ldquo;<strong className="text-white">{searchQuery}</strong>&rdquo;</span>}
            </div>

            {isLoading && (
              <span className="flex items-center gap-1.5 text-[#D4FF00]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Cargando...
              </span>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => {
              const isLead = idx === 0 && !searchQuery && !selectedTag && selectedCategory === 'TODAS';
              return (
                <article
                  key={article.id}
                  className={`bg-white dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 flex flex-col justify-between transition-all duration-200 hover:border-[#B8006E] dark:hover:border-[#D4FF00] hover:-translate-y-1 brutal-shadow-black group ${
                    isLead ? 'md:col-span-2 lg:col-span-2 border-black dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60' : ''
                  }`}
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-video bg-black overflow-hidden border-b-2 border-black dark:border-zinc-800">
                      <ImageWithSkeleton
                        src={article.image}
                        alt={article.title}
                        aspectRatioClassName="aspect-video"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Top Badges Over Image */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                        <span className="px-2 py-1 bg-white dark:bg-black text-black dark:text-[#D4FF00] border-2 border-black text-xs font-jetbrains font-bold uppercase tracking-wider">
                          [ {article.category} ]
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          {article.resources && article.resources.length > 0 && (
                            <span className="px-2 py-0.5 bg-[#D4FF00] text-black text-[10px] font-jetbrains font-bold border border-black flex items-center gap-1 shadow-sm">
                              <Download className="w-3 h-3 text-black" /> {article.resources.length} DESCARGAS
                            </span>
                          )}
                          {article.stats?.impact && (
                            <span className="px-2 py-0.5 bg-[#FF4400] text-white text-[10px] font-jetbrains font-bold border border-black flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-white" /> {article.stats.impact}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Read Time & Views Overlay */}
                      <div className="absolute bottom-2 right-2 bg-white/95 dark:bg-black/85 px-2 py-0.5 border border-black dark:border-zinc-800 text-[10px] font-jetbrains text-black dark:text-zinc-300 flex items-center gap-2 font-bold">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#B8006E] dark:text-[#D4FF00]" /> {article.readTime}
                        </span>
                        {article.stats?.views && (
                          <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-400">
                            <Eye className="w-3 h-3 text-zinc-700 dark:text-zinc-400" /> {article.stats.views}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 space-y-3">
                      {/* Metadata bar */}
                      <div className="flex items-center justify-between text-xs font-jetbrains text-zinc-600 dark:text-zinc-400 font-semibold">
                        <span>{article.publishedAt}</span>
                        <span className="text-zinc-600 dark:text-zinc-500">// {article.author.name}</span>
                      </div>

                      {/* Title */}
                      <h3 className={`font-anton uppercase tracking-wide text-black dark:text-white group-hover:text-[#B8006E] dark:group-hover:text-[#D4FF00] transition-colors leading-tight ${
                        isLead ? 'text-2xl sm:text-3xl' : 'text-xl'
                      }`}>
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-zinc-800 dark:text-zinc-300 font-space-grotesk text-sm leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {article.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="text-[11px] font-jetbrains text-zinc-700 dark:text-zinc-400 hover:text-[#B8006E] dark:hover:text-[#D4FF00] hover:underline font-bold"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  {/* Card Footer Actions */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-zinc-200 dark:border-zinc-900 mt-4 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenReader(article, false)}
                      className="flex-1 min-w-[130px] bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-jetbrains text-xs font-bold py-2.5 px-3 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-1.5 group/btn cursor-pointer brutal-shadow-black"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-black group-hover/btn:text-white shrink-0" />
                      <span className="text-black group-hover/btn:text-white font-bold truncate">LEER</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover/btn:text-white shrink-0" />
                    </button>

                    {/* Botón Modo Lectura */}
                    <button
                      onClick={() => handleOpenReader(article, true)}
                      title="Abrir en Modo Lectura centrado y tipografía optimizada"
                      className="px-3 py-2.5 bg-white dark:bg-black border-2 border-black dark:border-zinc-700 text-black dark:text-zinc-200 hover:bg-[#D4FF00] hover:text-black hover:border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 cursor-pointer brutal-shadow-black flex items-center gap-1.5 font-jetbrains text-xs font-bold"
                    >
                      <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[11px] font-bold">MODO LECTURA</span>
                    </button>

                    {/* Botón Escuchar en Voz Alta */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSpeech(article, e);
                      }}
                      title={
                        isSpeaking && speakingArticleId === article.id
                          ? (isPaused ? "Reanudar lectura en voz alta" : "Pausar lectura en voz alta")
                          : "Escuchar este artículo leído en voz alta (Text-to-Speech)"
                      }
                      className={`px-3 py-2.5 border-2 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 cursor-pointer brutal-shadow-black flex items-center gap-1.5 font-jetbrains text-xs font-bold ${
                        isSpeaking && speakingArticleId === article.id
                          ? 'bg-[#00E599] text-black border-black animate-pulse'
                          : 'bg-white dark:bg-black text-black dark:text-zinc-200 hover:bg-[#00E599] hover:text-black border-2 border-black dark:border-zinc-700'
                      }`}
                    >
                      {isSpeaking && speakingArticleId === article.id ? (
                        isPaused ? (
                          <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                        ) : (
                          <Pause className="w-3.5 h-3.5 fill-current shrink-0" />
                        )
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span className="text-[11px] font-bold">
                        {isSpeaking && speakingArticleId === article.id
                          ? (isPaused ? 'REANUDAR' : 'ESCUCHANDO')
                          : 'ESCUCHAR'}
                      </span>
                    </button>

                    {/* Botón Compartir */}
                    <button
                      onClick={(e) => handleShare(article, e)}
                      title="Compartir en LinkedIn, X, WhatsApp, Discord o Facebook"
                      className="p-2.5 bg-zinc-100 dark:bg-black border-2 border-black dark:border-zinc-800 text-black dark:text-zinc-400 hover:text-white hover:bg-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 cursor-pointer brutal-shadow-black shrink-0"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-zinc-950 border-2 border-black dark:border-zinc-800 p-8 sm:p-12 text-center space-y-4 brutal-shadow-black">
            <div className="w-12 h-12 mx-auto bg-zinc-100 dark:bg-black border-2 border-black dark:border-zinc-700 flex items-center justify-center text-[#FF4400]">
              <Terminal className="w-6 h-6" />
            </div>
            <div className="font-anton text-2xl uppercase text-black dark:text-white">
              [ 0 ARTÍCULOS ENCONTRADOS ]
            </div>
            <p className="text-zinc-700 dark:text-zinc-400 font-space-grotesk text-sm max-w-md mx-auto">
              No se detectaron artículos que coincidan con los criterios actuales de búsqueda o etiqueta.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="bg-black text-[#D4FF00] dark:bg-[#D4FF00] dark:text-black font-jetbrains text-xs font-bold px-6 py-3 border-2 border-black brutal-shadow-black hover:bg-[#D9008F] hover:text-white transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> REINICIAR BÚSQUEDA Y FILTROS
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={handleCloseReader}
        >
          <div 
            className={`w-full transition-all duration-200 brutal-shadow-black relative flex flex-col ${
              isReadingMode
                ? `max-w-4xl sm:max-w-5xl my-4 min-h-[85vh] max-h-[96vh] overflow-y-auto border-2 ${
                    readerTheme === 'sepia'
                      ? 'bg-[#FBF0D9] text-[#2C2114] border-[#543D28]'
                      : readerTheme === 'dark'
                        ? 'bg-[#0D1117] text-[#E6EDF3] border-zinc-700'
                        : 'bg-[#FAF9F5] dark:bg-[#121411] text-black dark:text-zinc-100 border-black dark:border-zinc-700'
                  }`
                : 'bg-white dark:bg-[#121411] text-black dark:text-zinc-100 border-2 border-black dark:border-zinc-700 max-w-3xl max-h-[90vh] overflow-y-auto dark:brutal-shadow-lime'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className={`sticky top-0 z-30 border-b-2 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 ${
              isReadingMode
                ? (readerTheme === 'sepia' 
                    ? 'bg-[#F4E6CB] border-[#543D28]' 
                    : readerTheme === 'dark' 
                      ? 'bg-[#161B22] border-zinc-700 text-white' 
                      : 'bg-zinc-100 dark:bg-zinc-900 border-black dark:border-zinc-800')
                : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800'
            }`}>
              {/* Category, Read Time & Mode Indicator */}
              <div className="flex items-center flex-wrap gap-2 font-jetbrains text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B8006E] dark:bg-[#D4FF00] animate-pulse"></span>
                <span className="font-bold uppercase tracking-wide text-[#B8006E] dark:text-[#D4FF00]">
                  [ {activeArticle.category} ]
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">|</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-400">
                  {activeArticle.readTime}
                </span>

                {isReadingMode && (
                  <span className="px-2 py-0.5 bg-[#D4FF00] text-black text-[10px] font-bold border border-black uppercase flex items-center gap-1 shadow-sm">
                    <Maximize2 className="w-3 h-3" /> MODO LECTURA CENTRADO
                  </span>
                )}
              </div>

              {/* Action Controls: Escucha en Voz Alta + Modo Lectura + Compartir + Cerrar */}
              <div className="flex items-center flex-wrap gap-2">
                {/* 1. Botón de Escucha (Text-To-Speech) */}
                <div className="flex items-center gap-1 bg-white dark:bg-black border-2 border-black dark:border-zinc-700 p-0.5">
                  <button
                    onClick={() => handleToggleSpeech(activeArticle)}
                    title={
                      isSpeaking && speakingArticleId === activeArticle.id
                        ? (isPaused ? "Reanudar lectura en voz alta" : "Pausar lectura en voz alta")
                        : "Escuchar este artículo en voz alta (Text-to-Speech)"
                    }
                    className={`px-2.5 py-1 text-xs font-jetbrains font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      isSpeaking && speakingArticleId === activeArticle.id
                        ? 'bg-[#00E599] text-black'
                        : 'bg-black text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black dark:bg-[#D4FF00] dark:text-black'
                    }`}
                  >
                    {isSpeaking && speakingArticleId === activeArticle.id ? (
                      isPaused ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>REANUDAR</span>
                        </>
                      ) : (
                        <>
                          {/* Animated Audio Equalizer Waveform */}
                          <span className="flex items-center gap-0.5 h-3">
                            <span className="w-0.5 bg-black h-3 animate-pulse"></span>
                            <span className="w-0.5 bg-black h-2 animate-bounce"></span>
                            <span className="w-0.5 bg-black h-3.5 animate-pulse"></span>
                          </span>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>PAUSAR</span>
                        </>
                      )
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>ESCUCHAR</span>
                      </>
                    )}
                  </button>

                  {/* Stop button when speaking */}
                  {isSpeaking && speakingArticleId === activeArticle.id && (
                    <button
                      onClick={handleStopSpeech}
                      title="Detener lectura en voz alta"
                      className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                      aria-label="Detener audio"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                    </button>
                  )}

                  {/* Speed Selector */}
                  <div className="flex items-center border-l border-zinc-300 dark:border-zinc-700 pl-1 text-[10px] font-mono">
                    {[1, 1.25, 1.5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handleSpeechRateChange(rate)}
                        title={`Velocidad de lectura ${rate}x`}
                        className={`px-1 py-0.5 font-bold transition-colors ${
                          speechRate === rate
                            ? 'text-[#B8006E] dark:text-[#D4FF00] underline'
                            : 'text-zinc-500 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Botón Conmutador Modo Lectura */}
                <button
                  onClick={() => setIsReadingMode(!isReadingMode)}
                  title={isReadingMode ? "Volver a vista estándar del artículo" : "Activar Modo Lectura centrado sin distracciones"}
                  className={`px-3 py-1.5 text-xs font-jetbrains font-bold border-2 border-black transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 brutal-shadow-black ${
                    isReadingMode
                      ? 'bg-[#D4FF00] text-black shadow-inner'
                      : 'bg-white dark:bg-black text-black dark:text-zinc-200 hover:bg-[#D4FF00] hover:text-black dark:border-zinc-700'
                  }`}
                >
                  {isReadingMode ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>VISTA ESTÁNDAR</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>MODO LECTURA</span>
                    </>
                  )}
                </button>

                {/* 3. Compartir */}
                <button
                  onClick={(e) => handleShare(activeArticle, e)}
                  title="Compartir en LinkedIn, X, WhatsApp, Discord o Facebook"
                  className="px-2.5 py-1.5 text-xs font-jetbrains bg-white dark:bg-black border-2 border-black dark:border-zinc-700 text-black dark:text-zinc-300 hover:text-[#B8006E] dark:hover:text-[#D4FF00] transition-all flex items-center gap-1 active:scale-95 font-bold cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">COMPARTIR</span>
                </button>

                {/* 4. Cerrar */}
                <button
                  onClick={handleCloseReader}
                  className="p-1.5 bg-white dark:bg-black border-2 border-black dark:border-zinc-700 text-black dark:text-zinc-300 hover:text-white hover:bg-black transition-all active:scale-95 cursor-pointer"
                  aria-label="Cerrar artículo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reading Mode Zen Toolbar (Tamaño de fuente, Temas claro/sepia/oscuro) */}
            {isReadingMode && (
              <div className={`px-4 sm:px-6 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs font-jetbrains ${
                readerTheme === 'sepia'
                  ? 'bg-[#F2E1C1] border-[#543D28]/40 text-[#2C2114]'
                  : readerTheme === 'dark'
                    ? 'bg-[#12161D] border-zinc-800 text-zinc-300'
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}>
                {/* Font Size Selector */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                    <Type className="w-3.5 h-3.5" /> TIPOGRAFÍA:
                  </span>
                  <div className="flex items-center gap-1 border border-zinc-400 dark:border-zinc-700 p-0.5 bg-white/60 dark:bg-black/60">
                    <button
                      onClick={() => setReaderFontSize('normal')}
                      className={`px-2 py-0.5 text-xs font-bold transition-colors ${
                        readerFontSize === 'normal' ? 'bg-black text-[#D4FF00] dark:bg-white dark:text-black' : 'hover:text-black dark:hover:text-white'
                      }`}
                    >
                      A- Normal
                    </button>
                    <button
                      onClick={() => setReaderFontSize('large')}
                      className={`px-2 py-0.5 text-sm font-bold transition-colors ${
                        readerFontSize === 'large' ? 'bg-black text-[#D4FF00] dark:bg-white dark:text-black' : 'hover:text-black dark:hover:text-white'
                      }`}
                    >
                      A Grande
                    </button>
                    <button
                      onClick={() => setReaderFontSize('xlarge')}
                      className={`px-2 py-0.5 text-base font-bold transition-colors ${
                        readerFontSize === 'xlarge' ? 'bg-black text-[#D4FF00] dark:bg-white dark:text-black' : 'hover:text-black dark:hover:text-white'
                      }`}
                    >
                      A+ Extra
                    </button>
                  </div>
                </div>

                {/* Theme Selector: Neutral / Sepia / Dark */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    TEMA DE LECTURA:
                  </span>
                  <div className="flex items-center gap-1 border border-zinc-400 dark:border-zinc-700 p-0.5 bg-white/60 dark:bg-black/60">
                    <button
                      onClick={() => setReaderTheme('neutral')}
                      className={`px-2 py-0.5 text-xs font-bold transition-colors ${
                        readerTheme === 'neutral' ? 'bg-black text-[#D4FF00] dark:bg-white dark:text-black' : 'hover:text-black dark:hover:text-white'
                      }`}
                    >
                      ☀️ Día
                    </button>
                    <button
                      onClick={() => setReaderTheme('sepia')}
                      className={`px-2 py-0.5 text-xs font-bold transition-colors ${
                        readerTheme === 'sepia' ? 'bg-[#543D28] text-[#FBF0D9]' : 'hover:text-[#543D28]'
                      }`}
                    >
                      📜 Sepia
                    </button>
                    <button
                      onClick={() => setReaderTheme('dark')}
                      className={`px-2 py-0.5 text-xs font-bold transition-colors ${
                        readerTheme === 'dark' ? 'bg-white text-black' : 'hover:text-black dark:hover:text-white'
                      }`}
                    >
                      🌙 Noche
                    </button>
                  </div>
                </div>

                {/* Audio Playing Indicator */}
                {isSpeaking && speakingArticleId === activeArticle.id && (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00E599]">
                    <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
                    <span>Leyendo artículo en voz alta ({speechRate}x)...</span>
                  </div>
                )}
              </div>
            )}

            {/* Modal Hero Image (Visible solo en vista estándar para evitar distracciones en Modo Lectura) */}
            {!isReadingMode && (
              <div className="relative aspect-video bg-black border-b-2 border-black dark:border-zinc-800">
                <ImageWithSkeleton
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  aspectRatioClassName="aspect-video"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* View Mode Tabs (Reading vs HTML Code) */}
            <div className={`flex border-b-2 sticky top-[57px] z-10 ${
              isReadingMode
                ? (readerTheme === 'sepia'
                    ? 'bg-[#F4E6CB] border-[#543D28]'
                    : readerTheme === 'dark'
                      ? 'bg-[#161B22] border-zinc-700'
                      : 'bg-zinc-100 dark:bg-zinc-900 border-black dark:border-zinc-800')
                : 'border-black dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900'
            }`}>
              <button
                onClick={() => setReaderTab('reading')}
                className={`flex-1 sm:flex-initial px-5 py-3 font-jetbrains text-xs font-bold transition-all flex items-center justify-center gap-2 border-r-2 border-black dark:border-zinc-800 cursor-pointer ${
                  readerTab === 'reading'
                    ? 'bg-[#D4FF00] text-black shadow-inner'
                    : 'bg-white dark:bg-zinc-950 text-black dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>LECTURA EDITORIAL</span>
              </button>

              {activeArticle.htmlContent && (
                <button
                  onClick={() => setReaderTab('html')}
                  className={`flex-1 sm:flex-initial px-5 py-3 font-jetbrains text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    readerTab === 'html'
                      ? 'bg-[#FF4400] text-white shadow-inner'
                      : 'bg-white dark:bg-zinc-950 text-black dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                  <span>CÓDIGO FUENTE HTML</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-black text-[#D4FF00] font-bold border border-zinc-700 hidden sm:inline-block">
                    HTML5
                  </span>
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className={`transition-all duration-200 ${
              isReadingMode
                ? 'max-w-3xl sm:max-w-4xl mx-auto py-8 sm:py-12 px-5 sm:px-10 space-y-8'
                : 'p-6 sm:p-8 space-y-6'
            }`}>
              {readerTab === 'reading' ? (
                <>
                  {activeArticle.htmlContent ? (
                    /* Render Full HTML with automatic Copy button on <pre><code> */
                    <div className="space-y-6">
                      <ArticleHtmlRenderer 
                        html={activeArticle.htmlContent} 
                        fontSizeClass={
                          readerFontSize === 'xlarge'
                            ? 'text-lg sm:text-xl leading-relaxed sm:leading-loose'
                            : readerFontSize === 'large'
                              ? 'text-base sm:text-lg leading-relaxed sm:leading-loose'
                              : 'text-sm sm:text-base leading-relaxed'
                        }
                        className={
                          isReadingMode && readerTheme === 'sepia'
                            ? 'text-[#2C2114]'
                            : isReadingMode && readerTheme === 'dark'
                              ? 'text-[#E6EDF3]'
                              : ''
                        }
                      />
                    </div>
                  ) : (
                    /* Standard fallback rendering */
                    <>
                      {/* Header Info */}
                      <div className={`space-y-3 ${isReadingMode ? 'text-center pb-6 border-b border-zinc-200 dark:border-zinc-800' : ''}`}>
                        <div className={`flex items-center gap-3 text-xs font-jetbrains text-zinc-600 dark:text-zinc-400 font-bold ${
                          isReadingMode ? 'justify-center' : ''
                        }`}>
                          <span>PUBLICADO: {activeArticle.publishedAt}</span>
                          {activeArticle.stats?.impact && (
                            <span className="text-[#B8006E] dark:text-[#D4FF00] font-bold">• {activeArticle.stats.impact}</span>
                          )}
                        </div>

                        <h1 className={`font-anton uppercase text-black dark:text-white leading-tight ${
                          isReadingMode ? 'text-3xl sm:text-5xl tracking-tight' : 'text-2xl sm:text-4xl'
                        }`}>
                          {activeArticle.title}
                        </h1>

                        <p className={`font-space-grotesk text-base sm:text-lg leading-relaxed font-medium ${
                          isReadingMode 
                            ? 'text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto' 
                            : 'text-zinc-800 dark:text-zinc-300 border-l-4 border-[#B8006E] dark:border-[#D4FF00] pl-4'
                        }`}>
                          {activeArticle.excerpt}
                        </p>
                      </div>

                      {/* Key Takeaways Box */}
                      {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                        <div className={`border-2 p-5 space-y-3 ${
                          isReadingMode && readerTheme === 'sepia'
                            ? 'bg-[#F4E6CB] border-[#543D28]/40'
                            : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800'
                        }`}>
                          <div className="flex items-center gap-2 font-jetbrains text-xs font-bold text-[#B8006E] dark:text-[#D4FF00]">
                            <Sparkles className="w-4 h-4 text-[#B8006E] dark:text-[#D4FF00]" />
                            <span>CONCLUSIONES CLAVE / RETENCIÓN ESTRATÉGICA</span>
                          </div>
                          <ul className={`space-y-2 font-space-grotesk text-zinc-800 dark:text-zinc-300 ${
                            readerFontSize === 'xlarge' ? 'text-base sm:text-lg' : readerFontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                          }`}>
                            {activeArticle.keyTakeaways.map((takeaway, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#FF4400] font-bold font-jetbrains mt-0.5">[{i + 1}]</span>
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Full Content Paragraphs */}
                      <div className={`space-y-5 font-space-grotesk ${
                        isReadingMode && readerTheme === 'sepia' ? 'text-[#2C2114]' : 'text-zinc-800 dark:text-zinc-300'
                      } ${
                        readerFontSize === 'xlarge'
                          ? 'text-lg sm:text-xl leading-relaxed sm:leading-loose'
                          : readerFontSize === 'large'
                            ? 'text-base sm:text-lg leading-relaxed sm:leading-loose'
                            : 'text-sm sm:text-base leading-relaxed'
                      }`}>
                        {activeArticle.content.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>

                      {/* Technical Sections Breakdown */}
                      {activeArticle.sections && activeArticle.sections.length > 0 && (
                        <div className="space-y-4 pt-6 border-t-2 border-zinc-200 dark:border-zinc-800">
                          <div className="flex items-center gap-2 font-jetbrains text-xs font-bold text-[#FF4400]">
                            <Layers className="w-4 h-4 text-[#FF4400]" />
                            <span>DESGLOSE TÉCNICO Y SECCIONES DEL DOCUMENTO</span>
                          </div>
                          <div className="space-y-3">
                            {activeArticle.sections.map((section, idx) => (
                              <div 
                                key={idx} 
                                className={`border p-4 sm:p-5 space-y-2 transition-all ${
                                  isReadingMode && readerTheme === 'sepia'
                                    ? 'bg-[#F4E6CB]/60 border-[#543D28]/30'
                                    : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-300 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-600'
                                }`}
                              >
                                <h4 className="font-jetbrains font-bold text-sm sm:text-base text-black dark:text-[#D4FF00]">
                                  {section.heading}
                                </h4>
                                <p className={`font-space-grotesk leading-relaxed ${
                                  isReadingMode && readerTheme === 'sepia' ? 'text-[#2C2114]' : 'text-zinc-800 dark:text-zinc-300'
                                } ${
                                  readerFontSize === 'xlarge' ? 'text-base sm:text-lg' : readerFontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                                }`}>
                                  {section.body}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                /* Tab 2: Raw HTML Source Code Viewer */
                <div className="space-y-4">
                  <div className="bg-[#121411] border-2 border-black dark:border-zinc-700 p-5 space-y-4 brutal-shadow-black">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-jetbrains text-xs font-bold text-[#D4FF00]">
                          <FileCode className="w-4 h-4 text-[#D4FF00]" />
                          <span>CÓDIGO FUENTE HTML5 GENERADO</span>
                        </div>
                        <p className="text-xs font-space-grotesk text-zinc-400">
                          HTML semántico listo para integración web, con marcado de ingeniería y bloques &lt;pre&gt;&lt;code&gt;.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            if (!activeArticle.htmlContent) return;
                            navigator.clipboard.writeText(activeArticle.htmlContent).then(() => {
                              setCopiedHtml(true);
                              setTimeout(() => setCopiedHtml(false), 2500);
                            });
                          }}
                          className={`px-4 py-2 text-xs font-jetbrains font-bold border-2 border-black transition-all duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                            copiedHtml
                              ? 'bg-[#00E599] text-black border-black'
                              : 'bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white'
                          }`}
                        >
                          {copiedHtml ? (
                            <>
                              <Check className="w-4 h-4 text-black" />
                              <span>CÓDIGO HTML COPIADO ✔</span>
                            </>
                          ) : (
                            <>
                              <FileCode className="w-4 h-4" />
                              <span>COPIAR CÓDIGO HTML</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            if (!activeArticle.htmlContent) return;
                            const fullDoc = `<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>${activeArticle.title} | Wacha Multimedia</title>\n  <meta name="description" content="${activeArticle.excerpt}">\n</head>\n<body>\n${activeArticle.htmlContent}\n</body>\n</html>`;
                            handleDownloadResource({
                              id: `${activeArticle.slug}-html-file`,
                              name: `${activeArticle.title} (HTML)`,
                              description: 'Documento HTML5 completo',
                              fileName: `${activeArticle.slug}.html`,
                              fileType: 'text/html',
                              fileContent: fullDoc,
                              size: `${Math.round(fullDoc.length / 1024 * 10) / 10} KB`
                            });
                          }}
                          className="px-4 py-2 text-xs font-jetbrains font-bold bg-white text-black hover:bg-zinc-200 border-2 border-black transition-all duration-150 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>DESCARGAR .HTML</span>
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <pre className="bg-[#0d1117] text-[#e6edf3] border-2 border-zinc-800 p-4 font-jetbrains text-xs overflow-x-auto max-h-[500px] leading-relaxed selection:bg-[#D4FF00] selection:text-black">
                        <code>{activeArticle.htmlContent}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Downloadable Resources Box */}
              {activeArticle.resources && activeArticle.resources.length > 0 && (
                <div className="bg-[#121411] border-2 border-black dark:border-zinc-700 p-5 sm:p-6 space-y-4 brutal-shadow-black">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2 font-jetbrains text-xs font-bold text-[#D4FF00]">
                      <Download className="w-4 h-4 text-[#D4FF00]" />
                      <span>RECURSOS Y COMPLEMENTOS DE DESCARGA DIRECTA</span>
                    </div>
                    <span className="text-[10px] font-jetbrains text-zinc-400">
                      [ {activeArticle.resources.length} ARCHIVOS DISPONIBLES ]
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeArticle.resources.map((res) => (
                      <div 
                        key={res.id}
                        className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D4FF00] transition-colors"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 bg-black text-[#D4FF00] text-[10px] font-jetbrains font-bold border border-zinc-700 uppercase">
                              {res.fileName.split('.').pop()}
                            </span>
                            <span className="font-jetbrains font-bold text-xs text-white">
                              {res.fileName}
                            </span>
                            <span className="text-[10px] font-jetbrains text-zinc-400">
                              ({res.size})
                            </span>
                          </div>
                          <div className="font-jetbrains text-xs text-zinc-200 font-bold">
                            {res.name}
                          </div>
                          <div className="text-[11px] font-space-grotesk text-zinc-400 leading-tight">
                            {res.description}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadResource(res)}
                          className={`font-jetbrains text-xs font-bold py-2.5 px-4 border-2 border-black transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                            downloadedResourceId === res.id
                              ? 'bg-emerald-500 text-black border-emerald-600'
                              : 'bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white'
                          }`}
                        >
                          {downloadedResourceId === res.id ? (
                            <>
                              <Check className="w-4 h-4 text-black" />
                              <span>DESCARGADO</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>DESCARGAR</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="w-10 h-10 rounded-full border-2 border-black dark:border-[#D4FF00] object-cover"
                  />
                  <div>
                    <div className="font-jetbrains font-bold text-xs text-black dark:text-white">
                      {activeArticle.author.name}
                    </div>
                    <div className="text-[11px] font-jetbrains text-zinc-600 dark:text-zinc-400">
                      {activeArticle.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeArticle.tags.map(t => (
                    <button
                      key={t}
                      onClick={() => {
                        setSelectedTag(t);
                        setActiveArticle(null);
                      }}
                      className="px-2 py-0.5 bg-zinc-100 dark:bg-black border border-black dark:border-zinc-700 text-black dark:text-zinc-400 hover:text-[#B8006E] dark:hover:text-[#D4FF00] text-[10px] font-jetbrains font-bold"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-3">
                <a
                  href="#cotizador"
                  onClick={() => setActiveArticle(null)}
                  className="bg-black text-[#D4FF00] dark:bg-[#D4FF00] dark:text-black font-jetbrains text-xs font-bold py-3 px-6 border-2 border-black brutal-shadow-black hover:bg-[#FF4400] hover:text-white transition-all duration-150 active:scale-95 flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>COTIZAR ESTRATEGIA AEO CON EL ESTUDIO</span>
                </a>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="bg-white dark:bg-black text-black dark:text-white font-jetbrains text-xs font-bold py-3 px-6 border-2 border-black dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150 active:scale-95"
                >
                  VOLVER AL FEED
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Article Multi-channel Social Sharing Modal */}
      <ArticleShareModal
        article={shareArticle}
        isOpen={!!shareArticle}
        onClose={() => setShareArticle(null)}
      />
    </section>
  );
};
