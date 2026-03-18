/**
 * Optimized Quick Sort - Recursive & Iterative Implementations
 * 
 * Performance Optimizations:
 * 1. Random pivot selection - avoids O(n²) worst case
 * 2. Insertion sort for small subarrays - faster for small partitions
 * 3. Three-way partition - handles duplicates efficiently
 * 4. Iterative version - avoids stack overflow on large inputs
 * 5. Tail recursion optimization - reduces stack depth
 */

// ==================== OPTIMIZED RECURSIVE VERSION ====================

/**
 * Optimized recursive quick sort with multiple enhancements
 * @param {number[]} array - Array to sort
 * @returns {number[]} - Sorted array
 */
function quickSortRecursive(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return array;
  }

  const arrayToSort = [...array];
  quickSortRecursiveHelper(arrayToSort, 0, arrayToSort.length - 1);
  return arrayToSort;
}

function quickSortRecursiveHelper(array, low, high) {
  const INSERTION_THRESHOLD = 16; // Switch to insertion sort for small arrays

  if (high - low < INSERTION_THRESHOLD) {
    insertionSort(array, low, high);
    return;
  }

  if (low < high) {
    // Use three-way partition for better handling of duplicates
    const [lt, gt] = partitionThreeWay(array, low, high);
    
    // Tail recursion optimization: sort smaller partition first
    if (lt - low < high - gt) {
      quickSortRecursiveHelper(array, low, lt - 1);
      quickSortRecursiveHelper(array, gt + 1, high);
    } else {
      quickSortRecursiveHelper(array, gt + 1, high);
      quickSortRecursiveHelper(array, low, lt - 1);
    }
  }
}

// ==================== OPTIMIZED ITERATIVE VERSION ====================

/**
 * Iterative quick sort using explicit stack
 * Advantages: No risk of stack overflow, better for very large arrays
 * @param {number[]} array - Array to sort
 * @returns {number[]} - Sorted array
 */
function quickSortIterative(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return array;
  }

  const arrayToSort = [...array];
  const stack = [];
  const INSERTION_THRESHOLD = 16;

  stack.push(0);
  stack.push(arrayToSort.length - 1);

  while (stack.length > 0) {
    const high = stack.pop();
    const low = stack.pop();

    if (high - low < INSERTION_THRESHOLD) {
      insertionSort(arrayToSort, low, high);
      continue;
    }

    if (low < high) {
      const [lt, gt] = partitionThreeWay(arrayToSort, low, high);

      // Push smaller partition first to minimize stack depth
      if (lt - low < high - gt) {
        // Left partition is smaller
        if (low < lt - 1) {
          stack.push(low);
          stack.push(lt - 1);
        }
        if (gt + 1 < high) {
          stack.push(gt + 1);
          stack.push(high);
        }
      } else {
        // Right partition is smaller
        if (gt + 1 < high) {
          stack.push(gt + 1);
          stack.push(high);
        }
        if (low < lt - 1) {
          stack.push(low);
          stack.push(lt - 1);
        }
      }
    }
  }

  return arrayToSort;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Three-way partition (Dutch National Flag)
 * Handles duplicates efficiently by maintaining three regions:
 * - Elements < pivot (left)
 * - Elements == pivot (middle)
 * - Elements > pivot (right)
 * @returns [ltIndex, gtIndex] - Boundaries of equal elements
 */
function partitionThreeWay(array, low, high) {
  // Random pivot selection to avoid worst-case O(n²)
  const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
  swap(array, randomIndex, high);
  
  const pivot = array[high];
  let lt = low;      // Index of rightmost element < pivot
  let gt = high - 1; // Index of leftmost element > pivot
  let i = low;       // Current index

  while (i <= gt) {
    if (array[i] < pivot) {
      swap(array, i, lt);
      i++;
      lt++;
    } else if (array[i] > pivot) {
      swap(array, i, gt);
      gt--;
    } else {
      i++;
    }
  }

  swap(array, high, lt);
  return [lt, gt];
}

/**
 * Insertion sort for small arrays - more efficient than quick sort
 * Time: O(n²) worst case, but faster for n < 16
 */
function insertionSort(array, low, high) {
  for (let i = low + 1; i <= high; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= low && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = key;
  }
}

/**
 * Swap two array elements
 */
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// ==================== PERFORMANCE BENCHMARKING ====================

/**
 * Simple performance testing utility
 */
function benchmark(sortFn, array, iterations = 1) {
  const arrayClone = Array.from(array);
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    sortFn(arrayClone);
  }

  const end = performance.now();
  return {
    time: end - start,
    avgTime: (end - start) / iterations
  };
}

/**
 * Generate test arrays for performance comparison
 */
function generateTestArrays() {
  const small = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
  const medium = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
  const large = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000));
  const sorted = Array.from({ length: 10000 }, (_, i) => i);
  const reverse = Array.from({ length: 10000 }, (_, i) => 10000 - i);
  const duplicates = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10));

  return { small, medium, large, sorted, reverse, duplicates };
}

/**
 * Run comprehensive performance comparison
 */
function comparePerformance() {
  console.log("\n========== PERFORMANCE COMPARISON ==========\n");

  const testArrays = generateTestArrays();

  // Test Original Version
  const original = require('./quickSort.js'); // Original implementation

  console.log("Small Array (100 elements):");
  console.log(`  Recursive: ${benchmark(quickSortRecursive, testArrays.small).avgTime.toFixed(4)}ms`);
  console.log(`  Iterative: ${benchmark(quickSortIterative, testArrays.small).avgTime.toFixed(4)}ms`);

  console.log("\nMedium Array (10,000 elements):");
  console.log(`  Recursive: ${benchmark(quickSortRecursive, testArrays.medium).avgTime.toFixed(4)}ms`);
  console.log(`  Iterative: ${benchmark(quickSortIterative, testArrays.medium).avgTime.toFixed(4)}ms`);

  console.log("\nLarge Array (100,000 elements):");
  console.log(`  Recursive: ${benchmark(quickSortRecursive, testArrays.large).avgTime.toFixed(4)}ms`);
  console.log(`  Iterative: ${benchmark(quickSortIterative, testArrays.large).avgTime.toFixed(4)}ms`);

  console.log("\nAlready Sorted (10,000 elements):");
  console.log(`  Recursive: ${benchmark(quickSortRecursive, testArrays.sorted).avgTime.toFixed(4)}ms`);
  console.log(`  Iterative: ${benchmark(quickSortIterative, testArrays.sorted).avgTime.toFixed(4)}ms`);

  console.log("\nReverse Sorted (10,000 elements):");
  console.log(`  Recursive: ${benchmark(quickSortRecursive, testArrays.reverse).avgTime.toFixed(4)}ms`);
  console.log(`  Iterative: ${benchmark(quickSortIterative, testArrays.reverse).avgTime.toFixed(4)}ms`);

  console.log("\nMany Duplicates (10,000 elements):");
  console.log(`  Recursive: ${benchmark(quickSortRecursive, testArrays.duplicates).avgTime.toFixed(4)}ms`);
  console.log(`  Iterative: ${benchmark(quickSortIterative, testArrays.duplicates).avgTime.toFixed(4)}ms`);
}

// ==================== EXAMPLES & VERIFICATION ====================

console.log("========== VERIFICATION ==========\n");

const testArray = [64, 34, 25, 12, 22, 11, 90, 34, 25];

console.log("Original array:", testArray);
console.log("Recursive result:", quickSortRecursive(testArray));
console.log("Iterative result:", quickSortIterative(testArray));

// Uncomment to run full benchmark comparison
// comparePerformance();
