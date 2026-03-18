/**
 * Performance Testing Suite - No Dependencies Required
 * Uses native performance.now() API for accurate timing
 * 
 * Usage:
 * node performanceTesting.js
 */

// ==================== IMPLEMENTATIONS ====================

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
      [array[i], array[partitionIndex]] = [array[partitionIndex], array[i]];
    }
  }

  [array[partitionIndex + 1], array[high]] = [array[high], array[partitionIndex + 1]];
  return partitionIndex + 1;
}

function quickSortOptimized(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return array;
  }
  const arrayToSort = [...array];
  quickSortOptimizedHelper(arrayToSort, 0, arrayToSort.length - 1);
  return arrayToSort;
}

function quickSortOptimizedHelper(array, low, high) {
  const INSERTION_THRESHOLD = 16;

  if (high - low < INSERTION_THRESHOLD) {
    insertionSort(array, low, high);
    return;
  }

  if (low < high) {
    const [lt, gt] = partitionThreeWay(array, low, high);

    if (lt - low < high - gt) {
      quickSortOptimizedHelper(array, low, lt - 1);
      quickSortOptimizedHelper(array, gt + 1, high);
    } else {
      quickSortOptimizedHelper(array, gt + 1, high);
      quickSortOptimizedHelper(array, low, lt - 1);
    }
  }
}

function partitionThreeWay(array, low, high) {
  const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
  [array[randomIndex], array[high]] = [array[high], array[randomIndex]];

  const pivot = array[high];
  let lt = low;
  let gt = high - 1;
  let i = low;

  while (i <= gt) {
    if (array[i] < pivot) {
      [array[i], array[lt]] = [array[lt], array[i]];
      i++;
      lt++;
    } else if (array[i] > pivot) {
      [array[i], array[gt]] = [array[gt], array[i]];
      gt--;
    } else {
      i++;
    }
  }

  [array[high], array[lt]] = [array[lt], array[high]];
  return [lt, gt];
}

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

function jsBuiltInSort(array) {
  return [...array].sort((a, b) => a - b);
}

// ==================== TEST DATA GENERATORS ====================

function generateTestData(size) {
  return {
    random: Array.from({ length: size }, () => Math.floor(Math.random() * size * 10)),
    sorted: Array.from({ length: size }, (_, i) => i),
    reverse: Array.from({ length: size }, (_, i) => size - i),
    duplicates: Array.from({ length: size }, () => Math.floor(Math.random() * 10)),
    nearlySorted: (() => {
      const arr = Array.from({ length: size }, (_, i) => i);
      const shuffleCount = Math.floor(size * 0.05);
      for (let i = 0; i < shuffleCount; i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      }
      return arr;
    })()
  };
}

// ==================== BENCHMARKING UTILITY ====================

class PerformanceTimer {
  constructor(name, fn, data, iterations = 1) {
    this.name = name;
    this.fn = fn;
    this.data = data;
    this.iterations = iterations;
    this.times = [];
    this.totalTime = 0;
  }

  run() {
    this.times = [];
    
    try {
      for (let i = 0; i < this.iterations; i++) {
        const start = performance.now();
        this.fn([...this.data]);
        const end = performance.now();
        this.times.push(end - start);
      }

      this.totalTime = this.times.reduce((a, b) => a + b, 0);
    } catch (error) {
      // Handle stack overflow or other runtime errors
      if (error instanceof RangeError) {
        this.error = `Stack Overflow - Array too large for naive implementation`;
      } else {
        this.error = error.message;
      }
      this.totalTime = Infinity;
      this.times = [Infinity];
    }
    
    return this;
  }

  getStats() {
    const sorted = [...this.times].sort((a, b) => a - b);
    const mean = this.totalTime / this.times.length;
    const median = sorted[Math.floor(sorted.length / 2)];
    const stdDev = Math.sqrt(
      this.times.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / this.times.length
    );

    return {
      mean,
      median,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      stdDev,
      totalTime: this.totalTime
    };
  }

