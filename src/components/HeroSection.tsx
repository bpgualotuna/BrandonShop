import React, { useState, useEffect, useRef } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { generateWhatsAppUrl, formatCurrency } from '../utils/whatsapp';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Pause,
  Play,
  Flame,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { products, tenantConfig, openProductModal } = useCatalog();

  // Filtramos los productos destacados (o los primeros 4)
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const carouselItems = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play con pausa en hover
  useEffect(() => {
    if (isPlaying && carouselItems.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % carouselItems.length);
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, carouselItems.length]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const activeProduct = carouselItems[currentIndex];

  const handleWhatsAppAction = (product: typeof activeProduct, intent: 'CREDIT' | 'CASH') => {
    if (!product) return;
    const url = generateWhatsAppUrl({
      phone: tenantConfig.phoneWhatsApp,
      product,
      intent,
      currencySymbol: tenantConfig.currencySymbol,
    });
    window.open(url, '_blank');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-200/80 dark:border-slate-800/60 bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 transition-colors duration-300">
      {/* Luces y resplandores de fondo (Atmósfera tecnológica) */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[450px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LADO IZQUIERDO: Copy persuasivo y propuesta de valor */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Badge de confianza */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-semibold tracking-wide shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Catálogo Oficial de {tenantConfig.sellerName}</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-slate-600 dark:text-slate-300">Respuesta Inmediata</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading leading-[1.1]">
              Equipa tu hogar con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-sky-300 dark:to-purple-400">
                tecnología de alta gama
              </span>{' '}
              y crédito directo.
            </h1>

            {/* Subtítulo persuasivo */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Descubre los mejores electrodomésticos en el catálogo digital de{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Brandon</strong>. Compra al contado con precio especial o cotiza tu crédito con aprobación ágil sin papeleos bancarios.
            </p>

            {/* Micro-atributos de confianza */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Garantía de Fábrica</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Atención con Brandon</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Entregas Rápidas</span>
              </div>
            </div>

            {/* Acciones principales */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#catalogo"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Explorar Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#ventajas"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
              >
                <span>Ver Garantías & Ventajas</span>
              </a>
            </div>

            {/* Nota de asesoría humana directa */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Trato directo con el vendedor oficial (Brandon) vía WhatsApp</span>
            </div>
          </div>

          {/* LADO DERECHO: Carrusel de Productos Destacados (Animado, Auto-play) */}
          <div className="lg:col-span-6 relative">
            <div
              className="relative mx-auto max-w-lg lg:max-w-none"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {/* Marco Glassmorphic y Glow */}
              <div className="relative rounded-3xl overflow-hidden bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/60 backdrop-blur-xl shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-indigo-950/40 p-4 sm:p-6 group transition-all duration-300">
                
                {/* Header del Carrusel */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 text-xs font-semibold">
                      <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 fill-amber-400" />
                      Destacado de la Semana
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({currentIndex + 1}/{carouselItems.length})
                    </span>
                  </div>

                  {/* Controles de reproducción */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title={isPlaying ? 'Pausar auto-play' : 'Reanudar auto-play'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contenido del Producto Activo */}
                {activeProduct && (
                  <div className="mt-4 space-y-4">
                    {/* Imagen y SKU */}
                    <div className="relative aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center group/img">
                      <img
                        key={activeProduct.id}
                        src={activeProduct.imageUrl}
                        alt={activeProduct.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                      {/* Badges sobre la imagen */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-mono text-[11px] font-bold tracking-wider">
                          SKU: {activeProduct.sku}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-purple-950/90 backdrop-blur-md text-purple-200 border border-purple-500/30 text-[11px] font-medium">
                          {activeProduct.category}
                        </span>
                      </div>

                      {/* Garantía badge */}
                      {activeProduct.warrantyMonths && (
                        <div className="absolute bottom-3 left-3 text-xs text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Garantía {activeProduct.warrantyMonths} meses</span>
                        </div>
                      )}
                    </div>

                    {/* Información técnica y precios */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white line-clamp-1 font-heading">
                        {activeProduct.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {activeProduct.description}
                      </p>
                    </div>

                    {/* Precios y Cuota estimada */}
                    <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                          Precio de Contado
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-cyan-700 dark:text-cyan-300">
                            {formatCurrency(activeProduct.price, tenantConfig.currencySymbol)}
                          </span>
                          {activeProduct.originalPrice && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                              {formatCurrency(activeProduct.originalPrice, tenantConfig.currencySymbol)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right pl-3 border-l border-slate-200 dark:border-slate-800">
                        <span className="block text-[11px] uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1 justify-end">
                          <Sparkles className="w-3 h-3" />
                          A Crédito desde
                        </span>
                        <span className="text-lg font-bold text-purple-700 dark:text-purple-300">
                          {formatCurrency(
                            Math.round(
                              (activeProduct.price * 0.85 * (1 + tenantConfig.monthlyInterestRate * 12)) / 12
                            ),
                            tenantConfig.currencySymbol
                          )}
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/mes</span>
                        </span>
                      </div>
                    </div>

                    {/* Botones de Conversión hacia WhatsApp de Brandon */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        onClick={() => handleWhatsAppAction(activeProduct, 'CREDIT')}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-purple-900/30 flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Cotizar Crédito</span>
                      </button>

                      <button
                        onClick={() => handleWhatsAppAction(activeProduct, 'CASH')}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-900/30 flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <Zap className="w-4 h-4 fill-white/20" />
                        <span>Comprar de Contado</span>
                      </button>
                    </div>

                    {/* Botón Ver Ficha Completa */}
                    <button
                      onClick={() => openProductModal(activeProduct, 'CREDIT')}
                      className="w-full text-center text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition py-1"
                    >
                      Calcular cuotas en simulador & ficha técnica →
                    </button>
                  </div>
                )}

                {/* Indicadores de diapositiva (Dots) */}
                <div className="flex items-center justify-center gap-1.5 pt-4">
                  {carouselItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? 'w-7 bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                          : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                      }`}
                      aria-label={`Ir al producto ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
