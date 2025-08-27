import React from 'react';
import {
  TrendingUp,
  CreditCard,
  Calendar,
  MessageSquare,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const ParentDashboard: React.FC = () => {
  const childStats = [
    {
      title: 'Current CGPA',
      value: '8.4',
      change: 'Excellent',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Attendance',
      value: '92%',
      change: 'Good standing',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Fees',
      value: '₹25,000',
      change: 'Due Jan 15',
      changeType: 'warning',
      icon: CreditCard,
      color: 'bg-orange-500'
    },
    {
      title: 'Rank in Class',
      value: '8/45',
      change: 'Top 20%',
      changeType: 'positive',
      icon: Award,
      color: 'bg-purple-500'
    }
  ];

  const recentGrades = [
    { subject: 'Data Structures', marks: 85, grade: 'A', date: 'Jan 10, 2024' },
    { subject: 'Computer Networks', marks: 78, grade: 'B+', date: 'Jan 08, 2024' },
    { subject: 'Database Systems', marks: 92, grade: 'A+', date: 'Jan 05, 2024' },
    { subject: 'Software Engineering', marks: 81, grade: 'A-', date: 'Jan 03, 2024' }
  ];

  const teacherFeedback = [
    {
      teacher: 'Dr. Sarah Wilson',
      subject: 'Data Structures',
      feedback: 'John shows excellent problem-solving skills and active participation in class.',
      date: '2 days ago',
      type: 'positive'
    },
    {
      teacher: 'Prof. Michael Chen',
      subject: 'Computer Networks',
      feedback: 'Good understanding of concepts. Needs to improve assignment submission timing.',
      date: '1 week ago',
      type: 'neutral'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Parent-Teacher Meeting',
      date: 'Jan 22, 2024',
      time: '10:00 AM',
      type: 'meeting'
    },
    {
      title: 'Mid-term Exams',
      date: 'Jan 25-30, 2024',
      time: 'All day',
      type: 'exam'
    },
    {
      title: 'Fee Payment Due',
      date: 'Jan 15, 2024',
      time: 'Before 5:00 PM',
      type: 'payment'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">John's Academic Progress</h1>
        <p className="text-orange-100">Stay connected with your child's educational journey.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {childStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'warning' ? 'text-orange-600' : 'text-gray-600'
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Grades */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Academic Performance</h2>
          <div className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{grade.subject}</h3>
                  <p className="text-sm text-gray-600">{grade.date}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{grade.marks}/100</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    grade.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                    grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {grade.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.type === 'exam' ? 'bg-red-100 text-red-700' :
                    event.type === 'payment' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                <p className="text-xs text-gray-600">{event.date}</p>
                <p className="text-xs text-gray-500">{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Feedback */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Teacher Feedback</h2>
        <div className="space-y-4">
          {teacherFeedback.map((feedback, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{feedback.teacher}</p>
                  <p className="text-sm text-gray-600">{feedback.subject}</p>
                </div>
                <span className="text-xs text-gray-500">{feedback.date}</span>
              </div>
              <p className="text-sm text-gray-700">{feedback.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Pay Fees', icon: CreditCard, color: 'bg-orange-500' },
            { label: 'View Report Card', icon: TrendingUp, color: 'bg-green-500' },
            { label: 'Contact Teacher', icon: MessageSquare, color: 'bg-blue-500' },
            { label: 'Academic Calendar', icon: Calendar, color: 'bg-purple-500' }
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
    </div>
  );
};

export default ParentDashboard;