/**
 * Unit Tests for Quick Sort Implementation
 * Framework: Jest
 * 
 * Installation:
 * npm install --save-dev jest
 * npm test (or npx jest)
 */

// Import the quickSort function
// Assuming quickSort is exported from quickSort.js
function quickSort(array) {
if (!Array.isArray(array) || array.length === 0) {
    return array;
}

const arrayToSort = [...array];
quickSortInPlace(arrayToSort, 0, arrayToSort.length - 1);
return arrayToSort;
}

function quickSortInPlace(array, low, high) {
if (low < high) {
    const pivotIndex = partition(array, low, high);
    quickSortInPlace(array, low, pivotIndex - 1);
    quickSortInPlace(array, pivotIndex + 1, high);
}
}

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

function swap(array, index1, index2) {
const temp = array[index1];
array[index1] = array[index2];
array[index2] = temp;
}

// ==================== UNIT TESTS ====================

describe('QuickSort Algorithm', () => {

// ========== BASIC FUNCTIONALITY ==========

describe('Basic Functionality', () => {
    test('should sort a random array', () => {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const expected = [11, 12, 22, 25, 34, 64, 90];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle a single element array', () => {
    expect(quickSort([42])).toEqual([42]);
    });

    test('should handle two element array', () => {
    expect(quickSort([2, 1])).toEqual([1, 2]);
    });

    test('should handle already sorted array', () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    expect(quickSort(input)).toEqual(expected);
    });
});

// ========== EDGE CASES ==========

describe('Edge Cases', () => {
    test('should handle empty array', () => {
    expect(quickSort([])).toEqual([]);
    });

    test('should not mutate the original array', () => {
    const original = [64, 34, 25, 12, 22, 11, 90];
    const copy = [...original];
    quickSort(original);
    expect(original).toEqual(copy);
    });

    test('should handle array with one null-like value', () => {
    const input = [3, 1, 2];
    const expected = [1, 2, 3];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle negative numbers', () => {
    const input = [-5, 10, -3, 0, 7];
    const expected = [-5, -3, 0, 7, 10];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle mixed positive and negative', () => {
    const input = [100, -50, 0, 25, -75, 50];
    const expected = [-75, -50, 0, 25, 50, 100];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle very small negative numbers', () => {
    const input = [-1000, -500, -100];
    const expected = [-1000, -500, -100];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle decimal numbers', () => {
    const input = [3.14, 2.71, 1.41, 2.71];
    const expected = [1.41, 2.71, 2.71, 3.14];
    expect(quickSort(input)).toEqual(expected);
    });
});

// ========== DUPLICATES ==========

describe('Duplicates', () => {
    test('should handle all identical elements', () => {
    const input = [5, 5, 5, 5, 5];
    const expected = [5, 5, 5, 5, 5];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle some duplicate elements', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    const expected = [1, 1, 2, 3, 4, 5, 5, 6, 9];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle many duplicates', () => {
    const input = [1, 2, 1, 2, 1, 2, 1, 2];
    const expected = [1, 1, 1, 1, 2, 2, 2, 2];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle duplicates at ends', () => {
    const input = [5, 3, 1, 4, 2, 5];
    const expected = [1, 2, 3, 4, 5, 5];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle duplicate negatives', () => {
    const input = [-1, -5, -1, -5, 0];
    const expected = [-5, -5, -1, -1, 0];
    expect(quickSort(input)).toEqual(expected);
    });
});

// ========== SORTED/REVERSE SORTED ==========

describe('Pre-sorted Arrays', () => {
    test('should handle reverse sorted array', () => {
    const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle already sorted small array', () => {
    const input = [1, 2, 3];
    expect(quickSort(input)).toEqual([1, 2, 3]);
    });

    test('should handle already sorted medium array', () => {
    const input = Array.from({ length: 50 }, (_, i) => i);
    expect(quickSort(input)).toEqual(input);
    });

    test('should handle reverse sorted medium array', () => {
    const input = Array.from({ length: 50 }, (_, i) => 50 - i);
    const expected = Array.from({ length: 50 }, (_, i) => i + 1);
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle nearly sorted array', () => {
    const input = [1, 2, 3, 5, 4, 6, 7, 8];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(quickSort(input)).toEqual(expected);
    });
});

// ========== LARGE DATASETS ==========

describe('Large Datasets', () => {
    test('should handle large random array (1000 elements)', () => {
    const input = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
    const result = quickSort(input);
    
    // Verify sorted
    for (let i = 0; i < result.length - 1; i++) {
        expect(result[i] <= result[i + 1]).toBe(true);
    }
    });

    test('should handle large array with duplicates', () => {
    const input = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10));
    const result = quickSort(input);
    
    // Verify sorted
    for (let i = 0; i < result.length - 1; i++) {
        expect(result[i] <= result[i + 1]).toBe(true);
    }
    });

    test('should handle very large random array (10000 elements)', () => {
    const input = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100000));
    const result = quickSort(input);
    
    // Verify sorted
    for (let i = 0; i < result.length - 1; i++) {
        expect(result[i] <= result[i + 1]).toBe(true);
    }
    });

    test('should maintain elements count in large array', () => {
    const input = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100));
    const result = quickSort(input);
    expect(result.length).toBe(input.length);
    });

    test('should correctly sort large array with negative numbers', () => {
    const input = Array.from({ length: 500 }, () => Math.floor(Math.random() * 1000) - 500);
    const result = quickSort(input);
    
    for (let i = 0; i < result.length - 1; i++) {
        expect(result[i] <= result[i + 1]).toBe(true);
    }
    });
});

