import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Save, 
  Camera,
  Edit,
  Shield,
  Bell,
  Palette
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    department: user?.department || '',
    bio: '',
    website: '',
    linkedin: '',
    twitter: ''
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'Asia/Kolkata',
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    marketingEmails: false
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Profile updated successfully!');
    }, 1500);
  };

  const handleSavePreferences = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      alert('Preferences saved successfully!');
    }, 1000);
  };

  const handleAvatarUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Uploading avatar:', file.name);
        alert('Avatar upload would be implemented with Supabase Storage');
      }
    };
    input.click();
  };

  const getRoleColor = (role: string) => {
    const colors = {
      student: 'bg-blue-600',
      teacher: 'bg-green-600',
      staff: 'bg-purple-600',
      parent: 'bg-orange-600',
      admin: 'bg-red-600'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-600';
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full ${getRoleColor(user?.role || '')} flex items-center justify-center text-white font-bold text-xl`}>
              {user?.name?.charAt(0)}
            </div>
            <button
              onClick={handleAvatarUpload}
              className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">{user?.name}</h1>
            <p className="text-indigo-100 capitalize">{user?.role} • {user?.department}</p>
            <p className="text-indigo-200 text-sm">{user?.studentId || user?.employeeId || user?.childId}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    readOnly
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </form>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select
                    value={preferences.theme}
                    onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser notifications' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of weekly activities' },
                  { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional content and updates' }
                ].map((pref) => (
                  <div key={pref.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{pref.label}</p>
                      <p className="text-sm text-gray-600">{pref.desc}</p>
                    </div>
                    <button
                      onClick={() => setPreferences(prev => ({ 
                        ...prev, 
                        [pref.key]: !prev[pref.key as keyof typeof prev] 
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences[pref.key as keyof typeof preferences] ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences[pref.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSavePreferences}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : 'Save Preferences'}</span>
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Security settings would be implemented here</p>
              <p className="text-sm text-gray-400 mt-2">Password change, 2FA, session management</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;