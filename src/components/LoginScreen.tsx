
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Flag } from 'lucide-react';
import { toast } from 'sonner';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'administrator'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(username, password, role);
      if (success) {
        toast.success('Login successful!');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-koses-blue-50 via-white to-koses-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl animate-fade-in">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-koses-blue-600 p-3 rounded-full mr-3">
              <Flag className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-koses-blue-800">KOSES</CardTitle>
              <CardDescription className="text-koses-green-700 font-medium">
                Kenya Online Student Evaluation System
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-koses-blue-200 focus:border-koses-blue-500 focus:ring-koses-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-koses-blue-200 focus:border-koses-blue-500 focus:ring-koses-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger className="border-koses-blue-200 focus:border-koses-blue-500 focus:ring-koses-blue-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-koses-blue-600 hover:bg-koses-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-koses-green-50 rounded-lg">
            <p className="text-sm text-koses-green-800 font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-koses-green-700 space-y-1">
              <div>Student: dewton / password</div>
              <div>Teacher: teacher1 / password</div>
              <div>Admin: admin / password</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
