
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../components/LoginScreen';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';
import ClassPerformanceDashboard from '../components/ClassPerformanceDashboard';

const Index = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-koses-blue-50 via-white to-koses-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-koses-blue-600 mx-auto mb-4"></div>
          <p className="text-koses-blue-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !user.profile) {
    return <LoginScreen />;
  }

  switch (user.profile.role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'administrator':
      return <ClassPerformanceDashboard />;
    default:
      return <LoginScreen />;
  }
};

export default Index;
