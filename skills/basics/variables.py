# SKILL: Variables
# PURPOSE: Store and manipulate data using named containers
# CONCEPTS: Variable assignment, data types, naming conventions
# DIFFICULTY: beginner
# ESTIMATED_TIME: 5 minutes

"""
LEARNING OBJECTIVE:
Variables are labels attached to values. Think of them as
named boxes that hold data you want to use later.
"""

# Creating variables (assignment)
name = "Alice"           # String (text)
age = 25                 # Integer (whole number)
height = 5.6             # Float (decimal number)
is_student = True        # Boolean (True/False)

# Using variables
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Is student: {is_student}")

# Variables can change (vary)
counter = 0
print(f"Counter starts at: {counter}")

counter = counter + 1    # Increment
print(f"After increment: {counter}")

counter += 1             # Shorthand increment
print(f"After += : {counter}")

# Good variable names describe what they hold
# Bad:  x = 3.14159
# Good: pi = 3.14159
# Better: PI = 3.14159  (constants in ALL_CAPS)
