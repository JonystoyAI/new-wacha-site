import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BlogPost } from '../types';
import { loadBlogArticles } from '../data/blogData';
import { ImageWithSkeleton } from './ImageWithSkeleton';
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
  BookOpen
} from 'lucide-react';

export const BlogFeed: React.FC = () => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [sortBy, setSortBy] = useState<'recent' | 'views'>('recent');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('/data/articles.json');
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Handle share link
  const handleShare = (article: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}#blog-${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedId(article.id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
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
                        
                        {article.stats?.impact && (
                          <span className="px-2 py-0.5 bg-[#FF4400] text-white text-[10px] font-jetbrains font-bold border border-black flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-white" /> {article.stats.impact}
                          </span>
                        )}
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
                  <div className="p-5 sm:p-6 pt-0 border-t border-zinc-200 dark:border-zinc-900 mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveArticle(article)}
                      className="flex-1 bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-jetbrains text-xs font-bold py-2.5 px-4 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 group/btn cursor-pointer brutal-shadow-black"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-black group-hover/btn:text-white" />
                      <span className="text-black group-hover/btn:text-white font-bold">LEER ARTÍCULO</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover/btn:text-white" />
                    </button>

                    <button
                      onClick={(e) => handleShare(article, e)}
                      title="Compartir o copiar enlace del artículo"
                      className="p-2.5 bg-zinc-100 dark:bg-black border-2 border-black dark:border-zinc-800 text-black dark:text-zinc-400 hover:text-white hover:bg-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 cursor-pointer brutal-shadow-black"
                    >
                      {copiedId === article.id ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="bg-white dark:bg-[#121411] border-2 border-black dark:border-zinc-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto brutal-shadow-black dark:brutal-shadow-lime relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-zinc-100 dark:bg-zinc-900 border-b-2 border-zinc-300 dark:border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-jetbrains text-xs">
                <span className="w-2 h-2 rounded-full bg-[#B8006E] dark:bg-[#D4FF00]"></span>
                <span className="text-[#B8006E] dark:text-[#D4FF00] font-bold uppercase">[ {activeArticle.category} ]</span>
                <span className="text-zinc-400 dark:text-zinc-500">|</span>
                <span className="text-zinc-700 dark:text-zinc-400 font-bold">{activeArticle.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(activeArticle, e)}
                  className="px-2.5 py-1 text-xs font-jetbrains bg-white dark:bg-black border-2 border-black dark:border-zinc-700 text-black dark:text-zinc-300 hover:text-[#B8006E] dark:hover:text-[#D4FF00] transition-all flex items-center gap-1 active:scale-95 font-bold"
                >
                  {copiedId === activeArticle.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>COPIADO</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>COMPARTIR</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 bg-white dark:bg-black border-2 border-black dark:border-zinc-700 text-black dark:text-zinc-300 hover:text-white hover:bg-black transition-all active:scale-95"
                  aria-label="Cerrar artículo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Hero Image */}
            <div className="relative aspect-video bg-black border-b-2 border-black dark:border-zinc-800">
              <ImageWithSkeleton
                src={activeArticle.image}
                alt={activeArticle.title}
                aspectRatioClassName="aspect-video"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-jetbrains text-zinc-600 dark:text-zinc-400 font-bold">
                  <span>PUBLICADO: {activeArticle.publishedAt}</span>
                  {activeArticle.stats?.impact && (
                    <span className="text-[#B8006E] dark:text-[#D4FF00] font-bold">• {activeArticle.stats.impact}</span>
                  )}
                </div>

                <h1 className="font-anton text-2xl sm:text-4xl uppercase text-black dark:text-white leading-tight">
                  {activeArticle.title}
                </h1>

                <p className="text-zinc-800 dark:text-zinc-300 font-space-grotesk text-base sm:text-lg leading-relaxed border-l-4 border-[#B8006E] dark:border-[#D4FF00] pl-4 font-medium">
                  {activeArticle.excerpt}
                </p>
              </div>

              {/* Key Takeaways Box */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div className="bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 p-5 space-y-3">
                  <div className="flex items-center gap-2 font-jetbrains text-xs font-bold text-[#B8006E] dark:text-[#D4FF00]">
                    <Sparkles className="w-4 h-4 text-[#B8006E] dark:text-[#D4FF00]" />
                    <span>CONCLUSIONES CLAVE / RETENCIÓN ESTRATÉGICA</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm font-space-grotesk text-zinc-800 dark:text-zinc-300">
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
              <div className="space-y-4 font-space-grotesk text-zinc-800 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activeArticle.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

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
    </section>
  );
};
