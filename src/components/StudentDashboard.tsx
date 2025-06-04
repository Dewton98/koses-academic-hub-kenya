
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockStudents } from '../data/mockData';
import { extractFormNumber } from '../utils/subjectUtils';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  
  // Find the student's data using the profile name
  const studentData = mockStudents.find(s => s.name === user?.profile?.name);
  
  if (!studentData) {
    return (
      <Layout title="Student Dashboard">
        <div className="text-center py-8">
          <p className="text-gray-500">Student data not found</p>
        </div>
      </Layout>
    );
  }

  const formNumber = extractFormNumber(studentData.class);
  const isLowerForm = formNumber <= 2;

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

  // Determine grid layout based on number of subjects
  const getGridCols = () => {
    const subjectCount = studentData.subjects.length;
    if (subjectCount <= 6) return 'md:grid-cols-2 lg:grid-cols-3';
    if (subjectCount <= 9) return 'md:grid-cols-3 lg:grid-cols-3';
    return 'md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <Layout title="Student Dashboard">
      <div className="space-y-6">
        {/* Student Info Card */}
        <Card className="bg-gradient-to-r from-koses-blue-500 to-koses-green-500 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Welcome, {studentData.name}!</CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-koses-blue-100">
                Class: {studentData.class} 
                <span className="ml-2 text-sm opacity-90">
                  ({isLowerForm ? '11 subjects' : '8 core subjects'})
                </span>
              </p>
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
          <h3 className="text-lg font-semibold text-gray-900">
            Academic Performance 
            <span className="text-sm text-gray-600 ml-2">
              ({studentData.subjects.length} subjects)
            </span>
          </h3>
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

        {/* Subjects Performance - Dynamic grid based on subject count */}
        <div className={`grid gap-4 ${getGridCols()}`}>
          {studentData.subjects.map((subject, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-koses-blue-800 leading-tight">
                  {subject.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-gray-900">{subject.score}%</div>
                  <Badge className={getGradeColor(subject.score)}>
                    {subject.score >= 80 ? 'A' : 
                     subject.score >= 70 ? 'B' : 
                     subject.score >= 60 ? 'C' : 'D'}
                  </Badge>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
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
            <CardTitle className="text-koses-green-800">
              {isLowerForm ? 'Foundation Year Tips' : 'KCSE Preparation Tips'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {isLowerForm ? (
                <>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-koses-green-700">
                      Build strong foundations in all 11 subjects for future specialization
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-koses-green-700">
                      Focus on subjects scoring below 60% for improvement
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-koses-green-700">
                      Develop good study habits and time management skills
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-koses-green-700">
                      Identify your strongest subjects for Form 3 & 4 selection
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-koses-green-700">
                      Focus intensively on your 8 core KCSE subjects
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-koses-green-700">
                      Practice past KCSE papers regularly for exam preparation
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-koses-green-700">
                      Maintain consistent performance across all subjects
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-koses-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-koses-green-700">
                      Seek extra help in challenging subjects before KCSE
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
