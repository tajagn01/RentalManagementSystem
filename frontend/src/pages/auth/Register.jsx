import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../slices/authSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'customer',
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      toast.success('Registration successful!');
      if (user.role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/');
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const { confirmPassword, ...userData } = formData;
    dispatch(register(userData));
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-8 animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Create account</h1>
            <p className="text-gray-500 mt-1.5 text-sm">Join our rental marketplace today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
=======
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">

      {/* Main Card */}
      <div className="relative bg-white rounded-2xl sm:rounded-[2rem] shadow-xl sm:shadow-2xl overflow-hidden flex flex-col lg:flex-row max-w-4xl w-full min-h-0 lg:min-h-[600px] border border-gray-100 lg:border-0">
        {/* Left Side - Image & Text (Hidden on mobile, shown on lg+) */}
        <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
            <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white rounded-full" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center p-10 text-white">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            
            {/* Text Content */}
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Start Your<br />Journey Today
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Join thousands of users who trust RentalHub for their rental needs. Whether you want to rent or list products, we've got you covered.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-xs text-gray-300">Active Users</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-xs text-gray-300">Products Listed</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">1K+</div>
                <div className="text-xs text-gray-300">Trusted Vendors</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-xs text-gray-300">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-[55%] p-6 sm:p-8 lg:p-10 flex flex-col justify-center overflow-y-auto">
          {/* Mobile Header with Logo */}
          <div className="lg:hidden text-center mb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-2xl mb-3">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <div className="max-w-sm mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Join RentalHub today and start renting or listing amazing products!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Full Name"
                  required
                />
              </div>

<<<<<<< HEAD
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
=======
              <div>
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Email"
                  required
                />
              </div>

<<<<<<< HEAD
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Phone number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
=======
              <div>
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Phone Number (optional)"
                />
              </div>

<<<<<<< HEAD
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                I want to
              </label>
=======
              {/* Role Selection */}
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'customer' })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all border-2 ${
                    formData.role === 'customer'
<<<<<<< HEAD
                      ? 'border-gray-900 bg-gray-50 text-gray-900'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
=======
                      ? 'border-gray-900 bg-gray-100 text-gray-900'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-gray-50'
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                  }`}
                >
                  🛒 Rent Products
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'vendor' })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all border-2 ${
                    formData.role === 'vendor'
<<<<<<< HEAD
                      ? 'border-gray-900 bg-gray-50 text-gray-900'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
=======
                      ? 'border-gray-900 bg-gray-100 text-gray-900'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-gray-50'
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                  }`}
                >
                  📦 List Products
                </button>
              </div>

<<<<<<< HEAD
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
=======
              <div className="relative">
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all pr-12"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
=======
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>

<<<<<<< HEAD
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
=======
              <div>
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Confirm Password"
                  required
                />
              </div>

<<<<<<< HEAD
            <div className="flex items-start pt-1">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 transition-colors"
              />
              <label className="ml-2 text-xs text-gray-600 leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-gray-900 hover:text-gray-700 font-medium transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-gray-900 hover:text-gray-700 font-medium transition-colors">
                  Privacy Policy
=======
              {/* Terms checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <label className="text-xs text-gray-500">
                  I agree to the{' '}
                  <Link to="/terms" className="text-gray-900 hover:text-black underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-gray-900 hover:text-black underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-gray-900/30 hover:shadow-black/40"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Let's start!"
                )}
              </button>
            </form>

            {/* Sign in link */}
            <div className="text-center mt-5">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-gray-900 hover:text-black font-medium underline">
                  Sign in
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
                </Link>
              </p>
            </div>
<<<<<<< HEAD

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary h-11 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-gray-900 hover:text-gray-700 font-medium transition-colors">
                Sign in
              </Link>
            </p>
=======
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
