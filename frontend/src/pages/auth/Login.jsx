import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../slices/authSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const from = location.state?.from || null;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      toast.success('Login successful!');
      if (from) {
        navigate(from);
      } else {
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'vendor') {
          navigate('/vendor/dashboard');
        } else {
          navigate('/customer/dashboard');
        }
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, from]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
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
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 mt-1.5 text-sm">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
=======
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">

      {/* Main Card */}
      <div className="relative bg-white rounded-2xl sm:rounded-[2rem] shadow-xl sm:shadow-2xl overflow-hidden flex flex-col lg:flex-row max-w-4xl w-full min-h-0 lg:min-h-[520px] border border-gray-100 lg:border-0">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            
            {/* Text Content */}
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Rent Anything,<br />Anytime, Anywhere
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Access thousands of products from trusted vendors. From electronics to equipment, find everything you need for your next project.
            </p>
            
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-200">Verified vendors & quality products</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-200">Secure payments & easy returns</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-200">24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-[55%] p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          {/* Mobile Header with Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-2xl mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="max-w-sm mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Log in</h1>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Hello, friend! I'm RentalHub – your rental manager you can trust for everything. Let's get in touch!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Forgot Password */}
              <div className="text-right -mt-2">
                <Link to="/forgot-password" className="text-sm text-gray-900 hover:text-black hover:underline">
                  Forgot password?
                </Link>
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

            {/* Sign up link */}
            <div className="text-center mt-6">
              <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-gray-900 hover:text-black font-medium underline">
                  Sign up
                </Link>
              </p>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 transition-colors" 
                />
                <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary h-11 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-gray-900 hover:text-gray-700 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <p className="text-xs font-medium text-gray-700 text-center mb-2">Demo Credentials</p>
            <div className="text-xs text-gray-600 space-y-1.5">
              <div className="flex justify-between">
                <span className="font-medium">Admin:</span>
                <span className="text-gray-500">admin@example.com / password123</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Vendor:</span>
                <span className="text-gray-500">vendor@example.com / password123</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Customer:</span>
                <span className="text-gray-500">customer@example.com / password123</span>
=======
            {/* Demo credentials - smaller and subtle */}
            <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials</p>
              <div className="text-xs text-gray-500 space-y-0.5 text-center">
                <p><span className="font-medium">Admin:</span> admin@example.com / password123</p>
                <p><span className="font-medium">Vendor:</span> vendor@example.com / password123</p>
                <p><span className="font-medium">Customer:</span> customer@example.com / password123</p>
>>>>>>> 2ed5db4196fc313e8af11b4bb4375ff87aa13568
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
