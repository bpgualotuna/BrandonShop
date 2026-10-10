export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
  inStock: boolean;
  specs: Record<string, string>;
  tags?: string[];
  warrantyMonths?: number;
}

export type PurchaseIntent = 'CREDIT' | 'CASH';

/**
 * Configuración multi-tenant para preparar la aplicación
 * hacia un modelo SaaS escalable donde cada vendedor (actualmente Brandon)
 * tiene su propia instancia, branding y reglas.
 */
export interface TenantConfig {
  tenantId: string;
  sellerName: string; // REGLA DE ORO: Inicialmente "Brandon" estricto
  storeTitle: string;
  slogan: string;
  phoneWhatsApp: string; // Formato internacional sin símbolos (ej. "573001234567")
  currency: string;
  currencySymbol: string;
  monthlyInterestRate: number; // Ej. 0.025 para 2.5% mensual en simulación de crédito
  downPaymentMinPercent: number; // Ej. 15% de inicial mínima
  maxInstallments: number; // Ej. 24 meses
  primaryColor: string;
  accentColor: string;
  aiBotEnabled: boolean; // Flag para activación de Fase 2 (Chatbot IA)
}

/**
 * Estructura de datos preparada para la Fase 2 (Chatbot con IA)
 * Este modelo define el contrato del Webhook que conectará WhatsApp Business API
 * con el motor de IA (Gemini / n8n / LangChain) para evaluar reglas de crédito.
 */
export interface Phase2CreditWebhookPayload {
  requestId: string;
  tenantId: string;
  sellerName: string;
  intent: PurchaseIntent;
  product: {
    sku: string;
    name: string;
    price: number;
    category: string;
  };
  creditProposal?: {
    months: number;
    downPayment: number;
    estimatedMonthlyQuota: number;
  };
  // Datos que el Chatbot solicitará interactivamente en WhatsApp en la Fase 2:
  customerProfile?: {
    name?: string;     // Nombre completo del solicitante
    age?: number;      // Edad (debe ser >= 18 para aprobación)
    email?: string;    // Correo electrónico para pre-aprobación
    idNumber?: string; // Documento de identidad opcional
  };
  status: 'PENDING_BOT_QUALIFICATION' | 'QUALIFIED' | 'REJECTED' | 'DIRECT_CASH';
  timestamp: string;
}
