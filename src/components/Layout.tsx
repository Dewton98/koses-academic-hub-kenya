
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Flag } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-koses-blue-50 via-white to-koses-green-50">
      <header className="bg-white shadow-sm border-b border-koses-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-koses-blue-600 p-2 rounded-lg mr-3">
                <Flag className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-koses-blue-800">KOSES</h1>
                <p className="text-xs text-koses-green-700">Kenya Online Student Evaluation System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.profile?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.profile?.role}</p>
              </div>
              <Button 
                onClick={logout}
                variant="outline"
                className="border-koses-blue-300 text-koses-blue-700 hover:bg-koses-blue-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
