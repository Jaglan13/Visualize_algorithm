function navigate(url) {
    window.location.href = url;
}

function submitSearch() {
    const numbers = document.getElementById('search-input').value;
    const target = document.getElementById('search-target').value;
    localStorage.setItem('numbers', numbers);
    localStorage.setItem('target', target);
    window.location.href = 'search.html';
}

function submitSort() {
    const numbers = document.getElementById('sort-input').value;
    localStorage.setItem('numbers', numbers);
    window.location.href = 'sort.html';
}

function visualizeSearch() {
    const method = document.getElementById('search-method').value;
    const numbers = localStorage.getItem('numbers').split(',').map(Number);
    const target = Number(localStorage.getItem('target'));
    const visualization = document.getElementById('search-visualization');
    visualization.innerHTML = '';

    switch (method) {
        case 'linear':
            linearSearchVisualization(numbers, target, visualization);
            break;
        case 'sentinelLinear':
            sentinelLinearSearchVisualization(numbers, target, visualization);
            break;
        case 'binary':
            binarySearchVisualization(numbers, target, visualization);
            break;
        case 'metaBinary':
            metaBinarySearchVisualization(numbers, target, visualization);
            break;
        case 'ternary':
            ternarySearchVisualization(numbers, target, visualization);
            break;
        case 'jump':
            jumpSearchVisualization(numbers, target, visualization);
            break;
        case 'interpolation':
            interpolationSearchVisualization(numbers, target, visualization);
            break;
        case 'exponential':
            exponentialSearchVisualization(numbers, target, visualization);
            break;
        case 'fibonacci':
            fibonacciSearchVisualization(numbers, target, visualization);
            break;
        case 'ubiquitousBinary':
            ubiquitousBinarySearchVisualization(numbers, target, visualization);
            break;
    }
}

function visualizeSort() {
    const method = document.getElementById('sort-method').value;
    const numbers = localStorage.getItem('numbers').split(',').map(Number);
    const visualization = document.getElementById('sort-visualization');
    visualization.innerHTML = '';

    switch (method) {
        case 'selection':
            selectionSortVisualization(numbers, visualization);
            break;
        case 'bubble':
            bubbleSortVisualization(numbers, visualization);
            break;
        case 'insertion':
            insertionSortVisualization(numbers, visualization);
            break;
        case 'merge':
            mergeSortVisualization(numbers, visualization);
            break;
        case 'quick':
            quickSortVisualization(numbers, visualization);
            break;
        case 'heap':
            heapSortVisualization(numbers, visualization);
            break;
        case 'counting':
            countingSortVisualization(numbers, visualization);
            break;
        case 'radix':
            radixSortVisualization(numbers, visualization);
            break;
    }
}

// Searching Algorithms

function linearSearchVisualization(arr, target, container) {
    arr.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);

        setTimeout(() => {
            bar.style.backgroundColor = num === target ? 'green' : 'red';
        }, index * 500);
    });
}

function sentinelLinearSearchVisualization(arr, target, container) {
    let sentinel = arr[arr.length - 1];
    arr[arr.length - 1] = target;
    let i = 0;
    while (arr[i] !== target) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = arr[i] * 10 + 'px';
        container.appendChild(bar);

        setTimeout(() => {
            bar.style.backgroundColor = arr[i] === target ? 'green' : 'red';
        }, i * 500);

        i++;
    }
    arr[arr.length - 1] = sentinel;
}

function binarySearchVisualization(arr, target, container) {
    arr.sort((a, b) => a - b);
    let left = 0;
    let right = arr.length - 1;

    arr.forEach((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
    });

    function binarySearchRecursive(left, right) {
        if (left > right) {
            setTimeout(() => {
                alert('Number not found');
            }, 500);
            return;
        }

        const mid = Math.floor((left + right) / 2);
        const bar = container.children[mid];

        setTimeout(() => {
            bar.style.backgroundColor = 'yellow';
            if (arr[mid] === target) {
                bar.style.backgroundColor = 'green';
                alert('Number found');
            } else if (arr[mid] < target) {
                bar.style.backgroundColor = 'red';
                binarySearchRecursive(mid + 1, right);
            } else {
                bar.style.backgroundColor = 'red';
                binarySearchRecursive(left, mid - 1);
            }
        }, 500);
    }

    binarySearchRecursive(left, right);
}

