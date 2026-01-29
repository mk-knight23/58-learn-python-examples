# SKILL: For Loops
# PURPOSE: Repeat actions a specific number of times
# CONCEPTS: for loop, range(), iteration
# DIFFICULTY: beginner
# ESTIMATED_TIME: 8 minutes

"""
LEARNING OBJECTIVE:
For loops let you repeat code. Use them when you know
how many times something should happen.
"""

# Basic for loop with range()
# range(5) generates: 0, 1, 2, 3, 4
print("Counting to 4:")
for i in range(5):
    print(f"  i = {i}")

# Loop through a list
fruits = ["apple", "banana", "cherry"]
print("\nFruits in the basket:")
for fruit in fruits:
    print(f"  - {fruit}")

# Loop with start and end
print("\nCounting from 1 to 5:")
for num in range(1, 6):  # 1 inclusive, 6 exclusive
    print(f"  {num}")

# Loop with step
print("\nEven numbers from 2 to 10:")
for even in range(2, 11, 2):  # start, stop, step
    print(f"  {even}")

# Common pattern: accumulate
print("\nSumming numbers 1 to 10:")
total = 0
for n in range(1, 11):
    total += n
    print(f"  Added {n}, total now {total}")

print(f"\nFinal sum: {total}")
