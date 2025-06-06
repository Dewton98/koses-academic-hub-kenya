import React from 'react';
import { mockClassPerformance, mockStudents } from '../data/mockData';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ClassSubjectSummary from './class/ClassSubjectSummary';

const ClassPerformanceDashboard = () => {
  const { subjects, totalStudents, averageScore } = mockClassPerformance;

  // Prepare data for bar chart
  const barChartData = subjects.map(subject => ({
    name: subject.name.length > 8 ? subject.name.substring(0, 8) + '...' : subject.name,
    fullName: subject.name,
    average: subject.average,
    passRate: subject.passRate
  }));

  // Prepare data for pie chart (overall pass/fail)
  const passCount = mockStudents.filter(s => s.average >= 50).length;
  const failCount = totalStudents - passCount;
  
  const pieChartData = [
    { name: 'Pass', value: passCount, color: '#22c55e' },
    { name: 'Fail', value: failCount, color: '#ef4444' }
  ];

  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.fullName}</p>
          <p className="text-koses-blue-600">Average: {data.average.toFixed(1)}%</p>
          <p className="text-koses-green-600">Pass Rate: {data.passRate}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout title="Class Performance Analytics">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-koses-blue-500 to-koses-blue-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{totalStudents}</div>
              <div className="text-sm text-koses-blue-100">Total Students</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-koses-green-500 to-koses-green-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
              <div className="text-sm text-koses-green-100">Class Average</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{subjects.length}</div>
              <div className="text-sm text-blue-100">Subjects Tracked</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {((passCount / totalStudents) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-purple-100">Overall Pass Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Class Subject Performance Summary */}
        <ClassSubjectSummary 
          className="Form 1A" 
          students={mockStudents}
        />

        {/* Subject Performance Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-koses-blue-800">Subject Performance Comparison</CardTitle>
            <p className="text-sm text-gray-600">Average scores across all subjects in Form 1A</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="average" 
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pass/Fail Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-koses-blue-800">Overall Pass/Fail Distribution</CardTitle>
              <p className="text-sm text-gray-600">Students passing vs failing (50% threshold)</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => 
                        `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-koses-blue-800">Subject Performance Details</CardTitle>
              <p className="text-sm text-gray-600">Detailed breakdown by subject</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                      <Badge 
                        className={
                          subject.average >= 80 ? 'bg-koses-green-100 text-koses-green-800' :
                          subject.average >= 70 ? 'bg-blue-100 text-blue-800' :
                          subject.average >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {subject.average.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Class Average</span>
                      <span>Pass Rate: {subject.passRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-koses-blue-500 to-koses-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.average}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="bg-gradient-to-r from-koses-blue-50 to-koses-green-50 border-koses-blue-200">
          <CardHeader>
            <CardTitle className="text-koses-blue-800">Performance Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold text-koses-green-700">Strengths to Maintain:</h4>
                {subjects
                  .filter(s => s.average >= 75)
                  .map((subject, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-koses-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        {subject.name} shows excellent performance ({subject.average.toFixed(1)}%)
                      </span>
                    </div>
                  ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-700">Areas for Improvement:</h4>
                {subjects
                  .filter(s => s.average < 75)
                  .map((subject, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        {subject.name} needs additional support ({subject.average.toFixed(1)}%)
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ClassPerformanceDashboard;
