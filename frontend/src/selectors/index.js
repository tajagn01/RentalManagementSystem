// ============================================================================
// MEMOIZED REDUX SELECTORS
// Optimized selectors to prevent unnecessary re-renders
// ============================================================================

import { createSelector } from '@reduxjs/toolkit';

// ============================================================================
// CART SELECTORS
// ============================================================================

export const selectCart = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectRentalPeriod = (state) => state.cart.rentalPeriod;

// Memoized selector for cart item count
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + (item.quantity || 0), 0)
);

// Memoized selector for cart total (without days calculation)
export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => {
    const dailyRate = item.product?.pricing?.daily || 0;
    return total + (dailyRate * item.quantity);
  }, 0)
);

// Memoized selector for cart with rental period calculation
export const selectCartTotals = createSelector(
  [selectCartItems, selectRentalPeriod],
  (items, rentalPeriod) => {
    // Calculate days
    let days = 1;
    if (rentalPeriod.startDate && rentalPeriod.endDate) {
      days = Math.ceil(
        (new Date(rentalPeriod.endDate) - new Date(rentalPeriod.startDate)) / (1000 * 60 * 60 * 24)
      );
      days = Math.max(days, 1);
    }

    const subtotal = items.reduce((total, item) => {
      const dailyRate = item.product?.pricing?.daily || 0;
      return total + (dailyRate * item.quantity * days);
    }, 0);

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      total,
      days,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
    };
  }
);

// ============================================================================
// PRODUCT SELECTORS
// ============================================================================

export const selectProducts = (state) => state.products;
export const selectAllProducts = (state) => state.products.products || [];
export const selectCategories = (state) => state.products.categories || [];
export const selectVendorProducts = (state) => state.products.vendorProducts || [];
export const selectProductsLoading = (state) => state.products.isLoading;

// Memoized selector for available products only
export const selectAvailableProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter(product => {
    const isAvailable = product.isActive ?? product.availability ?? true;
    return isAvailable;
  })
);

// Memoized selector for products by category
export const selectProductsByCategory = createSelector(
  [selectAllProducts, (state, category) => category],
  (products, category) => {
    if (!category || category === 'All Categories') return products;
    return products.filter(product => 
      product.category?.toLowerCase() === category.toLowerCase()
    );
  }
);

// Memoized selector for product stats
export const selectProductStats = createSelector(
  [selectAllProducts],
  (products) => ({
    total: products.length,
    available: products.filter(p => (p.isActive ?? p.availability ?? true)).length,
    unavailable: products.filter(p => !(p.isActive ?? p.availability ?? true)).length,
    outOfStock: products.filter(p => (p.inventory?.totalQuantity ?? p.totalQuantity ?? 0) === 0).length,
  })
);

// ============================================================================
// AUTH SELECTORS
// ============================================================================

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.user?.role;

// ============================================================================
// ORDER SELECTORS
// ============================================================================

export const selectOrders = (state) => state.orders;
export const selectAllOrders = (state) => state.orders.orders || [];
export const selectOrdersLoading = (state) => state.orders.isLoading;

// Memoized selector for orders by status
export const selectOrdersByStatus = createSelector(
  [selectAllOrders, (state, status) => status],
  (orders, status) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  }
);

// Memoized selector for order stats
export const selectOrderStats = createSelector(
  [selectAllOrders],
  (orders) => {
    const stats = {
      total: orders.length,
      pending: 0,
      confirmed: 0,
      active: 0,
      completed: 0,
      cancelled: 0,
    };

    orders.forEach(order => {
      if (order.status in stats) {
        stats[order.status]++;
      }
    });

    return stats;
  }
);

// ============================================================================
// INVOICE SELECTORS
// ============================================================================

export const selectInvoices = (state) => state.invoices;
export const selectAllInvoices = (state) => state.invoices.invoices || [];
export const selectInvoicesLoading = (state) => state.invoices.isLoading;

// Memoized selector for paid invoices
export const selectPaidInvoices = createSelector(
  [selectAllInvoices],
  (invoices) => invoices.filter(invoice => invoice.status === 'paid')
);

// Memoized selector for pending invoices
export const selectPendingInvoices = createSelector(
  [selectAllInvoices],
  (invoices) => invoices.filter(invoice => invoice.status === 'pending' || invoice.status === 'sent')
);

// Memoized selector for invoice stats
export const selectInvoiceStats = createSelector(
  [selectAllInvoices],
  (invoices) => {
    const stats = {
      total: invoices.length,
      paid: 0,
      pending: 0,
      overdue: 0,
      totalAmount: 0,
      paidAmount: 0,
      pendingAmount: 0,
    };

    invoices.forEach(invoice => {
      const amount = invoice.amounts?.total || 0;
      stats.totalAmount += amount;

      if (invoice.status === 'paid') {
        stats.paid++;
        stats.paidAmount += amount;
      } else if (invoice.status === 'pending' || invoice.status === 'sent') {
        stats.pending++;
        stats.pendingAmount += amount;
      } else if (invoice.status === 'overdue') {
        stats.overdue++;
        stats.pendingAmount += amount;
      }
    });

    return stats;
  }
);
