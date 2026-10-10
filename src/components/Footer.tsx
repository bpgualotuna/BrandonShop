import React from 'react';
import { BrandLogo } from './BrandLogo';
import { useCatalog } from '../context/CatalogContext';
import { MessageSquare, ShieldCheck, Code, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { tenantConfig, setShowArchitectureModal, setShowAdminModal, isAdminLoggedIn } = useCatalog();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectWhatsApp = () => {
    const cleanPhone = tenantConfig.phoneWhatsApp.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hola Brandon, vi tu catálogo web y tengo una consulta sobre los electrodomésticos.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 overflow-hidden text-slate-600 dark:text-slate-400 text-xs transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo y Descripción */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo name={tenantConfig.sellerName} tagline="ELECTRODOMÉSTICOS" size="md" />
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Catálogo digital interactivo de electrodomésticos de <strong className="text-slate-900 dark:text-white">Brandon</strong>. Línea blanca, climatización y audio de última generación con cotización directa de crédito y precios de contado vía WhatsApp.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía Oficial de Fábrica en todos los equipos</span>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-xs block">
              Navegación
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#catalogo" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
                  Catálogo de Productos
                </a>
              </li>
              <li>
                <a href="#ventajas" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition">
                  Garantías & Beneficios
                </a>
              </li>
              <li>
                <button
                  onClick={() => setShowArchitectureModal(true)}
                  className="hover:text-indigo-600 dark:hover:text-indigo-300 text-indigo-700 dark:text-indigo-400 transition flex items-center gap-1 text-left font-medium"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Justificación del Stack & SaaS</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Vendedor y Contacto */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-xs block">
              Atención Directa
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">Vendedor Oficial:</span>
                <span className="text-slate-900 dark:text-white font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 text-[11px]">
                  {tenantConfig.sellerName}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Horario de atención: Lunes a Sábado de 8:00 AM a 8:00 PM. Respuesta promedio menor a 15 minutos.
              </p>
              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contactar a Brandon por WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Separador y Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Catálogo Digital de {tenantConfig.sellerName}. Todos los derechos reservados. Arquitectura Multi-Tenant SaaS & Fase 2 IA.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAdminModal(true)}
              className="hover:text-slate-700 dark:hover:text-slate-300 transition"
            >
              {isAdminLoggedIn ? 'Panel de Brandon (Activo)' : 'Acceso Vendedor'}
            </button>
            <span>•</span>
            <button
              onClick={handleScrollTop}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition flex items-center gap-1 text-slate-500 dark:text-slate-400"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Botón Flotante Permanente de WhatsApp */}
      <button
        onClick={handleDirectWhatsApp}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-2xl shadow-emerald-950/40 border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 group"
        title="Escríbele directamente a Brandon por WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-white/20" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
        </div>
        <span className="hidden sm:inline-block font-semibold text-xs pr-1">
          Chat con Brandon
        </span>
      </button>
    </footer>
  );
};