  print() {
    if (this.error) {
      console.log(`  ${this.name.padEnd(28)} | ⚠️  ${this.error}`);
      return { mean: Infinity, median: Infinity, min: Infinity, max: Infinity, stdDev: Infinity };
    }

    const stats = this.getStats();
    const formatted = `${this.name.padEnd(28)} | Mean: ${stats.mean.toFixed(4)}ms | Min: ${stats.min.toFixed(4)}ms | Max: ${stats.max.toFixed(4)}ms | StdDev: ${stats.stdDev.toFixed(4)}ms`;
    console.log(`  ${formatted}`);
    return stats;
  }
}

// ==================== MAIN BENCHMARK RUNNER ====================

function runPerformanceTests() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                 QuickSort Performance Testing Suite                       ║');
  console.log('║              No External Dependencies - Pure Node.js timing              ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  const sizes = [100, 1000, 10000];
  const dataTypes = ['random', 'sorted', 'reverse', 'duplicates', 'nearlySorted'];
  const iterations = { 100: 100, 1000: 50, 10000: 10 };

  const results = [];

  sizes.forEach(size => {
    const iter = iterations[size];
    console.log(`\n${'═'.repeat(80)}`);
    console.log(`📊 Array Size: ${size} elements (${iter} iterations per test)`);
    console.log(`${'═'.repeat(80)}\n`);

    const testData = generateTestData(size);

    dataTypes.forEach(dataType => {
      const data = testData[dataType];
      console.log(`\n  📈 Data Pattern: ${dataType.toUpperCase().replace(/_/g, ' ')}`);
      console.log(`  ${'─'.repeat(76)}`);

      // Run benchmarks
      const quickSortTimer = new PerformanceTimer('QuickSort (Naive)', quickSort, data, iter);
      const optimizedTimer = new PerformanceTimer('QuickSort (Optimized)', quickSortOptimized, data, iter);
      const builtInTimer = new PerformanceTimer('JS Built-in Sort', jsBuiltInSort, data, iter);

      quickSortTimer.run();
      optimizedTimer.run();
      builtInTimer.run();

      // Print results
      const stats1 = quickSortTimer.print();
      const stats2 = optimizedTimer.print();
      const stats3 = builtInTimer.print();

      // Find fastest
      const times = [stats1.mean, stats2.mean, stats3.mean];
      const fastest = Math.min(...times);
      const algorithms = ['QuickSort (Naive)', 'QuickSort (Optimized)', 'JS Built-in Sort'];
      
      if (fastest === Infinity) {
        console.log(`\n  ⚠️  Error: One or more algorithms failed. Skipping comparison.`);
      } else {
        const fastestIndex = times.indexOf(fastest);

        console.log(`\n  🚀 Fastest: ${algorithms[fastestIndex]}`);
        console.log(`  Comparison to fastest:`);
        console.log(`    QuickSort (Naive):      ${(stats1.mean === Infinity ? '✗ Failed' : (stats1.mean / fastest).toFixed(2) + 'x')}`);
        console.log(`    QuickSort (Optimized):  ${(stats2.mean === Infinity ? '✗ Failed' : (stats2.mean / fastest).toFixed(2) + 'x')}`);
        console.log(`    JS Built-in Sort:       ${(stats3.mean === Infinity ? '✗ Failed' : (stats3.mean / fastest).toFixed(2) + 'x')}`);
      }

      results.push({
        size,
        dataType,
        quickSort: stats1,
        optimized: stats2,
        builtIn: stats3,
        fastest: fastest === Infinity ? 'Error' : algorithms[times.indexOf(fastest)]
      });
    });
  });

  // Print summary
  printPerformanceSummary(results);
}

