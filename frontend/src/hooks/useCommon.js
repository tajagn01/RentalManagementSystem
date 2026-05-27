// ============================================================================
// CUSTOM HOOKS FOR RENTAL MANAGEMENT SYSTEM
// Optimized, reusable hooks to prevent code duplication and improve performance
// ============================================================================

import { useMemo, useCallback, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * Hook to format currency in INR
 * Memoized to prevent recreation on every render
 */
export const useFormatCurrency = () => {
  return useCallback((amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  }, []);
};

/**
 * Hook to format dates consistently
 * Memoized to prevent recreation on every render
 */
export const useFormatDate = () => {
  return useCallback((dateString, options = {}) => {
    if (!dateString) return 'Not set';
    
    const defaultOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      ...options
    };
    
    return new Date(dateString).toLocaleDateString('en-IN', defaultOptions);
  }, []);
};

/**
 * Hook to manage localStorage with error handling
 * Prevents crashes from quota exceeded or parsing errors
 */
export const useLocalStorage = (key, initialValue) => {
  const getValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(getValue()) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      return true;
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
      if (error.name === 'QuotaExceededError') {
        toast.error('Storage quota exceeded. Please clear some data.');
      }
      return false;
    }
  }, [key, getValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }, [key]);

  return [getValue, setValue, removeValue];
};

/**
 * Hook to calculate rental days from date range
 * Memoized to prevent recalculation
 */
export const useRentalDays = (startDate, endDate) => {
  return useMemo(() => {
    if (!startDate || !endDate) return 1;
    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    return Math.max(days, 1);
  }, [startDate, endDate]);
};

/**
 * Hook to check product availability
 * Handles both API (isActive) and local (availability) formats
 */
export const useProductAvailability = (product) => {
  return useMemo(() => {
    if (!product) return false;
    return product.isActive ?? product.availability ?? true;
  }, [product]);
};

/**
 * Hook to get product quantity
 * Handles both API (inventory.totalQuantity) and local (totalQuantity) formats
 */
export const useProductQuantity = (product) => {
  return useMemo(() => {
    if (!product) return 0;
    return product.inventory?.totalQuantity ?? product.totalQuantity ?? 0;
  }, [product]);
};

/**
 * Hook for debounced search
 * Useful for search inputs to reduce API calls
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook to manage favorites
 * Centralized favorites management with localStorage
 */
export const useFavorites = (userId = 'guest') => {
  const favKey = `favorites_${userId}`;
  const [getFavorites, setFavorites] = useLocalStorage(favKey, []);

  const favorites = useMemo(() => getFavorites(), [getFavorites]);

  const isFavorite = useCallback((productId) => {
    const favs = getFavorites();
    return favs.some(fav => fav._id === productId);
  }, [getFavorites]);

  const addFavorite = useCallback((product) => {
    const favs = getFavorites();
    if (!favs.some(fav => fav._id === product._id)) {
      setFavorites([...favs, product]);
      toast.success('Added to favorites');
      return true;
    }
    return false;
  }, [getFavorites, setFavorites]);

  const removeFavorite = useCallback((productId) => {
    const favs = getFavorites();
    setFavorites(favs.filter(fav => fav._id !== productId));
    toast.success('Removed from favorites');
    return true;
  }, [getFavorites, setFavorites]);

  const toggleFavorite = useCallback((product) => {
    if (isFavorite(product._id)) {
      removeFavorite(product._id);
      return false;
    } else {
      addFavorite(product);
      return true;
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};

/**
 * Hook to calculate cart statistics
 * Memoized to prevent recalculation on every render
 */
export const useCartStats = (cartItems, days = 1) => {
  return useMemo(() => {
    const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    
    const subtotal = cartItems.reduce((total, item) => {
      const dailyRate = item.product?.pricing?.daily || 0;
      return total + (dailyRate * item.quantity * days);
    }, 0);

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return {
      itemCount,
      subtotal,
      tax,
      total,
      days,
    };
  }, [cartItems, days]);
};

/**
 * Hook for image loading state
 * Prevents unnecessary re-renders from image loading
 */
export const useImageLoader = (src) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    setLoaded(false);
    setError(false);

    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error };
};
