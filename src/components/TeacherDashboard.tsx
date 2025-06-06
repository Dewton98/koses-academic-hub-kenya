import React, { useState } from 'react';
import { mockStudents } from '../data/mockData';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import ClassSubjectSummary from './class/ClassSubjectSummary';

const TeacherDashboard = () => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('Form 1A');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName || !subject || !score) {
      toast.error('Please fill in all fields');
      return;
    }

    const scoreNum = parseInt(score);
    if (scoreNum < 0 || scoreNum > 100) {
      toast.error('Score must be between 0 and 100');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Score added successfully for ${studentName} in ${subject}`);
      setStudentName('');
      setSubject('');
      setScore('');
      setIsSubmitting(false);
    }, 1000);
  };

  const getRankDisplay = (rank: number, total: number) => {
    const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
    return `${rank}${suffix}`;
  };

  const getPerformanceBadge = (average: number) => {
    if (average >= 80) return { label: 'Excellent', className: 'bg-koses-green-100 text-koses-green-800' };
    if (average >= 70) return { label: 'Good', className: 'bg-blue-100 text-blue-800' };
    if (average >= 60) return { label: 'Average', className: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Needs Support', className: 'bg-red-100 text-red-800' };
  };

  return (
    <Layout title="Teacher Dashboard">
      <div className="space-y-6">
        {/* Add Student Score Form */}
        <Card className="bg-gradient-to-r from-koses-blue-50 to-koses-green-50 border-koses-blue-200">
          <CardHeader>
            <CardTitle className="text-koses-blue-800">Add Student Score</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Student Name</label>
                <Input
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="border-koses-blue-200 focus:border-koses-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Class</label>
                <Select value={studentClass} onValueChange={setStudentClass}>
                  <SelectTrigger className="border-koses-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Form 1A">Form 1A</SelectItem>
                    <SelectItem value="Form 1B">Form 1B</SelectItem>
                    <SelectItem value="Form 2A">Form 2A</SelectItem>
                    <SelectItem value="Form 2B">Form 2B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="border-koses-blue-200">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Kiswahili">Kiswahili</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Score</label>
                <Input
                  type="number"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="border-koses-blue-200 focus:border-koses-blue-500"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-koses-blue-600 hover:bg-koses-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Score'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Class Subject Performance Summary */}
        <ClassSubjectSummary 
          className="Form 1A" 
          students={mockStudents}
        />

        {/* Class Rankings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-koses-blue-800">Form 1A - Student Rankings</CardTitle>
            <Badge variant="outline" className="border-koses-green-500 text-koses-green-700">
              {mockStudents.length} Students
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Rank</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Student Name</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Average Score</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Performance</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents
                    .sort((a, b) => b.average - a.average)
                    .map((student, index) => {
                      const performance = getPerformanceBadge(student.average);
                      return (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              <span className="font-bold text-koses-blue-600">
                                {getRankDisplay(index + 1, mockStudents.length)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-2 font-medium text-gray-900">{student.name}</td>
                          <td className="py-3 px-2">
                            <span className="text-lg font-semibold text-koses-blue-700">
                              {student.average.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <Badge className={performance.className}>
                              {performance.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex flex-wrap gap-1">
                              {student.subjects.slice(0, 3).map((subject, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                >
                                  {subject.name.split(' ')[0]}: {subject.score}%
                                </span>
                              ))}
                              {student.subjects.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{student.subjects.length - 3} more
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-koses-blue-50 border-koses-blue-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-koses-blue-700">
                {mockStudents.length}
              </div>
              <div className="text-sm text-koses-blue-600">Total Students</div>
            </CardContent>
          </Card>
          
          <Card className="bg-koses-green-50 border-koses-green-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-koses-green-700">
                {(mockStudents.reduce((sum, s) => sum + s.average, 0) / mockStudents.length).toFixed(1)}%
              </div>
              <div className="text-sm text-koses-green-600">Class Average</div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-700">
                {mockStudents.filter(s => s.average >= 70).length}
              </div>
              <div className="text-sm text-yellow-600">Above 70%</div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-700">
                {mockStudents.filter(s => s.average < 60).length}
              </div>
              <div className="text-sm text-red-600">Need Support</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
