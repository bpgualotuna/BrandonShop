import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useCatalog } from '../context/CatalogContext';
import {
  MessageSquare,
  ShieldCheck,
  Code,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    tenantConfig,
    isAdminLoggedIn,
    setShowAdminModal,
    setShowArchitectureModal,
    isDarkMode,
    toggleDarkMode,
  } = useCatalog();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppDirect = () => {
    const cleanPhone = tenantConfig.phoneWhatsApp.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hola Brandon, estuve revisando tu catálogo de electrodomésticos y me gustaría hacerte una consulta general.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo name={tenantConfig.sellerName} tagline={tenantConfig.slogan ? 'ELECTRO' : undefined} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#catalogo"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            Catálogo
          </a>
          <a
            href="#ventajas"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            Garantías & Ventajas
          </a>
          <button
            onClick={() => setShowArchitectureModal(true)}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 font-medium"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Arquitectura & Stack</span>
          </button>
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          {/* BOTÓN TOGGLE: DARK / LIGHT MODE */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all shadow-sm duration-200 flex items-center justify-center group"
            title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            aria-label="Alternar tema"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Admin Login Button */}
          <button
            onClick={() => setShowAdminModal(true)}
            className={`text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 border ${
              isAdminLoggedIn
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500'
            }`}
            title="Panel de administración exclusivo de Brandon"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{isAdminLoggedIn ? 'Panel Brandon' : 'Acceso Vendedor'}</span>
          </button>

          {/* Direct WhatsApp Callout */}
          <button
            onClick={handleWhatsAppDirect}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-xl overflow-hidden shadow-lg shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-white/20" />
            <span>WhatsApp Brandon</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
            </span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-700 dark:text-slate-200 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle tema"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
          
          <button
            onClick={() => setShowAdminModal(true)}
            className="p-2 text-slate-700 dark:text-slate-300 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            aria-label="Admin"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 space-y-3">
          <a
            href="#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-medium"
          >
            Catálogo de Electrodomésticos
          </a>
          <a
            href="#ventajas"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-medium"
          >
            Garantías & Beneficios
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setShowArchitectureModal(true);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-sm font-medium flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Justificación del Stack & Fase 2
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleWhatsAppDirect();
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-sm shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            Hablar con Brandon por WhatsApp
          </button>
        </div>
      )}
    </header>
  );
};
