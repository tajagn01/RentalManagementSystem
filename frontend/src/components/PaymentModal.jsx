import { useState } from 'react';
import { FiX, FiCreditCard, FiLock, FiCheck, FiAlertCircle } from 'react-icons/fi';

const PaymentModal = ({ isOpen, onClose, amount, onSuccess, orderDetails }) => {
  const [paymentStep, setPaymentStep] = useState('details'); // details, processing, success, failed
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');

  if (!isOpen) return null;

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 3);
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  const handlePayment = async () => {
    // Validate based on payment method
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
      // Basic card number validation (should have 13-19 digits)
      const cardNumberDigits = cardDetails.cardNumber.replace(/\s/g, '');
      if (cardNumberDigits.length < 13 || cardNumberDigits.length > 19) {
        alert('Invalid card number');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        alert('Please enter a valid UPI ID');
        return;
      }
    }

    // Start processing
    setPaymentStep('processing');

    // Simulate payment processing (2 seconds)
    setTimeout(() => {
      // Simulate success (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setPaymentStep('success');
        // Call success callback after short delay
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setPaymentStep('failed');
      }
    }, 2000);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={paymentStep === 'details' ? onClose : undefined}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
          
          {paymentStep === 'details' && (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiCreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Secure Payment</h3>
                      <p className="text-xs text-gray-500">Powered by RentalHub Pay</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Amount Display */}
              <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                  <p className="text-3xl font-bold text-gray-900">{formatAmount(amount)}</p>
                  {orderDetails && (
                    <p className="text-xs text-gray-500 mt-2">
                      {orderDetails.itemCount} item(s) • {orderDetails.duration}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="px-6 py-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Payment Method
                </label>
                <div className="space-y-2 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FiCreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Credit / Debit Card</span>
                    {paymentMethod === 'card' && (
                      <FiCheck className="w-5 h-5 text-blue-600 ml-auto" />
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      U
                    </div>
                    <span className="font-medium text-gray-900">UPI</span>
                    {paymentMethod === 'upi' && (
                      <FiCheck className="w-5 h-5 text-blue-600 ml-auto" />
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-green-600 to-teal-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      ₹
                    </div>
                    <span className="font-medium text-gray-900">Net Banking</span>
                    {paymentMethod === 'netbanking' && (
                      <FiCheck className="w-5 h-5 text-blue-600 ml-auto" />
                    )}
                  </button>
                </div>

                {/* Payment Details Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={cardDetails.cardHolder}
                        onChange={handleCardInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Enter your UPI ID (e.g., 9876543210@paytm, username@okaxis)
                    </p>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Bank
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select your bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <FiLock className="w-5 h-5" />
                  Pay {formatAmount(amount)}
                </button>
                <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                  <FiLock className="w-3 h-3" />
                  Secured by 256-bit SSL encryption
                </p>
              </div>
            </>
          )}

          {paymentStep === 'processing' && (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
              <p className="text-gray-600">Please wait while we process your transaction</p>
              <p className="text-sm text-gray-500 mt-4">Do not close or refresh this page</p>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">Your order has been placed successfully</p>
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-green-800">Transaction ID</p>
                <p className="text-xs text-green-600 font-mono">TXN{Date.now()}</p>
              </div>
              <p className="text-sm text-gray-500">Redirecting to orders page...</p>
            </div>
          )}

          {paymentStep === 'failed' && (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h3>
              <p className="text-gray-600 mb-6">
                We couldn't process your payment. Please try again.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setPaymentStep('details')}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
