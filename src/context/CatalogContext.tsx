import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, TenantConfig } from '../types';
import { INITIAL_PRODUCTS, INITIAL_TENANT_CONFIG } from '../data/initialProducts';

interface CatalogContextType {
  products: Product[];
  tenantConfig: TenantConfig;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'name') => void;
  maxPriceFilter: number;
  setMaxPriceFilter: (price: number) => void;
  maxCatalogPrice: number;
  
  // Product Detail Modal
  modalProduct: Product | null;
  openProductModal: (product: Product, defaultIntent?: 'CREDIT' | 'CASH') => void;
  closeProductModal: () => void;
  modalIntent: 'CREDIT' | 'CASH';
  setModalIntent: (intent: 'CREDIT' | 'CASH') => void;

  // Dark / Light Mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Admin and CRUD
  isAdminLoggedIn: boolean;
  showAdminModal: boolean;
  setShowAdminModal: (show: boolean) => void;
  showArchitectureModal: boolean;
  setShowArchitectureModal: (show: boolean) => void;
  loginAdmin: (secret: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetDefaultProducts: () => void;
  updateTenantConfig: (updates: Partial<TenantConfig>) => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

const STORAGE_KEY_PRODUCTS = 'brandon_catalog_products_v1';
const STORAGE_KEY_TENANT = 'brandon_tenant_config_v1';
const STORAGE_KEY_AUTH = 'brandon_admin_session_v1';

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicialización de productos con persistencia local
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Configuración del Tenant (Brandon - escalable a SaaS)
  const [tenantConfig, setTenantConfig] = useState<TenantConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TENANT);
      if (saved) {
        const parsed = JSON.parse(saved);
        // REGLA DE ORO: Forzar que el nombre siga siendo 'Brandon'
        return { ...parsed, sellerName: 'Brandon' };
      }
    } catch {
      // Fallback
    }
    return INITIAL_TENANT_CONFIG;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Máximo precio dinámico para el filtro
  const maxCatalogPrice = Math.max(...products.map(p => p.price), 2000);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(maxCatalogPrice);

  // Modal de detalle y simulador
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalIntent, setModalIntent] = useState<'CREDIT' | 'CASH'>('CREDIT');

  // Dark / Light theme state (Dark mode por defecto para atmósfera tecnológica)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('brandon_theme_mode');
      if (savedTheme) return savedTheme === 'dark';
    } catch {
      // Fallback
    }
    return true; // Default dark
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('brandon_theme_mode', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('brandon_theme_mode', 'light');
      }
    } catch {
      // Ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [showArchitectureModal, setShowArchitectureModal] = useState<boolean>(false);

  // Guardar productos en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch {
      // Ignore quota errors
    }
  }, [products]);

  // Guardar config de tenant
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TENANT, JSON.stringify(tenantConfig));
    } catch {
      // Ignore
    }
  }, [tenantConfig]);

  const openProductModal = (product: Product, defaultIntent: 'CREDIT' | 'CASH' = 'CREDIT') => {
    setModalProduct(product);
    setModalIntent(defaultIntent);
  };

  const closeProductModal = () => {
    setModalProduct(null);
  };

  // Autenticación administrativa de Brandon
  const loginAdmin = (password: string): boolean => {
    // Clave predeterminada simple para demo y evaluación: 'brandon2026' o 'admin'
    if (password === 'brandon2026' || password === 'admin' || password === 'brandon') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(STORAGE_KEY_AUTH, 'true');
      } catch {
        // Ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch {
      // Ignore
    }
  };

  // CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const resetDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    setTenantConfig(INITIAL_TENANT_CONFIG);
  };

  const updateTenantConfig = (updates: Partial<TenantConfig>) => {
    // REGLA DE ORO: Evitar alteración del nombre de Brandon
    setTenantConfig(prev => ({
      ...prev,
      ...updates,
      sellerName: 'Brandon', // Siempre Brandon
    }));
  };

  return (
    <CatalogContext.Provider
      value={{
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
        modalProduct,
        openProductModal,
        closeProductModal,
        modalIntent,
        setModalIntent,
        isDarkMode,
        toggleDarkMode,
        isAdminLoggedIn,
        showAdminModal,
        setShowAdminModal,
        showArchitectureModal,
        setShowArchitectureModal,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        resetDefaultProducts,
        updateTenantConfig,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
