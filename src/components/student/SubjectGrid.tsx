
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

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

  // Determine grid layout based on number of subjects
  const getGridCols = () => {
    const subjectCount = subjects.length;
    if (subjectCount <= 6) return 'md:grid-cols-2 lg:grid-cols-3';
    if (subjectCount <= 9) return 'md:grid-cols-3 lg:grid-cols-3';
    return 'md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className={`grid gap-4 ${getGridCols()}`}>
      {subjects.map((subject, index) => (
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
  );
};

export default SubjectGrid;
