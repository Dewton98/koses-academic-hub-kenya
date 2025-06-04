
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockStudents } from '../data/mockData';
import { extractFormNumber } from '../utils/subjectUtils';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [selectedTerm, setSelectedTerm] = useState('Pack Season 1');
  
  // Find the student's data using the profile name
  const studentData = mockStudents.find(s => s.name === user?.profile?.name);
  
  if (!studentData) {
    return (
      <Layout title="Good Dog Dashboard 🐕">
        <div className="text-center py-8">
          <p className="text-gray-500">Good dog data not found - maybe check the doghouse? 🏠</p>
        </div>
      </Layout>
    );
  }

  const formNumber = extractFormNumber(studentData.class);
  const isLowerForm = formNumber <= 2;

  const getRankDisplay = (rank: number, total: number) => {
    const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
    return `${rank}${suffix} in the pack of ${total}`;
  };

  const getGradeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
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

  // Prepare chart data
  const chartData = studentData.subjects.map(subject => ({
    subject: subject.name.length > 12 ? subject.name.substring(0, 10) + '...' : subject.name,
    fullName: subject.name,
    score: subject.score
  }));

  const chartConfig = {
    score: {
      label: "Treats Earned",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Layout title="Good Dog Dashboard 🐕">
      <div className="space-y-6">
        {/* Student Info Card */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Woof woof, {studentData.name}! 🐾</CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-amber-100">
                Pack Level: {studentData.class} 
                <span className="ml-2 text-sm opacity-90">
                  ({isLowerForm ? '11 training areas' : '8 core skills'})
                </span>
              </p>
              <div className="flex items-center gap-4">
                <p className="text-amber-100">
                  Overall Tail Wag Score: <span className="font-bold text-white">{studentData.average.toFixed(1)}% 🎾</span>
                </p>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Pack Rank: {getRankDisplay(studentData.rank, mockStudents.length)} 🏆
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-800">Bark Performance Chart 📊</CardTitle>
            <p className="text-sm text-gray-600">How many treats you've earned in each training area! 🦴</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <XAxis 
                    dataKey="subject" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="score" 
                    fill="url(#dogGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="dogGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Term Filter */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Training Progress 🎯
            <span className="text-sm text-gray-600 ml-2">
              ({studentData.subjects.length} training areas)
            </span>
          </h3>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-40 border-amber-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Pack Season 1">Pack Season 1</SelectItem>
              <SelectItem value="Pack Season 2">Pack Season 2</SelectItem>
              <SelectItem value="Pack Season 3">Pack Season 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subjects Performance - Dynamic grid based on subject count */}
        <div className={`grid gap-4 ${getGridCols()}`}>
          {studentData.subjects.map((subject, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-amber-800 leading-tight">
                  {subject.name} 🐕
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-gray-900">{subject.score}%</div>
                  <Badge className={getGradeColor(subject.score)}>
                    {subject.score >= 80 ? 'Good Dog! 🌟' : 
                     subject.score >= 70 ? 'Good Boy/Girl 🦴' : 
                     subject.score >= 60 ? 'Keep Trying 🎾' : 'Needs Training 🐾'}
                  </Badge>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.score}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Tips */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">
              {isLowerForm ? 'Puppy Training Tips 🐶' : 'Advanced Dog Training Tips 🐕‍🦺'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {isLowerForm ? (
                <>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-orange-700">
                      Practice all 11 training areas to become a well-rounded good dog 🎾
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-orange-700">
                      Focus on areas below 60% - every dog can learn new tricks! 🦴
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-orange-700">
                      Develop good habits and time management for treats 🕐
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-orange-700">
                      Find your favorite training areas for advanced pack levels 🌟
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-orange-700">
                      Master your 8 core skills to become top dog 🏆
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-orange-700">
                      Practice past challenges regularly for the final exam 📚
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-orange-700">
                      Maintain consistent tail wagging across all areas 🐕
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-orange-700">
                      Seek help from pack leaders in challenging areas 🐕‍🦺
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
