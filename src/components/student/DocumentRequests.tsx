import React, { useState, useEffect } from 'react';
import { FileText, Download, Clock, CheckCircle, XCircle, Plus, Upload } from 'lucide-react';
import { useRealtimeDocuments } from '../../hooks/useRealtimeData';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import FileUpload from '../common/FileUpload';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  request_date: string;
  approval_date?: string;
  download_url?: string;
  description?: string;
  fees: number;
  estimated_days?: number;
}

export default function DocumentRequests() {
  const { documents, loading } = useRealtimeDocuments();
  const { user } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newRequest, setNewRequest] = useState({
    name: '',
    type: '',
    description: '',
    attachments: [] as string[]
  });

  const documentTypes = [
    'Transcript',
    'Degree Certificate',
    'Character Certificate',
    'Bonafide Certificate',
    'Transfer Certificate',
    'Migration Certificate'
  ];

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          name: newRequest.name,
          type: newRequest.type,
          description: newRequest.description,
          status: 'pending',
          request_date: new Date().toISOString(),
          fees: getDocumentFee(newRequest.type),
          estimated_days: getEstimatedDays(newRequest.type)
        });

      if (error) throw error;

      setShowRequestForm(false);
      setNewRequest({ name: '', type: '', description: '', attachments: [] });
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getDocumentFee = (type: string): number => {
    const fees: { [key: string]: number } = {
      'Transcript': 500,
      'Degree Certificate': 1000,
      'Character Certificate': 100,
      'Bonafide Certificate': 50,
      'Transfer Certificate': 200,
      'Migration Certificate': 300
    };
    return fees[type] || 100;
  };

  const getEstimatedDays = (type: string): number => {
    const days: { [key: string]: number } = {
      'Transcript': 7,
      'Degree Certificate': 14,
      'Character Certificate': 3,
      'Bonafide Certificate': 2,
      'Transfer Certificate': 5,
      'Migration Certificate': 10
    };
    return days[type] || 5;
  };

  const handleFileUpload = (url: string, fileName: string) => {
    setNewRequest(prev => ({
      ...prev,
      attachments: [...prev.attachments, url]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Document Requests</h2>
        <button
          onClick={() => setShowRequestForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Document
        </button>
      </div>

      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Request New Document</h3>
            <form onSubmit={handleSubmitRequest}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select
                  value={newRequest.type}
                  onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select document type</option>
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose/Description
                </label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the purpose for this document..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supporting Documents (Optional)
                </label>
                <FileUpload
                  onUpload={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={5}
                  bucket="documents"
                  folder="requests"
                />
                {newRequest.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {newRequest.attachments.map((url, index) => (
                      <div key={index} className="text-xs text-green-600 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        File {index + 1} uploaded successfully
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {documents && documents.length > 0 ? (
          documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <FileText className="w-8 h-8 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{doc.type}</p>
                    {doc.description && (
                      <p className="text-sm text-gray-700 mb-3">{doc.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Requested: {new Date(doc.request_date).toLocaleDateString()}</span>
                      {doc.estimated_days && (
                        <span>Est. {doc.estimated_days} days</span>
                      )}
                      {doc.fees > 0 && (
                        <span>Fee: ₹{doc.fees}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(doc.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                  {doc.status === 'approved' && doc.download_url && (
                    <button className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Document Requests</h3>
            <p className="text-gray-600 mb-4">You haven't requested any documents yet.</p>
            <button
              onClick={() => setShowRequestForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Your First Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
}