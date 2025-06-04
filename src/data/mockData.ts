
import { Student, ClassPerformance } from '../types';
import { generateMockScores, getSubjectsForForm, extractFormNumber } from '../utils/subjectUtils';

export const mockStudents: Student[] = [
  // Form 1A students (11 subjects)
  {
    id: '1',
    name: 'Dewton Osoro',
    class: 'Form 1A',
    subjects: generateMockScores(getSubjectsForForm(1), 73),
    average: 73.6,
    rank: 3,
    term: 'Term 1'
  },
  {
    id: '2',
    name: 'Jane Achieng',
    class: 'Form 1A',
    subjects: generateMockScores(getSubjectsForForm(1), 87),
    average: 87.8,
    rank: 1,
    term: 'Term 1'
  },
  {
    id: '3',
    name: 'Peter Mwangi',
    class: 'Form 1A',
    subjects: generateMockScores(getSubjectsForForm(1), 70),
    average: 70.6,
    rank: 4,
    term: 'Term 1'
  },
  {
    id: '4',
    name: 'Grace Wanjiku',
    class: 'Form 2B',
    subjects: generateMockScores(getSubjectsForForm(2), 80),
    average: 80.8,
    rank: 2,
    term: 'Term 1'
  },
  {
    id: '5',
    name: 'Samuel Kiprop',
    class: 'Form 2B',
    subjects: generateMockScores(getSubjectsForForm(2), 63),
    average: 63.0,
    rank: 5,
    term: 'Term 1'
  },
  // Form 3 students (8 subjects)
  {
    id: '6',
    name: 'Mary Njeri',
    class: 'Form 3A',
    subjects: generateMockScores(getSubjectsForForm(3), 78),
    average: 78.2,
    rank: 1,
    term: 'Term 1'
  },
  {
    id: '7',
    name: 'David Ochieng',
    class: 'Form 4A',
    subjects: generateMockScores(getSubjectsForForm(4), 72),
    average: 72.5,
    rank: 2,
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
    { name: 'Physics', average: 74.4, passRate: 88 },
    { name: 'Biology', average: 76.8, passRate: 87 },
    { name: 'History', average: 75.2, passRate: 83 },
    { name: 'Geography', average: 77.1, passRate: 89 },
    { name: 'CRE', average: 79.5, passRate: 92 },
    { name: 'Business Studies', average: 74.8, passRate: 85 },
    { name: 'Computer Studies', average: 78.3, passRate: 90 }
  ],
  totalStudents: 5,
  averageScore: 75.2
};
