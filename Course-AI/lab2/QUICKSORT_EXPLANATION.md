# Quick Sort Implementation Explanation

## Overview
This code implements the quick sort algorithm, a highly efficient divide-and-conquer sorting technique. The implementation maintains clean code principles by separating concerns into distinct functions, each with a single responsibility. The main entry point, `quickSort()`, accepts an array and returns a new sorted copy without mutating the original, making it safer and more predictable.

## The Main Function
The `quickSort()` function serves as the public interface. It first validates that the input is a valid non-empty array, then creates a shallow copy using the spread operator to preserve immutability. This prevents side effects on the caller's original data. The function delegates the actual sorting logic to `quickSortInPlace()`, which performs the recursive partitioning.

## Recursive Sorting Strategy
The `quickSortInPlace()` function is the heart of the algorithm. It recursively divides the array into smaller segments by selecting a pivot element and partitioning the array around it. Elements smaller than the pivot move to the left, and larger elements move to the right. The function then recursively sorts the left and right subarrays. The base case is when `low >= high`, meaning the segment is fully sorted.

## The Partitioning Scheme
The `partition()` function implements the Lomuto partition scheme. It selects the rightmost element as the pivot, then iterates through the array from left to right. Whenever an element smaller than the pivot is found, it's swapped with an element at the `partitionIndex`. After the loop, the pivot is placed in its final sorted position. This guarantees that all smaller elements are on the left and all larger elements are on the right.

## Swap Utility
The `swap()` function is a simple utility that exchanges two array elements using a temporary variable. While modern JavaScript could use destructuring assignment, this explicit approach is more readable and demonstrates the fundamental swap operation clearly.

## Time and Space Complexity
The algorithm averages **O(n log n)** comparisons with **O(log n)** space for the recursion call stack. However, if the pivot is poorly chosen (like always selecting the smallest element), the worst case degrades to **O(n²)**. The example demonstrates the algorithm with a sample array, confirming that the original remains unchanged after sorting.

## Key Clean Code Principles Applied

### 1. **Single Responsibility Principle**
Each function has one clear purpose:
- `quickSort()` - Entry point and immutability handling
- `quickSortInPlace()` - Recursion management
- `partition()` - Array partitioning logic
- `swap()` - Element exchange

### 2. **Immutability**
The original array is never modified. A copy is created before sorting, making the function pure and predictable.

### 3. **Clear Naming**
Function names and variables clearly describe their purpose (`pivotIndex`, `partitionIndex`, `arrayToSort`).

### 4. **Comprehensive Documentation**
JSDoc comments explain parameters, return values, and complexity analysis without being verbose.

### 5. **Defensive Programming**
Input validation ensures the function handles edge cases gracefully.

## Usage Example

```javascript
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = quickSort(unsortedArray);
// Result: [11, 12, 22, 25, 34, 64, 90]
// Original array remains: [64, 34, 25, 12, 22, 11, 90]
```

## Algorithm Visualization

For the array `[64, 34, 25, 12, 22, 11, 90]`:

1. **Initial partition** (pivot = 90):
   - Left: `[64, 34, 25, 12, 22, 11]` | Pivot: `90` | Right: `[]`

2. **Partition left** (pivot = 11):
   - Left: `[]` | Pivot: `11` | Right: `[64, 34, 25, 12, 22]`

3. **Continue recursively** until all subarrays are size 1 or 0

4. **Final sorted result**: `[11, 12, 22, 25, 34, 64, 90]`

## When to Use Quick Sort

- **Preferred for**: Large datasets, general-purpose sorting
- **Advantages**: Fast average-case performance, in-place variant uses minimal extra space
- **Disadvantages**: Unstable sort, O(n²) worst case (though rare with good pivot selection)
- **Alternatives**: Merge Sort (stable), Heap Sort (guaranteed O(n log n)), Tim Sort (hybrid, used in Python/Java)
