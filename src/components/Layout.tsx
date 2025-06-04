
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-amber-600 p-2 rounded-lg mr-3">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-800">BARKOS 🐕</h1>
                <p className="text-xs text-orange-700">Bark Online Retriever Knowledge System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.profile?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.profile?.role === 'student' ? 'Good Dog' : user?.profile?.role === 'teacher' ? 'Pack Leader' : 'Alpha'}</p>
              </div>
              <Button 
                onClick={logout}
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Woof Out
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
