
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-4 sm:py-0 gap-4 sm:gap-0">
            <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl font-bold text-blue-800">KOSES</h1>
                <p className="text-xs text-indigo-700">Kenya Online Student Evaluation System</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="text-center sm:text-right">
                <p className="text-sm font-medium text-gray-900">{user?.profile?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.profile?.role}</p>
              </div>
              <Button 
                onClick={logout}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 w-full sm:w-auto"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
