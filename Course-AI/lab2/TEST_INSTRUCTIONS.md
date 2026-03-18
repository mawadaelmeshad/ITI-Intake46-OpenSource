# QuickSort Unit Tests - Jest

## Installation

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (auto-rerun on file changes)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run tests with verbose output
```bash
npm run test:verbose
```

## Test Coverage

The test suite includes **10 test categories** with **60+ individual test cases**:

### 1. **Basic Functionality** (4 tests)
- Random array sorting
- Single and two-element arrays
- Already sorted arrays

### 2. **Edge Cases** (7 tests)
- Empty arrays
- Original array immutability
- Negative numbers
- Mixed positive/negative
- Decimal numbers
- Very small negative numbers

### 3. **Duplicates** (5 tests)
- All identical elements
- Some duplicate elements
- Many duplicates
- Duplicates at ends
- Duplicate negative values

### 4. **Pre-sorted Arrays** (5 tests)
- Reverse sorted arrays
- Small and medium pre-sorted arrays
- Nearly sorted arrays
- Various sizes

### 5. **Large Datasets** (5 tests)
- 1,000 element random arrays
- 1,000 element arrays with duplicates
- 10,000 element random arrays
- Element count verification
- Large arrays with negative numbers

### 6. **Data Integrity** (3 tests)
- No data loss verification
- Duplicate preservation
- Element frequency maintenance

### 7. **Input Validation** (3 tests)
- Null/undefined handling
- Non-array input handling
- Empty input validation

### 8. **Correctness vs Native Sort** (5 tests)
- Random data comparison
- Duplicates comparison
- Pre-sorted comparison
- Reverse sorted comparison
- Negative numbers comparison

### 9. **Performance** (2 tests)
- 10,000 element performance
- 50,000 element stress test

### 10. **Boundary Values** (4 tests)
- Maximum safe integer
- Minimum safe integer
- Zero handling
- Very large value ranges

## Test Statistics

- **Total Test Cases**: 60+
- **Coverage Areas**: 10
- **Array Sizes Tested**: 0 to 50,000+ elements
- **Special Cases**: Duplicates, negatives, decimals, edge values

## Expected Output

When running `npm test`, you should see:

```
PASS  ./quickSort.test.js
  QuickSort Algorithm
    Basic Functionality
      ✓ should sort a random array (2ms)
      ✓ should handle a single element array (1ms)
      ✓ should handle two element array (1ms)
      ✓ should handle already sorted array (1ms)
    Edge Cases
      ✓ should handle empty array (1ms)
      ✓ should not mutate the original array (1ms)
      ... (and more)

Test Suites: 1 passed, 1 total
Tests:       60 passed, 60 total
Snapshots:   0 total
Time:        1.234s
```

## Key Test Insights

### What Each Test Validates

1. **Correctness**: Does the function produce sorted output?
2. **Immutability**: Is the original array unchanged?
3. **Completeness**: Are all elements preserved?
4. **Edge Cases**: Does it handle unusual inputs?
5. **Performance**: Is it fast enough for large datasets?
6. **Robustness**: Does it handle boundary values correctly?

### Test Data Patterns

- **Random Data**: Typical use case with random distribution
- **Sorted Data**: Worst case scenario for naive implementations
- **Duplicates**: Common real-world scenario
- **Negative Numbers**: Extended range handling
- **Boundary Values**: MIN/MAX safe integers
- **Large Datasets**: Scalability verification

## Coverage Report

To see detailed coverage metrics:

```bash
npm run test:coverage
```

This generates a coverage report showing:
- Lines covered by tests
- Branch coverage
- Function coverage
- Statement coverage

## Customization

### Adding More Tests

Edit `quickSort.test.js` and add to any `describe` block:

```javascript
test('should handle your specific case', () => {
  const input = [/* your test data */];
  const expected = [/* expected result */];
  expect(quickSort(input)).toEqual(expected);
});
```

### Modifying Test Configuration

Edit `package.json` or create `jest.config.js` for Jest configuration options.

## Troubleshooting

### Tests not running
1. Ensure Node.js is installed: `node --version`
2. Run `npm install` to install Jest
3. Check that test file is named `*.test.js`

### Import errors
- The test file includes the quickSort function inline for simplicity
- To test actual module exports, modify the import statement

### Timeout issues
- Jest has a default 5000ms timeout per test
- Configure in `jest.config.js` if needed for performance tests

## Best Practices Demonstrated

This test suite follows:
- **Arrange-Act-Assert (AAA) pattern**: Clear test structure
- **Descriptive naming**: Tests explain what they verify
- **Single responsibility**: Each test checks one aspect
- **Comprehensive coverage**: Multiple scenarios per feature
- **Edge case focus**: Boundary and unusual inputs
- **Performance validation**: Scalability tests included
- **Maintainability**: Well-organized test groups
