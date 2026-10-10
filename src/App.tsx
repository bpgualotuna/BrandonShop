/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CatalogProvider } from './context/CatalogContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TickerMarquee } from './components/TickerMarquee';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminPanel } from './components/AdminPanel';
import { StackArchitectureModal } from './components/StackArchitectureModal';

export default function App() {
  return (
    <CatalogProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200">
        {/* Barra de Navegación Superior con Selector de Tema (Dark / Light) */}
        <Navbar />

        {/* Contenido Principal SPA Directo al Grano */}
        <main className="flex-1 flex flex-col">
          {/* 1. Hero Section con Carrusel Animado de Productos Destacados */}
          <HeroSection />

          {/* 2. Marquesina Continua (Ticker) de Beneficios y Garantías */}
          <TickerMarquee />

          {/* 3. Catálogo de Electrodomésticos Inmediato con Píldoras Sticky y WhatsApp */}
          <CatalogSection />
        </main>

        {/* Footer Tecnológico */}
        <Footer />

        {/* Modales Interactivos */}
        <ProductDetailModal />
        <AdminPanel />
        <StackArchitectureModal />
      </div>
    </CatalogProvider>
  );
}
