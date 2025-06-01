
import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', username: 'dewton', role: 'student', name: 'Dewton Osoro', class: 'Form 1A' },
  { id: '2', username: 'teacher1', role: 'teacher', name: 'Mary Wanjiku' },
  { id: '3', username: 'admin', role: 'administrator', name: 'John Kamau' },
  { id: '4', username: 'jane', role: 'student', name: 'Jane Achieng', class: 'Form 1A' },
  { id: '5', username: 'peter', role: 'student', name: 'Peter Mwangi', class: 'Form 1A' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string, role: User['role']) => {
    // Simple mock authentication
    const foundUser = mockUsers.find(u => u.username === username && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
