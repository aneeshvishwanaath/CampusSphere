import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  Calendar, 
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  MessageSquare
} from 'lucide-react';

const ChildPerformance: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  
  const childData = {
    name: 'John Doe',
    rollNumber: 'CS21001',
    class: 'Computer Science - Semester 6',
    currentCGPA: 8.4,
    currentSGPA: 8.2,
    rank: 8,
    totalStudents: 45,
    attendance: 92
  };

  const semesterData = [
    { semester: 'Semester 1', sgpa: 7.8, cgpa: 7.8, credits: 20, rank: 12 },
    { semester: 'Semester 2', sgpa: 8.1, cgpa: 7.95, credits: 20, rank: 10 },
    { semester: 'Semester 3', sgpa: 8.3, cgpa: 8.07, credits: 22, rank: 9 },
    { semester: 'Semester 4', sgpa: 8.5, cgpa: 8.18, credits: 22, rank: 8 },
    { semester: 'Semester 5', sgpa: 8.0, cgpa: 8.14, credits: 20, rank: 9 },
    { semester: 'Semester 6', sgpa: 8.2, cgpa: 8.4, credits: 20, rank: 8 }
  ];

  const currentSubjects = [
    {
      subject: 'Data Structures',
      code: 'CS201',
      teacher: 'Dr. Sarah Wilson',
      marks: 85,
      maxMarks: 100,
      grade: 'A',
      attendance: 94,
      assignments: { completed: 8, total: 10 }
    },
    {
      subject: 'Computer Networks',
      code: 'CS301',
      teacher: 'Prof. Michael Brown',
      marks: 78,
      maxMarks: 100,
      grade: 'B+',
      attendance: 88,
      assignments: { completed: 7, total: 8 }
    },
    {
      subject: 'Database Systems',
      code: 'CS401',
      teacher: 'Dr. Lisa Wang',
      marks: 92,
      maxMarks: 100,
      grade: 'A+',
      attendance: 96,
      assignments: { completed: 9, total: 9 }
    },
    {
      subject: 'Software Engineering',
      code: 'CS501',
      teacher: 'Prof. David Chen',
      marks: 81,
      maxMarks: 100,
      grade: 'A-',
      attendance: 90,
      assignments: { completed: 6, total: 7 }
    }
  ];

  const teacherFeedback = [
    {
      teacher: 'Dr. Sarah Wilson',
      subject: 'Data Structures',
      feedback: 'John shows excellent problem-solving skills and actively participates in class discussions. His understanding of complex algorithms is commendable.',
      date: '2024-01-10',
      rating: 'excellent'
    },
    {
      teacher: 'Prof. Michael Brown',
      subject: 'Computer Networks',
      feedback: 'Good grasp of networking concepts. Needs to improve punctuality for lab sessions. Overall performance is satisfactory.',
      date: '2024-01-08',
      rating: 'good'
    },
    {
      teacher: 'Dr. Lisa Wang',
      subject: 'Database Systems',
      feedback: 'Outstanding performance in database design projects. Shows creativity and technical depth in assignments.',
      date: '2024-01-05',
      rating: 'excellent'
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'average':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-red-600 bg-red-100';
    }
  };

  const handleDownloadReport = () => {
    const reportData = {
      student: childData.name,
      cgpa: childData.currentCGPA,
      rank: `${childData.rank}/${childData.totalStudents}`,
      attendance: `${childData.attendance}%`,
      subjects: currentSubjects,
      feedback: teacherFeedback,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${childData.name.replace(' ', '_')}_performance_report.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleContactTeacher = (teacherName: string) => {
    const subject = prompt(`Enter subject for message to ${teacherName}:`);
    if (subject) {
      const message = prompt('Enter your message:');
      if (message) {
        console.log('Sending message:', { to: teacherName, subject, message });
        alert(`Message sent successfully to ${teacherName}!`);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{childData.name}'s Performance</h1>
            <p className="text-orange-100">Track your child's academic progress, attendance, and teacher feedback.</p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Current CGPA</p>
              <p className="text-2xl font-bold text-green-600">{childData.currentCGPA}</p>
              <p className="text-xs text-gray-500">Out of 10.0</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Class Rank</p>
              <p className="text-2xl font-bold text-purple-600">{childData.rank}/{childData.totalStudents}</p>
              <p className="text-xs text-gray-500">Top {Math.round((childData.rank / childData.totalStudents) * 100)}%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Attendance</p>
              <p className="text-2xl font-bold text-blue-600">{childData.attendance}%</p>
              <p className="text-xs text-gray-500">Overall Average</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Current SGPA</p>
              <p className="text-2xl font-bold text-orange-600">{childData.currentSGPA}</p>
              <p className="text-xs text-gray-500">This Semester</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Academic Progress Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Progress Over Time</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">CGPA Trend</h3>
            <div className="space-y-3">
              {semesterData.map((sem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{sem.semester}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">SGPA: {sem.sgpa}</span>
                    <span className="text-sm font-medium text-green-600">CGPA: {sem.cgpa}</span>
                    <span className="text-xs text-gray-500">Rank: {sem.rank}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">Performance Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Improving Trend</span>
                </div>
                <p className="text-sm text-green-700">CGPA has improved consistently over the last 3 semesters.</p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Strong Performance</span>
                </div>
                <p className="text-sm text-blue-700">Consistently ranking in top 20% of the class.</p>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Focus Area</span>
                </div>
                <p className="text-sm text-orange-700">Attendance could be improved in some subjects.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Subjects Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Current Semester Performance</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSubjects.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subject.subject}</div>
                      <div className="text-sm text-gray-500">{subject.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{subject.teacher}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {subject.marks}/{subject.maxMarks}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((subject.marks / subject.maxMarks) * 100)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(subject.grade)}`}>
                      {subject.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{subject.attendance}%</div>
                      <div className={`ml-2 w-16 bg-gray-200 rounded-full h-2 ${
                        subject.attendance >= 75 ? 'bg-green-200' : 'bg-red-200'
                      }`}>
                        <div 
                          className={`h-2 rounded-full ${
                            subject.attendance >= 75 ? 'bg-green-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min(subject.attendance, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {subject.assignments.completed}/{subject.assignments.total}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((subject.assignments.completed / subject.assignments.total) * 100)}% Complete
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleContactTeacher(subject.teacher)}
                      className="flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Feedback */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Teacher Feedback</h2>
        <div className="space-y-4">
          {teacherFeedback.map((feedback, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{feedback.teacher}</h3>
                  <p className="text-sm text-gray-600">{feedback.subject}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRatingColor(feedback.rating)}`}>
                    {feedback.rating.charAt(0).toUpperCase() + feedback.rating.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">{new Date(feedback.date).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{feedback.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-6 w-6 text-orange-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Download Report Card</div>
              <div className="text-xs text-gray-500">Get detailed performance report</div>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Schedule PTM</div>
              <div className="text-xs text-gray-500">Book parent-teacher meeting</div>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">View Analytics</div>
              <div className="text-xs text-gray-500">Detailed performance analytics</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildPerformance;