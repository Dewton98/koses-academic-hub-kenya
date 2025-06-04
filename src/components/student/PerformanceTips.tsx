
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
    <Card className="bg-orange-50 border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-800">
          {isLowerForm ? 'Puppy Training Tips 🐶' : 'Advanced Dog Training Tips 🐕‍🦺'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {isLowerForm ? (
            <>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">
                  Practice all 11 training areas to become a well-rounded good dog 🎾
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">
                  Focus on areas below 60% - every dog can learn new tricks! 🦴
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">
                  Develop good habits and time management for treats 🕐
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">
                  Find your favorite training areas for advanced pack levels 🌟
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">
                  Master your 8 core skills to become top dog 🏆
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">
                  Practice past challenges regularly for the final exam 📚
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">
                  Maintain consistent tail wagging across all areas 🐕
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">
                  Seek help from pack leaders in challenging areas 🐕‍🦺
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
