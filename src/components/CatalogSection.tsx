import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { CATEGORIES } from '../data/initialProducts';
import { generateWhatsAppUrl, formatCurrency } from '../utils/whatsapp';
import { Product } from '../types';
import {
  Search,
  SlidersHorizontal,
  CreditCard,
  Zap,
  ShieldCheck,
  Sparkles,
  Info,
  X,
  PackageX,
} from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const {
    products,
    tenantConfig,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    maxPriceFilter,
    setMaxPriceFilter,
    maxCatalogPrice,
    openProductModal,
  } = useCatalog();

  // Filtrado y búsqueda en tiempo real
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPriceFilter;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Ordenamiento
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    // 'featured'
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  const handleAction = (product: Product, intent: 'CREDIT' | 'CASH') => {
    const url = generateWhatsAppUrl({
      phone: tenantConfig.phoneWhatsApp,
      product,
      intent,
      currencySymbol: tenantConfig.currencySymbol,
    });
    window.open(url, '_blank');
  };

  return (
    <section id="catalogo" className="py-16 bg-slate-100/50 dark:bg-slate-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/80 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inventario Disponible de {tenantConfig.sellerName}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Catálogo de Electrodomésticos
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Todos los productos son nuevos, con garantía directa de fábrica y cotización por WhatsApp.
            </p>
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-400">
            Mostrando <span className="font-semibold text-cyan-600 dark:text-cyan-400">{sortedProducts.length}</span> de{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{products.length}</span> productos
          </div>
        </div>

        {/* Barra de Filtros, Búsqueda y Píldoras Sticky */}
        <div className="sticky top-20 z-30 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl mb-10 space-y-4 transition-colors duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Buscador en tiempo real */}
            <div className="md:col-span-7 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, SKU (ej. REF-INV), o características..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Ordenamiento */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="featured">Destacados primero</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Alfabético (A - Z)</option>
              </select>
            </div>

            {/* Filtro Rango de Precio */}
            <div className="md:col-span-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-medium text-slate-700 dark:text-slate-300">Hasta:</span>
              <span className="font-bold text-cyan-700 dark:text-cyan-300">
                {formatCurrency(maxPriceFilter, tenantConfig.currencySymbol)}
              </span>
            </div>
          </div>

          {/* Categorías en forma de "Píldoras" (Pills) Horizontales */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map(category => {
              const count =
                category === 'Todos'
                  ? products.length
                  : products.filter(p => p.category === category).length;

              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md shadow-cyan-500/25 border border-cyan-400/50'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Productos */}
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <PackageX className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No encontramos productos con estos filtros</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-md mx-auto">
              Prueba cambiando la palabra clave o restablece las categorías para ver todo el inventario de {tenantConfig.sellerName}.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
                setMaxPriceFilter(maxCatalogPrice);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => {
              // Cálculo de cuota mensual estimada para 12 meses
              const downPayment = Math.round(product.price * 0.15);
              const financed = product.price - downPayment;
              const monthlyQuota = Math.round(
                (financed * (1 + tenantConfig.monthlyInterestRate * 12)) / 12
              );

              return (
                <div
                  key={product.id}
                  className="rounded-2xl overflow-hidden flex flex-col group border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-950/70 hover:border-cyan-500/50 shadow-md dark:shadow-none hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-950/30 transition-all duration-300"
                >
                  {/* Imagen del Producto con Badges */}
                  <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-900">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Badge SKU */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-950/90 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-mono text-[10px] font-bold">
                        SKU: {product.sku}
                      </span>
                    </div>

                    {/* Badge Destacado o Garantía */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      {product.isFeatured && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px] shadow">
                          ★ Destacado
                        </span>
                      )}
                      {product.warrantyMonths && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px]">
                          {product.warrantyMonths}m Garantía
                        </span>
                      )}
                    </div>

                    {/* Categoría Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base sm:text-lg line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Specs pills (primeras 2 especificaciones) */}
                      {product.specs && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                            <span
                              key={key}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                            >
                              <strong className="text-slate-500 dark:text-slate-400">{key}:</strong> {val}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Precios */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                            Precio de Contado
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-extrabold text-cyan-700 dark:text-cyan-300 font-heading">
                              {formatCurrency(product.price, tenantConfig.currencySymbol)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                                {formatCurrency(product.originalPrice, tenantConfig.currencySymbol)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Cuota proyectada */}
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">
                            Crédito desde
                          </span>
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                            ~{formatCurrency(monthlyQuota, tenantConfig.currencySymbol)}/m
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Botones de Conversión hacia WhatsApp de Brandon */}
                    <div className="space-y-1.5 pt-1">
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => handleAction(product, 'CREDIT')}
                          className="py-2 px-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs flex items-center justify-center gap-1 transition-all shadow-sm hover:shadow-purple-900/40 active:scale-95"
                          title="Cotiza este crédito directamente con Brandon por WhatsApp"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Cotizar Crédito</span>
                        </button>

                        <button
                          onClick={() => handleAction(product, 'CASH')}
                          className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-1 transition-all shadow-sm hover:shadow-emerald-900/40 active:scale-95"
                          title="Compra de contado con Brandon por WhatsApp"
                        >
                          <Zap className="w-3.5 h-3.5 fill-white/20" />
                          <span>De Contado</span>
                        </button>
                      </div>

                      {/* Modal de simulación y ficha técnica */}
                      <button
                        onClick={() => openProductModal(product, 'CREDIT')}
                        className="w-full py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 text-[11px] font-medium flex items-center justify-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
                      >
                        <Info className="w-3 h-3" />
                        <span>Ficha técnica & simulador de cuotas</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
