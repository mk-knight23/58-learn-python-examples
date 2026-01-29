# SKILL: Binary Search
# PURPOSE: Find an element in a sorted array efficiently
# CONCEPTS: Divide and conquer, sorted data requirement, logarithmic time
# TIME_COMPLEXITY: O(log n)
# SPACE_COMPLEXITY: O(1) iterative, O(log n) recursive
# DIFFICULTY: intermediate
# ESTIMATED_TIME: 15 minutes

"""
LEARNING OBJECTIVE:
Binary search finds elements in sorted arrays by repeatedly
dividing the search space in half. It's dramatically faster
than linear search for large datasets.

VISUALIZATION:
Find 'target = 23' in sorted array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]

Step 1: Check middle element (index 4) = 16
        23 > 16, so target must be in right half
        New search space: [23, 38, 56, 72, 91]

Step 2: Check middle of remaining (index 7) = 56
        23 < 56, so target must be in left half
        New search space: [23, 38]

Step 3: Check middle (index 5) = 23
        Found! Return index 5

Only 3 comparisons instead of 6 in linear search!
For 1 million elements: binary needs ~20 comparisons, linear needs 500k average.
"""

def binary_search(arr, target):
    """
    Find target in sorted array using binary search (iterative).
    
    Args:
        arr: Sorted list of comparable elements
        target: Element to find
    
    Returns:
        Index of target if found, -1 otherwise
    """
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        # Find middle index (avoid potential overflow with //)
        mid = (left + right) // 2
        
        # Check if target is at mid
        if arr[mid] == target:
            return mid
        
        # If target is greater, ignore left half
        elif arr[mid] < target:
            left = mid + 1
        
        # If target is smaller, ignore right half
        else:
            right = mid - 1
    
    # Target not found
    return -1


def binary_search_recursive(arr, target, left=0, right=None):
    """
    Binary search using recursion.
    """
    if right is None:
        right = len(arr) - 1
    
    # Base case: search space exhausted
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    # Found it!
    if arr[mid] == target:
        return mid
    
    # Search right half
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    
    # Search left half
    else:
        return binary_search_recursive(arr, target, left, mid - 1)


# Example usage
if __name__ == "__main__":
    sorted_array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
    
    print(f"Array: {sorted_array}\n")
    
    # Test cases
    targets = [23, 2, 91, 100]  # present, first, last, not present
    
    for target in targets:
        result = binary_search(sorted_array, target)
        if result != -1:
            print(f"Found {target} at index {result}")
        else:
            print(f"{target} not found in array")
    
    # Compare with linear search
    print("\nComparison for 1 million elements:")
    print("  Linear search: ~500,000 comparisons average")
    print("  Binary search: ~20 comparisons worst case")
    print("\n  BUT: Binary search requires SORTED data!")
