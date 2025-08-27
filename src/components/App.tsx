import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import Layout from './Layout';
import Notifications from './Notifications';
import CampusEmail from './common/CampusEmail';

// Student Components
import StudentDashboard from './dashboards/StudentDashboard';
import StudentFeeManagement from './student/FeeManagement';
import AcademicRecords from './student/AcademicRecords';
import StudyMaterials from './student/StudyMaterials';
import DocumentRequests from './student/DocumentRequests';
import Scholarships from './student/Scholarships';
import TimeTable from './student/TimeTable';
import AcademicChatbot from './student/AcademicChatbot';

// Teacher Components
import TeacherDashboard from './dashboards/TeacherDashboard';
import StudentManagement from './teacher/StudentManagement';
import MarksAttendance from './teacher/MarksAttendance';

// Staff Components
import StaffDashboard from './dashboards/StaffDashboard';
import TaskManagement from './staff/TaskManagement';

// Parent Components
import ParentDashboard from './dashboards/ParentDashboard';
import ChildPerformance from './parent/ChildPerformance';

// Parent Components - Add FeeManagement import
import ParentFeeManagement from './parent/FeeManagement';

// Common Components
import ProfileSettings from './common/ProfileSettings';

// Admin Components
import AdminDashboard from './dashboards/AdminDashboard';
import UserManagement from './admin/UserManagement';
import Analytics from './admin/Analytics';

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    // Common pages for all roles
    if (currentPage === 'notifications') return <Notifications />;
    if (currentPage === 'email') return <CampusEmail />;
    if (currentPage === 'profile') return <ProfileSettings />;

    // Role-specific pages
    switch (user?.role) {
      case 'student':
        switch (currentPage) {
          case 'dashboard': return <StudentDashboard />;
          case 'fees': return <StudentFeeManagement />;
          case 'academics': return <AcademicRecords />;
          case 'materials': return <StudyMaterials />;
          case 'documents': return <DocumentRequests />;
          case 'scholarships': return <Scholarships />;
          case 'timetable': return <TimeTable />;
          case 'chatbot': return <AcademicChatbot />;
          default: return <StudentDashboard />;
        }

      case 'teacher':
        switch (currentPage) {
          case 'dashboard': return <TeacherDashboard />;
          case 'students': return <StudentManagement />;
          case 'marks': return <MarksAttendance />;
          case 'materials': return <div className="p-6">Course Materials page coming soon...</div>;
          case 'schedule': return <div className="p-6">Class Schedule page coming soon...</div>;
          case 'payroll': return <div className="p-6">Payroll page coming soon...</div>;
          case 'documents': return <div className="p-6">Documents page coming soon...</div>;
          default: return <TeacherDashboard />;
        }

      case 'staff':
        switch (currentPage) {
          case 'dashboard': return <StaffDashboard />;
          case 'tasks': return <TaskManagement />;
          case 'attendance': return <div className="p-6">Attendance page coming soon...</div>;
          case 'leave': return <div className="p-6">Leave Management page coming soon...</div>;
          case 'payroll': return <div className="p-6">Payroll page coming soon...</div>;
          case 'location': return <div className="p-6">Work Locations page coming soon...</div>;
          case 'documents': return <div className="p-6">Documents page coming soon...</div>;
          default: return <StaffDashboard />;
        }

      case 'parent':
        switch (currentPage) {
          case 'dashboard': return <ParentDashboard />;
          case 'child-performance': return <ChildPerformance />;
          case 'fees': return <ParentFeeManagement />;
          case 'communication': return <div className="p-6">Teacher Communication page coming soon...</div>;
          case 'reports': return <div className="p-6">Progress Reports page coming soon...</div>;
          case 'meetings': return <div className="p-6">PTM Schedule page coming soon...</div>;
          default: return <ParentDashboard />;
        }

      case 'admin':
        switch (currentPage) {
          case 'dashboard': return <AdminDashboard />;
          case 'users': return <UserManagement />;
          case 'analytics': return <Analytics />;
          case 'calendar': return <div className="p-6">Academic Calendar page coming soon...</div>;
          case 'documents': return <div className="p-6">Document Workflow page coming soon...</div>;
          case 'fees-admin': return <div className="p-6">Fee Management page coming soon...</div>;
          case 'communications': return <div className="p-6">Communications page coming soon...</div>;
          case 'security': return <div className="p-6">Security & Access page coming soon...</div>;
          default: return <AdminDashboard />;
        }

      default:
        return <div className="p-6">Page not found</div>;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;