
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface AuthUser extends User {
  profile?: {
    username: string;
    name: string;
    role: 'student' | 'teacher' | 'administrator';
    class?: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  login: (username: string, password: string, role: 'student' | 'teacher' | 'administrator') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, name, role, class')
            .eq('id', session.user.id)
            .single();
          
          setUser({
            ...session.user,
            profile: profile || undefined
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        // The auth state change listener will handle fetching the profile
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (username: string, password: string, role: 'student' | 'teacher' | 'administrator') => {
    try {
      // For demo purposes, we'll use mock authentication with the existing mock users
      const mockUsers = [
        { id: '1', username: 'dewton', role: 'student', name: 'Dewton Osoro', class: 'Form 1A' },
        { id: '2', username: 'teacher1', role: 'teacher', name: 'Mary Wanjiku' },
        { id: '3', username: 'admin', role: 'administrator', name: 'John Kamau' },
        { id: '4', username: 'jane', role: 'student', name: 'Jane Achieng', class: 'Form 1A' },
        { id: '5', username: 'peter', role: 'student', name: 'Peter Mwangi', class: 'Form 1A' },
      ];

      const foundUser = mockUsers.find(u => u.username === username && u.role === role);
      if (foundUser) {
        // Create a mock session for demo
        const mockUser: AuthUser = {
          id: foundUser.id,
          email: `${username}@example.com`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          aud: 'authenticated',
          profile: {
            username: foundUser.username,
            name: foundUser.name,
            role: foundUser.role as 'student' | 'teacher' | 'administrator',
            class: foundUser.class
          }
        };
        
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      login,
      logout,
      isAuthenticated: !!user,
      loading
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
