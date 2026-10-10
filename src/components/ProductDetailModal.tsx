import React, { useState, useEffect } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { generateWhatsAppUrl, formatCurrency } from '../utils/whatsapp';
import {
  X,
  CreditCard,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    modalProduct,
    closeProductModal,
    modalIntent,
    setModalIntent,
    tenantConfig,
  } = useCatalog();

  const [months, setMonths] = useState<number>(12);
  const [downPercent, setDownPercent] = useState<number>(15);

  useEffect(() => {
    if (modalProduct) {
      setMonths(12);
      setDownPercent(tenantConfig.downPaymentMinPercent || 15);
    }
  }, [modalProduct, tenantConfig]);

  if (!modalProduct) return null;

  // Cálculos financieros
  const price = modalProduct.price;
  const downPayment = Math.round(price * (downPercent / 100));
  const financedAmount = Math.max(0, price - downPayment);
  // Interés simple estimado mensual
  const totalInterest = financedAmount * (tenantConfig.monthlyInterestRate * months);
  const totalCreditPay = financedAmount + totalInterest;
  const monthlyPayment = Math.round(totalCreditPay / months);

  const handleSendToWhatsApp = (intent: 'CREDIT' | 'CASH') => {
    const url = generateWhatsAppUrl({
      phone: tenantConfig.phoneWhatsApp,
      product: modalProduct,
      intent,
      currencySymbol: tenantConfig.currencySymbol,
      creditDetails:
        intent === 'CREDIT'
          ? {
              months,
              downPayment,
              monthlyPayment,
            }
          : undefined,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200">
        
        {/* Header con botón cerrar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold">
              SKU: {modalProduct.sku}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {modalProduct.category}
            </span>
          </div>
          <button
            onClick={closeProductModal}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido en Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Imagen y Garantía */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800">
                <img
                  src={modalProduct.imageUrl}
                  alt={modalProduct.name}
                  className="w-full h-full object-cover"
                />
                {modalProduct.isFeatured && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold shadow">
                    ★ Destacado
                  </span>
                )}
              </div>

              {/* Atributos de confianza */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">
                    Garantía Oficial: {modalProduct.warrantyMonths || 12} Meses
                  </span>
                </div>
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Atención directa por WhatsApp con Brandon</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Equipo nuevo en caja original sellada</span>
                </div>
              </div>
            </div>

            {/* Ficha y Simulador */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                  {modalProduct.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                  {modalProduct.description}
                </p>
              </div>

              {/* Selector de Modalidad */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 gap-1">
                <button
                  onClick={() => setModalIntent('CREDIT')}
                  className={`flex-1 py-2 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                    modalIntent === 'CREDIT'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Simular y Cotizar Crédito</span>
                </button>
                <button
                  onClick={() => setModalIntent('CASH')}
                  className={`flex-1 py-2 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                    modalIntent === 'CASH'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-white/20" />
                  <span>Precio de Contado</span>
                </button>
              </div>

              {/* MODO CRÉDITO: Simulador Interactivo */}
              {modalIntent === 'CREDIT' ? (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-purple-200 dark:border-purple-500/30 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      Calculadora de Cuotas
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Tasa estimada: {(tenantConfig.monthlyInterestRate * 100).toFixed(1)}% mes
                    </span>
                  </div>

                  {/* Cuota Inicial Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 dark:text-slate-300">Cuota Inicial ({downPercent}%):</span>
                      <span className="font-bold text-cyan-700 dark:text-cyan-300 font-mono">
                        {formatCurrency(downPayment, tenantConfig.currencySymbol)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={downPercent}
                      onChange={e => setDownPercent(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                    />
                  </div>

                  {/* Plazo en Meses */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-700 dark:text-slate-300 block">Plazo en cuotas:</span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[3, 6, 12, 18, 24].map(m => (
                        <button
                          key={m}
                          onClick={() => setMonths(m)}
                          className={`py-2 rounded-xl text-xs font-bold transition border ${
                            months === m
                              ? 'bg-purple-600 border-purple-400 text-white shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {m}m
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Resultado de la Simulación */}
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-purple-700 dark:text-purple-300 font-semibold block">
                        Cuota Mensual Estimada
                      </span>
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                        {formatCurrency(monthlyPayment, tenantConfig.currencySymbol)}
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal"> / mes</span>
                      </span>
                    </div>
                    <div className="text-right text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                      <div>Financiado: {formatCurrency(financedAmount, tenantConfig.currencySymbol)}</div>
                      <div>Total aprox: {formatCurrency(totalCreditPay + downPayment, tenantConfig.currencySymbol)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSendToWhatsApp('CREDIT')}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 active:scale-98 transition"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Enviar esta Cotización al WhatsApp de Brandon</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* MODO CONTADO */
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-emerald-200 dark:border-emerald-500/30 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Pago Único de Contado
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      Entrega Inmediata
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Total a Pagar</span>
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                        {formatCurrency(price, tenantConfig.currencySymbol)}
                      </span>
                    </div>
                    {modalProduct.originalPrice && (
                      <div className="text-right">
                        <span className="text-xs text-slate-400 dark:text-slate-500 line-through block">
                          {formatCurrency(modalProduct.originalPrice, tenantConfig.currencySymbol)}
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                          Ahorras {formatCurrency(modalProduct.originalPrice - price, tenantConfig.currencySymbol)}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSendToWhatsApp('CASH')}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 active:scale-98 transition"
                  >
                    <Zap className="w-4 h-4 fill-white/20" />
                    <span>Comprar de Contado con Brandon vía WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tabla de Especificaciones Técnicas */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Especificaciones Técnicas
                </h4>
                <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                  {modalProduct.specs &&
                    Object.entries(modalProduct.specs).map(([label, val]) => (
                      <div key={label} className="p-2.5 flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">{label}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{val}</span>
                      </div>
                    ))}
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Disponibilidad</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">En Bodega (Listo para entrega)</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
