
export interface SubjectData {
  name: string;
  score: number;
}

// All 11 subjects for Forms 1 & 2
export const allSubjects = [
  'Mathematics',
  'English',
  'Kiswahili',
  'Chemistry',
  'Physics',
  'Biology',
  'History',
  'Geography',
  'CRE',
  'Business Studies',
  'Computer Studies'
];

// Core subjects for Forms 3 & 4 (7-8 subjects)
export const coreSubjects = [
  'Mathematics',
  'English',
  'Kiswahili',
  'Chemistry',
  'Physics',
  'Biology',
  'History',
  'Geography'
];

// Extract form number from class string (e.g., "Form 1A" → 1)
export const extractFormNumber = (className: string): number => {
  const match = className.match(/Form\s+(\d+)/i);
  return match ? parseInt(match[1], 10) : 1;
};

// Get subjects based on form level
export const getSubjectsForForm = (formNumber: number): string[] => {
  return formNumber <= 2 ? allSubjects : coreSubjects;
};

// Generate mock scores for subjects
export const generateMockScores = (subjects: string[], baseAverage: number = 70): SubjectData[] => {
  return subjects.map(subject => ({
    name: subject,
    score: Math.max(40, Math.min(100, baseAverage + Math.floor(Math.random() * 30) - 15))
  }));
};
