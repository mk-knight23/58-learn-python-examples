# PROJECT: Snake Water Gun Game
# PURPOSE: Classic rock-paper-scissors variant with Python
# CONCEPTS: Random choice, conditionals, loops, game logic
# DIFFICULTY: beginner
# ESTIMATED_TIME: 20 minutes
# UI_TYPE: command_line

"""
LEARNING OBJECTIVE:
Build a complete game using conditionals and random choices.
This project teaches game logic, user input handling, and
keeping score across multiple rounds.

GAME RULES:
- Snake drinks Water → Snake wins
- Gun shoots Snake → Gun wins  
- Water damages Gun → Water wins
- Same choices → Draw
"""

import random
import time


def get_computer_choice():
    """Randomly select computer's choice."""
    choices = ['snake', 'water', 'gun']
    return random.choice(choices)


def determine_winner(user, computer):
    """
    Determine the winner based on game rules.
    
    Returns:
        'user', 'computer', or 'draw'
    """
    if user == computer:
        return 'draw'
    
    # Define winning combinations (winner beats loser)
    wins_against = {
        'snake': 'water',   # Snake drinks water
        'water': 'gun',     # Water damages gun
        'gun': 'snake'      # Gun shoots snake
    }
    
    if wins_against[user] == computer:
        return 'user'
    else:
        return 'computer'


def play_round(round_num):
    """Play a single round and return the result."""
    print(f"\n--- Round {round_num} ---")
    
    # Get user choice
    print("Choose: snake (s), water (w), or gun (g)")
    user_input = input("Your choice: ").lower().strip()
    
    # Map short forms to full names
    choice_map = {'s': 'snake', 'w': 'water', 'g': 'gun'}
    if user_input in choice_map:
        user_choice = choice_map[user_input]
    elif user_input in ['snake', 'water', 'gun']:
        user_choice = user_input
    else:
        print("Invalid choice! You lose this round.")
        return 'computer'
    
    # Get computer choice
    computer_choice = get_computer_choice()
    
    # Show choices
    print(f"You chose: {user_choice}")
    print(f"Computer chose: {computer_choice}")
    
    # Determine winner
    winner = determine_winner(user_choice, computer_choice)
    
    if winner == 'draw':
        print("Result: 🤝 It's a draw!")
    elif winner == 'user':
        print("Result: ✅ You win this round!")
    else:
        print("Result: ❌ Computer wins this round!")
    
    return winner


def play_game():
    """Main game loop with multiple rounds."""
    print("=" * 40)
    print("   WELCOME TO SNAKE WATER GUN!")
    print("=" * 40)
    print("\nRules:")
    print("  • Snake drinks Water")
    print("  • Water damages Gun")
    print("  • Gun shoots Snake")
    print("\nFirst to win 3 rounds wins the game!")
    
    # Initialize scores
    user_score = 0
    computer_score = 0
    rounds = 0
    
    # Play until someone wins
    while user_score < 3 and computer_score < 3:
        rounds += 1
        result = play_round(rounds)
        
        # Update scores
        if result == 'user':
            user_score += 1
        elif result == 'computer':
            computer_score += 1
        
        # Show current score
        print(f"\nScore: You {user_score} - {computer_score} Computer")
    
    # Game over - show final result
    print("\n" + "=" * 40)
    if user_score > computer_score:
        print("   🎉 CONGRATULATIONS! YOU WIN! 🎉")
    else:
        print("   💻 Computer wins! Better luck next time!")
    print("=" * 40)
    print(f"Game lasted {rounds} rounds")


if __name__ == "__main__":
    play_game()
