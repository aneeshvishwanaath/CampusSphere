import React, { useState, useEffect } from 'react';
import { Users, Save, Download, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useSupabaseData } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';

interface Student {
  id: string;
  name: string;
  student_id: string;
  email: string;
}

interface AcademicRecord {
  id: string;
  user_id: string;
  subject: string;
  marks: number;
  max_marks: number;
  attendance: number;
}

export default function MarksAttendance() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSemester] = useState('');
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { data: students = [], loading: studentsLoading } = useSupabaseData<Student[]>(
    'users',
    { 
      filters: [{ column: 'role', operator: 'eq', value: 'student' }],
      select: 'id, name, student_id, email'
    }
  );

  const { data: records = [] } = useSupabaseData<AcademicRecord[]>(
    'academic_records',
    {
      filters: selectedSubject ? [
        { column: 'subject', operator: 'eq', value: selectedSubject },
        { column: 'semester', operator: 'eq', value: selectedSemester }
      ] : [],
      select: '*'
    }
  );

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Psychology'
  ];

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  useEffect(() => {
    // Initialize marks and attendance from existing records
    const marksData: Record<string, number> = {};
    const attendanceData: Record<string, boolean> = {};
    
    records.forEach(record => {
      marksData[record.user_id] = record.marks;
      attendanceData[record.user_id] = record.attendance > 75;
    });
    
    setMarks(marksData);
    setAttendance(attendanceData);
  }, [records]);

  const handleMarksChange = (studentId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 100) {
      setMarks(prev => ({ ...prev, [studentId]: numValue }));
    }
  };

  const handleAttendanceToggle = (studentId: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  const handleSaveMarks = async () => {
    if (!selectedSubject || !selectedSemester) {
      alert('Please select subject and semester');
      return;
    }

    setLoading(true);
    try {
      const updates = students.map(student => ({
        user_id: student.id,
        subject: selectedSubject,
        subject_code: selectedSubject.substring(0, 3).toUpperCase() + '101',
        credits: 3,
        grade: marks[student.id] >= 90 ? 'A+' : marks[student.id] >= 80 ? 'A' : 
               marks[student.id] >= 70 ? 'B+' : marks[student.id] >= 60 ? 'B' : 'C',
        marks: marks[student.id] || 0,
        max_marks: 100,
        semester: selectedSemester,
        year: '2024',
        teacher: 'Current Teacher',
        attendance: attendance[student.id] ? 85 : 65
      }));

      const { error } = await supabase
        .from('academic_records')
        .upsert(updates, { onConflict: 'user_id,subject,semester' });

      if (error) throw error;

      setSuccess('Marks and attendance saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving marks:', error);
      alert('Failed to save marks and attendance');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const csvData = students.map(student => ({
      'Student ID': student.student_id,
      'Name': student.name,
      'Email': student.email,
      'Marks': marks[student.id] || 0,
      'Attendance': attendance[student.id] ? 'Present' : 'Absent',
      'Subject': selectedSubject,
      'Semester': selectedSemester
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marks_attendance_${selectedSubject}_${selectedSemester}.csv`;
    a.click();
  };

  if (studentsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Marks & Attendance</h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportData}
            disabled={!selectedSubject || students.length === 0}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={handleSaveMarks}
            disabled={loading || !selectedSubject || !selectedSemester}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-800">{success}</p>
          </div>
        </div>
      )}

      {/* Subject and Semester Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Semester</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      {selectedSubject && selectedSemester && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedSubject} - Semester {selectedSemester}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {students.length} students enrolled
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks (out of 100)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.student_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks[student.id] || ''}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAttendanceToggle(student.id)}
                        className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          attendance[student.id]
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {attendance[student.id] ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Present
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Absent
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedSubject && selectedSemester && students.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
          <p className="text-gray-600">
            No students are enrolled for {selectedSubject} in Semester {selectedSemester}.
          </p>
        </div>
      )}
    </div>
  );
}