# 🚀 Quick Reference Guide for Developers

## Using Optimized Components and Hooks

### 1. **Custom Hooks (src/hooks/useCommon.js)**

#### Currency Formatting
```javascript
import { useFormatCurrency } from '../../hooks/useCommon';

const MyComponent = () => {
  const formatCurrency = useFormatCurrency();
  return <div>{formatCurrency(1000)}</div>; // ₹1,000
};
```

#### Date Formatting
```javascript
import { useFormatDate } from '../../hooks/useCommon';

const MyComponent = () => {
  const formatDate = useFormatDate();
  return <div>{formatDate('2024-01-15')}</div>; // Jan 15, 2024
};
```

#### Favorites Management
```javascript
import { useFavorites } from '../../hooks/useCommon';

const ProductCard = ({ product, userId }) => {
  const { isFavorite, toggleFavorite } = useFavorites(userId);
  
  return (
    <button onClick={() => toggleFavorite(product)}>
      {isFavorite(product._id) ? '❤️' : '🤍'}
    </button>
  );
};
```

#### Cart Statistics
```javascript
import { useCartStats } from '../../hooks/useCommon';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const days = 7;
  const { subtotal, tax, total, itemCount } = useCartStats(cartItems, days);
  
  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Subtotal: {subtotal}</p>
      <p>Tax: {tax}</p>
      <p>Total: {total}</p>
    </div>
  );
};
```

---

### 2. **Memoized Selectors (src/selectors/index.js)**

#### Cart Selectors
```javascript
import { selectCartTotals, selectCartItemsCount } from '../../selectors';

const Cart = () => {
  const { subtotal, tax, total, days } = useSelector(selectCartTotals);
  const itemCount = useSelector(selectCartItemsCount);
  
  // These values are memoized and only recalculate when cart changes
};
```

#### Product Selectors
```javascript
import { 
  selectAvailableProducts, 
  selectProductsByCategory,
  selectProductStats 
} from '../../selectors';

const Products = () => {
  const availableProducts = useSelector(selectAvailableProducts);
  const stats = useSelector(selectProductStats);
  
  // stats = { total, available, unavailable, outOfStock }
};
```

#### Order Selectors
```javascript
import { selectOrdersByStatus, selectOrderStats } from '../../selectors';

const Orders = () => {
  const pendingOrders = useSelector((state) => 
    selectOrdersByStatus(state, 'pending')
  );
  const stats = useSelector(selectOrderStats);
};
```

---

### 3. **Dummy Data (src/constants/dummyData.js)**

```javascript
import { 
  DUMMY_PRODUCTS, 
  DUMMY_CATEGORIES,
  CONDITIONS,
  SORT_OPTIONS 
} from '../../constants/dummyData';

const Products = () => {
  const products = useSelector(selectAllProducts);
  
  // Use dummy data as fallback
  const displayProducts = products.length > 0 ? products : DUMMY_PRODUCTS;
};
```

---

### 4. **Performance Best Practices**

#### Memoize Expensive Calculations
```javascript
const filteredProducts = useMemo(() => {
  return products.filter(p => p.price < maxPrice);
}, [products, maxPrice]); // Only recalculate when these change
```

#### Memoize Components
```javascript
const ProductCard = memo(({ product, onAddToCart }) => {
  // Component only re-renders when props change
  return <div>...</div>;
});

ProductCard.displayName = 'ProductCard'; // For debugging
```

#### Memoize Callbacks
```javascript
const handleAddToCart = useCallback((product) => {
  dispatch(addToCart(product));
}, [dispatch]); // Stable reference
```

---

### 5. **Common Patterns**

#### Check Product Availability
```javascript
// Handles both API (isActive) and local (availability) formats
const isAvailable = product.isActive ?? product.availability ?? true;
```

#### Get Product Quantity
```javascript
// Handles both API and local formats
const quantity = product.inventory?.totalQuantity ?? product.totalQuantity ?? 0;
```

