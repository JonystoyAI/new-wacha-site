import React, { useState, useEffect } from 'react';
import { 
  Server, Activity, Globe, ShieldCheck, ExternalLink, Folder, FileText, Music, Image as ImageIcon, 
  HardDrive, Cpu, RefreshCw, CheckCircle2, Clock, Terminal, Plus, FolderOpen, Search, Copy, Download, Trash2, Edit3, Sparkles, Filter, X
} from 'lucide-react';

interface StudioAsset {
  id: string;
  vertical: 'canales' | 'clientes' | 'musica_audio' | 'indicadores';
  name: string;
  func: string;
  status: string;
  visibility: 'privado' | 'publico';
  ownership: 'mio' | 'cliente';
  tags: string[];
  googleAccount?: string;
  regPhone?: string;
  socialMain?: { platform: string; url: string };
  socialSecondary?: { platform: string; url: string }[];
  voiceId?: string;
  voiceParams?: string;
  aiTools?: string[];
  palette?: string[];
  stylelock?: string;
  prompt?: string;
  indicatorMeta?: {
    type: 'Códice' | 'Skill' | 'Habilidad' | 'Prompt';
    usedFor: string;
    projects: string[];
    aiModel: string;
  };
  audioSpec?: {
    album?: string;
    bpm?: string;
    lufs?: string;
    chain?: string;
  };
}

const STORAGE_KEY = 'wachas_studio_os_v3_assets_v1';

const INITIAL_ASSETS: StudioAsset[] = [
  {
    id: 'ch-codigo-humano',
    vertical: 'canales',
    name: 'Código Humano',
    func: 'Guionización',
    status: 'Activo',
    visibility: 'privado',
    ownership: 'mio',
    tags: ['#neurociencia', '#tech-noir', '#elevenlabs'],
    googleAccount: 'codigohumano.canal@gmail.com',
    regPhone: '+52 442 000 0101',
    socialMain: { platform: 'YouTube', url: 'https://youtube.com/@CodigoHumano' },
    voiceId: 'HIkzxzvsigFIynXHHKhU',
    voiceParams: 'Español neutro | Vel: 0.90–0.95 | Estab: 0.70',
    aiTools: ['Gemini 2.5 Pro', 'Claude 3.7 Sonnet', 'ElevenLabs'],
    palette: ['#0D1B2A', '#00C8D4', '#7B2FBE'],
    stylelock: 'Hyper-realistic, deep-etch Tech-Noir visual identity across all assets. Rigid color palette: Deep Navy (#0D1B2A) backgrounds, accented by glowing Electric Cyan (#00C8D4) and Neon Purple (#7B2FBE).',
    prompt: 'GUION CÓDIGO HUMANO — FENÓMENO: {{TEMA}}\n1. Gancho contraintuitivo\n2. Desmontaje de mito pop\n3. Evidencia experimental\n4. Cierre + CTA.'
  },
  {
    id: 'mus-sonido-decrepito',
    vertical: 'musica_audio',
    name: 'Sonido Decrépito / Míster Decrépito',
    func: 'Masterización Audio',
    status: 'Activo',
    visibility: 'privado',
    ownership: 'mio',
    tags: ['#sonido-decrepito', '#cumbias-cinematicas', '#masterizacion'],
    googleAccount: 'sonidodecrepito@gmail.com',
    regPhone: '+52 442 000 0108',
    socialMain: { platform: 'Bandcamp', url: 'https://sonidodecrepito.bandcamp.com' },
    voiceId: '2ExTicPozzTIuVQRluHJ',
    audioSpec: {
      album: 'Cumbias Cinemáticas',
      bpm: '86–92 BPM | Dm',
      lufs: '-11.5 LUFS | -1.0 dBTP',
      chain: 'EQ Sustractiva, Saturación de cinta analógica, Compresión Bus 2:1.'
    },
    stylelock: 'Cinematic dark tropical noir album artwork, vintage worn vinyl sleeve aesthetic, deep obsidian shadows (#18181B), crimson rose neon highlights (#F43F5E).'
  },
  {
    id: 'ind-codice-cbdv',
    vertical: 'indicadores',
    name: 'Códice Maestro C.B.D.V. — Detección de Demanda Viral',
    func: 'SEO / Virales',
    status: 'Activo',
    visibility: 'publico',
    ownership: 'mio',
    tags: ['#codice', '#demanda-viral', '#investigacion'],
    prompt: 'EJECUTA CÓDICE C.B.D.V. (DETECCIÓN DE DEMANDA VIRAL):\nNICHO / CATEGORÍA: {{CATEGORIA}}\n1. Rastreo de fricciones reales y quejas de usuarios.\n2. Gancho viral basado en la duda más buscada.\n3. 3 usos concretos y 2 fallas reales.',
    indicatorMeta: {
      type: 'Códice',
      usedFor: 'SEO / Virales',
      projects: ['Software que Vende', 'Dinero sin Censura'],
      aiModel: 'Gemini 2.5 Pro'
    }
  }
];