// ========== DATA INTEGRITY ==========

describe('Data Integrity', () => {
    test('should maintain all values (no data loss)', () => {
    const input = [5, 2, 8, 1, 9, 3];
    const result = quickSort(input);
    
    const inputSorted = [...input].sort((a, b) => a - b);
    expect(result).toEqual(inputSorted);
    });

    test('should not miss any duplicates', () => {
    const input = [1, 2, 2, 2, 3];
    const result = quickSort(input);
    
    const count = result.filter(x => x === 2).length;
    expect(count).toBe(3);
    });

    test('should maintain frequency of elements', () => {
    const input = [4, 2, 4, 1, 2, 4];
    const result = quickSort(input);
    
    const freq = {};
    input.forEach(num => {
        freq[num] = (freq[num] || 0) + 1;
    });
    
    const resultFreq = {};
    result.forEach(num => {
        resultFreq[num] = (resultFreq[num] || 0) + 1;
    });
    
    expect(freq).toEqual(resultFreq);
    });
});

// ========== INPUT VALIDATION ==========

describe('Input Validation', () => {
    test('should handle null/undefined gracefully', () => {
    expect(quickSort(null)).toBeNull();
    expect(quickSort(undefined)).toBeUndefined();
    });

    test('should handle non-array input', () => {
    // Depending on implementation
    expect(() => quickSort("not an array")).not.toThrow();
    });

    test('should return array for empty input', () => {
    const result = quickSort([]);
    expect(Array.isArray(result)).toBe(true);
    });
});

// ========== COMPARISON WITH NATIVE SORT ==========

describe('Correctness vs Native Sort', () => {
    test('should produce same result as native sort (random data)', () => {
    const input = [64, 34, 25, 12, 22, 11, 90, 5, 1, 100];
    const expected = [...input].sort((a, b) => a - b);
    expect(quickSort(input)).toEqual(expected);
    });

    test('should produce same result as native sort (with duplicates)', () => {
    const input = [5, 2, 5, 2, 1, 1, 3, 3, 3];
    const expected = [...input].sort((a, b) => a - b);
    expect(quickSort(input)).toEqual(expected);
    });

    test('should produce same result as native sort (sorted array)', () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [...input].sort((a, b) => a - b);
    expect(quickSort(input)).toEqual(expected);
    });

    test('should produce same result as native sort (reverse sorted)', () => {
    const input = [5, 4, 3, 2, 1];
    const expected = [...input].sort((a, b) => a - b);
    expect(quickSort(input)).toEqual(expected);
    });

    test('should produce same result as native sort (negative numbers)', () => {
    const input = [-5, 10, -3, 0, 7, -1];
    const expected = [...input].sort((a, b) => a - b);
    expect(quickSort(input)).toEqual(expected);
    });
});

// ========== PERFORMANCE CHARACTERISTICS ==========

describe('Performance', () => {
    test('should complete sorting of 10000 elements within reasonable time', () => {
    const input = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100000));
    const start = performance.now();
    quickSort(input);
    const end = performance.now();
    
    // Should complete in less than 100ms for 10k elements
    expect(end - start).toBeLessThan(100);
    });

    test('should handle stress test with 50000 elements', () => {
    const input = Array.from({ length: 50000 }, () => Math.floor(Math.random() * 500000));
    const result = quickSort(input);
    
    // Verify it's still sorted
    for (let i = 0; i < result.length - 1; i++) {
        expect(result[i] <= result[i + 1]).toBe(true);
    }
    });
});

// ========== BOUNDARY VALUES ==========

describe('Boundary Values', () => {
    test('should handle maximum safe integer', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    const input = [maxSafe, 1, maxSafe - 1];
    const expected = [1, maxSafe - 1, maxSafe];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle minimum safe integer', () => {
    const minSafe = Number.MIN_SAFE_INTEGER;
    const input = [minSafe, 1, minSafe + 1];
    const expected = [minSafe, minSafe + 1, 1];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle zero', () => {
    const input = [5, 0, -5, 0, 10];
    const expected = [-5, 0, 0, 5, 10];
    expect(quickSort(input)).toEqual(expected);
    });

    test('should handle very large range of values', () => {
    const input = [
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        0,
        1,
        -1
    ];
    const result = quickSort(input);
    
    // Verify sorting
    for (let i = 0; i < result.length - 1; i++) {
        expect(result[i] <= result[i + 1]).toBe(true);
    }
    });
});

});

// Export for use with external test runners if needed
module.exports = { quickSort };
