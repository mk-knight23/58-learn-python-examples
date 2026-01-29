# SKILL: Insertion Sort
# PURPOSE: Build sorted array one element at a time
# CONCEPTS: Insertion, shifting, partial sorting
# TIME_COMPLEXITY: O(n²) worst/average, O(n) best
# SPACE_COMPLEXITY: O(1)
# DIFFICULTY: beginner
# ESTIMATED_TIME: 15 minutes

"""
LEARNING OBJECTIVE:
Insertion sort works like sorting playing cards in your hand.
Take one card at a time and insert it into its correct position
in the already-sorted portion.

VISUALIZATION:
[5, 2, 4, 6, 1, 3]  Initial

Pass 1: Take 2, insert before 5
[2, 5, 4, 6, 1, 3]  2 inserted

Pass 2: Take 4, insert between 2 and 5
[2, 4, 5, 6, 1, 3]  4 inserted

Pass 3: Take 6, already in place
[2, 4, 5, 6, 1, 3]  6 stays

Pass 4: Take 1, insert at beginning
[1, 2, 4, 5, 6, 3]  1 inserted

Pass 5: Take 3, insert between 2 and 4
[1, 2, 3, 4, 5, 6]  Sorted!
"""

def insertion_sort(arr):
    """
    Sort array using insertion sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        The sorted list (modified in-place)
    """
    # Start from second element (first is trivially sorted)
    for i in range(1, len(arr)):
        # Store the element to be inserted
        key = arr[i]
        
        # Index of last element in sorted portion
        j = i - 1
        
        # Shift elements greater than key to the right
        # This creates space for the key
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]  # Shift right
            j -= 1
        
        # Insert key in its correct position
        arr[j + 1] = key
    
    return arr


# Example usage
if __name__ == "__main__":
    test_array = [12, 11, 13, 5, 6]
    print(f"Original: {test_array}")
    insertion_sort(test_array)
    print(f"Sorted:   {test_array}")
    
    # Detailed step-by-step
    print("\nStep-by-step:")
    arr = [5, 2, 4, 6, 1, 3]
    print(f"Start: {arr}")
    
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Show what we're inserting
        print(f"\nInsert {key}:", end=" ")
        
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
        print(f"{arr}")
