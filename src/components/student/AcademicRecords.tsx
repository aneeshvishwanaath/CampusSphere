import React, { useState } from 'react';
import { useAcademicRecords } from '../../hooks/useSupabaseData';
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  Download, 
  Calendar, 
  Target,
  GraduationCap,
  BarChart3,
  Filter,
  Search,
  Eye
} from 'lucide-react';

const AcademicRecords: React.FC = () => {
  const { data: records, loading, error } = useAcademicRecords();
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock performance data for now - this would come from a separate hook
  const performance = {
    cgpa: 8.4,
    credits: 84,
    rank: 8,
    totalStudents: 45,
    attendance: 92
  };
  const getFilteredRecords = () => {
    let filtered = records || [];
    
    if (filter !== 'all') {
      filtered = filtered.filter(record => record.semester === filter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const calculateSemesterGPA = (semester: string) => {
    const semesterRecords = (records || []).filter(r => r.semester === semester);
    if (semesterRecords.length === 0) return 0;
    
    const totalPoints = semesterRecords.reduce((sum, record) => {
      const gradePoints = record.grade.startsWith('A+') ? 10 : 
                         record.grade.startsWith('A') ? 9 :
                         record.grade.startsWith('B+') ? 8 :
                         record.grade.startsWith('B') ? 7 : 6;
      return sum + (gradePoints * record.credits);
    }, 0);
    
    const totalCredits = semesterRecords.reduce((sum, record) => sum + record.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const semesters = [...new Set((records || []).map(r => r.semester))];

  const handleDownloadTranscript = () => {
    console.log('Downloading transcript...');
    alert('Transcript download would be implemented here');
  };

  const handleViewDetailedReport = () => {
    console.log('Viewing detailed academic report...');
    alert('Detailed academic report would be implemented here');
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Academic Records</h1>
          <p className="text-green-100">Loading your academic information...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Academic Records</h1>
          <p className="text-green-100">Error loading academic information</p>
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
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Academic Records</h1>
        <p className="text-green-100">Track your academic performance, view grades, and download official transcripts.</p>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Current CGPA</p>
              <p className="text-2xl font-bold text-green-600">{performance.cgpa}</p>
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
              <p className="text-sm font-medium text-gray-600 mb-1">Credits Earned</p>
              <p className="text-2xl font-bold text-blue-600">{performance.credits}/120</p>
              <p className="text-xs text-gray-500">{Math.round((performance.credits / 120) * 100)}% Complete</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Class Rank</p>
              <p className="text-2xl font-bold text-purple-600">{performance.rank}/{performance.totalStudents}</p>
              <p className="text-xs text-gray-500">Top {Math.round((performance.rank / performance.totalStudents) * 100)}%</p>
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
              <p className="text-2xl font-bold text-orange-600">{performance.attendance}%</p>
              <p className="text-xs text-gray-500">Overall Average</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Semester-wise Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Semester Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {semesters.map((semester) => {
            const gpa = calculateSemesterGPA(semester);
            const semesterCredits = records
              .filter(r => r.semester === semester)
              .reduce((sum, r) => sum + r.credits, 0);
            
            return (
              <div key={semester} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{semester}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SGPA:</span>
                    <span className="font-semibold">{gpa}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Credits:</span>
                    <span className="font-semibold">{semesterCredits}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subjects:</span>
                    <span className="font-semibold">
                      {records.filter(r => r.semester === semester).length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Semesters</option>
                {semesters.map(semester => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={handleDownloadTranscript}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Transcript</span>
            </button>
          </div>
        </div>
      </div>

      {/* Academic Records Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Subject-wise Performance</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
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
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredRecords().map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.subject}</div>
                      <div className="text-sm text-gray-500">{record.subjectCode} • {record.semester}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{record.credits}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {record.marks}/{record.maxMarks}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((record.marks / record.maxMarks) * 100)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(record.grade)}`}>
                      {record.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{record.attendance}%</div>
                      <div className={`ml-2 w-16 bg-gray-200 rounded-full h-2 ${
                        record.attendance >= 75 ? 'bg-green-200' : 'bg-red-200'
                      }`}>
                        <div 
                          className={`h-2 rounded-full ${
                            record.attendance >= 75 ? 'bg-green-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min(record.attendance, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.teacher}
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

        {getFilteredRecords().length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No academic records found</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleDownloadTranscript}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-6 w-6 text-green-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Download Transcript</div>
              <div className="text-xs text-gray-500">Official academic transcript</div>
            </div>
          </button>

          <button
            onClick={handleViewDetailedReport}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Performance Analysis</div>
              <div className="text-xs text-gray-500">Detailed performance report</div>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-purple-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Academic Calendar</div>
              <div className="text-xs text-gray-500">Important dates & deadlines</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicRecords;