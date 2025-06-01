
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../components/LoginScreen';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';
import ClassPerformanceDashboard from '../components/ClassPerformanceDashboard';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <LoginScreen />;
  }

  switch (user.role) {
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
