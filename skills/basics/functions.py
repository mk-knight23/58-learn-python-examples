# SKILL: Functions
# PURPOSE: Create reusable blocks of code
# CONCEPTS: def, parameters, return values, scope
# DIFFICULTY: beginner
# ESTIMATED_TIME: 10 minutes

"""
LEARNING OBJECTIVE:
Functions package code into reusable units. They're like
mini-programs you can call whenever you need them.
"""

# Defining a simple function
def greet():
    """This function prints a greeting."""
    print("Hello, welcome to Python!")

# Calling the function
greet()
greet()  # You can call it multiple times

# Function with parameters (inputs)
def greet_person(name):
    """Personalized greeting."""
    print(f"Hello, {name}! Nice to meet you.")

greet_person("Alice")
greet_person("Bob")

# Function with multiple parameters
def add(a, b):
    """Returns the sum of two numbers."""
    result = a + b
    return result

# Using the return value
sum_result = add(5, 3)
print(f"\n5 + 3 = {sum_result}")

# Function with default parameter
def power(base, exponent=2):
    """Calculate base^exponent (default exponent is 2)."""
    return base ** exponent

print(f"\n3 squared: {power(3)}")       # Uses default exponent=2
print(f"2 cubed: {power(2, 3)}")        # Explicit exponent
print(f"2^5: {power(2, exponent=5)}")   # Named argument

# Function documenting a concept
def explain_fibonacci(n):
    """
    Returns the nth Fibonacci number.
    
    The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13...
    Each number is the sum of the two preceding ones.
    """
    if n <= 1:
        return n
    return explain_fibonacci(n - 1) + explain_fibonacci(n - 2)

print(f"\nFibonacci sequence:")
for i in range(8):
    print(f"  F({i}) = {explain_fibonacci(i)}")
