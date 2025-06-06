
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { extractFormNumber } from '../../utils/subjectUtils';

interface PerformanceTipsProps {
  studentClass: string;
}

const PerformanceTips: React.FC<PerformanceTipsProps> = ({ studentClass }) => {
  const formNumber = extractFormNumber(studentClass);
  const isLowerForm = formNumber <= 2;

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">
          {isLowerForm ? 'Study Tips for Lower Forms' : 'Study Tips for Upper Forms'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {isLowerForm ? (
            <>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-blue-700">
                  Focus on building strong foundations across all 11 subjects
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-blue-700">
                  Pay extra attention to subjects scoring below 60%
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-blue-700">
                  Develop good study habits and time management skills
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-blue-700">
                  Identify your strengths for future subject selection
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-blue-700">
                  Focus intensively on your 8 core subjects for KCSE preparation
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-blue-700">
                  Practice past papers regularly to improve exam technique
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-blue-700">
                  Maintain consistent performance across all subjects
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-blue-700">
                  Seek additional help in challenging subjects from teachers
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceTips;
