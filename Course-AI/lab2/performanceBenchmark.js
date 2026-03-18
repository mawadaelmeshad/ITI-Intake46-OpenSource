/**
 * Performance Benchmarking Suite for QuickSort
 * Uses the 'benchmark.js' library for accurate timing
 * 
 * Installation:
 * npm install benchmark
 * 
 * Usage:
 * node performanceBenchmark.js
 */

const Benchmark = require('benchmark');

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

function jsBuiltInSort(array) {
  return [...array].sort((a, b) => a - b);
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

// ==================== BENCHMARK SUITE ====================

function runBenchmarks() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║     QuickSort Performance Benchmarking Suite                   ║');
  console.log('║          Using benchmark.js for Accurate Timing               ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const sizes = [100, 1000, 10000];
  const dataTypes = ['random', 'sorted', 'reverse', 'duplicates', 'nearlySorted'];

  let results = [];

  sizes.forEach(size => {
    console.log(`\n${'═'.repeat(65)}`);
    console.log(`📊 Array Size: ${size} elements`);
    console.log(`${'═'.repeat(65)}\n`);

    const testData = generateTestData(size);

    dataTypes.forEach(dataType => {
      console.log(`\n  Data Pattern: ${dataType.toUpperCase().replace(/_/g, ' ')}`);
      console.log(`  ${'─'.repeat(60)}`);

      const suite = new Benchmark.Suite;
      const data = testData[dataType];

      let quickSortTime = 0;
      let quickSortOptimizedTime = 0;
      let jsBuiltInTime = 0;

      suite
        .add('QuickSort (Naive)', function() {
          quickSort([...data]);
        })
        .add('QuickSort (Optimized)', function() {
          quickSortOptimized([...data]);
        })
        .add('JS Built-in Sort', function() {
          jsBuiltInSort([...data]);
        })
        .on('complete', function() {
          const fastest = this.filter('fastest').map('name')[0];
          const slowest = this.filter('slowest').map('name')[0];

          console.log('  Results:');
          this.forEach(bench => {
            const time = bench.times.mean * 1000; // Convert to ms
            const opsPerSec = bench.hz.toLocaleString('en-US', { maximumFractionDigits: 2 });
            const deviation = (bench.stats.rme).toFixed(2);
            
            let icon = '';
            if (bench.name === fastest) {
              icon = '🚀';
            } else if (bench.name === slowest) {
              icon = '🐢';
            } else {
              icon = '✓';
            }

            console.log(`    ${icon} ${bench.name.padEnd(25)} | ${time.toFixed(4)}ms | ${opsPerSec} ops/sec ±${deviation}%`);

            // Store results
            if (bench.name === 'QuickSort (Naive)') quickSortTime = time;
            if (bench.name === 'QuickSort (Optimized)') quickSortOptimizedTime = time;
            if (bench.name === 'JS Built-in Sort') jsBuiltInTime = time;
          });

          // Calculate ratios
          const ratio1 = (quickSortTime / jsBuiltInTime).toFixed(2);
          const ratio2 = (quickSortOptimizedTime / jsBuiltInTime).toFixed(2);
          console.log(`\n  Comparison to JS Built-in:`);
          console.log(`    QuickSort (Naive):      ${ratio1}x`);
          console.log(`    QuickSort (Optimized):  ${ratio2}x`);

          results.push({
            size,
            dataType,
            quickSort: quickSortTime,
            quickSortOptimized: quickSortOptimizedTime,
            jsBuiltIn: jsBuiltInTime
          });
        })
        .run({ 'async': true });
    });
  });

  // Schedule summary after all benchmarks
  setTimeout(() => {
    printSummary(results);
  }, 2000);
}

function printSummary(results) {
  console.log('\n\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                    BENCHMARK SUMMARY                           ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Win counts
  let quickSortWins = 0;
  let quickSortOptimizedWins = 0;
  let jsBuiltInWins = 0;

  results.forEach(r => {
    const fastest = Math.min(r.quickSort, r.quickSortOptimized, r.jsBuiltIn);
    if (r.quickSort === fastest) quickSortWins++;
    else if (r.quickSortOptimized === fastest) quickSortOptimizedWins++;
    else jsBuiltInWins++;
  });

  console.log('Win Counts by Algorithm:');
  console.log(`  QuickSort (Naive):      ${quickSortWins} wins`);
  console.log(`  QuickSort (Optimized):  ${quickSortOptimizedWins} wins`);
  console.log(`  JS Built-in Sort:       ${jsBuiltInWins} wins\n`);

  // Statistics by data type
  console.log('Average Performance by Data Pattern:\n');

  const dataTypes = ['random', 'sorted', 'reverse', 'duplicates', 'nearlySorted'];
  dataTypes.forEach(dataType => {
    const filtered = results.filter(r => r.dataType === dataType);
    const avgQuickSort = filtered.reduce((sum, r) => sum + r.quickSort, 0) / filtered.length;
    const avgOptimized = filtered.reduce((sum, r) => sum + r.quickSortOptimized, 0) / filtered.length;
    const avgJsBuiltIn = filtered.reduce((sum, r) => sum + r.jsBuiltIn, 0) / filtered.length;

    console.log(`  ${dataType.toUpperCase().replace(/_/g, ' ')}:`);
    console.log(`    QuickSort (Naive):      ${avgQuickSort.toFixed(4)}ms`);
    console.log(`    QuickSort (Optimized):  ${avgOptimized.toFixed(4)}ms`);
    console.log(`    JS Built-in Sort:       ${avgJsBuiltIn.toFixed(4)}ms\n`);
  });

  // Overall statistics
  console.log('Overall Statistics:\n');

  const totalQuickSort = results.reduce((sum, r) => sum + r.quickSort, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.quickSortOptimized, 0);
  const totalJsBuiltIn = results.reduce((sum, r) => sum + r.jsBuiltIn, 0);

  const avgQuickSort = totalQuickSort / results.length;
  const avgOptimized = totalOptimized / results.length;
  const avgJsBuiltIn = totalJsBuiltIn / results.length;

  console.log(`  Average QuickSort (Naive):      ${avgQuickSort.toFixed(4)}ms`);
  console.log(`  Average QuickSort (Optimized):  ${avgOptimized.toFixed(4)}ms`);
  console.log(`  Average JS Built-in Sort:       ${avgJsBuiltIn.toFixed(4)}ms`);
  console.log(`\n  Fastest: ${['QuickSort (Naive)', 'QuickSort (Optimized)', 'JS Built-in Sort'][[totalQuickSort, totalOptimized, totalJsBuiltIn].indexOf(Math.min(totalQuickSort, totalOptimized, totalJsBuiltIn))]}`);
  console.log(`  Slowest: ${['QuickSort (Naive)', 'QuickSort (Optimized)', 'JS Built-in Sort'][[totalQuickSort, totalOptimized, totalJsBuiltIn].indexOf(Math.max(totalQuickSort, totalOptimized, totalJsBuiltIn))]}`);

  // Key insights
  console.log('\n\n📈 KEY INSIGHTS:\n');
  console.log('  ✓ JS Built-in Sort is optimized by the JavaScript engine (V8)');
  console.log('  ✓ QuickSort (Optimized) is competitive due to three-way partitioning');
  console.log('  ✓ Naive QuickSort struggles with sorted/duplicated data');
  console.log('  ✓ Random data shows more balanced performance across implementations\n');

  console.log('═'.repeat(65));
  console.log('Benchmarking Complete!\n');
}

// ==================== EXECUTION ====================

runBenchmarks();
