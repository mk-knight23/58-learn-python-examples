# SKILL: While Loops
# PURPOSE: Repeat actions until a condition is met
# CONCEPTS: while loop, condition checking, infinite loops
# DIFFICULTY: beginner
# ESTIMATED_TIME: 8 minutes

"""
LEARNING OBJECTIVE:
While loops continue until a condition becomes False.
Use them when you don't know how many iterations you need.
"""

# Basic while loop
count = 0
print("Counting up to 4:")
while count < 5:
    print(f"  count = {count}")
    count += 1  # CRITICAL: update the condition variable!

# Finding first power of 2 greater than 1000
print("\nFinding power of 2 > 1000:")
power = 1
value = 2
while value <= 1000:
    print(f"  2^{power} = {value}")
    value *= 2
    power += 1

print(f"  First power > 1000: 2^{power-1} = {value}")

# While with user input (simulated here)
print("\nSimulated password check:")
attempts = 0
max_attempts = 3
password_correct = False

# In a real program, you'd use: input("Enter password: ")
simulated_inputs = ["wrong1", "wrong2", "secret123"]

while attempts < max_attempts and not password_correct:
    guess = simulated_inputs[attempts]  # Simulating user input
    print(f"  Attempt {attempts + 1}: '{guess}'")
    
    if guess == "secret123":
        password_correct = True
        print("  ✓ Access granted!")
    else:
        print("  ✗ Wrong password")
        attempts += 1

if not password_correct:
    print("  Account locked after 3 attempts")

# WARNING: Always ensure the condition will eventually be False
# while True:  # This would run forever!
#     print("Help! I'm stuck!")
