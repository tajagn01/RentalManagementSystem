import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductLocal, reset, selectCategories } from '../../slices/productSlice';
import { FiArrowLeft, FiPackage, FiDollarSign, FiToggleLeft, FiToggleRight, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

// ============================================================================
// VENDOR ADD PRODUCT - Clean Enterprise Form
// ============================================================================

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  const { user } = useSelector((state) => state.auth);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    totalQuantity: 1,
    condition: 'New',
    pricing: {
      daily: '',
      weekly: '',
      monthly: '',
      securityDeposit: '',
    },
    availability: true,
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle pricing changes
  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [name]: value,
      },
    }));
    if (errors[`pricing.${name}`]) {
      setErrors(prev => ({ ...prev, [`pricing.${name}`]: '' }));
    }
  };

  // Toggle availability
  const toggleAvailability = () => {
    setFormData(prev => ({ ...prev, availability: !prev.availability }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.pricing.daily || parseFloat(formData.pricing.daily) <= 0) {
      newErrors['pricing.daily'] = 'Daily rent price is required';
    }
    if (formData.totalQuantity < 1) {
      newErrors.totalQuantity = 'Quantity must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Construct complete product object
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      condition: formData.condition,
      totalQuantity: parseInt(formData.totalQuantity, 10),
      availability: formData.availability,
      pricing: {
        daily: parseFloat(formData.pricing.daily) || 0,
        weekly: parseFloat(formData.pricing.weekly) || parseFloat(formData.pricing.daily) * 6,
        monthly: parseFloat(formData.pricing.monthly) || parseFloat(formData.pricing.daily) * 25,
        securityDeposit: parseFloat(formData.pricing.securityDeposit) || parseFloat(formData.pricing.daily) * 3,
      },
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'], // Default placeholder
      vendor: {
        _id: user?.id || 'vendor-1',
        name: user?.name || 'Vendor Store',
      },
    };

    // Dispatch to Redux store (local state only)
    dispatch(addProductLocal(productData));
    
    // Simulate slight delay for UX
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Product added successfully!');
      navigate('/vendor/products');
    }, 500);
  };

  // Format currency display
  const formatCurrency = (value) => {
    if (!value) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Conditions list
  const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/vendor/products')}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new rental product listing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <FiPackage className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Basic Information</h2>
                <p className="text-xs text-gray-500">Product details and specifications</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sony A7 IV Camera"
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product - features, specifications, what's included..."
                  rows={4}
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
              </div>

              {/* Category & Condition Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white transition-all ${
                      errors.category ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white transition-all"
                  >
                    {conditions.map((cond) => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity & Availability Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Quantity Available <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalQuantity"
                    value={formData.totalQuantity}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
                      errors.totalQuantity ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.totalQuantity && <p className="mt-1 text-xs text-red-500">{errors.totalQuantity}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Availability Status
                  </label>
                  <button
                    type="button"
                    onClick={toggleAvailability}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm border rounded-lg transition-all ${
                      formData.availability 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700' 
                        : 'border-gray-200 bg-gray-50 text-gray-500'
                    }`}
                  >
                    <span>{formData.availability ? 'Available for Rent' : 'Not Available'}</span>
                    {formData.availability ? (
                      <FiToggleRight className="w-6 h-6" />
                    ) : (
                      <FiToggleLeft className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Pricing</h2>
                <p className="text-xs text-gray-500">Set your rental rates in INR</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Daily Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Daily <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input
                    type="number"
                    name="daily"
                    value={formData.pricing.daily}
                    onChange={handlePricingChange}
                    placeholder="0"
                    min="0"
                    className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
                      errors['pricing.daily'] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors['pricing.daily'] && <p className="mt-1 text-xs text-red-500">{errors['pricing.daily']}</p>}
              </div>

              {/* Weekly Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Weekly
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input
                    type="number"
                    name="weekly"
                    value={formData.pricing.weekly}
                    onChange={handlePricingChange}
                    placeholder={formData.pricing.daily ? String(Math.round(formData.pricing.daily * 6)) : '0'}
                    min="0"
                    className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Monthly Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Monthly
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input
                    type="number"
                    name="monthly"
                    value={formData.pricing.monthly}
                    onChange={handlePricingChange}
                    placeholder={formData.pricing.daily ? String(Math.round(formData.pricing.daily * 25)) : '0'}
                    min="0"
                    className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Security Deposit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Deposit
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.pricing.securityDeposit}
                    onChange={handlePricingChange}
                    placeholder={formData.pricing.daily ? String(Math.round(formData.pricing.daily * 3)) : '0'}
                    min="0"
                    className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Price Preview */}
            {formData.pricing.daily && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Price Preview</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700">
                    {formatCurrency(formData.pricing.daily)}/day
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700">
                    {formatCurrency(formData.pricing.weekly || formData.pricing.daily * 6)}/week
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700">
                    {formatCurrency(formData.pricing.monthly || formData.pricing.daily * 25)}/month
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/vendor/products')}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
