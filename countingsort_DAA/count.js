
function countSort(inputArray) {
    const N = inputArray.length;
    // Finding the maximum element of inputArray
    let M = 0;
    for (let i = 0; i < N; i++) {
        M = Math.max(M, inputArray[i]);
    }
    // Initializing countArray with 0
    const countArray = new Array(M + 1).fill(0);
    // Mapping each element of inputArray as an index of countArray
    for (let i = 0; i < N; i++) {
        countArray[inputArray[i]]++;
    }
    // Calculating prefix sum at every index of countArray
    for (let i = 1; i <= M; i++) {
        countArray[i] += countArray[i - 1];
    }
    // Creating outputArray from countArray
    const outputArray = new Array(N);
    for (let i = N - 1; i >= 0; i--) {
        outputArray[countArray[inputArray[i]] - 1] = inputArray[i];
        countArray[inputArray[i]]--;
    }
    return outputArray;
}

function performSort() {
    const inputField = document.getElementById('inputArray');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const sortedArrayDisplay = document.getElementById('sortedArrayDisplay');
    
    // Clear previous results and errors
    errorDiv.textContent = '';
    sortedArrayDisplay.innerHTML = '';
    
    // Get input and validate
    const inputText = inputField.value.trim();
    if (!inputText) {
        errorDiv.textContent = 'Please enter numbers separated by spaces.';
        return;
    }
    
    try {
        // Parse input into array of numbers
        const inputArray = inputText.split(/\s+/).map(num => {
            const parsedNum = parseInt(num);
            if (isNaN(parsedNum) || parsedNum < 0) {
                throw new Error('Invalid input: Please enter only positive integers.');
            }
            return parsedNum;
        });
        
        // Perform counting sort
        const sortedArray = countSort(inputArray);
        
        // Display result
        resultDiv.textContent = sortedArray.join(' ');
        
        // Create visual representation of sorted array
        sortedArray.forEach(num => {
            const arrayItem = document.createElement('div');
            arrayItem.className = 'array-item';
            arrayItem.textContent = num;
            sortedArrayDisplay.appendChild(arrayItem);
        });
        
    } catch (error) {
        errorDiv.textContent = error.message;
    }
}

// Add event listener for Enter key
document.getElementById('inputArray').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSort();
    }
});

// Initialize with example data
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('inputArray').value = '4 3 12 1 5 5 3 9';
});
