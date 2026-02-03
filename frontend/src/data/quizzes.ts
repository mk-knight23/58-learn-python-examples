/**
 * Quiz data for Python learning skills
 */

import type { QuizQuestion } from '../types';

export const quizzes: QuizQuestion[] = [
  // BASICS
  {
    id: 'hello-world-q1',
    skillId: 'hello-world',
    question: 'What function is used to output text in Python?',
    options: ['echo()', 'print()', 'console.log()', 'write()'],
    correctAnswer: 1,
    explanation:
      'The print() function sends output to the console in Python.',
  },
  {
    id: 'hello-world-q2',
    skillId: 'hello-world',
    question: 'Which of the following is a valid string in Python?',
    options: [
      'hello world',
      '"hello world"',
      'Both A and B',
      'Neither A nor B',
    ],
    correctAnswer: 2,
    explanation:
      'Strings must be wrapped in quotes, but you can use either single or double quotes.',
  },
  {
    id: 'variables-q1',
    skillId: 'variables',
    question: 'What will be the value of x after: x = 5; x += 3?',
    options: ['5', '8', '3', 'Error'],
    correctAnswer: 1,
    explanation:
      'The += operator adds to the existing value. x was 5, so x += 3 makes it 8.',
  },
  {
    id: 'variables-q2',
    skillId: 'variables',
    question: 'Which is NOT a valid Python data type?',
    options: ['int', 'str', 'bool', 'char'],
    correctAnswer: 3,
    explanation:
      "Python doesn't have a char type. Single characters are just strings of length 1.",
  },
  {
    id: 'for-loops-q1',
    skillId: 'for-loops',
    question: 'What does range(5) generate?',
    options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '5'],
    correctAnswer: 1,
    explanation:
      'range(5) generates numbers from 0 up to (but not including) 5.',
  },
  {
    id: 'for-loops-q2',
    skillId: 'for-loops',
    question: 'How many times will this loop run: for i in range(3):',
    options: ['2', '3', '4', '0'],
    correctAnswer: 1,
    explanation:
      'range(3) generates 0, 1, 2, so the loop body executes 3 times.',
  },
  {
    id: 'while-loops-q1',
    skillId: 'while-loops',
    question: 'What is required to prevent an infinite while loop?',
    options: [
      'A break statement',
      'A condition that eventually becomes false',
      'A return statement',
      'All of the above',
    ],
    correctAnswer: 3,
    explanation:
      'Any of these can stop a loop, but most commonly you update a variable so the condition becomes false.',
  },
  {
    id: 'while-loops-q2',
    skillId: 'while-loops',
    question: 'When should you use a while loop instead of a for loop?',
    options: [
      'When you know the exact number of iterations',
      "When you don't know how many iterations you'll need",
      'When iterating over a list',
      'Never, for loops are always better',
    ],
    correctAnswer: 1,
    explanation:
      'While loops are ideal when the number of iterations is not known in advance.',
  },
  {
    id: 'functions-q1',
    skillId: 'functions',
    question: 'What keyword is used to define a function in Python?',
    options: ['function', 'def', 'func', 'define'],
    correctAnswer: 1,
    explanation: 'The "def" keyword is used to define functions in Python.',
  },
  {
    id: 'functions-q2',
    skillId: 'functions',
    question: 'What does the return statement do?',
    options: [
      'Prints a value',
      'Exits the function and sends a value back',
      'Defines a variable',
      'Creates a loop',
    ],
    correctAnswer: 1,
    explanation:
      'return exits the function and optionally sends a value back to the caller.',
  },
  {
    id: 'recursion-q1',
    skillId: 'recursion',
    question: 'What is a base case in recursion?',
    options: [
      'The first case to test',
      'The condition that stops recursion',
      'The recursive call',
      'An error case',
    ],
    correctAnswer: 1,
    explanation:
      'The base case is the condition that stops the recursive calls, preventing infinite recursion.',
  },
  {
    id: 'recursion-q2',
    skillId: 'recursion',
    question: 'What happens if a recursive function has no base case?',
    options: [
      'It runs forever until hitting a limit',
      'It returns None',
      'It automatically stops after 10 calls',
      'It throws a syntax error',
    ],
    correctAnswer: 0,
    explanation:
      'Without a base case, recursion never stops, eventually causing a "maximum recursion depth exceeded" error.',
  },

  // ALGORITHMS - SORTING
  {
    id: 'bubble-sort-q1',
    skillId: 'bubble-sort',
    question: 'What is the worst-case time complexity of bubble sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 2,
    explanation:
      'Bubble sort has O(n²) worst-case time complexity due to nested loops.',
  },
  {
    id: 'bubble-sort-q2',
    skillId: 'bubble-sort',
    question: 'What optimization makes bubble sort stop early if already sorted?',
    options: [
      'A counter variable',
      'A "swapped" flag',
      'A break statement',
      'A second loop',
    ],
    correctAnswer: 1,
    explanation:
      'The swapped flag tracks whether any swaps occurred. If not, the array is sorted and we can stop early.',
  },
  {
    id: 'selection-sort-q1',
    skillId: 'selection-sort',
    question: 'What does selection sort find in each pass?',
    options: [
      'The maximum element',
      'The minimum element',
      'The median element',
      'A random element',
    ],
    correctAnswer: 1,
    explanation:
      'Selection sort finds the minimum element in the unsorted portion and places it at the beginning.',
  },
  {
    id: 'selection-sort-q2',
    skillId: 'selection-sort',
    question: 'How many swaps does selection sort make in total?',
    options: ['n swaps', 'n-1 swaps', 'n² swaps', 'Variable number'],
    correctAnswer: 1,
    explanation:
      'Selection sort makes exactly n-1 swaps, which is fewer than many other sorting algorithms.',
  },
  {
    id: 'insertion-sort-q1',
    skillId: 'insertion-sort',
    question: 'Insertion sort is similar to:',
    options: [
      'Shuffling a deck of cards',
      'Sorting playing cards in your hand',
      'Searching a phone book',
      'Building a tower',
    ],
    correctAnswer: 1,
    explanation:
      'Insertion sort works like sorting cards in your hand - you take each card and insert it in the correct position.',
  },
  {
    id: 'insertion-sort-q2',
    skillId: 'insertion-sort',
    question: 'When is insertion sort efficient?',
    options: [
      'For large datasets',
      'For small or nearly-sorted datasets',
      'For reverse-sorted data',
      'Never',
    ],
    correctAnswer: 1,
    explanation:
      'Insertion sort is efficient for small datasets or data that is nearly sorted.',
  },
  {
    id: 'merge-sort-q1',
    skillId: 'merge-sort',
    question: 'What paradigm does merge sort use?',
    options: [
      'Dynamic programming',
      'Divide and conquer',
      'Greedy approach',
      'Backtracking',
    ],
    correctAnswer: 1,
    explanation:
      'Merge sort uses divide and conquer: split the array, sort each half, then merge.',
  },
  {
    id: 'merge-sort-q2',
    skillId: 'merge-sort',
    question: 'What is the time complexity of merge sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation:
      'Merge sort has O(n log n) time complexity in all cases, making it very predictable.',
  },
  {
    id: 'quick-sort-q1',
    skillId: 'quick-sort',
    question: 'What is the role of the pivot in quick sort?',
    options: [
      'It is the smallest element',
      'It is the largest element',
      'Elements are partitioned around it',
      'It is just a temporary variable',
    ],
    correctAnswer: 2,
    explanation:
      'The pivot is used to partition the array - elements smaller go left, larger go right.',
  },
  {
    id: 'quick-sort-q2',
    skillId: 'quick-sort',
    question: 'What is the worst-case time complexity of quick sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 2,
    explanation:
      'In the worst case (already sorted with poor pivot choice), quick sort degrades to O(n²).',
  },

  // ALGORITHMS - SEARCHING
  {
    id: 'binary-search-q1',
    skillId: 'binary-search',
    question: 'What is a requirement for binary search?',
    options: [
      'The array must be small',
      'The array must be sorted',
      'The array must contain only numbers',
      'The array size must be even',
    ],
    correctAnswer: 1,
    explanation:
      'Binary search requires the array to be sorted to work correctly.',
  },
  {
    id: 'binary-search-q2',
    skillId: 'binary-search',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 2,
    explanation:
      'Binary search has O(log n) complexity because it halves the search space each iteration.',
  },

  // PROJECTS
  {
    id: 'snake-water-gun-q1',
    skillId: 'snake-water-gun',
    question: 'In Snake-Water-Gun, which beats Water?',
    options: ['Snake', 'Gun', 'Water', 'None of them'],
    correctAnswer: 0,
    explanation: 'Snake drinks Water, so Snake beats Water.',
  },
  {
    id: 'snake-water-gun-q2',
    skillId: 'snake-water-gun',
    question: 'What module is used for random computer choices?',
    options: ['random', 'choice', 'math', 'statistics'],
    correctAnswer: 0,
    explanation:
      "The random module provides random.choice() for selecting from a list.",
  },
  {
    id: 'password-generator-q1',
    skillId: 'password-generator',
    question: 'What does string.ascii_lowercase provide?',
    options: [
      'The word "lowercase"',
      'All lowercase letters a-z',
      'Random lowercase letters',
      'Empty string',
    ],
    correctAnswer: 1,
    explanation:
      'string.ascii_lowercase is a string containing all lowercase letters from a to z.',
  },
  {
    id: 'password-generator-q2',
    skillId: 'password-generator',
    question: 'What does .join() do in password generation?',
    options: [
      'Splits a string',
      'Combines a sequence into a string',
      'Removes characters',
      'Sorts characters',
    ],
    correctAnswer: 1,
    explanation:
      '.join() combines the sequence of randomly chosen characters into a single string password.',
  },
];

/**
 * Get quiz questions for a specific skill
 */
export function getQuizForSkill(skillId: string): QuizQuestion[] {
  return quizzes.filter((q) => q.skillId === skillId);
}

/**
 * Get a random quiz question for a skill
 */
export function getRandomQuestionForSkill(skillId: string): QuizQuestion | null {
  const questions = getQuizForSkill(skillId);
  if (questions.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}
