
// Kenyan KCSE Grading System (2024)
export const gradeRanges = [
  { min: 80, max: 100, grade: 'A', points: 12 },
  { min: 75, max: 79.99, grade: 'A-', points: 11 },
  { min: 70, max: 74.99, grade: 'B+', points: 10 },
  { min: 65, max: 69.99, grade: 'B', points: 9 },
  { min: 60, max: 64.99, grade: 'B-', points: 8 },
  { min: 55, max: 59.99, grade: 'C+', points: 7 },
  { min: 50, max: 54.99, grade: 'C', points: 6 },
  { min: 45, max: 49.99, grade: 'C-', points: 5 },
  { min: 40, max: 44.99, grade: 'D+', points: 4 },
  { min: 35, max: 39.99, grade: 'D', points: 3 },
  { min: 30, max: 34.99, grade: 'D-', points: 2 },
  { min: 0, max: 29.99, grade: 'E', points: 1 }
];

export const getGradeFromScore = (score: number): { grade: string; points: number } => {
  const gradeInfo = gradeRanges.find(range => score >= range.min && score <= range.max);
  return gradeInfo ? { grade: gradeInfo.grade, points: gradeInfo.points } : { grade: 'E', points: 1 };
};

export const calculateMeanGrade = (subjects: { name: string; score: number }[]): { meanGrade: string; totalPoints: number } => {
  const totalPoints = subjects.reduce((sum, subject) => {
    const { points } = getGradeFromScore(subject.score);
    return sum + points;
  }, 0);
  
  const averagePoints = totalPoints / subjects.length;
  const { grade } = getGradeFromScore((averagePoints / 12) * 100);
  
  return { meanGrade: grade, totalPoints };
};
