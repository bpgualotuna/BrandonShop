import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { Product } from '../types';
import { CATEGORIES } from '../data/initialProducts';
import { formatCurrency, evaluateCreditRulesPhase2, buildPhase2WebhookPayload } from '../utils/whatsapp';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Package,
  DollarSign,
  Layers,
  Phone,
  ShieldCheck,
  Bot,
  Settings,
  Check,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Eye,
  LogOut,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    showAdminModal,
    setShowAdminModal,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDefaultProducts,
    tenantConfig,
    updateTenantConfig,
  } = useCatalog();

  // Tabs de navegación interna del panel
  const [activeTab, setActiveTab] = useState<'products' | 'tenant' | 'phase2'>('products');

  // Estado de Login
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Estado de edición / creación de producto
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    sku: '',
    name: '',
    price: 0,
    category: CATEGORIES[1] || 'Refrigeración',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=80',
    isFeatured: false,
    inStock: true,
    warrantyMonths: 12,
    specs: {
      'Garantía': 'Directa de Fábrica',
      'Estado': 'Nuevo en Caja Sellada',
    },
  });

  // Estado de prueba simulador Fase 2 (Bot de IA)
  const [phase2Customer, setPhase2Customer] = useState({
    name: 'Carlos Ruiz',
    age: 28,
    email: 'carlos.ruiz@ejemplo.com',
  });
  const [phase2Result, setPhase2Result] = useState<{ approved: boolean; reason: string } | null>(null);

  if (!showAdminModal) return null;

  // Manejo del Login de Brandon
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPasswordInput('');
    }
  };

  // Guardar formulario de producto (Crear o Editar)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.sku || !productForm.name || !productForm.price || !productForm.imageUrl) {
      alert('Por favor completa todos los campos requeridos (SKU, Nombre, Precio, URL de Imagen).');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
      setEditingProduct(null);
    } else if (isCreatingNew) {
      addProduct(productForm);
      setIsCreatingNew(false);
    }

    // Reset form
    setProductForm({
      sku: '',
      name: '',
      price: 0,
      category: 'Refrigeración',
      description: '',
      imageUrl: '',
      isFeatured: false,
      inStock: true,
      warrantyMonths: 12,
      specs: {},
    });
  };

  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreatingNew(false);
    setProductForm({
      sku: prod.sku,
      name: prod.name,
      price: prod.price,
      originalPrice: prod.originalPrice,
      category: prod.category,
      description: prod.description,
      imageUrl: prod.imageUrl,
      isFeatured: !!prod.isFeatured,
      inStock: prod.inStock,
      warrantyMonths: prod.warrantyMonths || 12,
      specs: prod.specs || {},
    });
  };

  const startCreateProduct = () => {
    setIsCreatingNew(true);
    setEditingProduct(null);
    setProductForm({
      sku: `PROD-${Date.now().toString().slice(-4)}`,
      name: '',
      price: 499,
      category: CATEGORIES[1] || 'Refrigeración',
      description: 'Electrodoméstico de última tecnología con garantía directa y entrega inmediata.',
      imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=900&q=80',
      isFeatured: false,
      inStock: true,
      warrantyMonths: 12,
      specs: {
        'Tecnología': 'Inverter Smart',
        'Garantía': '12 Meses',
      },
    });
  };

  // Evaluación interactiva de la Fase 2
  const runPhase2Simulation = () => {
    const res = evaluateCreditRulesPhase2(phase2Customer);
    setPhase2Result(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-200">
        
        {/* Header del Panel */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                  Panel de Administración • Vendedor: {tenantConfig.sellerName}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 font-mono">
                  SaaS Ready
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Gestión de inventario de electrodomésticos, parámetros comerciales y Fase 2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700 transition flex items-center gap-1"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Salir</span>
              </button>
            )}
            <button
              onClick={() => setShowAdminModal(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PANTALLA 1: LOGIN (Si no ha iniciado sesión) */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/50">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white font-heading">
                Acceso Exclusivo para {tenantConfig.sellerName}
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                Ingresa tus credenciales maestras para gestionar el catálogo y las cotizaciones de WhatsApp.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Contraseña de Brandon..."
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-center tracking-wider"
                  autoFocus
                />
                {loginError && (
                  <p className="text-rose-400 text-xs mt-2">
                    Contraseña incorrecta. Utiliza la clave de demostración: <strong className="text-white">brandon2026</strong> o <strong className="text-white">admin</strong>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition active:scale-98"
              >
                Ingresar al Panel
              </button>
            </form>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 max-w-xs">
              <span className="text-cyan-400 font-semibold">Clave de acceso rápido:</span> <code className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">brandon2026</code>
            </div>
          </div>
        ) : (
          /* PANTALLA 2: PANEL DE ADMINISTRACIÓN COMPLETO */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Barra de Tabs y Métricas Rápidas */}
            <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => {
                    setActiveTab('products');
                    setIsCreatingNew(false);
                    setEditingProduct(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    activeTab === 'products'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Productos ({products.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('tenant')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    activeTab === 'tenant'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configuración Vendedor (Brandon)</span>
                </button>

                <button
                  onClick={() => setActiveTab('phase2')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    activeTab === 'phase2'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Fase 2: Arquitectura Bot IA</span>
                </button>
              </div>

              {/* Botón rápido Crear Producto */}
              {activeTab === 'products' && !isCreatingNew && !editingProduct && (
                <button
                  onClick={startCreateProduct}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Electrodoméstico</span>
                </button>
              )}
            </div>

            {/* Contenido según pestaña */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: GESTIÓN DE PRODUCTOS (CRUD) */}
              {activeTab === 'products' && (
                <>
                  {/* FORMULARIO DE AGREGAR / EDITAR */}
                  {(isCreatingNew || editingProduct) ? (
                    <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/30 p-6 space-y-5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                          <h4 className="font-heading font-bold text-white text-base">
                            {editingProduct ? `Editar Producto: ${editingProduct.name}` : 'Agregar Nuevo Electrodoméstico'}
                          </h4>
                        </div>
                        <button
                          onClick={() => {
                            setIsCreatingNew(false);
                            setEditingProduct(null);
                          }}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Cancelar
                        </button>
                      </div>

                      <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        {/* SKU */}
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-xs font-semibold text-slate-300">SKU (Obligatorio)*</label>
                          <input
                            type="text"
                            required
                            placeholder="ej. REF-INV-540L"
                            value={productForm.sku}
                            onChange={e => setProductForm({ ...productForm, sku: e.target.value.toUpperCase() })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400"
                          />
                        </div>

                        {/* Nombre */}
                        <div className="sm:col-span-8 space-y-1">
                          <label className="text-xs font-semibold text-slate-300">Nombre del Producto (Obligatorio)*</label>
                          <input
                            type="text"
                            required
                            placeholder="ej. Nevera No Frost Inverter 540L"
                            value={productForm.name}
                            onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400"
                          />
                        </div>

                        {/* Precio */}
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-xs font-semibold text-slate-300">Precio (${tenantConfig.currency})*</label>
                          <input
                            type="number"
                            required
                            min={1}
                            value={productForm.price || ''}
                            onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400"
                          />
                        </div>

                        {/* Categoría */}
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-xs font-semibold text-slate-300">Categoría (Obligatorio)*</label>
                          <select
                            value={productForm.category}
                            onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400"
                          >
                            {CATEGORIES.filter(c => c !== 'Todos').map(cat => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Meses de Garantía */}
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-xs font-semibold text-slate-300">Meses de Garantía</label>
                          <input
                            type="number"
                            min={0}
                            value={productForm.warrantyMonths || 12}
                            onChange={e => setProductForm({ ...productForm, warrantyMonths: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400"
                          />
                        </div>

                        {/* URL de Imagen */}
                        <div className="sm:col-span-12 space-y-1">
                          <label className="text-xs font-semibold text-slate-300">URL de Imagen (Obligatorio)*</label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              required
                              placeholder="https://images.unsplash.com/..."
                              value={productForm.imageUrl}
                              onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400"
                            />
                            {productForm.imageUrl && (
                              <img
                                src={productForm.imageUrl}
                                alt="preview"
                                className="w-9 h-9 rounded-lg object-cover border border-slate-700"
                              />
                            )}
                          </div>
                        </div>

                        {/* Descripción */}
                        <div className="sm:col-span-12 space-y-1">
                          <label className="text-xs font-semibold text-slate-300">Descripción Detallada (Obligatorio)*</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Características principales, eficiencia energética y beneficios..."
                            value={productForm.description}
                            onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400"
                          />
                        </div>

                        {/* Checkboxes de estado */}
                        <div className="sm:col-span-12 flex items-center gap-6 pt-2">
                          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={productForm.isFeatured}
                              onChange={e => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                              className="rounded accent-cyan-400 w-4 h-4"
                            />
                            <span>Destacar en Carrusel Hero</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={productForm.inStock}
                              onChange={e => setProductForm({ ...productForm, inStock: e.target.checked })}
                              className="rounded accent-cyan-400 w-4 h-4"
                            />
                            <span>En Stock / Entrega Inmediata</span>
                          </label>
                        </div>

                        {/* Botones de acción */}
                        <div className="sm:col-span-12 flex justify-end gap-3 pt-3 border-t border-slate-800">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingNew(false);
                              setEditingProduct(null);
                            }}
                            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/30"
                          >
                            {editingProduct ? 'Guardar Cambios' : 'Publicar Electrodoméstico'}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : null}

                  {/* TABLA LISTADO DE PRODUCTOS */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Inventario Activo ({products.length} productos)
                      </span>

                      <button
                        onClick={() => {
                          if (confirm('¿Restablecer el catálogo al inventario de muestra original de Brandon?')) {
                            resetDefaultProducts();
                          }
                        }}
                        className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restablecer valores de muestra</span>
                      </button>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 overflow-hidden divide-y divide-slate-800/80">
                      {products.map(prod => (
                        <div
                          key={prod.id}
                          className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                                  {prod.sku}
                                </span>
                                <span className="font-heading font-bold text-white text-sm">
                                  {prod.name}
                                </span>
                                {prod.isFeatured && (
                                  <span className="text-[10px] text-amber-400 bg-amber-950/50 px-1.5 py-0.2 rounded font-semibold border border-amber-500/30">
                                    ★ Hero
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                <span>{prod.category}</span>
                                <span>•</span>
                                <span className="font-bold text-cyan-300">
                                  {formatCurrency(prod.price, tenantConfig.currencySymbol)}
                                </span>
                                <span>•</span>
                                <span className="text-emerald-400">{prod.warrantyMonths || 12}m Garantía</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => startEditProduct(prod)}
                              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                              title="Editar"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`¿Eliminar "${prod.name}" del catálogo de Brandon?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: CONFIGURACIÓN MULTI-TENANT / BRANDON */}
              {activeTab === 'tenant' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 space-y-1">
                      <span className="font-bold text-cyan-300 block">
                        Regla de Oro Enforzada en Arquitectura:
                      </span>
                      <p>
                        El nombre del vendedor se mantiene estrictamente como <strong className="text-white">Brandon</strong>. En futuras versiones SaaS, nuevos vendedores recibirán su propio `tenantId` independiente.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-4">
                    <h4 className="font-heading font-bold text-white text-sm">
                      Parámetros Comerciales de Brandon
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">
                          Vendedor Asignado (Regla Estricta)
                        </label>
                        <input
                          type="text"
                          disabled
                          value="Brandon"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 cursor-not-allowed font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">
                          Teléfono de WhatsApp (donde llegan las compras)
                        </label>
                        <input
                          type="text"
                          value={tenantConfig.phoneWhatsApp}
                          onChange={e => updateTenantConfig({ phoneWhatsApp: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:border-cyan-400"
                        />
                        <span className="text-[10px] text-slate-500">
                          Código de país sin signos + ni espacios (ej. 573124567890)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Símbolo de Moneda</label>
                          <input
                            type="text"
                            value={tenantConfig.currencySymbol}
                            onChange={e => updateTenantConfig({ currencySymbol: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-slate-300 font-semibold block mb-1">Moneda (Código ISO)</label>
                          <input
                            type="text"
                            value={tenantConfig.currency}
                            onChange={e => updateTenantConfig({ currency: e.target.value.toUpperCase() })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">
                          Tasa de Interés Mensual para Simulación ({(tenantConfig.monthlyInterestRate * 100).toFixed(1)}%)
                        </label>
                        <input
                          type="number"
                          step="0.001"
                          min="0"
                          max="0.1"
                          value={tenantConfig.monthlyInterestRate}
                          onChange={e => updateTenantConfig({ monthlyInterestRate: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FASE 2: CHATBOT DE IA & WEBHOOK READY */}
              {activeTab === 'phase2' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                      <Bot className="w-5 h-5 text-cyan-400" />
                      <span>Fase 2: Arquitectura del Chatbot de IA para Brandon</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      En la Fase 2, el mensaje generado por este catálogo web será recibido por un Webhook de WhatsApp Business API. Un motor de IA (Gemini / n8n / Meta Cloud API) continuará la conversación de forma autónoma pidiendo los 3 datos clave de crédito: <strong className="text-white">Nombre, Edad y Correo</strong>.
                    </p>
                  </div>

                  {/* Simulador Interactivo de la Regla de Negocio */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-6 rounded-2xl bg-slate-950/80 border border-slate-800 p-5 space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                        1. Simulador de Validación de Crédito
                      </h5>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-slate-300 block mb-1">Nombre Completo del Cliente:</label>
                          <input
                            type="text"
                            value={phase2Customer.name}
                            onChange={e => setPhase2Customer({ ...phase2Customer, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-slate-300 block mb-1">Edad (Regla: debe ser ≥ 18 años):</label>
                          <input
                            type="number"
                            value={phase2Customer.age}
                            onChange={e => setPhase2Customer({ ...phase2Customer, age: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-slate-300 block mb-1">Correo Electrónico:</label>
                          <input
                            type="email"
                            value={phase2Customer.email}
                            onChange={e => setPhase2Customer({ ...phase2Customer, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <button
                          onClick={runPhase2Simulation}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md"
                        >
                          Ejecutar Regla de Crédito del Bot
                        </button>

                        {phase2Result && (
                          <div
                            className={`p-3 rounded-xl border text-xs space-y-1 ${
                              phase2Result.approved
                                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                                : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                            }`}
                          >
                            <span className="font-bold block">
                              {phase2Result.approved ? '✅ CRÉDITO PRE-APROBADO' : '❌ CRÉDITO RECHAZADO'}
                            </span>
                            <p>{phase2Result.reason}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Esquema JSON del Webhook */}
                    <div className="md:col-span-6 rounded-2xl bg-slate-950/90 border border-slate-800 p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                          2. Payload JSON del Webhook
                        </span>
                        <span className="text-[10px] text-slate-500">Contrato de Datos</span>
                      </div>
                      <pre className="p-3 rounded-xl bg-slate-900 text-[10px] text-cyan-300 font-mono overflow-x-auto max-h-64 border border-slate-800">
                        {JSON.stringify(
                          buildPhase2WebhookPayload(
                            products[0],
                            'CREDIT',
                            tenantConfig.tenantId,
                            phase2Customer
                          ),
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
