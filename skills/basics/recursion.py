# SKILL: Recursion
# PURPOSE: Functions that call themselves to solve problems
# CONCEPTS: Base case, recursive case, call stack
# DIFFICULTY: intermediate
# ESTIMATED_TIME: 15 minutes

"""
LEARNING OBJECTIVE:
Recursion solves problems by breaking them into smaller
versions of the same problem. Every recursive function
needs a base case (stop condition) and a recursive case.
"""

# Classic example: Factorial
# n! = n × (n-1) × (n-2) × ... × 1
# 5! = 5 × 4 × 3 × 2 × 1 = 120

def factorial(n):
    """
    Calculate factorial using recursion.
    
    Visual breakdown of factorial(5):
    
    factorial(5)
    ├── 5 × factorial(4)
    │       ├── 4 × factorial(3)
    │       │       ├── 3 × factorial(2)
    │       │       │       ├── 2 × factorial(1)
    │       │       │       │       └── 1  (BASE CASE)
    │       │       │       └── 2 × 1 = 2
    │       │       └── 3 × 2 = 6
    │       └── 4 × 6 = 24
    └── 5 × 24 = 120
    """
    # BASE CASE: Factorial of 0 or 1 is 1
    if n <= 1:
        return 1
    
    # RECURSIVE CASE: n! = n × (n-1)!
    return n * factorial(n - 1)

print("Factorial using recursion:")
for i in range(6):
    print(f"  {i}! = {factorial(i)}")

# Fibonacci with recursion
def fibonacci(n):
    """
    Get nth Fibonacci number recursively.
    
    Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...
    
    Tree for fibonacci(4):
    
           fib(4)
          /      \
      fib(3)      fib(2)
       /   \       /   \
   fib(2) fib(1) fib(1) fib(0)
    /  \
fib(1) fib(0)
    """
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"\nFibonacci sequence (first 8):")
for i in range(8):
    print(f"  F({i}) = {fibonacci(i)}")

# Tower of Hanoi - classic recursive problem
def tower_of_hanoi(n, source, destination, auxiliary):
    """
    Move n disks from source to destination using auxiliary.
    
    Rules:
    1. Only one disk can move at a time
    2. A larger disk cannot sit on a smaller disk
    3. Only the top disk can be moved
    """
    if n == 1:
        print(f"  Move disk 1 from {source} to {destination}")
        return
    
    # Move n-1 disks from source to auxiliary
    tower_of_hanoi(n - 1, source, auxiliary, destination)
    
    # Move the nth (largest) disk from source to destination
    print(f"  Move disk {n} from {source} to {destination}")
    
    # Move the n-1 disks from auxiliary to destination
    tower_of_hanoi(n - 1, auxiliary, destination, source)

print(f"\nTower of Hanoi (3 disks):")
tower_of_hanoi(3, 'A', 'C', 'B')
print("  (Minimum moves required: 2^n - 1 = 7)")
