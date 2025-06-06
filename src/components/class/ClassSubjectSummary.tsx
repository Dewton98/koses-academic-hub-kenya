
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { getGradeFromScore } from '../../utils/gradeUtils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ClassSubjectSummaryProps {
  className: string;
  students: { name: string; subjects: { name: string; score: number }[] }[];
}

const ClassSubjectSummary: React.FC<ClassSubjectSummaryProps> = ({ className, students }) => {
  // Calculate subject performance summary with individual student data
  const subjectSummary = React.useMemo(() => {
    const subjectData: { [key: string]: { score: number; studentName: string }[] } = {};
    
    // Collect all scores for each subject with student names
    students.forEach(student => {
      student.subjects.forEach(subject => {
        if (!subjectData[subject.name]) {
          subjectData[subject.name] = [];
        }
        subjectData[subject.name].push({
          score: subject.score,
          studentName: student.name
        });
      });
    });

    // Calculate statistics for each subject
    return Object.entries(subjectData).map(([subjectName, studentScores]) => {
      const scores = studentScores.map(s => s.score);
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const passCount = scores.filter(score => score >= 50).length;
      const passRate = (passCount / scores.length) * 100;
      const { grade } = getGradeFromScore(average);
      
      // Sort students by score (highest first)
      const sortedStudentScores = studentScores.sort((a, b) => b.score - a.score);
      
      return {
        name: subjectName,
        average: average,
        passRate: passRate,
        totalStudents: scores.length,
        grade: grade,
        highestScore: Math.max(...scores),
        lowestScore: Math.min(...scores),
        studentScores: sortedStudentScores
      };
    }).sort((a, b) => b.average - a.average);
  }, [students]);

  const getPerformanceColor = (average: number) => {
    if (average >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (average >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (average >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-700 bg-green-50';
    if (score >= 70) return 'text-blue-700 bg-blue-50';
    if (score >= 60) return 'text-yellow-700 bg-yellow-50';
    if (score >= 50) return 'text-orange-700 bg-orange-50';
    return 'text-red-700 bg-red-50';
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
        <Accordion type="multiple" className="space-y-4">
          {subjectSummary.map((subject, index) => (
            <AccordionItem 
              key={subject.name} 
              value={subject.name}
              className={`border rounded-lg ${getPerformanceColor(subject.average)}`}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
                  <div className="flex-1 text-left">
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
              </AccordionTrigger>
              
              <AccordionContent className="px-4 pb-4">
                <div className="mt-3 pt-3 border-t border-white/50">
                  <h5 className="font-medium text-gray-800 mb-3">Individual Student Scores:</h5>
                  <div className="grid gap-2 max-h-60 overflow-y-auto">
                    {subject.studentScores.map((studentScore, idx) => {
                      const { grade } = getGradeFromScore(studentScore.score);
                      return (
                        <div 
                          key={`${studentScore.studentName}-${idx}`}
                          className={`flex justify-between items-center p-2 rounded border ${getScoreColor(studentScore.score)}`}
                        >
                          <span className="font-medium text-gray-900">
                            {idx + 1}. {studentScore.studentName}
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-white/70">
                              Grade {grade}
                            </Badge>
                            <span className="font-bold text-sm">
                              {studentScore.score}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/30 text-xs text-gray-600">
                    <span>Showing {subject.studentScores.length} students • Arranged by highest score</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ClassSubjectSummary;
