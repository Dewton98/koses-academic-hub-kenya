
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockStudents } from '../data/mockData';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  
  // Find the student's data
  const studentData = mockStudents.find(s => s.name === user?.name);
  
  if (!studentData) {
    return (
      <Layout title="Student Dashboard">
        <div className="text-center py-8">
          <p className="text-gray-500">Student data not found</p>
        </div>
      </Layout>
    );
  }

  const getRankDisplay = (rank: number, total: number) => {
    const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
    return `${rank}${suffix} of ${total}`;
  };

  const getGradeColor = (score: number) => {
    if (score >= 80) return 'bg-koses-green-100 text-koses-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Layout title="Student Dashboard">
      <div className="space-y-6">
        {/* Student Info Card */}
        <Card className="bg-gradient-to-r from-koses-blue-500 to-koses-green-500 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Welcome, {studentData.name}!</CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-koses-blue-100">Class: {studentData.class}</p>
              <div className="flex items-center gap-4">
                <p className="text-koses-blue-100">
                  Overall Average: <span className="font-bold text-white">{studentData.average.toFixed(1)}%</span>
                </p>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Rank: {getRankDisplay(studentData.rank, mockStudents.length)}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Term Filter */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Academic Performance</h3>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-40 border-koses-blue-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Term 1">Term 1</SelectItem>
              <SelectItem value="Term 2">Term 2</SelectItem>
              <SelectItem value="Term 3">Term 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subjects Performance */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studentData.subjects.map((subject, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-koses-blue-800">{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-900">{subject.score}%</div>
                  <Badge className={getGradeColor(subject.score)}>
                    {subject.score >= 80 ? 'Excellent' : 
                     subject.score >= 70 ? 'Good' : 
                     subject.score >= 60 ? 'Average' : 'Needs Improvement'}
                  </Badge>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-koses-blue-500 to-koses-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.score}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Tips */}
        <Card className="bg-koses-green-50 border-koses-green-200">
          <CardHeader>
            <CardTitle className="text-koses-green-800">Performance Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-koses-green-700">
                  Focus on subjects scoring below 70% for improvement
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-koses-green-700">
                  Maintain your strong performance in high-scoring subjects
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-koses-green-700">
                  Seek help from teachers for challenging topics
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-koses-green-700">
                  Practice regularly to improve your class ranking
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
