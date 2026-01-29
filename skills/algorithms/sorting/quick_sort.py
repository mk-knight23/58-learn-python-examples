# SKILL: Quick Sort
# PURPOSE: Efficient in-place divide-and-conquer sorting
# CONCEPTS: Pivot, partitioning, recursion, in-place
# TIME_COMPLEXITY: O(n log n) average, O(n²) worst
# SPACE_COMPLEXITY: O(log n) average for recursion
# DIFFICULTY: intermediate
# ESTIMATED_TIME: 20 minutes

"""
LEARNING OBJECTIVE:
Quick sort is the most widely used sorting algorithm. It picks
a 'pivot' element and partitions the array around it: smaller
elements go left, larger go right. Then recursively sorts each side.

VISUALIZATION:
[64, 34, 25, 12, 22, 11, 90]  Choose pivot (let's pick 64, first element)

Partition around 64:
  [34, 25, 12, 22, 11]  64  [90]
   < 64                pivot  > 64

Now recursively sort [34, 25, 12, 22, 11] and [90]...

Sorting [34, 25, 12, 22, 11] with pivot 34:
  [25, 12, 22, 11]  34  []
  
Sorting [25, 12, 22, 11] with pivot 25:
  [12, 22, 11]  25  []

Sorting [12, 22, 11] with pivot 12:
  []  12  [22, 11]

Sorting [22, 11] with pivot 22:
  [11]  22  []

Final result: [11, 12, 22, 25, 34, 64, 90]
"""

def quick_sort(arr, low=0, high=None):
    """
    Sort array using quick sort algorithm.
    
    Args:
        arr: List of comparable elements (modified in-place)
        low: Starting index (default 0)
        high: Ending index (default len(arr) - 1)
    
    Returns:
        The sorted list (modified in-place)
    """
    if high is None:
        high = len(arr) - 1
    
    # Recursive case: if subarray has more than 1 element
    if low < high:
        # Partition the array and get pivot's final position
        pivot_idx = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort(arr, low, pivot_idx - 1)   # Left of pivot
        quick_sort(arr, pivot_idx + 1, high)  # Right of pivot
    
    return arr


def partition(arr, low, high):
    """
    Partition array around a pivot.
    
    All elements <= pivot go to its left.
    All elements > pivot go to its right.
    
    Returns the final position of the pivot.
    """
    # Choose rightmost element as pivot
    # (Other strategies: first element, middle, random, median-of-three)
    pivot = arr[high]
    
    # Index of smaller element (indicates where pivot should go)
    i = low - 1
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]  # Swap
    
    # Place pivot in its correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


# Example usage
if __name__ == "__main__":
    test_array = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {test_array}")
    quick_sort(test_array)
    print(f"Sorted:   {test_array}")
    
    # Show partition step
    print("\nPartition demonstration:")
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(f"Before partition: {arr}")
    print(f"Pivot: {arr[-1]} (last element)")
    
    pivot_idx = partition(arr, 0, len(arr) - 1)
    print(f"After partition:  {arr}")
    print(f"Pivot now at index {pivot_idx}")
    print(f"Left of pivot (<={arr[pivot_idx]}): {arr[:pivot_idx]}")
    print(f"Right of pivot (>{arr[pivot_idx]}): {arr[pivot_idx+1:]}")
