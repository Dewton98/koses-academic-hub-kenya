
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  subjects: { name: string; score: number }[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ subjects }) => {
  // Prepare chart data
  const chartData = subjects.map(subject => ({
    subject: subject.name.length > 12 ? subject.name.substring(0, 10) + '...' : subject.name,
    fullName: subject.name,
    score: subject.score
  }));

  const chartConfig = {
    score: {
      label: "Treats Earned",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-amber-800">Bark Performance Chart 📊</CardTitle>
        <p className="text-sm text-gray-600">How many treats you've earned in each training area! 🦴</p>
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
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="score" 
                fill="url(#dogGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="dogGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0.8}/>
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
