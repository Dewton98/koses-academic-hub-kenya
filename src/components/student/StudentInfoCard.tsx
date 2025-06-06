
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { extractFormNumber } from '../../utils/subjectUtils';

interface StudentInfoCardProps {
  studentData: {
    name: string;
    class: string;
    average: number;
    rank: number;
    subjects: { name: string; score: number }[];
  };
  totalStudents: number;
}

const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ studentData, totalStudents }) => {
  const formNumber = extractFormNumber(studentData.class);
  const isLowerForm = formNumber <= 2;

  const getRankDisplay = (rank: number, total: number) => {
    const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
    return `${rank}${suffix} out of ${total}`;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      <CardHeader>
        <CardTitle className="text-xl">Welcome, {studentData.name}!</CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-blue-100">
            Class: {studentData.class} 
            <span className="ml-2 text-sm opacity-90">
              ({isLowerForm ? '11 subjects' : '8 subjects'})
            </span>
          </p>
          <div className="flex items-center gap-4">
            <p className="text-blue-100">
              Overall Average: <span className="font-bold text-white">{studentData.average.toFixed(1)}%</span>
            </p>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Rank: {getRankDisplay(studentData.rank, totalStudents)}
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default StudentInfoCard;
