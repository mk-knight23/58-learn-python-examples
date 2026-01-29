# SKILL: Merge Sort
# PURPOSE: Divide-and-conquer sorting with guaranteed O(n log n)
# CONCEPTS: Divide and conquer, recursion, merging
# TIME_COMPLEXITY: O(n log n) in all cases
# SPACE_COMPLEXITY: O(n)
# DIFFICULTY: intermediate
# ESTIMATED_TIME: 20 minutes

"""
LEARNING OBJECTIVE:
Merge sort is the first "efficient" sort you'll learn. It uses
divide-and-conquer: split the array in half, sort each half,
then merge the sorted halves.

VISUALIZATION (Divide phase):
[38, 27, 43, 3, 9, 82, 10]
        /              \
   [38, 27, 43, 3]  [9, 82, 10]
     /      \         /      \
[38, 27] [43, 3]  [9, 82]  [10]
  /  \     /  \     /  \     |
[38] [27] [43] [3] [9] [82] [10]  ← Base case: arrays of size 1

VISUALIZATION (Conquer/Merge phase):
[38] [27] → [27, 38]
[43] [3]  → [3, 43]
[9] [82]  → [9, 82]
[10]      → [10]

[27, 38] + [3, 43] → [3, 27, 38, 43]
[9, 82]  + [10]    → [9, 10, 82]

[3, 27, 38, 43] + [9, 10, 82] → [3, 9, 10, 27, 38, 43, 82]  Sorted!
"""

def merge_sort(arr):
    """
    Sort array using merge sort algorithm (recursive).
    
    Args:
        arr: List of comparable elements
    
    Returns:
        New sorted list (not in-place)
    """
    # BASE CASE: Arrays of size 0 or 1 are already sorted
    if len(arr) <= 1:
        return arr
    
    # DIVIDE: Split array into two halves
    mid = len(arr) // 2
    left_half = arr[:mid]   # Elements from start to mid-1
    right_half = arr[mid:]  # Elements from mid to end
    
    # CONQUER: Recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)
    
    # COMBINE: Merge the sorted halves
    return merge(left_sorted, right_sorted)


def merge(left, right):
    """
    Merge two sorted arrays into one sorted array.
    
    This is like having two piles of sorted cards and
    picking the smaller visible card each time.
    """
    result = []
    left_idx = right_idx = 0
    
    # Compare elements from both arrays and add smaller one
    while left_idx < len(left) and right_idx < len(right):
        if left[left_idx] <= right[right_idx]:
            result.append(left[left_idx])
            left_idx += 1
        else:
            result.append(right[right_idx])
            right_idx += 1
    
    # Add remaining elements (one array will be exhausted)
    result.extend(left[left_idx:])
    result.extend(right[right_idx:])
    
    return result


# Example usage
if __name__ == "__main__":
    test_array = [38, 27, 43, 3, 9, 82, 10]
    print(f"Original: {test_array}")
    sorted_array = merge_sort(test_array)
    print(f"Sorted:   {sorted_array}")
    
    # Key insight: merge sort creates NEW arrays
    print(f"\nOriginal unchanged: {test_array}")
    print("(Merge sort is not in-place - it uses extra memory)")
    
    # Show merge process
    print("\nMerge demonstration:")
    left = [1, 3, 5]
    right = [2, 4, 6]
    print(f"Left:  {left}")
    print(f"Right: {right}")
    print(f"Merged: {merge(left, right)}")
