
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { getGradeFromScore } from '../../utils/gradeUtils';

interface ClassSubjectSummaryProps {
  className: string;
  students: { name: string; subjects: { name: string; score: number }[] }[];
}

const ClassSubjectSummary: React.FC<ClassSubjectSummaryProps> = ({ className, students }) => {
  // Calculate subject performance summary
  const subjectSummary = React.useMemo(() => {
    const subjectData: { [key: string]: number[] } = {};
    
    // Collect all scores for each subject
    students.forEach(student => {
      student.subjects.forEach(subject => {
        if (!subjectData[subject.name]) {
          subjectData[subject.name] = [];
        }
        subjectData[subject.name].push(subject.score);
      });
    });

    // Calculate statistics for each subject
    return Object.entries(subjectData).map(([subjectName, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const passCount = scores.filter(score => score >= 50).length;
      const passRate = (passCount / scores.length) * 100;
      const { grade } = getGradeFromScore(average);
      
      return {
        name: subjectName,
        average: average,
        passRate: passRate,
        totalStudents: scores.length,
        grade: grade,
        highestScore: Math.max(...scores),
        lowestScore: Math.min(...scores)
      };
    }).sort((a, b) => b.average - a.average);
  }, [students]);

  const getPerformanceColor = (average: number) => {
    if (average >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (average >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (average >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const classAverage = subjectSummary.reduce((sum, subject) => sum + subject.average, 0) / subjectSummary.length;
  const overallPassRate = subjectSummary.reduce((sum, subject) => sum + subject.passRate, 0) / subjectSummary.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-800">Subject Performance Summary - {className}</CardTitle>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>Class Average: <strong className="text-blue-700">{classAverage.toFixed(1)}%</strong></span>
          <span>Overall Pass Rate: <strong className="text-green-700">{overallPassRate.toFixed(1)}%</strong></span>
          <span>Total Students: <strong>{students.length}</strong></span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {subjectSummary.map((subject, index) => (
            <div 
              key={subject.name} 
              className={`border rounded-lg p-4 ${getPerformanceColor(subject.average)}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{subject.name}</h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span>Avg: <strong>{subject.average.toFixed(1)}%</strong></span>
                    <span>Pass Rate: <strong>{subject.passRate.toFixed(0)}%</strong></span>
                    <span>Range: {subject.lowestScore}% - {subject.highestScore}%</span>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <Badge variant="outline" className="bg-white/50 w-fit">
                    Grade {subject.grade}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-white/50 rounded-full h-2">
                      <div 
                        className="bg-current h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.average}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{subject.average.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassSubjectSummary;
