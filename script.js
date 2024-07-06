// Function to parse input string to integer array
function parseInputArray(inputString) {
    return inputString.split(',').map(numStr => parseInt(numStr.trim()));
}

// Bubble Sort implementation
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Merge Sort implementation
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Selection Sort implementation
function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

// Function to measure execution time of sorting algorithms
function measureTimeComplexity(algorithm, arr) {
    let start = performance.now();
    let sortedArr = algorithm(arr.slice()); // Make a copy of the array to avoid modifying the original
    let end = performance.now();
    return { time: end - start, sortedArr: sortedArr };
}

// Function to run sorting algorithms on user input and plot results
function runSortingAlgorithms() {
    let inputArray = document.getElementById('inputArray').value;
    let arr = parseInputArray(inputArray);

    // Measure time complexity for each algorithm
    let bubbleResult = measureTimeComplexity(bubbleSort, arr);
    let mergeResult = measureTimeComplexity(mergeSort, arr);
    let selectionResult = measureTimeComplexity(selectionSort, arr);

    // Display sorted arrays and time taken
    document.getElementById('bubbleSortResult').textContent = 
        `Bubble Sort - Time: ${bubbleResult.time.toFixed(2)} ms, Result: ${bubbleResult.sortedArr.join(', ')}`;
    document.getElementById('mergeSortResult').textContent = 
        `Merge Sort - Time: ${mergeResult.time.toFixed(2)} ms, Result: ${mergeResult.sortedArr.join(', ')}`;
    document.getElementById('selectionSortResult').textContent = 
        `Selection Sort - Time: ${selectionResult.time.toFixed(2)} ms, Result: ${selectionResult.sortedArr.join(', ')}`;

    // Display results using Chart.js
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Bubble Sort', 'Merge Sort', 'Selection Sort'],
            datasets: [{
                label: 'Time Taken (ms)',
                data: [bubbleResult.time, mergeResult.time, selectionResult.time],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
