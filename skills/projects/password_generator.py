# PROJECT: Password Generator
# PURPOSE: Generate secure, random passwords
# CONCEPTS: Random module, string manipulation, user input
# DIFFICULTY: beginner
# ESTIMATED_TIME: 15 minutes
# UI_TYPE: command_line

"""
LEARNING OBJECTIVE:
Create a practical utility that demonstrates string manipulation
and the random module. Learn about password security basics.
"""

import random
import string


def generate_password(length=12, use_uppercase=True, use_numbers=True, use_special=True):
    """
    Generate a random password with specified criteria.
    
    Args:
        length: Password length (default 12)
        use_uppercase: Include A-Z (default True)
        use_numbers: Include 0-9 (default True)
        use_special: Include special characters (default True)
    
    Returns:
        Generated password string
    """
    # Define character sets
    lowercase = string.ascii_lowercase  # a-z
    uppercase = string.ascii_uppercase  # A-Z
    digits = string.digits              # 0-9
    special = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    # Build character pool based on options
    char_pool = lowercase
    
    if use_uppercase:
        char_pool += uppercase
    if use_numbers:
        char_pool += digits
    if use_special:
        char_pool += special
    
    # Ensure at least one character from each selected type
    password = []
    
    if use_uppercase:
        password.append(random.choice(uppercase))
    if use_numbers:
        password.append(random.choice(digits))
    if use_special:
        password.append(random.choice(special))
    
    # Fill remaining length with random characters
    remaining_length = length - len(password)
    password.extend(random.choices(char_pool, k=remaining_length))
    
    # Shuffle to avoid predictable patterns
    random.shuffle(password)
    
    return ''.join(password)


def check_password_strength(password):
    """
    Evaluate password strength.
    
    Returns: 'weak', 'medium', or 'strong'
    """
    score = 0
    
    # Length checks
    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    
    # Character variety checks
    if any(c.islower() for c in password):
        score += 1
    if any(c.isupper() for c in password):
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
        score += 1
    
    # Classify strength
    if score <= 3:
        return 'weak'
    elif score <= 5:
        return 'medium'
    else:
        return 'strong'


def main():
    """Interactive password generator."""
    print("=" * 40)
    print("   PASSWORD GENERATOR")
    print("=" * 40)
    
    while True:
        print("\nOptions:")
        print("1. Generate simple password (8 chars)")
        print("2. Generate standard password (12 chars)")
        print("3. Generate strong password (16 chars)")
        print("4. Custom password")
        print("5. Check password strength")
        print("6. Exit")
        
        choice = input("\nSelect option (1-6): ").strip()
        
        if choice == '1':
            pwd = generate_password(length=8)
            print(f"\nGenerated: {pwd}")
            
        elif choice == '2':
            pwd = generate_password(length=12)
            print(f"\nGenerated: {pwd}")
            
        elif choice == '3':
            pwd = generate_password(length=16)
            print(f"\nGenerated: {pwd}")
            
        elif choice == '4':
            try:
                length = int(input("Password length: "))
                use_upper = input("Use uppercase? (y/n): ").lower() == 'y'
                use_nums = input("Use numbers? (y/n): ").lower() == 'y'
                use_special = input("Use special chars? (y/n): ").lower() == 'y'
                
                pwd = generate_password(length, use_upper, use_nums, use_special)
                print(f"\nGenerated: {pwd}")
            except ValueError:
                print("Invalid input!")
                
        elif choice == '5':
            pwd = input("Enter password to check: ")
            strength = check_password_strength(pwd)
            print(f"\nStrength: {strength.upper()}")
            
        elif choice == '6':
            print("Goodbye!")
            break
        else:
            print("Invalid choice!")


if __name__ == "__main__":
    main()