function metaBinarySearchVisualization(arr, target, container) {
    arr.sort((a, b) => a - b);
    let low = 0, high = arr.length - 1;

    function drawBars() {
        container.innerHTML = '';
        arr.forEach(num => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = num * 10 + 'px';
            container.appendChild(bar);
        });
    }

    drawBars();

    function metaBinarySearch() {
        while (high - low > 1) {
            let mid = low + Math.floor((high - low) / 2);

            const lowBar = container.children[low];
            const highBar = container.children[high];
            const midBar = container.children[mid];

            lowBar.style.backgroundColor = 'yellow';
            highBar.style.backgroundColor = 'yellow';
            midBar.style.backgroundColor = 'yellow';

            setTimeout(() => {
                if (arr[mid] <= target) {
                    low = mid;
                    lowBar.style.backgroundColor = 'red';
                } else {
                    high = mid;
                    highBar.style.backgroundColor = 'red';
                }

                if (arr[low] === target) {
                    lowBar.style.backgroundColor = 'green';
                    alert('Number found');
                    return;
                }

                drawBars();
                metaBinarySearch();
            }, 500);
        }
    }

    metaBinarySearch();
}

function ternarySearchVisualization(arr, target, container) {
    arr.sort((a, b) => a - b);
    let left = 0;
    let right = arr.length - 1;

    arr.forEach((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
    });

    function ternarySearchRecursive(left, right) {
        if (left > right) {
            setTimeout(() => {
                alert('Number not found');
            }, 500);
            return;
        }

        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);
        const bar1 = container.children[mid1];
        const bar2 = container.children[mid2];

        setTimeout(() => {
            bar1.style.backgroundColor = 'yellow';
            bar2.style.backgroundColor = 'yellow';

            if (arr[mid1] === target) {
                bar1.style.backgroundColor = 'green';
                alert('Number found');
            } else if (arr[mid2] === target) {
                bar2.style.backgroundColor = 'green';
                alert('Number found');
            } else if (target < arr[mid1]) {
                ternarySearchRecursive(left, mid1 - 1);
            } else if (target > arr[mid2]) {
                ternarySearchRecursive(mid2 + 1, right);
            } else {
                ternarySearchRecursive(mid1 + 1, mid2 - 1);
            }
        }, 500);
    }

    ternarySearchRecursive(left, right);
}

function jumpSearchVisualization(arr, target, container) {
    arr.sort((a, b) => a - b);
    let n = arr.length;
    let step = Math.floor(Math.sqrt(n));

    arr.forEach((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
    });

    let prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        const bar = container.children[Math.min(step, n) - 1];
        bar.style.backgroundColor = 'red';
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            setTimeout(() => alert('Number not found'), 500);
            return;
        }
    }

    while (arr[prev] < target) {
        const bar = container.children[prev];
        bar.style.backgroundColor = 'red';
        prev++;
        if (prev === Math.min(step, n)) {
            setTimeout(() => alert('Number not found'), 500);
            return;
        }
    }

    if (arr[prev] === target) {
        const bar = container.children[prev];
        bar.style.backgroundColor = 'green';
        setTimeout(() => alert('Number found'), 500);
    }
}

function interpolationSearchVisualization(arr, target, container) {
    arr.sort((a, b) => a - b);
    let lo = 0, hi = arr.length - 1;

    arr.forEach((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
    });

    function interpolationSearch() {
        if (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
            let pos = lo + Math.floor(((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo]));

            const bar = container.children[pos];
            setTimeout(() => {
                bar.style.backgroundColor = 'yellow';
                if (arr[pos] === target) {
                    bar.style.backgroundColor = 'green';
                    alert('Number found');
                } else if (arr[pos] < target) {
                    lo = pos + 1;
                    interpolationSearch();
                } else {
                    hi = pos - 1;
                    interpolationSearch();
                }
            }, 500);
        } else {
            setTimeout(() => alert('Number not found'), 500);
        }
    }

    interpolationSearch();
}

