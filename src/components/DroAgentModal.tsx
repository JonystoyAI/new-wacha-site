import React, { useState } from 'react';
import { X, Bot, Send, MessageSquare, CheckCircle2, ShieldAlert, PhoneCall } from 'lucide-react';

interface DroAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const DroAgentModal: React.FC<DroAgentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: '¡Hola! Soy el Asistente IA 24/7 de JF Construcciones (DRO Querétaro). Con 45 años de experiencia, te asesoro sobre permisos de construcción, firma de Director Responsable de Obra, dictámenes de seguridad estructural y trámites municipales en Querétaro. ¿En qué proyecto te puedo ayudar hoy?',
      time: '12:00 PM'
    }
  ]);

  const [input, setInput] = useState('');

  const quickQuestions = [
    '¿Qué trámites necesito para firma de DRO en Querétaro?',
    '¿Cómo solicito un dictamen de seguridad estructural?',
    '¿Cuál es el costo aproximado por m² de supervisión de obra?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Simulate Agentic AI Response
    setTimeout(() => {
      let botResponse = 'Entendido. Para ese tipo de proyecto en el Municipio de Querétaro, se requiere presentar los planos arquitectónicos firmados por DRO, memoria de cálculo estructural y copia del título de propiedad. Te puedo conectar inmediatamente con el Ing. Director Responsable de Obra por WhatsApp para revisar tu expediente.';

      if (query.toLowerCase().includes('costo') || query.toLowerCase().includes('precio')) {
        botResponse = 'El costo de supervisión y firma de DRO varía según el metraje y la tipología de la construcción (residencial, comercial o industrial). Para una estimación exacta y desglose de aranceles oficiales en Querétaro, coordinemos una llamada directa.';
      } else if (query.toLowerCase().includes('dictamen') || query.toLowerCase().includes('seguridad')) {
        botResponse = 'Los dictámenes de seguridad estructural incluyen inspección visual física, prueba de resistencia de materiales y memoria descriptiva normada por el Reglamento de Construcción de Querétaro. Contamos con vigencia y registro oficial ante la Secretaría de Desarrollo Urbano.';
      }

      const botMsg: ChatMessage = {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121411] border-4 border-black w-full max-w-2xl p-6 brutal-shadow-lime text-white space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 font-jetbrains">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#D4FF00] text-black font-bold flex items-center justify-center border border-black">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-anton text-2xl text-white tracking-wide">
                JF CONSTRUCCIONES // ASISTENTE IA DRO 24/7
              </h3>
              <p className="text-[10px] text-zinc-400">
                SISTEMA AUTOMATIZADO DE CONVERSIÓN DE LEADS // QUERÉTARO 45 AÑOS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700"
            aria-label="Cerrar modal de chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="space-y-1.5 font-jetbrains text-xs">
          <span className="text-zinc-400 text-[10px]">PREGUNTAS FRECUENTES DEMO:</span>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="bg-zinc-900 hover:bg-[#D4FF00] hover:text-black text-zinc-300 px-2.5 py-1 border border-zinc-700 text-[11px] transition-all text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Container */}
        <div className="bg-black border-2 border-zinc-800 p-4 h-72 overflow-y-auto space-y-3 font-jetbrains text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 border ${
                  msg.sender === 'user'
                    ? 'bg-[#D4FF00] text-black border-black font-bold'
                    : 'bg-zinc-900 text-zinc-200 border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-1 border-b border-black/10 pb-0.5">
                  <span>{msg.sender === 'user' ? 'TÚ (CLIENTE)' : 'BOT DRO 24/7'}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input & Direct WhatsApp Transfer */}
        <div className="space-y-3 font-jetbrains text-xs">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Escribe tu consulta sobre DRO o permisos..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black text-white p-3 border-2 border-zinc-700 focus:border-[#D4FF00] outline-none"
            />
            <button
              type="submit"
              className="bg-[#D4FF00] text-black font-bold px-4 border-2 border-black hover:bg-[#FF4400] hover:text-white transition-all flex items-center gap-1"
            >
              <Send className="w-4 h-4" />
              <span>ENVIAR</span>
            </button>
          </form>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
            <a
              href="https://wa.me/524424655478?text=Hola%20JF%20Construcciones,%20vengo%20del%20bot%20IA%20y%20quiero%20consultar%20un%20proyecto%20de%20DRO"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#FF4400] text-white font-bold px-4 py-2 border border-black hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CONECTAR DIRECTO CON INGENIERO DRO POR WHATSAPP</span>
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto bg-zinc-900 text-zinc-400 hover:text-white px-4 py-2 border border-zinc-700"
            >
              CERRAR SIMULADOR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
