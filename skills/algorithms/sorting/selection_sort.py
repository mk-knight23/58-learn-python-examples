# SKILL: Selection Sort
# PURPOSE: Sort by repeatedly finding the minimum element
# CONCEPTS: Selection, in-place sorting, partial sorting
# TIME_COMPLEXITY: O(n²) in all cases
# SPACE_COMPLEXITY: O(1)
# DIFFICULTY: beginner
# ESTIMATED_TIME: 12 minutes

"""
LEARNING OBJECTIVE:
Selection sort builds the sorted array one element at a time
by repeatedly finding the minimum element from the unsorted
portion and putting it at the end of the sorted portion.

VISUALIZATION:
[64, 25, 12, 22, 11]  Initial
  ↑   ↓
[11, 25, 12, 22, 64]  Find min (11), swap with position 0
      ↑   ↓
[11, 12, 25, 22, 64]  Find min in rest (12), swap with position 1
          ↑   ↓
[11, 12, 22, 25, 64]  Find min in rest (22), swap with position 2
              ↑   ↓
[11, 12, 22, 25, 64]  Already in place - sorted!

Sorted portion grows from left to right.
"""

def selection_sort(arr):
    """
    Sort array using selection sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        The sorted list (modified in-place)
    """
    n = len(arr)
    
    # Outer loop: position to place the next minimum element
    for i in range(n):
        # Assume first unsorted element is the minimum
        min_idx = i
        
        # Inner loop: find the actual minimum in unsorted portion
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum with the first unsorted position
        # (only if it's not already in place)
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr


# Example usage
if __name__ == "__main__":
    test_array = [64, 25, 12, 22, 11]
    print(f"Original: {test_array}")
    selection_sort(test_array)
    print(f"Sorted:   {test_array}")
    
    # Visualize step by step
    print("\nStep-by-step visualization:")
    arr = [64, 25, 12, 22, 11]
    n = len(arr)
    
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        print(f"  Pass {i}: min={arr[min_idx]} at index {min_idx}", end="")
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            print(f" → swap → {arr}")
        else:
            print(f" → already in place → {arr}")