function exponentialSearchVisualization(arr, target, container) {
    arr.sort((a, b) => a - b);
    let n = arr.length;

    arr.forEach((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
    });

    if (arr[0] === target) {
        const bar = container.children[0];
        bar.style.backgroundColor = 'green';
        setTimeout(() => alert('Number found'), 500);
        return;
    }

    let i = 1;
    while (i < n && arr[i] <= target) {
        const bar = container.children[i];
        bar.style.backgroundColor = 'red';
        i = i * 2;
    }

    function binarySearch(low, high) {
        if (low > high) {
            setTimeout(() => alert('Number not found'), 500);
            return;
        }

        const mid = Math.floor((low + high) / 2);
        const bar = container.children[mid];

        setTimeout(() => {
            bar.style.backgroundColor = 'yellow';
            if (arr[mid] === target) {
                bar.style.backgroundColor = 'green';
                alert('Number found');
            } else if (arr[mid] < target) {
                bar.style.backgroundColor = 'red';
                binarySearch(mid + 1, high);
            } else {
                bar.style.backgroundColor = 'red';
                binarySearch(low, mid - 1);
            }
        }, 500);
    }

    binarySearch(Math.floor(i / 2), Math.min(i, n - 1));
}

function fibonacciSearchVisualization(arr, target, container) {
    arr.sort((a, b) => a - b);
    let n = arr.length;
    let fibMMm2 = 0;
    let fibMMm1 = 1;
    let fibM = fibMMm2 + fibMMm1;

    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    let offset = -1;

    arr.forEach((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
    });

    function fibonacciSearch() {
        if (fibM === 0) {
            setTimeout(() => alert('Number not found'), 500);
            return;
        }

        let i = Math.min(offset + fibMMm2, n - 1);
        const bar = container.children[i];

        setTimeout(() => {
            bar.style.backgroundColor = 'yellow';
            if (arr[i] === target) {
                bar.style.backgroundColor = 'green';
                alert('Number found');
            } else if (arr[i] < target) {
                fibM = fibMMm1;
                fibMMm1 = fibMMm2;
                fibMMm2 = fibM - fibMMm1;
                offset = i;
                bar.style.backgroundColor = 'red';
                fibonacciSearch();
            } else {
                fibM = fibMMm2;
                fibMMm1 = fibMMm1 - fibMMm2;
                fibMMm2 = fibM - fibMMm1;
                bar.style.backgroundColor = 'red';
                fibonacciSearch();
            }
        }, 500);
    }

    fibonacciSearch();
}

function ubiquitousBinarySearchVisualization(arr, target, container) {
    arr.sort((a, b) => a - b);
    let low = 0;
    let high = arr.length;

    arr.forEach((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
    });

    function ubiquitousBinarySearch() {
        if (low === high) {
            setTimeout(() => alert('Number not found'), 500);
            return;
        }

        let mid = low + ((high - low) >> 1);
        const bar = container.children[mid];

        setTimeout(() => {
            bar.style.backgroundColor = 'yellow';
            if (arr[mid] === target) {
                bar.style.backgroundColor = 'green';
                alert('Number found');
            } else if (arr[mid] < target) {
                low = mid + 1;
                bar.style.backgroundColor = 'red';
                ubiquitousBinarySearch();
            } else {
                high = mid;
                bar.style.backgroundColor = 'red';
                ubiquitousBinarySearch();
            }
        }, 500);
    }

    ubiquitousBinarySearch();
}

// Sorting Algorithms

function selectionSortVisualization(arr, container) {
    let n = arr.length;
    let bars = arr.map((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
        return bar;
    });

    function selectionSortStep(i) {
        if (i >= n) {
            return;
        }

        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        setTimeout(() => {
            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;

            bars[i].style.height = arr[i] * 10 + 'px';
            bars[minIdx].style.height = arr[minIdx] * 10 + 'px';

            bars[i].style.backgroundColor = 'green';
            bars[minIdx].style.backgroundColor = '';

            selectionSortStep(i + 1);
        }, 500);
    }

    selectionSortStep(0);
}

