import { Product, PurchaseIntent, Phase2CreditWebhookPayload } from '../types';

export interface WhatsAppMessageOptions {
  sellerName?: string; // Por defecto y REGLA DE ORO: "Brandon"
  phone: string;
  product: Product;
  intent: PurchaseIntent;
  currencySymbol?: string;
  creditDetails?: {
    months: number;
    downPayment: number;
    monthlyPayment: number;
  };
}

/**
 * Formatea el precio a moneda local/internacional
 */
export const formatCurrency = (amount: number, symbol = '$', currency = 'USD'): string => {
  return `${symbol}${amount.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} ${currency}`;
};

/**
 * Genera el enlace de WhatsApp estructurado conforme a la especificación de negocio:
 * "Hola Brandon, vi tu catálogo y me interesa el producto [Nombre] (SKU: [SKU]) que cuesta [Precio]. Me gustaría [Cotizar un crédito / Comprar de contado]."
 */
export const generateWhatsAppUrl = ({
  sellerName = 'Brandon',
  phone,
  product,
  intent,
  currencySymbol = '$',
  creditDetails,
}: WhatsAppMessageOptions): string => {
  // REGLA DE ORO: Garantizar que el saludo sea ÚNICAMENTE a "Brandon"
  const cleanSellerName = 'Brandon'; 
  const intentPhrase =
    intent === 'CREDIT' ? 'Cotizar un crédito' : 'Comprar de contado';
  const formattedPrice = formatCurrency(product.price, currencySymbol);

  let message = `Hola ${cleanSellerName}, vi tu catálogo y me interesa el producto ${product.name} (SKU: ${product.sku}) que cuesta ${formattedPrice}. Me gustaría ${intentPhrase}.`;

  // Si el cliente interactuó con el simulador de cuotas, anexamos los parámetros
  if (intent === 'CREDIT' && creditDetails) {
    message += `\n\n📊 *Plan de crédito proyectado:*\n• Inicial estimada: ${formatCurrency(creditDetails.downPayment, currencySymbol)}\n• Plazo solicitado: ${creditDetails.months} cuotas de aprox. ${formatCurrency(creditDetails.monthlyPayment, currencySymbol)}/mes`;
  }

  // Comentario Fase 2: Tag estructurado de rastreo para el futuro Webhook del Bot de IA
  message += `\n\n[Ref: ${product.sku}|${intent === 'CREDIT' ? 'CR' : 'CO'}]`;

  // Sanitizar número de teléfono (quitar +, espacios, guiones)
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

/**
 * =====================================================================
 * PREPARACIÓN ESTRATÉGICA FASE 2: CHATBOT DE IA PARA WHATSAPP
 * =====================================================================
 * En la Fase 2, un Bot de IA (ej. webhook con Meta Cloud API / n8n / Gemini)
 * interceptará el mensaje entrante. Si la intención es 'CREDIT', el bot iniciará
 * un flujo de conversación guiado para calificar el crédito solicitando:
 * 1. Nombre completo
 * 2. Edad (Regla de negocio: >= 18 años)
 * 3. Correo electrónico (para envío de pagaré digital y pre-aprobación)
 *
 * Esta función auxiliar simula el payload JSON que el backend o webhook recibirá.
 */
export const buildPhase2WebhookPayload = (
  product: Product,
  intent: PurchaseIntent,
  tenantId = 'tenant-brandon-01',
  customerSimulated?: { name: string; age: number; email: string }
): Phase2CreditWebhookPayload => {
  return {
    requestId: `REQ-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    tenantId,
    sellerName: 'Brandon', // REGLA DE ORO: Solo Brandon
    intent,
    product: {
      sku: product.sku,
      name: product.name,
      price: product.price,
      category: product.category,
    },
    creditProposal:
      intent === 'CREDIT'
        ? {
            months: 12,
            downPayment: Math.round(product.price * 0.15),
            estimatedMonthlyQuota: Math.round(
              (product.price * 0.85 * (1 + 0.022 * 12)) / 12
            ),
          }
        : undefined,
    customerProfile: customerSimulated,
    status: intent === 'CREDIT' ? 'PENDING_BOT_QUALIFICATION' : 'DIRECT_CASH',
    timestamp: new Date().toISOString(),
  };
};

/**
 * Reglas de negocio pre-evaluadas para la Fase 2 del bot:
 */
export const evaluateCreditRulesPhase2 = (customer: {
  name: string;
  age: number;
  email: string;
}): { approved: boolean; reason: string } => {
  if (!customer.name || customer.name.trim().length < 3) {
    return { approved: false, reason: 'El nombre proporcionado no es válido.' };
  }
  if (!customer.age || customer.age < 18) {
    return {
      approved: false,
      reason: 'El solicitante debe ser mayor de edad (mínimo 18 años) para acceder al crédito.',
    };
  }
  if (customer.age > 75) {
    return {
      approved: false,
      reason: 'Edad superior al límite de póliza de crédito directo (máx 75 años). Requiere fiador.',
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!customer.email || !emailRegex.test(customer.email)) {
    return { approved: false, reason: 'El correo electrónico suministrado no tiene un formato válido.' };
  }
  return {
    approved: true,
    reason: '¡Perfil pre-calificado exitosamente! Se genera token de aprobación para Brandon.',
  };
};
