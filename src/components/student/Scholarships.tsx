import React, { useState } from 'react';
import { mockScholarships } from '../../data/mockData';
import { 
  Award,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Eye,
  X,
  Target
} from 'lucide-react';

const Scholarships: React.FC = () => {
  const [scholarships, setScholarships] = useState(mockScholarships);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<any>(null);

  const availableScholarships = [
    {
      id: 'new1',
      name: 'Academic Excellence Scholarship',
      type: 'merit',
      amount: 50000,
      deadline: new Date('2024-02-28'),
      description: 'For students with outstanding academic performance',
      eligibility: ['CGPA > 9.0', 'No backlogs', 'Top 10% of class'],
      maxApplicants: 50
    },
    {
      id: 'new2',
      name: 'Financial Aid Scholarship',
      type: 'need',
      amount: 30000,
      deadline: new Date('2024-02-15'),
      description: 'For students from economically disadvantaged backgrounds',
      eligibility: ['Family income < ₹2,00,000', 'CGPA > 7.0', 'Valid income certificate'],
      maxApplicants: 100
    },
    {
      id: 'new3',
      name: 'Research Innovation Grant',
      type: 'merit',
      amount: 75000,
      deadline: new Date('2024-03-31'),
      description: 'For students engaged in innovative research projects',
      eligibility: ['CGPA > 8.5', 'Published research paper', 'Faculty recommendation'],
      maxApplicants: 25
    }
  ];

  const getFilteredScholarships = () => {
    let filtered = scholarships;
    
    if (filter !== 'all') {
      filtered = filtered.filter(scholarship => 
        filter === 'type' ? true : scholarship.status === filter
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(scholarship => 
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-600" />;
      case 'under_review':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'under_review':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'merit':
        return 'bg-blue-100 text-blue-700';
      case 'need':
        return 'bg-green-100 text-green-700';
      case 'sports':
        return 'bg-purple-100 text-purple-700';
      case 'cultural':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleApplyScholarship = (scholarship: any) => {
    // Check eligibility before applying
    const currentCGPA = 8.4; // This would come from user data
    const hasBacklogs = false; // This would come from user data
    
    // Simple eligibility check
    let eligible = true;
    let eligibilityMessage = '';
    
    for (const criteria of scholarship.eligibility) {
      if (criteria.includes('CGPA > 9.0') && currentCGPA <= 9.0) {
        eligible = false;
        eligibilityMessage = 'Your current CGPA (8.4) does not meet the minimum requirement of 9.0';
        break;
      }
      if (criteria.includes('CGPA > 8.5') && currentCGPA <= 8.5) {
        eligible = false;
        eligibilityMessage = 'Your current CGPA (8.4) does not meet the minimum requirement of 8.5';
        break;
      }
    }
    
    if (!eligible) {
      alert(`Application cannot be submitted: ${eligibilityMessage}`);
      return;
    }
    
    const confirmApplication = window.confirm(
      `Are you sure you want to apply for ${scholarship.name}?\n\nAmount: ₹${scholarship.amount.toLocaleString()}\nDeadline: ${scholarship.deadline.toLocaleDateString()}\n\nThis action cannot be undone.`
    );
    
    if (!confirmApplication) return;
    
    const newApplication = {
      id: (scholarships.length + 1).toString(),
      name: scholarship.name,
      type: scholarship.type,
      amount: scholarship.amount,
      status: 'applied' as const,
      applicationDate: new Date(),
      deadline: scholarship.deadline,
      description: scholarship.description,
      eligibility: scholarship.eligibility
    };

    setScholarships([newApplication, ...scholarships]);
    setShowApplicationForm(false);
    setSelectedScholarship(null);
    alert(`Application submitted successfully for ${scholarship.name}! You will receive updates via email and notifications.`);
  };

  const appliedCount = scholarships.filter(s => s.status === 'applied').length;
  const approvedCount = scholarships.filter(s => s.status === 'approved').length;
  const underReviewCount = scholarships.filter(s => s.status === 'under_review').length;
  const totalAmount = scholarships.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Scholarships</h1>
        <p className="text-yellow-100">Apply for scholarships and track your application status to support your education.</p>
      </div>

      {/* Scholarship Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Applied</p>
              <p className="text-2xl font-bold text-blue-600">{appliedCount + underReviewCount + approvedCount}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Under Review</p>
              <p className="text-2xl font-bold text-orange-600">{underReviewCount}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">₹{totalAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Scholarships */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Scholarships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableScholarships.map((scholarship) => (
            <div key={scholarship.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(scholarship.type)}`}>
                    {scholarship.type.charAt(0).toUpperCase() + scholarship.type.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">₹{scholarship.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Amount</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{scholarship.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{scholarship.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {scholarship.deadline.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Target className="h-4 w-4" />
                  <span>Max: {scholarship.maxApplicants} applicants</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-medium text-gray-700 mb-2">Eligibility:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {scholarship.eligibility.slice(0, 2).map((criteria, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{criteria}</span>
                    </li>
                  ))}
                  {scholarship.eligibility.length > 2 && (
                    <li className="text-gray-500">+{scholarship.eligibility.length - 2} more</li>
                  )}
                </ul>
              </div>

              <button
                onClick={() => {
                  setSelectedScholarship(scholarship);
                  setShowApplicationForm(true);
                }}
                className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Apply for Scholarship</h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedScholarship.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{selectedScholarship.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium ml-2">₹{selectedScholarship.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium ml-2">{selectedScholarship.deadline.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Eligibility Criteria</h4>
                <ul className="space-y-2">
                  {selectedScholarship.eligibility.map((criteria: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Important Notice</p>
                    <p className="text-yellow-700">
                      By applying, you confirm that you meet all eligibility criteria. 
                      False information may result in application rejection and disciplinary action.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => handleApplyScholarship(selectedScholarship)}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Submit Application
                </button>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">All Applications</option>
                <option value="applied">Applied</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* My Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scholarship
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
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
              {getFilteredScholarships().map((scholarship) => (
                <tr key={scholarship.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-yellow-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{scholarship.name}</div>
                        <div className="text-sm text-gray-500">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(scholarship.type)}`}>
                            {scholarship.type.charAt(0).toUpperCase() + scholarship.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{scholarship.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {scholarship.applicationDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Deadline: {scholarship.deadline.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(scholarship.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(scholarship.status)}`}>
                        {scholarship.status.replace('_', ' ').charAt(0).toUpperCase() + scholarship.status.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getFilteredScholarships().length === 0 && (
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No scholarship applications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;