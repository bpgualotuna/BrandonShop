import React from 'react';
import {
  Zap,
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

export const TickerMarquee: React.FC = () => {
  const tickerItems = [
    {
      icon: <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />,
      text: 'Respuesta en menos de 15 min',
      highlight: 'Atención Ágil',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      text: 'Garantía Directa de Fábrica',
      highlight: '100% Respaldado',
    },
    {
      icon: <CreditCard className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />,
      text: 'Cotización de Crédito Inmediata',
      highlight: 'Sin Bancos',
    },
    {
      icon: <Truck className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />,
      text: 'Envíos Seguros y Coordinados',
      highlight: 'Hasta tu Puerta',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />,
      text: 'Productos Nuevos en Caja Sellada',
      highlight: 'Calidad Premium',
    },
    {
      icon: <MessageCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />,
      text: 'Trato Directo y Personal con Brandon',
      highlight: 'Sin Intermediarios',
    },
    {
      icon: <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />,
      text: 'Descuento Especial en Pago de Contado',
      highlight: 'Ahorro Real',
    },
  ];

  return (
    <div id="ventajas" className="w-full bg-slate-100/95 dark:bg-slate-900/90 border-y border-slate-200 dark:border-slate-800/80 backdrop-blur-md overflow-hidden py-3 select-none transition-colors duration-300">
      <div className="relative w-full flex items-center">
        {/* Gradients de desvanecimiento en los bordes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-100 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-100 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee Wrapper duplicado para loop infinito */}
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
          {tickerItems.map((item, index) => (
            <div
              key={`ticker-1-${index}`}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:border-cyan-500/40 transition shrink-0"
            >
              {item.icon}
              <span className="text-slate-900 dark:text-white font-semibold">{item.highlight}:</span>
              <span className="text-slate-600 dark:text-slate-300">{item.text}</span>
              <span className="text-slate-300 dark:text-slate-600 ml-2">•</span>
            </div>
          ))}
          {/* Segunda copia para continuidad fluida */}
          {tickerItems.map((item, index) => (
            <div
              key={`ticker-2-${index}`}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:border-cyan-500/40 transition shrink-0"
            >
              {item.icon}
              <span className="text-slate-900 dark:text-white font-semibold">{item.highlight}:</span>
              <span className="text-slate-600 dark:text-slate-300">{item.text}</span>
              <span className="text-slate-300 dark:text-slate-600 ml-2">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