function bubbleSortVisualization(arr, container) {
    let n = arr.length;
    let bars = arr.map((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
        return bar;
    });

    function bubbleSortStep(i, j) {
        if (i >= n - 1) {
            return;
        }

        if (j >= n - i - 1) {
            bubbleSortStep(i + 1, 0);
            return;
        }

        if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            bars[j].style.height = arr[j] * 10 + 'px';
            bars[j + 1].style.height = arr[j + 1] * 10 + 'px';
        }

        setTimeout(() => {
            bubbleSortStep(i, j + 1);
        }, 500);
    }

    bubbleSortStep(0, 0);
}

function insertionSortVisualization(arr, container) {
    let n = arr.length;
    let bars = arr.map((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
        return bar;
    });

    function insertionSortStep(i) {
        if (i >= n) {
            return;
        }

        let key = arr[i];
        let j = i - 1;

        setTimeout(() => {
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                bars[j + 1].style.height = arr[j] * 10 + 'px';
                j--;
            }
            arr[j + 1] = key;
            bars[j + 1].style.height = key * 10 + 'px';

            insertionSortStep(i + 1);
        }, 500);
    }

    insertionSortStep(1);
}

function mergeSortVisualization(arr, container) {
    let bars = arr.map((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
        return bar;
    });

    function merge(left, right) {
        let result = [], leftIndex = 0, rightIndex = 0;

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

    function mergeSort(arr, start, end) {
        if (arr.length <= 1) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        const merged = merge(mergeSort(left, start, start + middle), mergeSort(right, start + middle, end));

        for (let i = start; i < end; i++) {
            arr[i - start] = merged[i - start];
            setTimeout(() => {
                bars[i].style.height = arr[i - start] * 10 + 'px';
                bars[i].style.backgroundColor = 'green';
            }, i * 500);
        }

        return merged;
    }

    mergeSort(arr, 0, arr.length);
}

function quickSortVisualization(arr, container) {
    let bars = arr.map((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
        return bar;
    });

    function partition(low, high) {
        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }

    function quickSort(low, high) {
        if (low < high) {
            let pi = partition(low, high);

            setTimeout(() => {
                for (let i = low; i <= high; i++) {
                    bars[i].style.height = arr[i] * 10 + 'px';
                    bars[i].style.backgroundColor = 'green';
                }

                quickSort(low, pi - 1);
                quickSort(pi + 1, high);
            }, 500);
        }
    }

    quickSort(0, arr.length - 1);
}

function heapSortVisualization(arr, container) {
    let bars = arr.map((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
        return bar;
    });

    function heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(n, largest);
        }
    }

    function heapSort() {
        let n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];

            setTimeout(() => {
                bars[i].style.height = arr[i] * 10 + 'px';
                bars[0].style.height = arr[0] * 10 + 'px';
                bars[i].style.backgroundColor = 'green';
                bars[0].style.backgroundColor = 'green';

                heapify(i, 0);
            }, i * 500);
        }
    }

    heapSort();
}

function countingSortVisualization(arr, container) {
    let max = Math.max(...arr);
    let count = new Array(max + 1).fill(0);
    let output = new Array(arr.length).fill(0);
    let bars = arr.map((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
        return bar;
    });

    arr.forEach(num => count[num]++);

    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    output.forEach((num, i) => {
        setTimeout(() => {
            bars[i].style.height = num * 10 + 'px';
            bars[i].style.backgroundColor = 'green';
        }, i * 500);
    });
}

function radixSortVisualization(arr, container) {
    let max = Math.max(...arr);
    let bars = arr.map((num) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = num * 10 + 'px';
        container.appendChild(bar);
        return bar;
    });

    function countingSortForRadix(arr, exp) {
        let output = new Array(arr.length).fill(0);
        let count = new Array(10).fill(0);

        for (let i = 0; i < arr.length; i++) {
            count[Math.floor(arr[i] / exp) % 10]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            count[Math.floor(arr[i] / exp) % 10]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
    }

    function radixSort() {
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            countingSortForRadix(arr, exp);

            arr.forEach((num, i) => {
                setTimeout(() => {
                    bars[i].style.height = num * 10 + 'px';
                    bars[i].style.backgroundColor = 'green';
                }, i * 500);
            });
        }
    }

    radixSort();
}
