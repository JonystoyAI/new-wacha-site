import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { getStoredBlogArticles, getStoredMerchProducts, getStoredReleases } from '../services/cmsService';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const CustomerSupportBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: '¡Qué tal! Soy el asistente virtual de Wacha Studio & Tianguis. ¿Tienes dudas sobre envíos, tallas de ropa, hardware de estudio, descargas de Cumbia Decrépita o artículos del blog?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newUserMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');

    // Simulate intelligent bot response based on CMS articles, merch, and FAQs
    setTimeout(() => {
      let botReply = "Entendido sobre tu consulta. En Wacha Studio garantizamos envíos seguros a todo México e internacionalmente. Para dudas específicas de preventas o hardware de estudio, puedes contactarnos en soporte@whacha.site.";

      const queryLower = userText.toLowerCase();
      const articles = getStoredBlogArticles();
      const merch = getStoredMerchProducts();
      const releases = getStoredReleases();

      if (queryLower.includes('envio') || queryLower.includes('envíos') || queryLower.includes('cuanto tarda') || queryLower.includes('llegar')) {
        botReply = "📦 **Envíos y Entregas**: Todos los pedidos de indumentaria y hardware en 'Wacha el Tianguis' se procesan en 24-48 horas hábiles. Los envíos nacionales en México tardan entre 3 y 5 días hábiles, y los internacionales de 7 a 14 días con número de rastreo cifrado.";
      } else if (queryLower.includes('pago') || queryLower.includes('tarjeta') || queryLower.includes('precio')) {
        botReply = "💳 **Métodos de Pago**: Aceptamos tarjetas de crédito/débito (Visa, Mastercard, AMEX), PayPal y transferencias SPEI. Los precios en Wacha el Tianguis se muestran tanto en USD como en MXN.";
      } else if (queryLower.includes('cumbia') || queryLower.includes('descarga') || queryLower.includes('social gate')) {
        botReply = `🎵 **Cumbia Decrépita & Descargas**: Contamos con ${releases.length} lanzamientos oficiales. Las descargas gratuitas se habilitan al suscribirte al canal de YouTube (https://www.youtube.com/@sonidodecrepito) o seguir SoundCloud. Las pistas con costo enlazan directamente al tianguis.`;
      } else if (queryLower.includes('hardware') || queryLower.includes('ropa') || queryLower.includes('tianguis') || queryLower.includes('playera') || queryLower.includes('hoodie')) {
        botReply = `🛍️ **Tianguis & Hardware**: Tenemos ${merch.length} productos oficiales activos (playeras heavyweight, hoodies y accesorios analógicos). Todos cuentan con garantía de calidad y existencias verificadas en tiempo real.`;
      } else if (queryLower.includes('blog') || queryLower.includes('aeo') || queryLower.includes('seo') || queryLower.includes('articulo')) {
        botReply = `📚 **Biblioteca AEO**: Nuestro blog cuenta con ${articles.length} artículos técnicos sobre ingeniería, AEO 2026, estrategias de retención y SEO conversacional. Puedes explorarlos en la sección Blog.`;
      }

      const newBotMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newBotMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 font-jetbrains">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-[#D4FF00] text-black hover:bg-black hover:text-[#D4FF00] border-2 border-black p-3.5 brutal-shadow-black transition-all duration-150 active:scale-95 flex items-center gap-2.5 cursor-pointer font-bold uppercase text-xs"
          title="Abrir Asistente de Soporte Wacha"
          aria-label="Soporte técnico y asistente virtual"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">¿DUDAS? CHAT DE SOPORTE</span>
        </button>
      ) : (
        <div className="bg-black text-white border-2 border-black dark:border-[#D4FF00] w-[90vw] sm:w-[380px] h-[480px] flex flex-col brutal-shadow-black overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Chat Header */}
          <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#D4FF00] text-black flex items-center justify-center border border-black font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-anton text-sm tracking-wider text-white">ASISTENTE WACHA // SOPORTE 24/7</h4>
                <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Conectado al CMS & Tianguis
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
              aria-label="Cerrar chat de soporte"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-zinc-950/70 font-space-grotesk text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-zinc-800 text-[#D4FF00] flex items-center justify-center shrink-0 border border-zinc-700 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 border ${
                    msg.sender === 'user'
                      ? 'bg-[#D4FF00] text-black border-black font-medium'
                      : 'bg-zinc-900 text-zinc-200 border-zinc-800'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <span className={`block text-[9px] mt-1 font-mono ${msg.sender === 'user' ? 'text-zinc-800 text-right' : 'text-zinc-500'}`}>
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-black text-[#D4FF00] flex items-center justify-center shrink-0 border border-zinc-700 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Chips */}
          <div className="px-3 py-2 bg-zinc-900 border-t border-zinc-800 flex gap-1.5 overflow-x-auto text-[10px] font-mono scrollbar-none">
            <button
              type="button"
              onClick={() => setInputMessage('¿Cuánto tardan los envíos?')}
              className="px-2 py-1 bg-black text-[#D4FF00] border border-zinc-700 whitespace-nowrap hover:bg-[#D4FF00] hover:text-black transition-colors cursor-pointer"
            >
              📦 ¿Envíos?
            </button>
            <button
              type="button"
              onClick={() => setInputMessage('¿Cómo descargo los EPs gratis?')}
              className="px-2 py-1 bg-black text-[#00E5FF] border border-zinc-700 whitespace-nowrap hover:bg-[#00E5FF] hover:text-black transition-colors cursor-pointer"
            >
              🎵 Descargas Cumbia
            </button>
            <button
              type="button"
              onClick={() => setInputMessage('¿Qué hardware y ropa hay disponible?')}
              className="px-2 py-1 bg-black text-[#FF4400] border border-zinc-700 whitespace-nowrap hover:bg-[#FF4400] hover:text-white transition-colors cursor-pointer"
            >
              🛍️ Tianguis & Ropa
            </button>
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-black border-t-2 border-zinc-800 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu consulta..."
              className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 text-white font-jetbrains text-xs focus:border-[#D4FF00] outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-[#D4FF00] text-black font-bold hover:bg-white border border-black transition-all cursor-pointer flex items-center justify-center"
              title="Enviar mensaje"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
