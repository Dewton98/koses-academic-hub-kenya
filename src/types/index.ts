
export interface User {
  id: string;
  username: string;
  role: 'student' | 'teacher' | 'administrator';
  name: string;
  class?: string; // For students
}

export interface Student {
  id: string;
  name: string;
  class: string;
  subjects: Subject[];
  average: number;
  rank: number;
  term: string;
}

export interface Subject {
  name: string;
  score: number;
}

export interface ClassPerformance {
  className: string;
  subjects: {
    name: string;
    average: number;
    passRate: number;
  }[];
  totalStudents: number;
  averageScore: number;
}
