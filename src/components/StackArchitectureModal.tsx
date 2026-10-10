import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import {
  X,
  Layers,
  Server,
  Cpu,
  Bot,
  CheckCircle2,
} from 'lucide-react';

export const StackArchitectureModal: React.FC = () => {
  const { showArchitectureModal, setShowArchitectureModal } = useCatalog();

  if (!showArchitectureModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                Justificación Técnica del Stack & Arquitectura SaaS
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Ingeniería Cloud, Escalabilidad Multi-Tenant y Preparación para Fase 2 (Chatbot IA)
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowArchitectureModal(false)}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700 dark:text-slate-300">
          
          {/* 1. Justificación del Stack */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-base font-heading">
              <Cpu className="w-5 h-5" />
              <span>1. Justificación del Stack Tecnológico</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-cyan-700 dark:text-cyan-300 text-sm block">
                  Frontend: React 19 + Vite + TypeScript
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>¿Por qué?:</strong> Máxima reactividad y renderizado instantáneo (SPA). Permite navegación ultra fluida idéntica a una app nativa sin recarga de página. Vite otorga tiempos de bundle casi instantáneos y TypeScript previene errores en contratos de datos y catálogos comerciales.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-purple-700 dark:text-purple-300 text-sm block">
                  UI/UX: Tailwind CSS v4 + Dual Theme
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>¿Por qué?:</strong> Permite un diseño de vanguardia sin "AI slop", implementando paletas de alto contraste con soporte completo Dark/Light Mode, efectos de <em>Glassmorphism</em>, ticker continuo infinito y micro-interacciones sutiles que elevan la conversión de compra.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm block">
                  Backend / Persistencia: Cloud Firestore / Supabase
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>¿Por qué?:</strong> Para la versión comercial SaaS, Firestore / Supabase ofrece soporte nativo para reglas de seguridad RBAC, sincronización de stock en tiempo real y arquitectura multi-tenant aislada mediante <code className="text-cyan-600 dark:text-cyan-400">tenantId</code>.
                </p>
              </div>

            </div>
          </div>

          {/* 2. Arquitectura Multi-Tenant para Futuro SaaS */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-base font-heading">
              <Server className="w-5 h-5" />
              <span>2. Visión a Futuro: Arquitectura Multi-Tenant</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Aunque actualmente este prototipo está optimizado exclusivamente para <strong className="text-slate-900 dark:text-white">Brandon</strong> (respetando la regla de oro de su nombre), la estructura de datos interna se basa en el objeto <code className="text-cyan-700 dark:text-cyan-300 font-mono">TenantConfig</code>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Aislamiento de Catálogos:</strong> Cada vendedor tiene su colección de electrodomésticos asociada a su <code className="text-slate-800 dark:text-slate-200 font-mono">tenantId</code>.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Branding Dinámico:</strong> El componente <code className="text-slate-800 dark:text-slate-200 font-mono">BrandLogo</code> y la paleta de colores pueden sobrescribirse dinámicamente por subdominio (<code className="text-slate-800 dark:text-slate-200 font-mono">brandon.midominio.com</code>).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Enrutamiento WhatsApp Independiente:</strong> El teléfono destinatario de la conversión se parametriza por tienda.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Tasa Financiera Personalizable:</strong> Cada vendedor configura su tasa de interés mensual y plazo máximo en cuotas.</span>
              </div>
            </div>
          </div>

          {/* 3. Preparación Estratégica Fase 2 (Chatbot IA & Webhooks) */}
          <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-bold text-base font-heading">
              <Bot className="w-5 h-5" />
              <span>3. Preparación Fase 2: Bot de IA en WhatsApp</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              En la Fase 2 se conectará la API oficial de WhatsApp (Meta Cloud API / Twilio) con un orquestador (n8n o Cloud Functions con Gemini 2.5). Al recibir el mensaje del catálogo, el bot ejecutará el siguiente pipeline:
            </p>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-semibold">
                <span>Paso A:</span> <span>Detección de Intención y SKU</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                El bot analiza el tag estructurado <code className="text-cyan-600 dark:text-cyan-300 font-mono">[Ref: SKU|CR]</code> para extraer el electrodoméstico exacto que el cliente vio en la web.
              </p>

              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-semibold pt-1">
                <span>Paso B:</span> <span>Solicitud de Validación de Crédito (3 Datos)</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                El bot interactúa pidiendo: <strong>1) Nombre completo</strong>, <strong>2) Edad</strong> (valida que sea ≥ 18 años para habilitar crédito), y <strong>3) Correo electrónico</strong>.
              </p>

              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-semibold pt-1">
                <span>Paso C:</span> <span>Notificación a Brandon & Cierre</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Si el perfil califica, el bot asigna la conversación a Brandon con el reporte de crédito pre-evaluado y contrato preliminar listo para firma.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex justify-end">
          <button
            onClick={() => setShowArchitectureModal(false)}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold transition"
          >
            Cerrar Especificación
          </button>
        </div>

      </div>
    </div>
  );
};
