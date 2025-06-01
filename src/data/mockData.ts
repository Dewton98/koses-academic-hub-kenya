
import { Student, ClassPerformance } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Dewton Osoro',
    class: 'Form 1A',
    subjects: [
      { name: 'Mathematics', score: 75 },
      { name: 'English', score: 68 },
      { name: 'Kiswahili', score: 82 },
      { name: 'Chemistry', score: 70 },
      { name: 'Physics', score: 73 }
    ],
    average: 73.6,
    rank: 3,
    term: 'Term 1'
  },
  {
    id: '2',
    name: 'Jane Achieng',
    class: 'Form 1A',
    subjects: [
      { name: 'Mathematics', score: 88 },
      { name: 'English', score: 85 },
      { name: 'Kiswahili', score: 90 },
      { name: 'Chemistry', score: 87 },
      { name: 'Physics', score: 89 }
    ],
    average: 87.8,
    rank: 1,
    term: 'Term 1'
  },
  {
    id: '3',
    name: 'Peter Mwangi',
    class: 'Form 1A',
    subjects: [
      { name: 'Mathematics', score: 65 },
      { name: 'English', score: 72 },
      { name: 'Kiswahili', score: 78 },
      { name: 'Chemistry', score: 68 },
      { name: 'Physics', score: 70 }
    ],
    average: 70.6,
    rank: 4,
    term: 'Term 1'
  },
  {
    id: '4',
    name: 'Grace Wanjiku',
    class: 'Form 1A',
    subjects: [
      { name: 'Mathematics', score: 80 },
      { name: 'English', score: 79 },
      { name: 'Kiswahili', score: 85 },
      { name: 'Chemistry', score: 82 },
      { name: 'Physics', score: 78 }
    ],
    average: 80.8,
    rank: 2,
    term: 'Term 1'
  },
  {
    id: '5',
    name: 'Samuel Kiprop',
    class: 'Form 1A',
    subjects: [
      { name: 'Mathematics', score: 58 },
      { name: 'English', score: 65 },
      { name: 'Kiswahili', score: 70 },
      { name: 'Chemistry', score: 60 },
      { name: 'Physics', score: 62 }
    ],
    average: 63.0,
    rank: 5,
    term: 'Term 1'
  }
];

export const mockClassPerformance: ClassPerformance = {
  className: 'Form 1A',
  subjects: [
    { name: 'Mathematics', average: 73.2, passRate: 80 },
    { name: 'English', average: 73.8, passRate: 85 },
    { name: 'Kiswahili', average: 81.0, passRate: 95 },
    { name: 'Chemistry', average: 73.4, passRate: 82 },
    { name: 'Physics', average: 74.4, passRate: 88 }
  ],
  totalStudents: 5,
  averageScore: 75.2
};
