
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { extractFormNumber } from '../../utils/subjectUtils';
import { calculateMeanGrade } from '../../utils/gradeUtils';

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
  const { meanGrade, totalPoints } = calculateMeanGrade(studentData.subjects);

  const getRankDisplay = (rank: number, total: number) => {
    const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
    return `${rank}${suffix} out of ${total}`;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl text-center sm:text-left">Welcome, {studentData.name}!</CardTitle>
        <div className="flex flex-col space-y-3 sm:space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-blue-100 text-center sm:text-left text-sm sm:text-base">
              Class: {studentData.class} 
              <span className="ml-2 text-xs sm:text-sm opacity-90">
                ({isLowerForm ? '11 subjects' : '8 subjects'})
              </span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p className="text-blue-100 text-center sm:text-left text-sm sm:text-base">
                Overall Average: <span className="font-bold text-white">{studentData.average.toFixed(1)}%</span>
              </p>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mx-auto sm:mx-0 w-fit">
                Mean Grade: {meanGrade} ({totalPoints} pts)
              </Badge>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mx-auto sm:mx-0 w-fit">
              Rank: {getRankDisplay(studentData.rank, totalStudents)}
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default StudentInfoCard;
