
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getGradeFromScore } from '../../utils/gradeUtils';

interface PerformanceChartProps {
  subjects: { name: string; score: number }[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ subjects }) => {
  // Prepare chart data with grades
  const chartData = subjects.map(subject => {
    const { grade, points } = getGradeFromScore(subject.score);
    return {
      subject: subject.name.length > 12 ? subject.name.substring(0, 10) + '...' : subject.name,
      fullName: subject.name,
      score: subject.score,
      grade: grade,
      points: points
    };
  });

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold text-gray-900">{data.fullName}</p>
          <p className="text-blue-600">Score: {data.score}%</p>
          <p className="text-green-600 font-medium">Grade: {data.grade} ({data.points} points)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-800">Performance Chart</CardTitle>
        <p className="text-sm text-gray-600">Your scores and grades across all subjects</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis 
                dataKey="subject" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="score" 
                fill="url(#academicGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="academicGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
