/**
 * Skills Data - Python Learning Content
 * 
 * This file contains all the Python code snippets, descriptions,
 * and metadata for the visual learning system.
 */

export interface Skill {
  id: string;
  title: string;
  category: 'basics' | 'algorithms' | 'projects';
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  description: string;
  code: string;
  concepts: string[];
  visualizationType: 'code' | 'array' | 'tree' | 'graph' | 'game';
}

export const skills: Skill[] = [
  // BASICS
  {
    id: 'hello-world',
    title: 'Hello World',
    category: 'basics',
    difficulty: 'beginner',
    estimatedTime: '2 min',
    description: 'The traditional first program. Learn how to output text to the console using the print() function.',
    concepts: ['print function', 'strings', 'program execution'],
    visualizationType: 'code',
    code: `# The print() function sends output to the console
# Strings (text) must be wrapped in quotes

print('Hello, world!')

# You can also use double quotes
print("Hello, Python!")`
  },
  {
    id: 'variables',
    title: 'Variables',
    category: 'basics',
    difficulty: 'beginner',
    estimatedTime: '5 min',
    description: 'Store and manipulate data using named containers. Think of them as labeled boxes for your data.',
    concepts: ['variable assignment', 'data types', 'naming conventions'],
    visualizationType: 'code',
    code: `# Creating variables (assignment)
name = "Alice"           # String (text)
age = 25                 # Integer (whole number)
height = 5.6             # Float (decimal number)
is_student = True        # Boolean (True/False)

# Using variables
print(f"Name: {name}")
print(f"Age: {age}")

# Variables can change (vary)
counter = 0
counter += 1             # Shorthand increment
print(f"Counter: {counter}")`
  },
  {
    id: 'for-loops',
    title: 'For Loops',
    category: 'basics',
    difficulty: 'beginner',
    estimatedTime: '8 min',
    description: 'Repeat actions a specific number of times. Perfect when you know exactly how many iterations you need.',
    concepts: ['for loop', 'range()', 'iteration'],
    visualizationType: 'array',
    code: `# Basic for loop with range()
# range(5) generates: 0, 1, 2, 3, 4
print("Counting to 4:")
for i in range(5):
    print(f"  i = {i}")

# Loop through a list
fruits = ["apple", "banana", "cherry"]
print("\\nFruits:")
for fruit in fruits:
    print(f"  - {fruit}")

# Common pattern: accumulate
total = 0
for n in range(1, 11):
    total += n
print(f"Sum: {total}")`
  },
  {
    id: 'while-loops',
    title: 'While Loops',
    category: 'basics',
    difficulty: 'beginner',
    estimatedTime: '8 min',
    description: 'Repeat actions until a condition is met. Use when you do not know how many iterations in advance.',
    concepts: ['while loop', 'condition checking', 'infinite loops'],
    visualizationType: 'code',
    code: `# Basic while loop
count = 0
while count < 5:
    print(f"count = {count}")
    count += 1  # CRITICAL: update condition variable!

# Finding first power of 2 > 1000
power = 1
value = 2
while value <= 1000:
    value *= 2
    power += 1
print(f"2^{power-1} = {value}")`
  },
  {
    id: 'functions',
    title: 'Functions',
    category: 'basics',
    difficulty: 'beginner',
    estimatedTime: '10 min',
    description: 'Create reusable blocks of code. Package logic into units you can call whenever needed.',
    concepts: ['def', 'parameters', 'return values', 'scope'],
    visualizationType: 'code',
    code: `# Defining a simple function
def greet():
    print("Hello, welcome!")

greet()  # Call the function

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)
print(f"5 + 3 = {result}")`
  },
  {
    id: 'recursion',
    title: 'Recursion',
    category: 'basics',
    difficulty: 'intermediate',
    estimatedTime: '15 min',
    description: 'Functions that call themselves. Every recursive function needs a base case (stop condition) and recursive case.',
    concepts: ['base case', 'recursive case', 'call stack'],
    visualizationType: 'tree',
    code: `# Factorial using recursion
# n! = n × (n-1) × (n-2) × ... × 1

def factorial(n):
    # BASE CASE
    if n <= 1:
        return 1
    
    # RECURSIVE CASE
    return n * factorial(n - 1)

print(f"5! = {factorial(5)}")

# Fibonacci sequence
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"F(7) = {fibonacci(7)}")`
  },

  // ALGORITHMS - SORTING
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    category: 'algorithms',
    subcategory: 'sorting',
    difficulty: 'beginner',
    estimatedTime: '15 min',
    description: 'Sort by repeatedly swapping adjacent elements if they are in wrong order. Simple but slow for large datasets.',
    concepts: ['comparison-based sorting', 'swapping', 'nested loops'],
    visualizationType: 'array',
    code: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n):
        swapped = False
        
        # Last i elements are already sorted
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # Optimization: stop if no swaps
        if not swapped:
            break
    
    return arr

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
print(arr)  # [11, 12, 22, 25, 34, 64, 90]`
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    category: 'algorithms',
    subcategory: 'sorting',
    difficulty: 'beginner',
    estimatedTime: '12 min',
    description: 'Sort by repeatedly finding the minimum element and placing it at the beginning of the unsorted portion.',
    concepts: ['selection', 'in-place sorting', 'partial sorting'],
    visualizationType: 'array',
    code: `def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):
        # Find minimum in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap with first unsorted position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example
arr = [64, 25, 12, 22, 11]
selection_sort(arr)
print(arr)  # [11, 12, 22, 25, 64]`
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    category: 'algorithms',
    subcategory: 'sorting',
    difficulty: 'beginner',
    estimatedTime: '15 min',
    description: 'Build sorted array one element at a time. Like sorting playing cards in your hand.',
    concepts: ['insertion', 'shifting', 'partial sorting'],
    visualizationType: 'array',
    code: `def insertion_sort(arr):
    # Start from second element
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Shift elements greater than key
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert key in correct position
        arr[j + 1] = key
    
    return arr

# Example
arr = [12, 11, 13, 5, 6]
insertion_sort(arr)
print(arr)  # [5, 6, 11, 12, 13]`
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    category: 'algorithms',
    subcategory: 'sorting',
    difficulty: 'intermediate',
    estimatedTime: '20 min',
    description: 'Divide-and-conquer sorting with guaranteed O(n log n) performance. Split, sort, then merge.',
    concepts: ['divide and conquer', 'recursion', 'merging'],
    visualizationType: 'array',
    code: `def merge_sort(arr):
    # Base case: size 0 or 1
    if len(arr) <= 1:
        return arr
    
    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Conquer (merge)
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example
arr = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(arr))`
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    category: 'algorithms',
    subcategory: 'sorting',
    difficulty: 'intermediate',
    estimatedTime: '20 min',
    description: 'Efficient in-place divide-and-conquer. Pick a pivot, partition around it, recursively sort each side.',
    concepts: ['pivot', 'partitioning', 'recursion', 'in-place'],
    visualizationType: 'array',
    code: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition and get pivot position
        pivot_idx = partition(arr, low, high)
        
        # Sort elements before and after
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
quick_sort(arr)
print(arr)`
  },

  // ALGORITHMS - SEARCHING
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'algorithms',
    subcategory: 'searching',
    difficulty: 'intermediate',
    estimatedTime: '15 min',
    description: 'Find elements in sorted arrays by repeatedly dividing search space in half. Much faster than linear search.',
    concepts: ['divide and conquer', 'sorted data requirement', 'logarithmic time'],
    visualizationType: 'array',
    code: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Found!
        elif arr[mid] < target:
            left = mid + 1   # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Not found

# Example (array must be sorted!)
arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(arr, 23))   # 5
print(binary_search(arr, 100))  # -1`
  },

  // PROJECTS
  {
    id: 'snake-water-gun',
    title: 'Snake Water Gun Game',
    category: 'projects',
    difficulty: 'beginner',
    estimatedTime: '20 min',
    description: 'Classic rock-paper-scissors variant. Build a complete game with conditionals, random choices, and score keeping.',
    concepts: ['random choice', 'conditionals', 'loops', 'game logic'],
    visualizationType: 'game',
    code: `import random

def get_winner(user, computer):
    if user == computer:
        return 'draw'
    
    # Snake drinks Water, Water damages Gun, Gun shoots Snake
    wins = {'snake': 'water', 'water': 'gun', 'gun': 'snake'}
    
    if wins[user] == computer:
        return 'user'
    return 'computer'

# Game loop
user_score = computer_score = 0

while user_score < 3 and computer_score < 3:
    user = input("Choose (snake/water/gun): ").lower()
    computer = random.choice(['snake', 'water', 'gun'])
    
    print(f"Computer chose: {computer}")
    
    winner = get_winner(user, computer)
    if winner == 'user':
        user_score += 1
        print("You win this round!")
    elif winner == 'computer':
        computer_score += 1
        print("Computer wins!")
    else:
        print("It's a draw!")
    
    print(f"Score: {user_score}-{computer_score}")

print("You win!" if user_score > computer_score else "Computer wins!")`
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    category: 'projects',
    difficulty: 'beginner',
    estimatedTime: '15 min',
    description: 'Generate secure, random passwords. A practical utility demonstrating string manipulation and the random module.',
    concepts: ['random module', 'string manipulation', 'user input'],
    visualizationType: 'code',
    code: `import random
import string

def generate_password(length=12):
    # Character sets
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    special = "!@#$%^&*"
    
    # Combine all
    all_chars = lowercase + uppercase + digits + special
    
    # Generate password
    password = ''.join(
        random.choice(all_chars) 
        for _ in range(length)
    )
    
    return password

# Generate passwords of different lengths
print(f"8 chars:  {generate_password(8)}")
print(f"12 chars: {generate_password(12)}")
print(f"16 chars: {generate_password(16)}")`
  },
];

export const categories = [
  { id: 'basics', name: 'Python Basics', icon: 'BookOpen', description: 'Variables, loops, functions - the building blocks' },
  { id: 'algorithms', name: 'Algorithms', icon: 'Binary', description: 'Sorting, searching, and computational thinking' },
  { id: 'projects', name: 'Mini Projects', icon: 'Code2', description: 'Complete programs you can build and run' },
];

export function getSkillsByCategory(categoryId: string): Skill[] {
  return skills.filter(skill => skill.category === categoryId);
}

export function getSkillById(id: string): Skill | undefined {
  return skills.find(skill => skill.id === id);
}
