import React from 'react';
import { useState } from 'react';
import {
  Users,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  School,
  Calendar,
  FileText,
  Mail,
  Activity,
  DollarSign,
  CheckCircle,
  Clock
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  
  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+12 this month',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Faculty Members',
      value: '156',
      change: '3 new hires',
      changeType: 'positive',
      icon: School,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Applications',
      value: '23',
      change: 'Requires review',
      changeType: 'warning',
      icon: FileText,
      color: 'bg-orange-500'
    },
    {
      title: 'System Alerts',
      value: '5',
      change: '2 critical',
      changeType: 'error',
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  const analyticsData = {
    userGrowth: [
      { month: 'Aug', students: 2650, faculty: 145, staff: 89 },
      { month: 'Sep', students: 2720, faculty: 148, staff: 92 },
      { month: 'Oct', students: 2780, faculty: 152, staff: 94 },
      { month: 'Nov', students: 2820, faculty: 154, staff: 96 },
      { month: 'Dec', students: 2847, faculty: 156, staff: 98 }
    ],
    systemHealth: {
      uptime: '99.8%',
      responseTime: '245ms',
      activeUsers: 1247,
      storageUsed: '78%'
    },
    financialOverview: {
      totalRevenue: 12450000,
      pendingFees: 2340000,
      scholarshipsAwarded: 890000,
      operationalCosts: 8760000
    }
  };

  const departmentStats = [
    { name: 'Computer Science', students: 856, faculty: 45, avg_performance: 8.2 },
    { name: 'Electronics', students: 623, faculty: 32, avg_performance: 7.9 },
    { name: 'Mechanical', students: 734, faculty: 38, avg_performance: 7.6 },
    { name: 'Civil', students: 445, faculty: 28, avg_performance: 7.8 },
    { name: 'Chemical', students: 189, faculty: 13, avg_performance: 8.0 }
  ];

  const recentActivities = [
    {
      title: 'New Student Enrollment',
      description: '45 students enrolled for Spring 2024',
      time: '2 hours ago',
      type: 'success'
    },
    {
      title: 'Faculty Meeting Scheduled',
      description: 'Department heads meeting on Jan 20',
      time: '4 hours ago',
      type: 'info'
    },
    {
      title: 'System Maintenance',
      description: 'Scheduled for this weekend',
      time: '6 hours ago',
      type: 'warning'
    },
    {
      title: 'Graduation Ceremony',
      description: 'Planning committee formed',
      time: '1 day ago',
      type: 'info'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-red-100">Comprehensive overview of campus operations and management.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'warning' ? 'text-orange-600' :
                    stat.changeType === 'error' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Uptime</span>
              </div>
              <span className="text-sm font-semibold text-green-600">{analyticsData.systemHealth.uptime}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">Response Time</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">{analyticsData.systemHealth.responseTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">Active Users</span>
              </div>
              <span className="text-sm font-semibold text-purple-600">{analyticsData.systemHealth.activeUsers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-gray-600">Storage Used</span>
              </div>
              <span className="text-sm font-semibold text-orange-600">{analyticsData.systemHealth.storageUsed}</span>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="text-sm font-semibold text-green-600">
                  ₹{(analyticsData.financialOverview.totalRevenue / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Pending Fees</span>
                <span className="text-sm font-semibold text-orange-600">
                  ₹{(analyticsData.financialOverview.pendingFees / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Scholarships</span>
                <span className="text-sm font-semibold text-blue-600">
                  ₹{(analyticsData.financialOverview.scholarshipsAwarded / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* User Growth Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trend</h2>
          <div className="space-y-3">
            {analyticsData.userGrowth.slice(-3).map((data, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{data.month}</span>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="text-blue-600">{data.students}S</span>
                  <span className="text-green-600">{data.faculty}F</span>
                  <span className="text-purple-600">{data.staff}St</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">+3.2% growth this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-sm font-medium text-gray-600 pb-2">Department</th>
                  <th className="text-left text-sm font-medium text-gray-600 pb-2">Students</th>
                  <th className="text-left text-sm font-medium text-gray-600 pb-2">Faculty</th>
                  <th className="text-left text-sm font-medium text-gray-600 pb-2">Avg Performance</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {departmentStats.map((dept, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-b-0">
                    <td className="py-3">
                      <p className="text-sm font-medium text-gray-900">{dept.name}</p>
                    </td>
                    <td className="py-3 text-sm text-gray-600">{dept.students}</td>
                    <td className="py-3 text-sm text-gray-600">{dept.faculty}</td>
                    <td className="py-3">
                      <span className={`text-sm font-medium ${
                        dept.avg_performance >= 8.0 ? 'text-green-600' :
                        dept.avg_performance >= 7.5 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {dept.avg_performance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Administrative Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'User Management', icon: Users, color: 'bg-blue-500' },
            { label: 'Analytics', icon: BarChart3, color: 'bg-green-500' },
            { label: 'Reports', icon: FileText, color: 'bg-purple-500' },
            { label: 'Academic Calendar', icon: Calendar, color: 'bg-orange-500' },
            { label: 'System Alerts', icon: AlertTriangle, color: 'bg-red-500' },
            { label: 'Communications', icon: Mail, color: 'bg-indigo-500' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className={`p-3 rounded-full ${action.color} mb-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent System Activities */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent System Activities</h2>
        <div className="space-y-3">
          {[
            { action: 'Database Backup', status: 'completed', time: '2 hours ago', type: 'success' },
            { action: 'User Registration Spike', status: 'monitoring', time: '4 hours ago', type: 'info' },
            { action: 'Payment Gateway Update', status: 'in progress', time: '6 hours ago', type: 'warning' },
            { action: 'Security Scan', status: 'completed', time: '1 day ago', type: 'success' },
            { action: 'System Maintenance', status: 'scheduled', time: 'Tomorrow 2 AM', type: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.status}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;