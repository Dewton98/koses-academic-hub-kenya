
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

// Supabase database types that match our schema
export interface Profile {
  id: string;
  username: string;
  name: string;
  role: string;
  class: string | null;
  rank: number | null;
  created_at: string;
  updated_at: string;
}

export interface Score {
  id: string;
  student_id: string;
  class: string;
  subject: string;
  score: number;
  term: string;
  created_at: string;
  updated_at: string;
}
