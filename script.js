function bubbleSort(arr) {
            let n = arr.length;
            let swapped;
            for (let i = 0; i < n - 1; i++) {
                swapped = false;
                for (let j = 0; j < n - 1 - i; j++) {
                    if (arr[j] > arr[j + 1]) {
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        swapped = true;
                    }
                }
                if (!swapped) break;
            }
            return arr;
        }

        function mergeSort(arr) {
            if (arr.length <= 1) {
                return arr;
            }
            const mid = Math.floor(arr.length / 2);
            const left = arr.slice(0, mid);
            const right = arr.slice(mid);
            return merge(mergeSort(left), mergeSort(right));
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
                    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                }
            }
            return arr;
        }

        function plotGraph(bubbleTime, mergeTime, selectionTime) {
            const ctx = document.getElementById('timeChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Bubble Sort', 'Merge Sort', 'Selection Sort'],
                    datasets: [{
                        label: 'Time Taken (ns)',
                        data: [bubbleTime, mergeTime, selectionTime],
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
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        function sortArray() {
            const input = document.getElementById('arrayInput').value;
            const array = input.split(',').map(num => parseFloat(num.trim()));

            if (array.some(isNaN)) {
                document.getElementById('bubbleResult').innerText = "Please enter a valid array of numbers.";
                document.getElementById('mergeResult').innerText = "";
                document.getElementById('selectionResult').innerText = "";
                return;
            }

            // Bubble Sort
            let bubbleArray = [...array];
            let bubbleStart = performance.now();
            bubbleSort(bubbleArray);
            let bubbleEnd = performance.now();
            let bubbleTime = (bubbleEnd - bubbleStart) * 1e6;

            // Merge Sort
            let mergeArray = [...array];
            let mergeStart = performance.now();
            mergeSort(mergeArray);
            let mergeEnd = performance.now();
            let mergeTime = (mergeEnd - mergeStart) * 1e6;

            // Selection Sort
            let selectionArray = [...array];
            let selectionStart = performance.now();
            selectionSort(selectionArray);
            let selectionEnd = performance.now();
            let selectionTime = (selectionEnd - selectionStart) * 1e6;

            // Display results
            document.getElementById('bubbleResult').innerText = `Bubble Sort: ${bubbleArray.join(', ')} (Time: ${bubbleTime.toFixed(2)} ns)`;
            document.getElementById('mergeResult').innerText = `Merge Sort: ${mergeArray.join(', ')} (Time: ${mergeTime.toFixed(2)} ns)`;
            document.getElementById('selectionResult').innerText = `Selection Sort: ${selectionArray.join(', ')} (Time: ${selectionTime.toFixed(2)} ns)`;

            // Plot the graph
            plotGraph(bubbleTime, mergeTime, selectionTime);
        }