export const WachasStudioOS: React.FC = () => {
  const [assets, setAssets] = useState<StudioAsset[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_ASSETS;
  });

  const [activeVertical, setActiveVertical] = useState<'all' | 'canales' | 'clientes' | 'musica_audio' | 'indicadores'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<StudioAsset | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isCompileOpen, setIsCompileOpen] = useState<boolean>(false);
  const [compileVars, setCompileVars] = useState<Record<string, string>>({});
  const [compiledOutput, setCompiledOutput] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
    } catch {}
  }, [assets]);

  const filteredAssets = assets.filter(item => {
    if (activeVertical !== 'all' && item.vertical !== activeVertical) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const blob = JSON.stringify(item).toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });

  const handleOpenEditor = (item: StudioAsset) => {
    setSelectedAsset(JSON.parse(JSON.stringify(item)));
    setIsEditorOpen(true);
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;
    setAssets(prev => prev.map(a => a.id === selectedAsset.id ? selectedAsset : a));
    setIsEditorOpen(false);
    setSelectedAsset(null);
  };

  const handleOpenCompiler = (item: StudioAsset) => {
    setSelectedAsset(item);
    // Extract variables {{VAR}}
    const text = `${item.stylelock || ''}\n${item.prompt || ''}`;
    const matches = text.match(/\{\{([A-Z0-9_]+)\}\}/g);
    const vars: Record<string, string> = {};
    if (matches) {
      matches.forEach(m => {
        const key = m.replace(/\{\{|\}\}/g, '');
        vars[key] = '';
      });
    }
    setCompileVars(vars);
    updateCompiledOutput(item, vars);
    setIsCompileOpen(true);
  };

  const updateCompiledOutput = (item: StudioAsset, vars: Record<string, string>) => {
    let out = `${item.stylelock ? `[STYLE LOCK]\n${item.stylelock}\n\n---\n\n` : ''}${item.prompt || ''}`;
    Object.keys(vars).forEach(k => {
      const val = vars[k] || `{{${k}}}`;
      out = out.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), val);
    });
    setCompiledOutput(out);
  };

  const handleVarChange = (key: string, value: string) => {
    const updated = { ...compileVars, [key]: value };
    setCompileVars(updated);
    if (selectedAsset) updateCompiledOutput(selectedAsset, updated);
  };

  return (
    <div className="space-y-6 font-jetbrains text-white">
      {/* Top Header Card */}
      <div className="bg-[#121411] border-2 border-black dark:border-zinc-700 p-5 sm:p-6 space-y-4 brutal-shadow-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#00E5FF] text-black font-jetbrains text-[10px] font-bold border border-black uppercase">
                WACHAS STUDIO OS v3.0 // MASTER WORKSPACE
              </span>
              <span className="flex items-center gap-1 text-[11px] font-jetbrains text-[#D4FF00] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping"></span>
                GOOGLE DRIVE MASTER LINKED
              </span>
            </div>
            <h3 className="font-anton text-xl sm:text-2xl uppercase tracking-wider text-white">
              WACHAS STUDIO OS v3.0 — CREATIVEOPS & INDICADORES IA
            </h3>
            <p className="text-xs font-space-grotesk text-zinc-400">
              Sistema operativo de estudio para gestión de expedientes, prompts maestros, Style Lock y acceso al repositorio oficial.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://drive.google.com/drive/folders/14b8mrHO9QInAnUuMGKNFZGVIbnNwNibn?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#D4FF00] text-black font-jetbrains text-xs font-bold border-2 border-black hover:bg-white transition-all flex items-center gap-2 shrink-0 cursor-pointer brutal-shadow-black"
            >
              <ExternalLink className="w-4 h-4" />
              <span>CARPETA GOOGLE DRIVE OFICIAL</span>
            </a>
          </div>
        </div>

        {/* Vertical Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {[
            { id: 'all', label: 'Todas las Verticales' },
            { id: 'canales', label: '1. Canales de Contenido' },
            { id: 'clientes', label: '2. Clientes & Web' },
            { id: 'musica_audio', label: '3. Música & Audio' },
            { id: 'indicadores', label: '4. Indicadores IA & Prompts' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveVertical(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-bold border transition-all cursor-pointer ${
                activeVertical === tab.id
                  ? 'bg-[#D4FF00] text-black border-black brutal-shadow-black'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, prompt, proyecto o etiqueta..."
            className="w-full pl-9 pr-3 py-2 bg-black border border-zinc-700 text-white font-mono text-xs focus:border-[#D4FF00] outline-none"
          />
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
          {filteredAssets.map(item => (
            <div key={item.id} className="bg-black border-2 border-zinc-800 hover:border-[#D4FF00] p-4 flex flex-col justify-between gap-3 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-zinc-900 text-[#D4FF00] border border-zinc-700 text-[10px] font-bold uppercase">
                    {item.vertical}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">{item.status}</span>
                </div>
                <h4 className="font-anton text-base text-white">{item.name}</h4>
                <p className="font-space-grotesk text-xs text-zinc-400 line-clamp-2">{item.func}</p>
                {item.prompt && (
                  <div className="p-2 bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 line-clamp-3">
                    {item.prompt}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenCompiler(item)}
                  className="px-3 py-1.5 bg-[#00E5FF] text-black font-bold text-xs border border-black hover:bg-white transition-all cursor-pointer"
                >
                  ⚡ Compilar Prompt
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenEditor(item)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-[#D4FF00] hover:text-black border border-zinc-700 text-xs font-bold transition-all cursor-pointer"
                >
                  ✏️ Editar Ficha
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPILER MODAL */}
      {isCompileOpen && selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121411] border-2 border-[#00E5FF] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 brutal-shadow-black">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-anton text-lg text-[#00E5FF]">COMPILADOR DE PROMPTS // {selectedAsset.name}</span>
              <button onClick={() => setIsCompileOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {Object.keys(compileVars).length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-amberSurgical">Variables detectadas:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(compileVars).map(k => (
                    <div key={k} className="space-y-1">
                      <label className="block text-[10px] font-mono text-zinc-400">{`{{${k}}}`}</label>
                      <input
                        type="text"
                        value={compileVars[k]}
                        onChange={(e) => handleVarChange(k, e.target.value)}
                        placeholder={`Valor para ${k}...`}
                        className="w-full p-2 bg-black border border-zinc-700 text-white font-mono text-xs outline-none focus:border-[#D4FF00]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-300">Resultado Compilado:</label>
              <textarea
                rows={8}
                value={compiledOutput}
                readOnly
                className="w-full p-3 bg-black border border-zinc-700 text-white font-mono text-xs outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(compiledOutput);
                  alert('¡Prompt compilado copiado al portapapeles!');
                }}
                className="px-4 py-2 bg-[#D4FF00] text-black font-bold text-xs border border-black hover:bg-white cursor-pointer"
              >
                📋 Copiar al Portapapeles
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITOR MODAL */}
      {isEditorOpen && selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <form onSubmit={handleSaveAsset} className="bg-[#121411] border-2 border-[#D4FF00] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 brutal-shadow-lime">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-anton text-lg text-[#D4FF00]">EDITAR EXPEDIENTE // {selectedAsset.name}</span>
              <button type="button" onClick={() => setIsEditorOpen(false)} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs font-jetbrains">
              <div>
                <label className="block text-zinc-400 mb-1">Nombre:</label>
                <input
                  type="text"
                  value={selectedAsset.name}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, name: e.target.value })}
                  className="w-full p-2 bg-black border border-zinc-700 text-white font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Función / Uso:</label>
                <input
                  type="text"
                  value={selectedAsset.func}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, func: e.target.value })}
                  className="w-full p-2 bg-black border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Style Lock Visual:</label>
                <textarea
                  rows={3}
                  value={selectedAsset.stylelock || ''}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, stylelock: e.target.value })}
                  className="w-full p-2 bg-black border border-zinc-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Cuerpo del Prompt / Códice:</label>
                <textarea
                  rows={5}
                  value={selectedAsset.prompt || ''}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, prompt: e.target.value })}
                  className="w-full p-2 bg-black border border-zinc-700 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-4 py-2 bg-zinc-800 text-white text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#D4FF00] text-black text-xs font-bold border border-black hover:bg-white cursor-pointer"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
