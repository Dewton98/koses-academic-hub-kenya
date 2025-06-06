
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
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  
  // Find the student's data using the profile name
  const studentData = mockStudents.find(s => s.name === user?.profile?.name);
  
  if (!studentData) {
    return (
      <Layout title="Student Dashboard">
        <div className="text-center py-8">
          <p className="text-gray-500">Student data not found. Please contact your administrator.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Student Dashboard">
      <div className="space-y-6 max-w-full overflow-hidden">
        {/* Student Info Card */}
        <StudentInfoCard 
          studentData={studentData} 
          totalStudents={mockStudents.length} 
        />

        {/* Performance Chart */}
        <div className="w-full overflow-x-auto">
          <PerformanceChart subjects={studentData.subjects} />
        </div>

        {/* Term Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center sm:text-left w-full sm:w-auto">
            Academic Performance
            <span className="block sm:inline text-sm text-gray-600 sm:ml-2">
              ({studentData.subjects.length} subjects)
            </span>
          </h3>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-full sm:w-40 border-blue-200">
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
        <SubjectGrid subjects={studentData.subjects} />

        {/* Performance Tips */}
        <PerformanceTips studentClass={studentData.class} />
      </div>
    </Layout>
  );
};

export default StudentDashboard;
