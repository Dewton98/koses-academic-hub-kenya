
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { getGradeFromScore } from '../../utils/gradeUtils';

interface SubjectGridProps {
  subjects: { name: string; score: number }[];
}

const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects }) => {
  const getGradeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getGradeText = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {subjects.map((subject, index) => {
        const { grade, points } = getGradeFromScore(subject.score);
        
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base text-blue-800 leading-tight text-center sm:text-left">
                {subject.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
                  {subject.score}%
                </div>
                <div className="flex flex-col items-center sm:items-end gap-1">
                  <Badge className="bg-blue-600 text-white text-xs font-bold">
                    Grade {grade} ({points} pts)
                  </Badge>
                  <Badge className={`${getGradeColor(subject.score)} text-xs`}>
                    {getGradeText(subject.score)}
                  </Badge>
                </div>
              </div>
              <div className="bg-gray-200 rounded-full h-2 w-full">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${subject.score}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SubjectGrid;
