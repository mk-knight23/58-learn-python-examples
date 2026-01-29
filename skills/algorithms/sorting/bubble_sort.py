# SKILL: Bubble Sort
# PURPOSE: Sort an array by repeatedly swapping adjacent elements
# CONCEPTS: Comparison-based sorting, swapping, nested loops
# TIME_COMPLEXITY: O(n²) worst/average, O(n) best
# SPACE_COMPLEXITY: O(1)
# DIFFICULTY: beginner
# ESTIMATED_TIME: 15 minutes

"""
LEARNING OBJECTIVE:
Bubble sort "bubbles" the largest elements to the end of the
array through repeated adjacent swaps. It's simple but slow
for large datasets - perfect for learning how sorting works.

VISUALIZATION:
[5, 3, 8, 2, 7]  Initial array
 ^  ^
[3, 5, 8, 2, 7]  5>3, swap
    ^  ^
[3, 5, 8, 2, 7]  8>5, no swap
       ^  ^
[3, 5, 2, 8, 7]  8>2, swap
          ^  ^
[3, 5, 2, 7, 8]  8>7, swap → 8 is now in place!

Repeat for remaining unsorted portion [3, 5, 2, 7]...
"""

def bubble_sort(arr):
    """
    Sort array using bubble sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        The sorted list (modified in-place)
    """
    n = len(arr)
    
    # Outer loop: passes through the array
    for i in range(n):
        # Optimization: track if any swaps occurred
        swapped = False
        
        # Inner loop: compare adjacent elements
        # After each pass, the largest element "bubbles up"
        # so we can exclude the last i elements
        for j in range(0, n - i - 1):
            # If current element is greater than next, swap them
            if arr[j] > arr[j + 1]:
                # Pythonic swap (no temp variable needed!)
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swaps occurred, array is already sorted
        if not swapped:
            break
    
    return arr


# Example usage and demonstration
if __name__ == "__main__":
    # Test case 1: Random array
    test_array = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {test_array}")
    bubble_sort(test_array)
    print(f"Sorted:   {test_array}")
    
    # Test case 2: Already sorted (best case - O(n))
    sorted_array = [1, 2, 3, 4, 5]
    print(f"\nAlready sorted: {sorted_array}")
    bubble_sort(sorted_array)  # Only one pass needed!
    print(f"After sort:     {sorted_array}")
    
    # Test case 3: Reverse sorted (worst case - O(n²))
    reverse_array = [5, 4, 3, 2, 1]
    print(f"\nReverse sorted: {reverse_array}")
    bubble_sort(reverse_array)
    print(f"After sort:     {reverse_array}")