#### Safe LocalStorage Access
```javascript
import { useLocalStorage } from '../../hooks/useCommon';

const [getFavorites, setFavorites, removeFavorites] = useLocalStorage('favorites', []);
const favorites = getFavorites();
```

---

### 6. **Component Structure**

#### Optimized Product Card
```javascript
import { memo, useState } from 'react';

const ProductCard = memo(({ product, onAddToCart, userId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const isAvailable = product.isActive ?? product.availability ?? true;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };
  
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <button 
        onClick={handleAddToCart}
        disabled={!isAvailable || isAdding}
      >
        {isAdding ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
```

---

### 7. **Redux Usage**

#### Dispatch Actions
```javascript
import { useDispatch } from 'react-redux';
import { getProducts } from '../../slices/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
};
```

#### Select State with Memoization
```javascript
import { useSelector } from 'react-redux';
import { selectCartTotals } from '../../selectors';

const Cart = () => {
  // Memoized selector - only recalculates when cart changes
  const { total, itemCount } = useSelector(selectCartTotals);
};
```

---

### 8. **Error Handling**

#### With Try-Catch
```javascript
const handleSubmit = async () => {
  try {
    await dispatch(createOrder(orderData)).unwrap();
    toast.success('Order placed!');
    navigate('/orders');
  } catch (error) {
    toast.error(error || 'Failed to place order');
  }
};
```

#### With Loading States
```javascript
const { isLoading, isError, message } = useSelector((state) => state.products);

if (isLoading) return <Spinner />;
if (isError) return <Error message={message} />;
return <ProductList />;
```

---

### 9. **Performance Checklist**

Before creating a new component, ask:
- [ ] Can this component be memoized with `memo()`?
- [ ] Are expensive calculations wrapped in `useMemo()`?
- [ ] Are callbacks wrapped in `useCallback()`?
- [ ] Are Redux selectors memoized with `createSelector()`?
- [ ] Is localStorage access error-handled?
- [ ] Are lists using `key` prop correctly?
- [ ] Are dependencies in `useEffect` correct?

---

### 10. **Testing Critical Flows**

#### Test Vendor → Customer Flow
```bash
1. Vendor adds product (vendor/products/add)
2. Product appears in customer feed (customer/products)
3. Customer adds to cart
4. Cart updates correctly
5. Checkout works
6. Invoice generates
```

#### Test Cart Calculations
```bash
1. Add multiple products
2. Change quantities
3. Verify totals update
4. Change rental dates
5. Verify totals recalculate
6. Remove items
7. Verify totals update
```

---

## 🎯 Key Takeaways

1. **Always use custom hooks** from `hooks/useCommon.js` instead of duplicating code
2. **Always use memoized selectors** from `selectors/index.js` instead of inline selectors
3. **Always use dummy data** from `constants/dummyData.js` as fallback
4. **Always memoize expensive components** with `React.memo()`
5. **Always memoize expensive calculations** with `useMemo()`
6. **Always handle loading/error states** in Redux flows

---

## 📚 File Reference

| Purpose | File Path |
|---------|-----------|
| Custom Hooks | `src/hooks/useCommon.js` |
| Memoized Selectors | `src/selectors/index.js` |
| Dummy Data | `src/constants/dummyData.js` |
| Redux Store | `src/app/store.js` |
| Cart Slice | `src/slices/cartSlice.js` |
| Product Slice | `src/slices/productSlice.js` |

---

## 🐛 Common Issues & Solutions

### Issue: Component re-renders too often
**Solution**: Wrap in `memo()` and check `useEffect` dependencies

### Issue: Calculations are slow
**Solution**: Wrap in `useMemo()` with correct dependencies

### Issue: Cart total wrong
**Solution**: Use `selectCartTotals` selector from `selectors/index.js`

### Issue: localStorage errors
**Solution**: Use `useLocalStorage` hook from `hooks/useCommon.js`

### Issue: Dummy data not showing
**Solution**: Import from `constants/dummyData.js`, not inline

---

**Last Updated**: February 2, 2026
