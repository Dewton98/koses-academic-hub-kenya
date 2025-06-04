
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockStudents } from '../data/mockData';
import Layout from './Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import StudentInfoCard from './student/StudentInfoCard';
import PerformanceChart from './student/PerformanceChart';
import SubjectGrid from './student/SubjectGrid';
import PerformanceTips from './student/PerformanceTips';

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

  return (
    <Layout title="Good Dog Dashboard 🐕">
      <div className="space-y-6">
        {/* Student Info Card */}
        <StudentInfoCard 
          studentData={studentData} 
          totalStudents={mockStudents.length} 
        />

        {/* Performance Chart */}
        <PerformanceChart subjects={studentData.subjects} />

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

        {/* Subjects Performance */}
        <SubjectGrid subjects={studentData.subjects} />

        {/* Performance Tips */}
        <PerformanceTips studentClass={studentData.class} />
      </div>
    </Layout>
  );
};

export default StudentDashboard;
