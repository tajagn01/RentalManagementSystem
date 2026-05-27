import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyInvoices } from '../../slices/invoiceSlice';
import { FiFileText, FiDownload, FiEye, FiCalendar, FiDollarSign } from 'react-icons/fi';

const Invoices = () => {
  const dispatch = useDispatch();
  const { invoices, isLoading } = useSelector((state) => state.invoices);
  const [viewingInvoice, setViewingInvoice] = useState(null);

  useEffect(() => {
    dispatch(getMyInvoices());
  }, [dispatch]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleViewInvoice = (invoice) => {
    setViewingInvoice(invoice);
  };

  const handleDownloadInvoice = (invoice) => {
    // Create a professional RentHub invoice template
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>RentHub Invoice ${invoice.invoiceNumber}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
          }
          
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          
          .invoice-header {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 40px;
            position: relative;
          }
          
          .company-name {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 8px;
          }
          
          .company-tagline {
            font-size: 14px;
            opacity: 0.9;
            letter-spacing: 1px;
          }
          
          .invoice-title {
            position: absolute;
            right: 40px;
            top: 40px;
            text-align: right;
          }
          
          .invoice-title h1 {
            font-size: 28px;
            margin-bottom: 5px;
          }
          
          .invoice-number {
            font-size: 16px;
            opacity: 0.9;
          }
          
          .invoice-body {
            padding: 40px;
          }
          
          .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .info-section h3 {
            font-size: 12px;
            text-transform: uppercase;
            color: #6b7280;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }
          
          .info-section p {
            font-size: 14px;
            margin: 4px 0;
          }
          
          .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .status-paid {
            background-color: #d1fae5;
            color: #065f46;
          }
          
          .status-pending {
            background-color: #fef3c7;
            color: #92400e;
          }
          
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
          
          .items-table thead {
            background-color: #f9fafb;
          }
          
          .items-table th {
            padding: 12px;
            text-align: left;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #6b7280;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .items-table td {
            padding: 16px 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 14px;
          }
          
          .items-table tbody tr:hover {
            background-color: #f9fafb;
          }
          
          .text-right {
            text-align: right;
          }
          
          .totals-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
          }
          
          .totals-row {
            display: flex;
            justify-content: flex-end;
            padding: 8px 0;
            font-size: 14px;
          }
          
          .totals-row.grand-total {
            font-size: 18px;
            font-weight: bold;
            color: #1e293b;
            padding-top: 15px;
            border-top: 2px solid #1e293b;
            margin-top: 10px;
          }
          
          .totals-label {
            width: 200px;
            text-align: right;
            padding-right: 30px;
            color: #6b7280;
          }
          
          .totals-value {
            width: 150px;
            text-align: right;
            font-weight: 600;
          }
          
          .grand-total .totals-label,
          .grand-total .totals-value {
            color: #1e293b;
          }
          
          .invoice-footer {
            background-color: #f9fafb;
            padding: 30px 40px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          }
          
          .footer-text {
            font-size: 13px;
            color: #6b7280;
            margin: 5px 0;
          }
          
          .footer-highlight {
            color: #1e293b;
            font-weight: 600;
          }
          
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .invoice-container {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <!-- Header -->
          <div class="invoice-header">
            <div>
              <div class="company-name">RENTHUB</div>
              <div class="company-tagline">Premium Rental Management System</div>
            </div>
            <div class="invoice-title">
              <h1>INVOICE</h1>
              <div class="invoice-number">#${invoice.invoiceNumber}</div>
            </div>
          </div>
          
          <!-- Body -->
          <div class="invoice-body">
            <!-- Invoice Information -->
            <div class="invoice-info">
              <div class="info-section">
                <h3>Invoice Date</h3>
                <p>${formatDate(invoice.createdAt)}</p>
              </div>
              
              <div class="info-section">
                <h3>Payment Status</h3>
                <p>
                  <span class="status-badge status-${invoice.status}">
                    ${invoice.status.toUpperCase()}
                  </span>
                </p>
              </div>
              
              <div class="info-section">
                <h3>Invoice ID</h3>
                <p><strong>${invoice.invoiceNumber}</strong></p>
              </div>
            </div>
            
            <!-- Items Table -->
            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 50%;">DESCRIPTION</th>
                  <th style="width: 15%;" class="text-right">QTY</th>
                  <th style="width: 17.5%;" class="text-right">UNIT PRICE</th>
                  <th style="width: 17.5%;" class="text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">${formatCurrency(item.unitPrice)}</td>
                    <td class="text-right"><strong>${formatCurrency(item.totalPrice)}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <!-- Totals -->
            <div class="totals-section">
              <div class="totals-row">
                <div class="totals-label">Subtotal:</div>
                <div class="totals-value">${formatCurrency(invoice.amounts.subtotal)}</div>
              </div>
              
              <div class="totals-row">
                <div class="totals-label">Tax (10%):</div>
                <div class="totals-value">${formatCurrency(invoice.amounts.tax)}</div>
              </div>
              
              ${invoice.amounts.securityDeposit > 0 ? `
              <div class="totals-row">
                <div class="totals-label">Security Deposit:</div>
                <div class="totals-value">${formatCurrency(invoice.amounts.securityDeposit)}</div>
              </div>
              ` : ''}
              
              <div class="totals-row grand-total">
                <div class="totals-label">TOTAL AMOUNT:</div>
                <div class="totals-value">${formatCurrency(invoice.amounts.total)}</div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="invoice-footer">
            <p class="footer-text">
              <span class="footer-highlight">Thank you for choosing RentHub!</span>
            </p>
            <p class="footer-text">
              This is a computer-generated invoice and does not require a signature.
            </p>
            <p class="footer-text">
              For any queries, please contact us at support@renthub.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RentHub_Invoice_${invoice.invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Invoices</h1>
            <p className="text-gray-500 mt-1">View and download your invoices</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiFileText className="w-4 h-4" />
            <span>{invoices.length} invoices</span>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      {isLoading ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading invoices...</p>
        </div>
      ) : invoices.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <FiFileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Your invoices will appear here after you complete your first rental.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiFileText className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      {formatDate(invoice.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <FiDollarSign className="w-4 h-4 mr-1" />
                      {formatCurrency(invoice.amounts?.total || 0)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewInvoice(invoice)}
                      className="text-gray-400 hover:text-gray-600 mr-3"
                      title="View Invoice"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDownloadInvoice(invoice)}
                      className="text-gray-400 hover:text-blue-600"
                      title="Download Invoice"
                    >
                      <FiDownload className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Invoice View Modal */}
      {viewingInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* RentHub Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold tracking-wider">RENTHUB</h1>
                  <p className="text-sm opacity-90 mt-1">Premium Rental Management System</p>
                </div>
                <button
                  onClick={() => setViewingInvoice(null)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-600">
                <p className="text-lg font-semibold">INVOICE #{viewingInvoice.invoiceNumber}</p>
              </div>
            </div>
            
            <div className="p-6">
              {/* Invoice Details */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b-2 border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Invoice Date</p>
                  <p className="font-medium text-gray-900">{formatDate(viewingInvoice.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Payment Status</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    viewingInvoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800'
                      : viewingInvoice.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {viewingInvoice.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Invoice ID</p>
                  <p className="font-bold text-gray-900">{viewingInvoice.invoiceNumber}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Items</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {viewingInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(item.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium">{formatCurrency(viewingInvoice.amounts.subtotal)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-600">Tax</span>
                      <span className="text-sm font-medium">{formatCurrency(viewingInvoice.amounts.tax)}</span>
                    </div>
                    {viewingInvoice.amounts.securityDeposit > 0 && (
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-600">Security Deposit</span>
                        <span className="text-sm font-medium">{formatCurrency(viewingInvoice.amounts.securityDeposit)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-t border-gray-200">
                      <span className="text-base font-semibold">Total</span>
                      <span className="text-base font-bold text-blue-600">{formatCurrency(viewingInvoice.amounts.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-6 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <p className="font-semibold text-gray-700 mb-1">Thank you for choosing RentHub!</p>
                  <p className="text-xs">For any queries, contact us at support@renthub.com</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setViewingInvoice(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(viewingInvoice)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center gap-2 transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
