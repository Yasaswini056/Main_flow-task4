let display = document.getElementById('display');
let equation = '0'; // Start with 0 displayed
let result = null; // Store the result after calculation
let isResultShown = false; // Track if the result is currently displayed

display.innerText = equation; // Display the initial equation

// Function to append numbers to the equation
function appendNumber(number) {
    if (isResultShown) {
        equation = number.toString(); // Reset equation if result was shown
        isResultShown = false;
    } else {
        if (equation === '0') {
            equation = number.toString(); // Replace 0 with the first number
        } else {
            equation += number.toString(); // Append the number
        }
    }
    display.innerText = equation; // Update the display
}

// Function to append operators
function appendOperator(op) {
    if (isResultShown) {
        equation = result.toString(); // Start with the last result
        isResultShown = false;
    }

    // Prevent consecutive operators
    const lastChar = equation.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        equation = equation.slice(0, -1); // Replace the last operator
    }

    equation += op; // Append the operator
    display.innerText = equation; // Update the display
}

// Function to append parentheses
function appendParenthesis(paren) {
    const lastChar = equation.slice(-1);

    if (paren === '(') {
        // Allow '(' after operators or at the start
        if (['+', '-', '*', '/', '('].includes(lastChar) || equation === '0') {
            if (equation === '0') equation = ''; // Clear initial '0'
            equation += paren;
        }
    } else if (paren === ')') {
        // Allow ')' only if it matches an opening '('
        const openParentheses = (equation.match(/\(/g) || []).length;
        const closeParentheses = (equation.match(/\)/g) || []).length;

        if (openParentheses > closeParentheses && !['+', '-', '*', '/', '('].includes(lastChar)) {
            equation += paren;
        }
    }

    display.innerText = equation; // Update the display
}

// Function to append a decimal point
function appendDecimal() {
    const lastPart = equation.split(/[\+\-\*\/\(\)]/).pop(); // Get the last number
    if (!lastPart.includes('.')) {
        equation += '.'; // Add a decimal if not present
    }
    display.innerText = equation; // Update the display
}

// Function to calculate the result
function calculateResult() {
    try {
        // Ensure balanced parentheses before calculation
        const openParentheses = (equation.match(/\(/g) || []).length;
        const closeParentheses = (equation.match(/\)/g) || []).length;

        if (openParentheses !== closeParentheses) {
            throw new Error('Unbalanced parentheses');
        }

        result = eval(equation); // Evaluate the equation
        display.innerText = equation + '\n= ' + result; // Show result
        equation = result.toString(); // Store result for further calculations
        isResultShown = true; // Prevent appending after result
    } catch (error) {
        display.innerText = 'Error'; // Display error
        equation = '0'; // Reset the equation
    }
}

// Function to clear the display
function clearDisplay() {
    equation = '0'; // Reset the equation
    display.innerText = equation; // Update the display
    isResultShown = false; // Reset the result flag
}

// Function to delete the last character
function backspace() {
    if (isResultShown) return; // Prevent backspace if result is shown

    if (equation.length === 1) {
        equation = '0'; // Reset to 0 if only one character
    } else {
        equation = equation.slice(0, -1); // Remove the last character
    }

    display.innerText = equation; // Update the display
}
