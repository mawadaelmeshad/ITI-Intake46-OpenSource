/**
 * Quick Sort Algorithm Implementation
 * Sorts an array in ascending order using the divide-and-conquer approach
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) for recursion stack
 */

/**
 * Main quick sort function
 * @param {number[]} array - The array to be sorted
 * @returns {number[]} - A new sorted array
 */
function quickSort(array) {
if (!Array.isArray(array) || array.length === 0) {
    return array;
}

const arrayToSort = [...array];
quickSortInPlace(arrayToSort, 0, arrayToSort.length - 1);
return arrayToSort;
}

/**
 * In-place quick sort helper function
 * Recursively sorts the array by partitioning around a pivot
 * @param {number[]} array - The array to sort
 * @param {number} low - Starting index of the subarray
 * @param {number} high - Ending index of the subarray
 */
function quickSortInPlace(array, low, high) {
if (low < high) {
    const pivotIndex = partition(array, low, high);
    quickSortInPlace(array, low, pivotIndex - 1);
    quickSortInPlace(array, pivotIndex + 1, high);
}
}

/**
 * Partitions the array around a pivot element
 * Uses the Lomuto partition scheme
 * @param {number[]} array - The array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number} - Index of the pivot after partitioning
 */
function partition(array, low, high) {
const pivot = array[high];
let partitionIndex = low - 1;

for (let i = low; i < high; i++) {
    if (array[i] < pivot) {
    partitionIndex++;
    swap(array, i, partitionIndex);
    }
}

swap(array, partitionIndex + 1, high);
return partitionIndex + 1;
}

/**
 * Swaps two elements in an array
 * @param {number[]} array - The array containing elements to swap
 * @param {number} index1 - First element index
 * @param {number} index2 - Second element index
 */
function swap(array, index1, index2) {
const temp = array[index1];
array[index1] = array[index2];
array[index2] = temp;
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", unsortedArray);

const sortedArray = quickSort(unsortedArray);
console.log("Sorted array:", sortedArray);
console.log("Original array (unchanged):", unsortedArray);