function printPerformanceSummary(results) {
  console.log('\n\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                          PERFORMANCE SUMMARY                              ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // Win counts
  const winCounts = {};
  results.forEach(r => {
    if (!winCounts[r.fastest]) {
      winCounts[r.fastest] = 0;
    }
    winCounts[r.fastest]++;
  });

  console.log('🏆 Win Counts by Algorithm:\n');
  Object.entries(winCounts).forEach(([algo, count]) => {
    const percentage = ((count / results.length) * 100).toFixed(1);
    console.log(`  ${algo.padEnd(28)} : ${count.toString().padStart(2)} wins (${percentage}%)`);
  });

  // Statistics by size
  console.log('\n\n📊 Average Performance by Array Size:\n');

  const sizes = [100, 1000, 10000];
  sizes.forEach(size => {
    const filtered = results.filter(r => r.size === size);
    const avgQuickSort = filtered.reduce((sum, r) => sum + r.quickSort.mean, 0) / filtered.length;
    const avgOptimized = filtered.reduce((sum, r) => sum + r.optimized.mean, 0) / filtered.length;
    const avgBuiltIn = filtered.reduce((sum, r) => sum + r.builtIn.mean, 0) / filtered.length;

    console.log(`  Size: ${size.toString().padStart(5)} elements`);
    console.log(`    QuickSort (Naive):      ${avgQuickSort.toFixed(4)}ms`);
    console.log(`    QuickSort (Optimized):  ${avgOptimized.toFixed(4)}ms`);
    console.log(`    JS Built-in Sort:       ${avgBuiltIn.toFixed(4)}ms\n`);
  });

  // Statistics by data type
  console.log('📊 Average Performance by Data Pattern:\n');

  const dataTypes = ['random', 'sorted', 'reverse', 'duplicates', 'nearlySorted'];
  dataTypes.forEach(dataType => {
    const filtered = results.filter(r => r.dataType === dataType);
    const avgQuickSort = filtered.reduce((sum, r) => sum + r.quickSort.mean, 0) / filtered.length;
    const avgOptimized = filtered.reduce((sum, r) => sum + r.optimized.mean, 0) / filtered.length;
    const avgBuiltIn = filtered.reduce((sum, r) => sum + r.builtIn.mean, 0) / filtered.length;

    console.log(`  ${dataType.toUpperCase().replace(/_/g, ' ')}`);
    console.log(`    QuickSort (Naive):      ${avgQuickSort.toFixed(4)}ms`);
    console.log(`    QuickSort (Optimized):  ${avgOptimized.toFixed(4)}ms`);
    console.log(`    JS Built-in Sort:       ${avgBuiltIn.toFixed(4)}ms\n`);
  });

  // Overall statistics
  console.log('📈 Overall Statistics:\n');

  const totalQuickSort = results.reduce((sum, r) => sum + r.quickSort.mean, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimized.mean, 0);
  const totalBuiltIn = results.reduce((sum, r) => sum + r.builtIn.mean, 0);

  const avgQuickSort = totalQuickSort / results.length;
  const avgOptimized = totalOptimized / results.length;
  const avgBuiltIn = totalBuiltIn / results.length;

  console.log(`  Average QuickSort (Naive):      ${avgQuickSort.toFixed(4)}ms`);
  console.log(`  Average QuickSort (Optimized):  ${avgOptimized.toFixed(4)}ms`);
  console.log(`  Average JS Built-in Sort:       ${avgBuiltIn.toFixed(4)}ms`);

  const fastest = Math.min(totalQuickSort, totalOptimized, totalBuiltIn);
  const fastestAlgo = ['QuickSort (Naive)', 'QuickSort (Optimized)', 'JS Built-in Sort'][[totalQuickSort, totalOptimized, totalBuiltIn].indexOf(fastest)];

  console.log(`\n  🚀 Fastest Overall: ${fastestAlgo}`);
  console.log(`  ⚡ Improvement: QuickSort (Optimized) is ${(totalQuickSort / totalOptimized).toFixed(2)}x faster than naive version`);

  // Key insights
  console.log('\n\n🔍 KEY FINDINGS:\n');
  console.log('  ✓ JS Built-in Sort uses V8\'s optimized algorithm (TimSort-like hybrid)');
  console.log('  ✓ QuickSort (Optimized) with three-way partitioning handles duplicates well');
  console.log('  ✓ Naive QuickSort struggles significantly with pre-sorted data');
  console.log('  ✓ Random data shows most balanced performance');
  console.log('  ✓ Optimization techniques (insertion sort, random pivot) provide significant gains\n');

  console.log('═'.repeat(80));
  console.log('\n✅ Performance testing complete!\n');
}

// ==================== EXECUTION ====================

console.log('Starting performance tests...');
console.log('This may take a moment as each test runs multiple iterations.\n');

runPerformanceTests();
