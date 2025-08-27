import React, { useState } from 'react';
import { useFeeDetails } from '../../hooks/useSupabaseData';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Receipt,
  DollarSign,
  Filter,
  Search,
  Eye
} from 'lucide-react';

const FeeManagement: React.FC = () => {
  const { data: fees, loading, error } = useFeeDetails();
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredFees = () => {
    let filtered = fees || [];
    
    if (filter !== 'all') {
      filtered = filtered.filter(fee => fee.status === filter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(fee => 
        fee.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.semester.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'partial':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  const totalAmount = (fees || []).reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = (fees || []).filter(fee => fee.status === 'paid').reduce((sum, fee) => sum + fee.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  const handlePayment = (feeId: string) => {
    console.log('Initiating payment for fee:', feeId);
    // Here you would integrate with a payment gateway
    alert('Payment gateway integration would be implemented here');
  };

  const handleDownloadReceipt = (receiptNumber: string) => {
    console.log('Downloading receipt:', receiptNumber);
    // Here you would download the receipt
    alert(`Downloading receipt ${receiptNumber}`);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Fee Management</h1>
          <p className="text-blue-100">Loading your fee information...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Fee Management</h1>
          <p className="text-blue-100">Error loading fee information</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Fee Management</h1>
        <p className="text-blue-100">Manage your fee payments, download receipts, and track payment history.</p>
      </div>

      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Fees</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending Amount</p>
              <p className="text-2xl font-bold text-orange-600">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Fees</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search fees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Fee Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Fee Details</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredFees().map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{fee.type}</div>
                      <div className="text-sm text-gray-500">{fee.semester}</div>
                      {fee.description && (
                        <div className="text-xs text-gray-400 mt-1">{fee.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{fee.amount.toLocaleString()}</div>
                    {fee.paidAmount && (
                      <div className="text-xs text-green-600">Paid: ₹{fee.paidAmount.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {fee.dueDate.toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(fee.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(fee.status)}`}>
                        {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {fee.status === 'pending' && (
                        <button
                          onClick={() => handlePayment(fee.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <CreditCard className="h-4 w-4" />
                          <span>Pay Now</span>
                        </button>
                      )}
                      {fee.status === 'paid' && fee.receiptNumber && (
                        <button
                          onClick={() => handleDownloadReceipt(fee.receiptNumber!)}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span>Receipt</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getFilteredFees().length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No fees found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeManagement;